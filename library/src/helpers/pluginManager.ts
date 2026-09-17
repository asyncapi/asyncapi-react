import {
  AsyncApiPlugin,
  ComponentSlotProps,
  EventListener,
  MessageBus,
  PluginAPI,
  PluginContext,
  PluginSlot,
} from '../types';
import {
  PLUGIN_EVENT_ERROR,
  PLUGIN_EVENT_READY,
  PLUGIN_EVENT_SPEC_LOADED,
} from '../constants';

interface InstalledPlugin {
  plugin: AsyncApiPlugin;
  /** The API object `install()` received, handed back to `uninstall()` so it can undo its work. */
  api: PluginAPI;
  /** Listeners added through the plugin's API, removed for it on unregister. */
  listeners: { eventName: string; callback: (data: unknown) => void }[];
  /** Whether this installation may still mutate manager-owned state through its API. */
  state: { active: boolean };
  controller: AbortController;
  completion: Promise<void>;
  resolveCompletion: () => void;
}

class PluginManager implements MessageBus {
  /** Installed plugins keyed by `plugin.name`. */
  private readonly plugins = new Map<string, InstalledPlugin>();
  /** Plugin names with an in-flight `install()` call. */
  private readonly pendingInstalls = new Map<string, InstalledPlugin>();
  /** Plugin names cancelled via `unregister()` while install was pending. */
  private readonly cancelledInstalls = new Set<string>();
  /** In-flight teardown keyed by plugin name, so a replacement waits for its predecessor. */
  private readonly pendingUninstalls = new Map<string, Promise<void>>();
  /** Prevents pending installs or retained manager references from reviving a torn-down manager. */
  private destroyed = false;
  /**
   * UI components registered per render slot (e.g. `operation`, `info`).
   * Entries are sorted by descending priority when a plugin calls `registerComponent`.
   */
  private readonly slotComponents = new Map<
    PluginSlot,
    {
      component: React.ComponentType<ComponentSlotProps>;
      priority: number;
      label?: string;
      pluginName: string;
    }[]
  >();
  /** Pub/sub listeners keyed by event name (e.g. `specLoaded`, `plugin:error`). */
  private readonly eventListeners = new Map<string, Set<EventListener>>();
  /** Shared read-only context exposed to plugins via `getContext()`. */
  private context: PluginContext;

  constructor(initialContext: PluginContext) {
    this.context = initialContext;
  }

  /**
   * Registers a plugin. Returns `true` on success, `false` if the plugin is
   * already registered or `install()` throws or rejects. Install failures are
   * logged to the console and emitted as `PLUGIN_EVENT_ERROR` so callers never
   * need their own try/catch.
   */
  async register(plugin: AsyncApiPlugin): Promise<boolean> {
    const pendingUninstall = this.pendingUninstalls.get(plugin.name);
    if (pendingUninstall) {
      await pendingUninstall;
    }

    if (this.destroyed) {
      console.warn(`Plugin manager has been destroyed`);
      return false;
    }

    if (
      this.plugins.has(plugin.name) ||
      this.pendingInstalls.has(plugin.name)
    ) {
      console.warn(`Plugin ${plugin.name} is already registered`);
      return false;
    }

    const listeners: InstalledPlugin['listeners'] = [];
    const state = { active: true };
    const controller = new AbortController();
    let resolveCompletion!: () => void;
    const completion = new Promise<void>((resolve) => {
      resolveCompletion = resolve;
    });
    const api = this.createPluginAPI(
      plugin,
      listeners,
      () => state.active,
      controller.signal,
    );
    const entry: InstalledPlugin = {
      plugin,
      api,
      listeners,
      state,
      controller,
      completion,
      resolveCompletion,
    };
    this.pendingInstalls.set(plugin.name, entry);
    try {
      await plugin.install(api);
    } catch (error) {
      // Always log so failures are visible even without an `onPluginEvent` handler.
      console.error(`Failed to register plugin ${plugin.name}:`, error);
      entry.state.active = false;
      entry.controller.abort();
      this.removePluginComponents(plugin.name);
      this.removePluginListeners(entry);
      this.cancelledInstalls.delete(plugin.name);
      this.emit(PLUGIN_EVENT_ERROR, {
        pluginName: plugin.name,
        message: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      });
      entry.resolveCompletion();
      return false;
    } finally {
      this.pendingInstalls.delete(plugin.name);
    }

    if (this.cancelledInstalls.has(plugin.name)) {
      this.cancelledInstalls.delete(plugin.name);
      this.removePluginComponents(plugin.name);
      this.removePluginListeners(entry);
      // install() ran to completion before the cancellation, so it may hold resources.
      await this.trackUninstall(entry);
      entry.resolveCompletion();
      return false;
    }

    this.plugins.set(plugin.name, entry);
    this.emit(PLUGIN_EVENT_READY, {
      pluginName: plugin.name,
      message: 'Plugin registered successfully',
      timestamp: new Date().toISOString(),
    });
    entry.resolveCompletion();
    return true;
  }

