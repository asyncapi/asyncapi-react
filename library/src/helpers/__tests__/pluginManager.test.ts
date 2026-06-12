import { PluginManager } from '../pluginManager';
import {
  AsyncApiPlugin,
  PluginSlot,
  PluginAPI,
  PluginErrorPayload,
} from '../../types';
import { PLUGIN_EVENT_ERROR, PLUGIN_EVENT_SPEC_LOADED } from '../../constants';

const TEST_PLUGIN_NAME = 'test-plugin';
const TEST_EVENT = 'test-event';
const UPDATED_API_TITLE = 'Updated API';

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
    it('should register a plugin', async () => {
      const installMock = jest.fn();
      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: installMock,
      };

      await pluginManager.register(plugin);

      expect(installMock).toHaveBeenCalled();
      expect(pluginManager.getPlugin(TEST_PLUGIN_NAME)).toBe(plugin);
    });

    it('should call plugin install with correct API', async () => {
      let capturedAPI: PluginAPI | null = null;
      const plugin: AsyncApiPlugin = {
        name: 'test-plugin',
        version: '1.0.0',
        install: (api) => {
          capturedAPI = api;
        },
      };

      await pluginManager.register(plugin);

      expect(capturedAPI).toBeDefined();
      expect(capturedAPI).toHaveProperty('registerComponent');
      expect(capturedAPI).toHaveProperty('on');
      expect(capturedAPI).toHaveProperty('off');
      expect(capturedAPI).toHaveProperty('emit');
      expect(capturedAPI).toHaveProperty('getContext');
      expect(capturedAPI).toHaveProperty('onSpecLoaded');
    });

    it('should not call install twice for duplicate plugin', async () => {
      const installMock = jest.fn();
      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: installMock,
      };

      await pluginManager.register(plugin);
      await pluginManager.register(plugin);

      expect(installMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('Plugin Unregistration', () => {
    it('should unregister a plugin', async () => {
      const installMock = jest.fn();
      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: installMock,
      };

      await pluginManager.register(plugin);
      pluginManager.unregister(TEST_PLUGIN_NAME);

      expect(pluginManager.getPlugin(TEST_PLUGIN_NAME)).toBeUndefined();
    });

    it('should remove plugin components when unregistering', async () => {
      const TestComponent = () => null;
      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: (api) => {
          api.registerComponent(PluginSlot.OPERATION, TestComponent);
        },
      };

      await pluginManager.register(plugin);
      expect(
        pluginManager.getComponentsForSlot(PluginSlot.OPERATION),
      ).toHaveLength(1);

      pluginManager.unregister(TEST_PLUGIN_NAME);
      expect(
        pluginManager.getComponentsForSlot(PluginSlot.OPERATION),
      ).toHaveLength(0);
    });

    it('should only remove components from the unregistered plugin', async () => {
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

      await pluginManager.register(plugin1);
      await pluginManager.register(plugin2);
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

    it('should remove all components from a plugin in the same slot', async () => {
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

      await pluginManager.register(plugin);
      expect(
        pluginManager.getComponentsForSlot(PluginSlot.OPERATION),
      ).toHaveLength(2);

      pluginManager.unregister(TEST_PLUGIN_NAME);
      expect(
        pluginManager.getComponentsForSlot(PluginSlot.OPERATION),
      ).toHaveLength(0);
    });
  });

  describe('Component Registration', () => {
    it('should register component in a slot', async () => {
      const TestComponent = () => null;
      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: (api) => {
          api.registerComponent(PluginSlot.OPERATION, TestComponent);
        },
      };

      await pluginManager.register(plugin);

      const components = pluginManager.getComponentsForSlot(
        PluginSlot.OPERATION,
      );
      expect(components).toHaveLength(1);
      expect(components[0]).toBe(TestComponent);
    });

    it('should register multiple components in the same slot', async () => {
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

      await pluginManager.register(plugin);

      const components = pluginManager.getComponentsForSlot(
        PluginSlot.OPERATION,
      );
      expect(components).toHaveLength(2);
    });

    it('should use default priority of 100for components without priority', async () => {
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

      await pluginManager.register(plugin);

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
    it('should return initial context', async () => {
      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: (api) => {
          expect(api.getContext()).toEqual(mockContext);
        },
      };

      await pluginManager.register(plugin);
    });

    it('should update context', async () => {
      const newContext = { schema: { title: UPDATED_API_TITLE } };

      pluginManager.updateContext(newContext);

      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: (api) => {
          expect(api.getContext()).toEqual(newContext);
        },
      };

      await pluginManager.register(plugin);
    });

    it('should emit specLoaded when context includes a schema', () => {
      const callback = jest.fn();
      const newSchema = { title: UPDATED_API_TITLE };

      pluginManager.on(PLUGIN_EVENT_SPEC_LOADED, callback);
      pluginManager.updateContext({ schema: newSchema });

      expect(callback).toHaveBeenCalledWith(newSchema);
    });

    it('should not call onSpecLoaded immediately when no schema is loaded', async () => {
      const freshManager = new PluginManager({});
      const specLoadedCallback = jest.fn();
      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: (api) => {
          api.onSpecLoaded(specLoadedCallback);
        },
      };

      await freshManager.register(plugin);

      expect(specLoadedCallback).not.toHaveBeenCalled();
    });

    it('should call onSpecLoaded immediately when a schema is already loaded', async () => {
      const specLoadedCallback = jest.fn();
      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: (api) => {
          api.onSpecLoaded(specLoadedCallback);
        },
      };

      await pluginManager.register(plugin);

      expect(specLoadedCallback).toHaveBeenCalledWith(mockContext.schema);
    });

    it('should call onSpecLoaded when the spec loads after registration', async () => {
      const specLoadedCallback = jest.fn();
      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: (api) => {
          api.onSpecLoaded(specLoadedCallback);
        },
      };
      const newSchema = { title: UPDATED_API_TITLE };

      await pluginManager.register(plugin);
      specLoadedCallback.mockClear();
      pluginManager.updateContext({ schema: newSchema });

      expect(specLoadedCallback).toHaveBeenCalledWith(newSchema);
    });
  });

  describe('Plugin Retrieval', () => {
    it('should get plugin by name', async () => {
      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: jest.fn(),
      };

      await pluginManager.register(plugin);

      expect(pluginManager.getPlugin(TEST_PLUGIN_NAME)).toBe(plugin);
    });

    it('should return undefined for non-existent plugin', () => {
      expect(pluginManager.getPlugin('non-existent')).toBeUndefined();
    });
  });

  describe('Plugin API Integration', () => {
    it('should allow plugins to emit events', async () => {
      const callback = jest.fn();
      pluginManager.on('custom-event', callback);

      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: (api) => {
          api.emit('custom-event', { data: 'test' });
        },
      };

      await pluginManager.register(plugin);

      expect(callback).toHaveBeenCalledWith({ data: 'test' });
    });

    it('should allow plugins to listen to events', async () => {
      const callback = jest.fn();

      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: (api) => {
          api.on('external-event', callback);
        },
      };

      await pluginManager.register(plugin);
      pluginManager.emit('external-event', { message: 'hello' });

      expect(callback).toHaveBeenCalledWith({ message: 'hello' });
    });

    it('should allow plugins to unsubscribe from events', async () => {
      const callback = jest.fn();

      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: (api) => {
          api.on(TEST_EVENT, callback);
          api.off(TEST_EVENT, callback);
        },
      };

      await pluginManager.register(plugin);
      pluginManager.emit(TEST_EVENT, { data: 'test' });

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('Plugin Error handling tests', () => {
    const BAD_PLUGIN_NAME = 'bad-plugin';
    const GOOD_PLUGIN_NAME = 'good-plugin';
    const INSTALL_FAILED_MESSAGE = 'install failed';
    let consoleErrorSpy: jest.SpyInstance;

    // PluginManager.register() logs install failures via console.error by design.
    // These tests intentionally trigger that path, which would otherwise print
    // red "● Console" noise in Jest output even though the assertions pass.
    // The spy still records calls so we can assert logging in the dedicated test.
    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    it('should continue working when install() throws', async () => {
      const badPlugin: AsyncApiPlugin = {
        name: BAD_PLUGIN_NAME,
        version: '1.0.0',
        install: () => {
          throw new Error(INSTALL_FAILED_MESSAGE);
        },
      };

      const goodPlugin: AsyncApiPlugin = {
        name: GOOD_PLUGIN_NAME,
        version: '1.0.0',
        install: jest.fn(),
      };

      expect(await pluginManager.register(badPlugin)).toBe(false);
      expect(await pluginManager.register(goodPlugin)).toBe(true);
    });

    it('should not store a plugin when install() throws', async () => {
      const badPlugin: AsyncApiPlugin = {
        name: BAD_PLUGIN_NAME,
        version: '1.0.0',
        install: () => {
          throw new Error(INSTALL_FAILED_MESSAGE);
        },
      };

      await pluginManager.register(badPlugin);

      expect(pluginManager.getPlugin(BAD_PLUGIN_NAME)).toBeUndefined();
    });

    it('should register a healthy plugin after a failed one', async () => {
      const badPlugin: AsyncApiPlugin = {
        name: BAD_PLUGIN_NAME,
        version: '1.0.0',
        install: () => {
          throw new Error(INSTALL_FAILED_MESSAGE);
        },
      };

      const goodPlugin: AsyncApiPlugin = {
        name: GOOD_PLUGIN_NAME,
        version: '1.0.0',
        install: jest.fn(),
      };

      await pluginManager.register(badPlugin);
      await pluginManager.register(goodPlugin);

      expect(pluginManager.listPlugins()).toEqual([
        { name: GOOD_PLUGIN_NAME, version: '1.0.0' },
      ]);
    });

    it('should emit plugin:error with expected fields on install failure', async () => {
      const errorCallback = jest.fn();
      const installError = new Error(INSTALL_FAILED_MESSAGE);

      pluginManager.on(PLUGIN_EVENT_ERROR, errorCallback);

      const badPlugin: AsyncApiPlugin = {
        name: BAD_PLUGIN_NAME,
        version: '1.0.0',
        install: () => {
          throw installError;
        },
      };

      await pluginManager.register(badPlugin);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `Failed to register plugin ${BAD_PLUGIN_NAME}:`,
        installError,
      );
      expect(errorCallback).toHaveBeenCalledTimes(1);
      expect(errorCallback).toHaveBeenCalledWith(
        expect.objectContaining({
          pluginName: BAD_PLUGIN_NAME,
          message: INSTALL_FAILED_MESSAGE,
        }),
      );
      const [[payload]] = errorCallback.mock.calls as [PluginErrorPayload][];
      expect(payload.timestamp).toBeInstanceOf(Date);
    });

    it('should register components when async install resolves', async () => {
      const TestComponent = () => null;
      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: async (api) => {
          await Promise.resolve();
          api.registerComponent(PluginSlot.OPERATION, TestComponent);
        },
      };

      await pluginManager.register(plugin);

      expect(
        pluginManager.getComponentsForSlot(PluginSlot.OPERATION),
      ).toHaveLength(1);
      expect(pluginManager.getPlugin(TEST_PLUGIN_NAME)).toBe(plugin);
    });

    it('should remove components registered before install() throws', async () => {
      const TestComponent = () => null;
      const badPlugin: AsyncApiPlugin = {
        name: BAD_PLUGIN_NAME,
        version: '1.0.0',
        install: (api) => {
          api.registerComponent(PluginSlot.OPERATION, TestComponent);
          throw new Error(INSTALL_FAILED_MESSAGE);
        },
      };

      expect(await pluginManager.register(badPlugin)).toBe(false);
      expect(pluginManager.getPlugin(BAD_PLUGIN_NAME)).toBeUndefined();
      expect(
        pluginManager.getComponentsForSlot(PluginSlot.OPERATION),
      ).toHaveLength(0);
    });

    it('should handle rejected async install()', async () => {
      const errorCallback = jest.fn();
      pluginManager.on(PLUGIN_EVENT_ERROR, errorCallback);

      const badPlugin: AsyncApiPlugin = {
        name: BAD_PLUGIN_NAME,
        version: '1.0.0',
        install: async () => {
          throw new Error(INSTALL_FAILED_MESSAGE);
        },
      };

      expect(await pluginManager.register(badPlugin)).toBe(false);
      expect(pluginManager.getPlugin(BAD_PLUGIN_NAME)).toBeUndefined();
      expect(errorCallback).toHaveBeenCalledWith(
        expect.objectContaining({
          pluginName: BAD_PLUGIN_NAME,
          message: INSTALL_FAILED_MESSAGE,
        }),
      );
    });

    it('should not call install twice while first install is pending', async () => {
      let resolveInstall!: () => void;
      const installPromise = new Promise<void>((resolve) => {
        resolveInstall = resolve;
      });
      const installMock = jest.fn(() => installPromise);
      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: installMock,
      };

      const firstRegister = pluginManager.register(plugin);
      const secondResult = await pluginManager.register(plugin);

      expect(installMock).toHaveBeenCalledTimes(1);
      expect(secondResult).toBe(false);

      resolveInstall();
      expect(await firstRegister).toBe(true);
    });

    it('should not store a plugin when unregistered during async install', async () => {
      const TestComponent = () => null;
      let resolveInstall!: () => void;
      const installPromise = new Promise<void>((resolve) => {
        resolveInstall = resolve;
      });
      const plugin: AsyncApiPlugin = {
        name: TEST_PLUGIN_NAME,
        version: '1.0.0',
        install: async (api) => {
          api.registerComponent(PluginSlot.OPERATION, TestComponent);
          await installPromise;
        },
      };

      const registerPromise = pluginManager.register(plugin);
      pluginManager.unregister(TEST_PLUGIN_NAME);
      resolveInstall();

      expect(await registerPromise).toBe(false);
      expect(pluginManager.getPlugin(TEST_PLUGIN_NAME)).toBeUndefined();
      expect(
        pluginManager.getComponentsForSlot(PluginSlot.OPERATION),
      ).toHaveLength(0);
    });

    it('should continue dispatching when one listener throws', () => {
      const throwingCallback = jest.fn(() => {
        throw new Error('listener failed');
      });
      const healthyCallback = jest.fn();

      pluginManager.on(TEST_EVENT, throwingCallback);
      pluginManager.on(TEST_EVENT, healthyCallback);
      pluginManager.emit(TEST_EVENT, { message: 'test' });

      expect(throwingCallback).toHaveBeenCalled();
      expect(healthyCallback).toHaveBeenCalledWith({ message: 'test' });
    });
  });
});
