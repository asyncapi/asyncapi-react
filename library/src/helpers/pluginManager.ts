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

class PluginManager implements MessageBus {
  /** Installed plugins keyed by `plugin.name`. */
  private readonly plugins = new Map<string, AsyncApiPlugin>();
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
   * already registered or `install()` throws error. Install failures are logged to
   * the console and emitted as `PLUGIN_EVENT_ERROR` so callers never need
   * their own try/catch.
   */
  register(plugin: AsyncApiPlugin): boolean {
    if (this.plugins.has(plugin.name)) {
      console.warn(`Plugin ${plugin.name} is already registered`);
      return false;
    }

    const api = this.createPluginAPI(plugin);
    try {
      plugin.install(api);
    } catch (error) {
      // Always log so failures are visible even without an `onPluginEvent` handler.
      console.error(`Failed to register plugin ${plugin.name}:`, error);
      this.emit(PLUGIN_EVENT_ERROR, {
        pluginName: plugin.name,
        message: error instanceof Error ? error.message : String(error),
        timestamp: new Date(),
      });
      return false;
    }

    this.plugins.set(plugin.name, plugin);
    this.emit(PLUGIN_EVENT_READY, {
      pluginName: plugin.name,
      message: 'Plugin registered successfully',
      timestamp: new Date(),
    });
    return true;
  }

  /**
   * Removes a plugin and any UI components it registered.
   * No-op if the plugin name is not found.
   */
  unregister(pluginName: string): void {
    const plugin = this.plugins.get(pluginName);
    if (!plugin) {
      console.warn(`Plugin "${pluginName}" not found`);
      return;
    }

    this.plugins.delete(pluginName);

    this.slotComponents.forEach((components) => {
      const index = components.findIndex((c) => {
        return c.pluginName === pluginName;
      });
      if (index > -1) {
        components.splice(index, 1);
      }
    });
  }

  /**
   * Builds the API surface passed to a plugin's `install()` method.
   * Wires plugin calls (registerComponent, on, emit, etc.) back into this manager.
   */
  private createPluginAPI(plugin: AsyncApiPlugin): PluginAPI {
    return {
      registerComponent: (slot, component, options = {}) => {
        if (!this.slotComponents.has(slot)) {
          this.slotComponents.set(slot, []);
        }

        const priority = options.priority ?? 100;
        this.slotComponents.get(slot)!.push({
          component,
          priority,
          label: options.label,
          pluginName: plugin?.name,
        });

        this.slotComponents.get(slot)!.sort((a, b) => b.priority - a.priority);
      },

      onSpecLoaded: (callback) => {
        this.on(PLUGIN_EVENT_SPEC_LOADED, callback);
        if (this.context.schema !== undefined) {
          callback(this.context.schema);
        }
      },

      getContext: () => this.context,

      on: (eventName, callback) => {
        this.on(eventName, callback);
      },

      off: (eventName, callback) => {
        this.off(eventName, callback);
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
  getComponentsForSlot(
    slot: PluginSlot,
  ): React.ComponentType<ComponentSlotProps>[] {
    return (this.slotComponents.get(slot) ?? []).map((c) => c.component);
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
    return this.plugins.get(name);
  }

  /** Returns `name` and `version` metadata for every registered plugin. */
  listPlugins(): { name: string; version: string }[] {
    return Array.from(this.plugins.values()).map((p) => ({
      name: p.name,
      version: p.version,
    }));
  }
}

export { PluginManager };