  /**
   * Removes a plugin, the UI components it registered and the listeners it added, then calls
   * its `uninstall()`. No-op if the plugin name is not found.
   */
  unregister(pluginName: string): Promise<void> {
    const entry = this.plugins.get(pluginName);
    const pendingEntry = this.pendingInstalls.get(pluginName);
    if (!entry && !pendingEntry) {
      const pendingUninstall = this.pendingUninstalls.get(pluginName);
      if (pendingUninstall) return pendingUninstall;
      console.warn(`Plugin "${pluginName}" not found`);
      return Promise.resolve();
    }

    if (pendingEntry) {
      pendingEntry.state.active = false;
      pendingEntry.controller.abort();
      this.removePluginListeners(pendingEntry);
      this.cancelledInstalls.add(pluginName);
    }

    if (entry) {
      entry.state.active = false;
      entry.controller.abort();
    }
    this.plugins.delete(pluginName);
    // Stop rendering the plugin before it releases state its components may read.
    this.removePluginComponents(pluginName);
    if (entry) {
      this.removePluginListeners(entry);
      return this.trackUninstall(entry);
    }
    return pendingEntry!.completion;
  }

  /**
   * Tears down every plugin and drops all state. Call this when the host component unmounts,
   * so plugins can close connections instead of leaving them orphaned.
   */
  async destroy(): Promise<void> {
    this.destroyed = true;
    this.pendingInstalls.forEach((entry, name) => {
      entry.state.active = false;
      entry.controller.abort();
      this.cancelledInstalls.add(name);
    });
    const teardowns = [
      ...Array.from(this.pendingInstalls.values(), (entry) => entry.completion),
      ...Array.from(this.plugins.keys(), (name) => this.unregister(name)),
    ];
    this.slotComponents.clear();
    this.eventListeners.clear();
    await Promise.all(teardowns);
  }

  /**
   * Runs a plugin's `uninstall()`. Failures are logged and emitted like install failures rather
   * than thrown: teardown usually runs during unmount, where no caller can handle an error.
   */
  private async runUninstall(entry: InstalledPlugin): Promise<void> {
    const { plugin, api } = entry;
    entry.state.active = false;
    entry.controller.abort();
    if (!plugin.uninstall) {
      return;
    }

    try {
      await plugin.uninstall(api);
    } catch (error) {
      console.error(`Failed to uninstall plugin ${plugin.name}:`, error);
      this.emit(PLUGIN_EVENT_ERROR, {
        pluginName: plugin.name,
        message: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      });
    }
  }

  private trackUninstall(entry: InstalledPlugin): Promise<void> {
    const { name } = entry.plugin;
    const uninstall = this.runUninstall(entry);
    this.pendingUninstalls.set(name, uninstall);
    void uninstall.finally(() => {
      if (this.pendingUninstalls.get(name) === uninstall) {
        this.pendingUninstalls.delete(name);
      }
    });
    return uninstall;
  }

  private removePluginListeners(entry: InstalledPlugin): void {
    entry.listeners.forEach(({ eventName, callback }) => {
      this.off(eventName, callback);
    });
    entry.listeners.length = 0;
  }

  private removePluginComponents(pluginName: string): void {
    this.slotComponents.forEach((components) => {
      let i = components.length;
      while (i--) {
        if (components[i].pluginName === pluginName) {
          components.splice(i, 1);
        }
      }
    });
  }

