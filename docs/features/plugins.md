# Plugin System

The AsyncAPI React component supports a flexible plugin system to extend and customize your documentation.

> Currently supports Operation level slots only.

## Usage

### Static Registration (via props)

Use this when you know all plugins upfront:

```typescript
import { AsyncApiPlugin, PluginAPI, PluginSlot } from '@asyncapi/react-component';

const myPlugin: AsyncApiPlugin = {
  name: 'my-plugin',
  version: '1.0.0',
  install(api: PluginAPI) {
    api.registerComponent(PluginSlot.OPERATION, MyComponent);
    api.onSpecLoaded((spec) => console.log('Spec loaded:', spec));
  }
};

<AsyncApi schema={mySchema} plugins={[myPlugin]} />
```

### Dynamic Registration

Use this when you need to add/remove plugins at runtime:

```typescript
import { useState } from 'react';

function MyApp() {
  const [pluginManager, setPluginManager] = useState(null);

  const handleEnablePlugin = () => {
    pluginManager?.register(myPlugin);
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
| `onSpecLoaded(callback)` | Called when AsyncAPI spec loads |
| `getContext()` | Get current plugin context with schema |
| `on(eventName, callback)` | Subscribe to events |
| `off(eventName, callback)` | Unsubscribe from events |
| `emit(eventName, data)` | Emit custom events |

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