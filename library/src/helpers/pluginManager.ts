import {
  AsyncApiPlugin,
  ComponentSlotProps,
  EventListener,
  MessageBus,
  PluginAPI,
  PluginContext,
  PluginSlot,
} from '../types';
import { PLUGIN_EVENT_ERROR } from '../constants';

class PluginManager implements MessageBus {
  private readonly plugins = new Map<string, AsyncApiPlugin>();
  private readonly slotComponents = new Map<
    PluginSlot,
    {
      component: React.ComponentType<ComponentSlotProps>;
      priority: number;
      label?: string;
      pluginName: string;
    }[]
  >();
  private readonly eventListeners = new Map<string, Set<EventListener>>();
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
        phase: 'install',
        pluginName: plugin.name,
        message: error instanceof Error ? error.message : String(error),
        timestamp: Date.now(),
      });
      return false;
    }

    this.plugins.set(plugin.name, plugin);
    return true;
  }

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
        this.on('specLoaded', callback);
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

  on(eventName: string, callback: (data: unknown) => void): void {
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, new Set());
    }
    this.eventListeners.get(eventName)!.add(callback);
  }

  off(eventName: string, callback: (data: unknown) => void): void {
    const listeners = this.eventListeners.get(eventName);
    if (listeners) {
      listeners.delete(callback);
      if (listeners.size === 0) {
        this.eventListeners.delete(eventName);
      }
    }
  }

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

  listeners(eventName: string): EventListener[] {
    const listeners = this.eventListeners.get(eventName);
    return listeners ? Array.from(listeners) : [];
  }

  eventNames(): string[] {
    return Array.from(this.eventListeners.keys());
  }

  getComponentsForSlot(
    slot: PluginSlot,
  ): React.ComponentType<ComponentSlotProps>[] {
    return (this.slotComponents.get(slot) ?? []).map((c) => c.component);
  }

  updateContext(updates: PluginContext): void {
    this.context = updates;
  }

  getPlugin(name: string): AsyncApiPlugin | undefined {
    return this.plugins.get(name);
  }

  listPlugins(): { name: string; version: string }[] {
    return Array.from(this.plugins.values()).map((p) => ({
      name: p.name,
      version: p.version,
    }));
  }
}

export { PluginManager };