  /**
   * Builds the API surface passed to a plugin's `install()` method.
   * Wires plugin calls (registerComponent, on, emit, etc.) back into this manager.
   */
  private createPluginAPI(
    plugin: AsyncApiPlugin,
    listeners: InstalledPlugin['listeners'],
    isActive: () => boolean,
    signal: AbortSignal,
  ): PluginAPI {
    return {
      signal,
      registerComponent: (slot, component, options = {}) => {
        if (!isActive()) return;

        if (!this.slotComponents.has(slot)) {
          this.slotComponents.set(slot, []);
        }

        const priority = options.priority ?? 100;
        this.slotComponents.get(slot)!.push({
          // Safe: components are only ever rendered with the context of their own slot.
          component: component as React.ComponentType<ComponentSlotProps>,
          priority,
          label: options.label,
          pluginName: plugin?.name,
        });

        this.slotComponents.get(slot)!.sort((a, b) => b.priority - a.priority);
      },

      onSpecLoaded: (callback) => {
        if (!isActive()) return;

        this.on(PLUGIN_EVENT_SPEC_LOADED, callback);
        listeners.push({ eventName: PLUGIN_EVENT_SPEC_LOADED, callback });
        if (this.context.schema !== undefined) {
          callback(this.context.schema);
        }
      },

      getContext: () => this.context,

      on: (eventName, callback) => {
        if (!isActive()) return;

        this.on(eventName, callback);
        listeners.push({ eventName, callback });
      },

      off: (eventName, callback) => {
        this.off(eventName, callback);
        const index = listeners.findIndex(
          (listener) =>
            listener.eventName === eventName && listener.callback === callback,
        );
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      },

      emit: (eventName, data) => {
        this.emit(eventName, data);
      },
    };
  }

  /** Subscribes a callback to the named event. */
  on(eventName: string, callback: (data: unknown) => void): void {
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, new Set());
    }
    this.eventListeners.get(eventName)!.add(callback);
  }

  /** Unsubscribes a callback from the named event. */
  off(eventName: string, callback: (data: unknown) => void): void {
    const listeners = this.eventListeners.get(eventName);
    if (listeners) {
      listeners.delete(callback);
      if (listeners.size === 0) {
        this.eventListeners.delete(eventName);
      }
    }
  }

  /**
   * Dispatches an event to all listeners for `eventName`.
   * Listener errors are caught and logged so one failure does not block others.
   */
  public emit(eventName: string, data: unknown): void {
    const eventListeners = this.eventListeners.get(eventName);
    if (eventListeners) {
      // Isolate listener failures so one throwing callback does not abort dispatch.
      Array.from(eventListeners).forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error(
            `Plugin event listener failed for "${eventName}":`,
            error,
          );
        }
      });
    }
  }

  /** Returns a snapshot of all callbacks registered for `eventName`. */
  listeners(eventName: string): EventListener[] {
    const listeners = this.eventListeners.get(eventName);
    return listeners ? Array.from(listeners) : [];
  }

  /** Returns every event name that currently has at least one listener. */
  eventNames(): string[] {
    return Array.from(this.eventListeners.keys());
  }

  /**
   * Returns React components registered for a UI slot, ordered by descending priority.
   */
  getComponentsForSlot<S extends PluginSlot>(
    slot: S,
  ): React.ComponentType<ComponentSlotProps<S>>[] {
    return (this.slotComponents.get(slot) ?? []).map(
      (c) => c.component as React.ComponentType<ComponentSlotProps<S>>,
    );
  }

  /**
   * Replaces the shared context returned by plugin `getContext()` calls.
   * Emits `specLoaded` when a schema is included in the update.
   */
  updateContext(updates: PluginContext): void {
    this.context = updates;
    if (updates.schema !== undefined) {
      this.emit(PLUGIN_EVENT_SPEC_LOADED, updates.schema);
    }
  }

  /** Looks up a registered plugin by name. */
  getPlugin(name: string): AsyncApiPlugin | undefined {
    return this.plugins.get(name)?.plugin;
  }

  /** Returns `name` and `version` metadata for every registered plugin. */
  listPlugins(): { name: string; version: string }[] {
    return Array.from(this.plugins.values()).map(({ plugin }) => ({
      name: plugin.name,
      version: plugin.version,
    }));
  }
}

export { PluginManager };
