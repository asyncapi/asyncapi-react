import { PluginManager } from '../pluginManager';
import { AsyncApiPlugin, PluginSlot, PluginAPI } from '../../types';

const TEST_PLUGIN_NAME = 'test-plugin';
const TEST_EVENT = 'test-event';

describe('PluginManager', () => {
  let pluginManager: PluginManager;
  const mockContext = { schema: { title: 'Test API' } };

  beforeEach(() => {
    pluginManager = new PluginManager(mockContext);
    // disable console logging
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Plugin Registration', () => {
    it('should register a plugin', () => {
      const installMock = jest.fn();
      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: installMock,
      };

      pluginManager.register(plugin);

      expect(installMock).toHaveBeenCalled();
      expect(pluginManager.getPlugin(TEST_PLUGIN_NAME)).toBe(plugin);
    });

    it('should call plugin install with correct API', () => {
      let capturedAPI: PluginAPI | null = null;
      const plugin: AsyncApiPlugin = {
        name: 'test-plugin',
        version: '1.0.0',
        install: (api) => {
          capturedAPI = api;
        },
      };

      pluginManager.register(plugin);

      expect(capturedAPI).toBeDefined();
      expect(capturedAPI).toHaveProperty('registerComponent');
      expect(capturedAPI).toHaveProperty('on');
      expect(capturedAPI).toHaveProperty('off');
      expect(capturedAPI).toHaveProperty('emit');
      expect(capturedAPI).toHaveProperty('getContext');
      expect(capturedAPI).toHaveProperty('onSpecLoaded');
    });

    it('should not call install twice for duplicate plugin', () => {
      const installMock = jest.fn();
      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: installMock,
      };

      pluginManager.register(plugin);
      pluginManager.register(plugin);

      expect(installMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('Plugin Unregistration', () => {
    it('should unregister a plugin', () => {
      const installMock = jest.fn();
      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: installMock,
      };

      pluginManager.register(plugin);
      pluginManager.unregister(TEST_PLUGIN_NAME);

      expect(pluginManager.getPlugin(TEST_PLUGIN_NAME)).toBeUndefined();
    });

    it('should remove plugin components when unregistering', () => {
      const TestComponent = () => null;
      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: (api) => {
          api.registerComponent(PluginSlot.OPERATION, TestComponent);
        },
      };

      pluginManager.register(plugin);
      expect(
        pluginManager.getComponentsForSlot(PluginSlot.OPERATION),
      ).toHaveLength(1);

      pluginManager.unregister(TEST_PLUGIN_NAME);
      expect(
        pluginManager.getComponentsForSlot(PluginSlot.OPERATION),
      ).toHaveLength(0);
    });

    it('should only remove components from the unregistered plugin', () => {
      const Component1 = () => null;
      const Component2 = () => null;

      const plugin1: AsyncApiPlugin = {
        name: 'plugin-1',
        version: '1.0.0',
        install: (api) => {
          api.registerComponent(PluginSlot.OPERATION, Component1);
        },
      };

      const plugin2: AsyncApiPlugin = {
        name: 'plugin-2',
        version: '1.0.0',
        install: (api) => {
          api.registerComponent(PluginSlot.OPERATION, Component2);
        },
      };

      pluginManager.register(plugin1);
      pluginManager.register(plugin2);
      expect(
        pluginManager.getComponentsForSlot(PluginSlot.OPERATION),
      ).toHaveLength(2);

      pluginManager.unregister('plugin-1');
      expect(
        pluginManager.getComponentsForSlot(PluginSlot.OPERATION),
      ).toHaveLength(1);
      expect(pluginManager.getComponentsForSlot(PluginSlot.OPERATION)[0]).toBe(
        Component2,
      );
    });
  });

  describe('Component Registration', () => {
    it('should register component in a slot', () => {
      const TestComponent = () => null;
      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: (api) => {
          api.registerComponent(PluginSlot.OPERATION, TestComponent);
        },
      };

      pluginManager.register(plugin);

      const components = pluginManager.getComponentsForSlot(
        PluginSlot.OPERATION,
      );
      expect(components).toHaveLength(1);
      expect(components[0]).toBe(TestComponent);
    });

    it('should register multiple components in the same slot', () => {
      const Component1 = () => null;
      const Component2 = () => null;

      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: (api) => {
          api.registerComponent(PluginSlot.OPERATION, Component1);
          api.registerComponent(PluginSlot.OPERATION, Component2);
        },
      };

      pluginManager.register(plugin);

      const components = pluginManager.getComponentsForSlot(
        PluginSlot.OPERATION,
      );
      expect(components).toHaveLength(2);
    });

    it('should use default priority of 100for components without priority', () => {
      const DefaultComponent = () => null;
      const HighComponent = () => null;
      const LowComponent = () => null;

      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: (api) => {
          api.registerComponent(PluginSlot.OPERATION, LowComponent, {
            priority: 50,
          });
          api.registerComponent(PluginSlot.OPERATION, DefaultComponent);
          api.registerComponent(PluginSlot.OPERATION, HighComponent, {
            priority: 150,
          });
        },
      };

      pluginManager.register(plugin);

      const components = pluginManager.getComponentsForSlot(
        PluginSlot.OPERATION,
      );
      expect(components[0]).toBe(HighComponent);
      expect(components[1]).toBe(DefaultComponent);
      expect(components[2]).toBe(LowComponent);
    });

    it('should return empty array for slot with no components', () => {
      const components = pluginManager.getComponentsForSlot(
        PluginSlot.OPERATION,
      );
      expect(components).toEqual([]);
    });
  });

  describe('Event System', () => {
    it('should register event listener', () => {
      const callback = jest.fn();

      pluginManager.on(TEST_EVENT, callback);

      expect(pluginManager.listeners(TEST_EVENT)).toHaveLength(1);
    });

    it('should emit event to listeners', () => {
      const callback = jest.fn();
      const eventData = { message: 'test' };

      pluginManager.on(TEST_EVENT, callback);
      pluginManager.emit(TEST_EVENT, eventData);

      expect(callback).toHaveBeenCalledWith(eventData);
    });

    it('should emit to multiple listeners', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      const eventData = { message: 'test' };

      pluginManager.on(TEST_EVENT, callback1);
      pluginManager.on(TEST_EVENT, callback2);
      pluginManager.emit(TEST_EVENT, eventData);

      expect(callback1).toHaveBeenCalledWith(eventData);
      expect(callback2).toHaveBeenCalledWith(eventData);
    });

    it('should remove event listener', () => {
      const callback = jest.fn();

      pluginManager.on(TEST_EVENT, callback);
      pluginManager.off(TEST_EVENT, callback);

      pluginManager.emit(TEST_EVENT, { message: 'test' });

      expect(callback).not.toHaveBeenCalled();
    });

    it('should remove event name when last listener is removed', () => {
      const callback = jest.fn();

      pluginManager.on(TEST_EVENT, callback);
      pluginManager.off(TEST_EVENT, callback);

      expect(pluginManager.eventNames()).toEqual([]);
    });

    it('should list all event names', () => {
      pluginManager.on('event1', jest.fn());
      pluginManager.on('event2', jest.fn());

      const eventNames = pluginManager.eventNames();
      expect(eventNames).toContain('event1');
      expect(eventNames).toContain('event2');
      expect(eventNames).toHaveLength(2);
    });
  });

  describe('Context Management', () => {
    it('should return initial context', () => {
      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: (api) => {
          expect(api.getContext()).toEqual(mockContext);
        },
      };

      pluginManager.register(plugin);
    });

    it('should update context', () => {
      const newContext = { schema: { title: 'Updated API' } };

      pluginManager.updateContext(newContext);

      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: (api) => {
          expect(api.getContext()).toEqual({ schema: newContext });
        },
      };

      pluginManager.register(plugin);
    });
  });

  describe('Plugin Retrieval', () => {
    it('should get plugin by name', () => {
      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: jest.fn(),
      };

      pluginManager.register(plugin);

      expect(pluginManager.getPlugin(TEST_PLUGIN_NAME)).toBe(plugin);
    });

    it('should return undefined for non-existent plugin', () => {
      expect(pluginManager.getPlugin('non-existent')).toBeUndefined();
    });
  });

  describe('Plugin API Integration', () => {
    it('should allow plugins to emit events', () => {
      const callback = jest.fn();
      pluginManager.on('custom-event', callback);

      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: (api) => {
          api.emit('custom-event', { data: 'test' });
        },
      };

      pluginManager.register(plugin);

      expect(callback).toHaveBeenCalledWith({ data: 'test' });
    });

    it('should allow plugins to listen to events', () => {
      const callback = jest.fn();

      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: (api) => {
          api.on('external-event', callback);
        },
      };

      pluginManager.register(plugin);
      pluginManager.emit('external-event', { message: 'hello' });

      expect(callback).toHaveBeenCalledWith({ message: 'hello' });
    });

    it('should allow plugins to unsubscribe from events', () => {
      const callback = jest.fn();

      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: (api) => {
          api.on(TEST_EVENT, callback);
          api.off(TEST_EVENT, callback);
        },
      };

      pluginManager.register(plugin);
      pluginManager.emit(TEST_EVENT, { data: 'test' });

      expect(callback).not.toHaveBeenCalled();
    });
  });
});
