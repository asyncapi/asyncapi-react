# Plugin System

The AsyncAPI React component supports a flexible plugin system to extend and customize your documentation.

## Usage

Define your plugin in a module (for example, `myPlugin.ts`):

```typescript
import {
  AsyncApiPlugin,
  PluginAPI,
  PluginSlot,
} from '@asyncapi/react-component';

export const myPlugin: AsyncApiPlugin = {
  name: 'my-plugin',
  version: '1.0.0',
  install(api: PluginAPI) {
    api.registerComponent(PluginSlot.OPERATION, MyComponent);
    api.onSpecLoaded((spec) => console.log('Spec loaded:', spec));
  }
};
```

### Async install

`install()` may be synchronous or async. Use an async `install` when you need to fetch configuration or perform other asynchronous setup before registering components:

```typescript
export const asyncPlugin: AsyncApiPlugin = {
  name: 'async-plugin',
  version: '1.0.0',
  async install(api: PluginAPI) {
    const result = await fetch('/plugin-data', { signal: api.signal }).then(
      (res) => res.json(),
    );
    if (!result.ok) {
      throw new Error('plugin configuration failed');
    }
    api.registerComponent(PluginSlot.INFO, MyInfoComponent);
  },
};
```

If `install()` throws or rejects, the plugin is not registered and a `plugin:error` event is emitted.

### Static Registration (via props)

Use this when you know all plugins upfront:

```typescript
import {
  PLUGIN_EVENT_ERROR,
  PLUGIN_EVENT_READY,
  PluginErrorPayload,
} from '@asyncapi/react-component';
import { myPlugin } from './myPlugin';

<AsyncApi
  schema={mySchema}
  plugins={[myPlugin]}
  onPluginEvent={(eventName, data) => {
    if (eventName === PLUGIN_EVENT_ERROR) {
      const error = data as PluginErrorPayload;
      console.error('Plugin failed:', error.pluginName, error.message);
      return;
    }
    console.log('Plugin event:', eventName, data);
  }}
/>
```

### Dynamic Registration

Use this when you need to add/remove plugins at runtime:

```typescript
import { useState } from 'react';
import { myPlugin } from './myPlugin';

function MyApp() {
  const [pluginManager, setPluginManager] = useState(null);

  const handleEnablePlugin = async () => {
    const registered = await pluginManager?.register(myPlugin);
    if (!registered) {
      console.warn('Plugin was not registered');
    }
  };

  const handleDisablePlugin = async () => {
    await pluginManager?.unregister('my-plugin');
  };

  return (
    <>
      <button onClick={handleEnablePlugin}>Enable Plugin</button>
      <button onClick={handleDisablePlugin}>Disable Plugin</button>
      <AsyncApi
        schema={mySchema}
        onPluginManagerReady={(pm) => setPluginManager(pm)}
      />
    </>
  );
}
```

`PluginManager.register()` returns a `Promise<boolean>` that resolves to `true` when a plugin installs successfully and `false` when the plugin is already registered or `install()` throws or rejects.

`unregister()` returns a promise that resolves after the plugin's components and listeners are removed and its `uninstall()` hook finishes. `destroy()` returns a promise that resolves after every plugin finishes teardown. Errors thrown by `uninstall()` are logged and emitted as `PLUGIN_EVENT_ERROR` rather than propagating.

## Plugin Structure

```typescript
interface AsyncApiPlugin {
  name: string;              // Unique identifier
  version: string;           // Semantic version
  description?: string;      // Optional description
  install(api: PluginAPI): void | Promise<void>;
  uninstall?(api: PluginAPI): void | Promise<void>;  // Optional teardown
}
```

### Teardown

`uninstall()` receives the same `PluginAPI` object passed to `install()`, and runs when:

- the plugin is removed with `pluginManager.unregister(name)`,
- the plugin disappears from the `plugins` prop,
- `<AsyncApi>` unmounts.

Use it to release anything `install()` acquired: open connections, timers, DOM listeners. Components the plugin registered are removed first, and listeners added through `api.on()` are removed for it.

`api.signal` is aborted as soon as installation is cancelled or teardown begins. Pass it to APIs such as `fetch()` or subscribe to its `abort` event to stop pending work promptly.

