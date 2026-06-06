# Plugin System

The AsyncAPI React component supports a flexible plugin system to extend and customize your documentation.

## Usage

### Static Registration (via props)

Use this when you know all plugins upfront:

```typescript
import {
  AsyncApiPlugin,
  PluginAPI,
  PluginSlot,
  PLUGIN_EVENT_ERROR,
  PLUGIN_EVENT_READY,
  PluginErrorPayload,
} from '@asyncapi/react-component';

const myPlugin: AsyncApiPlugin = {
  name: 'my-plugin',
  version: '1.0.0',
  install(api: PluginAPI) {
    api.registerComponent(PluginSlot.OPERATION, MyComponent);
    api.onSpecLoaded((spec) => console.log('Spec loaded:', spec));
  }
};

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

function MyApp() {
  const [pluginManager, setPluginManager] = useState(null);

  const handleEnablePlugin = () => {
    const registered = pluginManager?.register(myPlugin);
    if (!registered) {
      console.warn('Plugin was not registered');
    }
  };

  const handleDisablePlugin = () => {
    pluginManager?.unregister('my-plugin');
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

`PluginManager.register()` returns `true` when a plugin installs successfully and `false` when the plugin is already registered or `install()` throws.

## Plugin Structure

```typescript
interface AsyncApiPlugin {
  name: string;              // Unique identifier
  version: string;           // Semantic version
  description?: string;      // Optional description
  install(api: PluginAPI): void;
}
```

## PluginAPI Methods

| Method | Purpose |
|--------|---------|
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
| `PLUGIN_EVENT_ERROR` | `plugin:error` | Emitted when `install()` throws |
| `PLUGIN_EVENT_SPEC_LOADED` | `specLoaded` | Emitted when the spec loads or updates (plugin API only) |

`PLUGIN_EVENT_READY` and `PLUGIN_EVENT_ERROR` are forwarded to the `onPluginEvent` prop on `<AsyncApi>`. `PLUGIN_EVENT_SPEC_LOADED` is used internally by `api.onSpecLoaded()` and is not forwarded to `onPluginEvent`.

### `onPluginEvent` payload

**`plugin:ready`**

```typescript
{
  pluginName: string;
  message: string;
  timestamp: number;
}
```

**`plugin:error`**

```typescript
interface PluginErrorPayload {
  pluginName: string;
  message: string;
  timestamp: number;
}
```

If `install()` throws an error, the failing plugin is not stored and other plugins continue to register normally. 

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

```typescript
interface ComponentSlotProps {
  context: PluginContext;
  onClose?: () => void;
}

const MyComponent: React.FC<ComponentSlotProps> = ({ context, onClose }) => (
  <div>Custom content here</div>
);
```

## Available Slots

- `PluginSlot.OPERATION` - Renders within operation sections
- `PluginSlot.INFO` - Renders within info section

Slots render only when at least one plugin has registered a component for that slot.