```typescript
const createMyPlugin = (): AsyncApiPlugin => {
  let socket: WebSocket | undefined;

  return {
    name: 'my-plugin',
    version: '1.0.0',
    install(api) {
      socket = new WebSocket('wss://example.com');
      api.registerComponent(PluginSlot.OPERATION, MyComponent);
    },
    uninstall() {
      socket?.close();
    },
  };
};
```

## PluginAPI Methods

| Method | Purpose |
|--------|---------|
| `signal` | An `AbortSignal` that fires when installation is cancelled or teardown begins |
| `registerComponent(slot, component, options?)` | Register a React component in a slot. `options`: `{ priority?: number; label?: string }` |
| `onSpecLoaded(callback)` | Called when the AsyncAPI spec loads or changes. If a spec is already loaded when the plugin registers, the callback runs immediately with the current schema. |
| `getContext()` | Get current plugin context with schema |
| `on(eventName, callback)` | Subscribe to events |
| `off(eventName, callback)` | Unsubscribe from events |
| `emit(eventName, data)` | Emit custom events |

## Lifecycle Events

The library exports named constants for plugin lifecycle events:

| Constant | Event name | Description |
|----------|------------|-------------|
| `PLUGIN_EVENT_READY` | `plugin:ready` | Emitted after a plugin registers successfully |
| `PLUGIN_EVENT_ERROR` | `plugin:error` | Emitted when `install()` or `uninstall()` throws or rejects |
| `PLUGIN_EVENT_SPEC_LOADED` | `specLoaded` | Emitted when the spec loads or updates (plugin API only) |

`PLUGIN_EVENT_READY` and `PLUGIN_EVENT_ERROR` are forwarded to the `onPluginEvent` prop on `<AsyncApi>`. `PLUGIN_EVENT_SPEC_LOADED` is used internally by `api.onSpecLoaded()` and is not forwarded to `onPluginEvent`.

### `onPluginEvent` payload

**`plugin:ready`**

```typescript
{
  pluginName: string;
  message: string;
  timestamp: string;
}
```

**`plugin:error`**

```typescript
interface PluginErrorPayload {
  pluginName: string;
  message: string;
  timestamp: string;
}
```

If `install()` throws or rejects, the failing plugin is not stored and other plugins continue to register normally. 

> **Important:**  
> If an event listener throws during dispatch, including `onPluginEvent`, the error is logged to the console and dispatch continues for the remaining listeners.
>
> These runtime listener failures are **not emitted as `plugin:error`**. That event is reserved for `install()` failures to avoid infinite recursion if an error handler itself throws.

## AsyncApi Props

| Prop | Type | Description |
|------|------|-------------|
| `plugins` | `AsyncApiPlugin[]` | Plugins to register on mount |
| `onPluginEvent` | `(eventName: string, data: unknown) => void` | Receives `plugin:ready` and `plugin:error` lifecycle events |
| `onPluginManagerReady` | `(pluginManager: PluginManager) => void` | Called once with the plugin manager instance for dynamic registration |

## Component Props

Slot components receive a `context` typed for the slot they are registered in. Pass the slot to `ComponentSlotProps` to get full typing without casts:

```typescript
import { ComponentSlotProps, PluginSlot } from '@asyncapi/react-component';

const MyOperationComponent: React.FC<ComponentSlotProps<PluginSlot.OPERATION>> = ({
  context,
}) => {
  const servers = context.channel.servers().all();
  return (
    <div>
      {context.type} {context.channelName} on {servers.map((s) => s.url()).join(', ')}
    </div>
  );
};

api.registerComponent(PluginSlot.OPERATION, MyOperationComponent);
```

`registerComponent` infers the slot, so registering a component in the wrong slot is a type error.

Every slot context includes:

| Field | Type | Description |
|-------|------|-------------|
| `slot` | `PluginSlot` | The slot being rendered; use it to narrow a `SlotContext` union |
| `document` | `AsyncAPIDocumentInterface` | The full parsed AsyncAPI document |
| `schema` | `PropsSchema` | **Deprecated.** Use the typed fields below |

## Available Slots

| Slot | Renders | Context type | Extra context fields |
|------|---------|--------------|----------------------|
| `PluginSlot.OPERATION` | Within each operation section | `OperationSlotContext` | `operation: OperationInterface`, `channel: ChannelInterface`, `channelName: string`, `type: PayloadType` |
| `PluginSlot.INFO` | Within the info section | `InfoSlotContext` | `info: InfoInterface` |

Slots render only when at least one plugin has registered a component for that slot.
