# Using the Component Without Parser

This guide explains how to use the AsyncAPI React component without bundling the parser, and how to import Parser types for TypeScript projects. This approach is ideal when you want to reduce bundle size or when you already have a parsed AsyncAPI document.

## Why Use the Component Without Parser?

The AsyncAPI React component comes with the `@asyncapi/parser` bundled by default. While convenient, this adds approximately 550kb to your final bundle. If you already have a parsed AsyncAPI document (for example, from a server side render or an API response), you can use the lighter version of the component that excludes the parser.

Benefits of this approach:

1. **Smaller bundle size**: The component without parser weighs around 150kb compared to 700kb with the parser included.
2. **Faster page loads**: Less JavaScript means quicker initial load times for your users.
3. **Server side parsing**: You can validate and parse the specification during build time, catching errors before they reach your users.

## Installation

Install the required packages:

```sh
npm install --save @asyncapi/react-component @asyncapi/parser
```

The `@asyncapi/parser` package is needed for parsing on the server side and for accessing TypeScript types.

## Importing the Component Without Parser

The package provides a special export that excludes the parser:

```jsx
// Import the component without the parser bundled
import { AsyncApiComponentWP } from "@asyncapi/react-component";

// Or for standalone bundle usage
// Use: @asyncapi/react-component/browser/standalone/without-parser.js
```

## Importing Parser Types

When working with TypeScript, you will want proper type definitions for your AsyncAPI documents. The `@asyncapi/parser` package exports all the necessary types:

```typescript
import {
  AsyncAPIDocumentInterface,
  ChannelInterface,
  OperationInterface,
  MessageInterface,
  SchemaInterface,
  ServerInterface,
  InfoInterface,
} from "@asyncapi/parser";
```

These types help you work with parsed AsyncAPI documents in a type safe manner without needing to include the parser logic in your client bundle.

## Complete Example

Here is a full example showing how to parse an AsyncAPI document on the server and render it on the client:

### Server Side (Node.js or Build Time)

```typescript
import { Parser } from "@asyncapi/parser";
import type { AsyncAPIDocumentInterface } from "@asyncapi/parser";

const parser = new Parser();

export async function parseAsyncAPIDocument(
  schemaContent: string
): Promise<string> {
  const { document, diagnostics } = await parser.parse(schemaContent);

  // Check for errors
  const errors = diagnostics.filter((d) => d.severity === 0);
  if (errors.length > 0) {
    throw new Error(`Parsing failed: ${errors[0].message}`);
  }

  if (!document) {
    throw new Error("Failed to parse AsyncAPI document");
  }

  // Convert to JSON string for client side hydration
  // Note: Circular references are not supported in JSON.stringify
  return JSON.stringify(document.json());
}
```

### Client Side (React)

```tsx
import React from "react";
import { AsyncApiComponentWP } from "@asyncapi/react-component";
import "@asyncapi/react-component/styles/default.min.css";

interface Props {
  parsedSchema: string; // JSON stringified AsyncAPI document
}

export function AsyncAPIDocumentation({ parsedSchema }: Props) {
  const config = {
    show: {
      sidebar: true,
      operations: true,
      errors: true,
    },
  };

  return <AsyncApiComponentWP schema={parsedSchema} config={config} />;
}
```

## Using Types for Custom Components

If you are building custom components that work with AsyncAPI data, you can use the parser types for better developer experience:

```typescript
import type {
  AsyncAPIDocumentInterface,
  ChannelInterface,
  OperationInterface,
} from "@asyncapi/parser";

interface ChannelListProps {
  document: AsyncAPIDocumentInterface;
}

function ChannelList({ document }: ChannelListProps) {
  const channels = document.channels();

  return (
    <ul>
      {channels.all().map((channel: ChannelInterface) => (
        <li key={channel.id()}>
          <strong>{channel.address()}</strong>
          {channel.operations().all().map((op: OperationInterface) => (
            <span key={op.id()}> ({op.action()})</span>
          ))}
        </li>
      ))}
    </ul>
  );
}
```

## Common Types Reference

Here are the most commonly used types from `@asyncapi/parser`:

| Type | Description |
|------|-------------|
| `AsyncAPIDocumentInterface` | The root document interface representing a parsed AsyncAPI specification |
| `InfoInterface` | Contains API metadata like title, version, and description |
| `ServerInterface` | Represents a server definition in the specification |
| `ChannelInterface` | Represents a channel (topic, queue, etc.) in the specification |
| `OperationInterface` | Represents publish or subscribe operations |
| `MessageInterface` | Represents message definitions |
| `SchemaInterface` | Represents JSON Schema definitions for payloads |
| `TagInterface` | Represents tags used for grouping |
| `BindingsInterface` | Represents protocol specific bindings |

## Framework Specific Examples

### NextJS with Static Generation

See the [NextJS usage guide](./nextjs.md#usage-with-ssrssg-static-documentation) for a complete example of parsing at build time and rendering without the parser.

### HTML Standalone Bundle

For plain HTML pages, use the standalone bundle without parser:

```html
<!DOCTYPE html>
<html>
  <head>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@asyncapi/react-component@latest/styles/default.min.css"
    />
  </head>
  <body>
    <div id="asyncapi"></div>

    <script src="https://unpkg.com/@asyncapi/react-component@latest/browser/standalone/without-parser.js"></script>
    <script>
      // Your pre-parsed AsyncAPI document as a JavaScript object
      const parsedDocument = {
        asyncapi: "3.0.0",
        info: {
          title: "My API",
          version: "1.0.0",
        },
        channels: {
          // ... your channels
        },
      };

      AsyncApiStandalone.render(
        { schema: parsedDocument },
        document.getElementById("asyncapi")
      );
    </script>
  </body>
</html>
```

## Troubleshooting

### Type Errors with Parsed Documents

If you encounter type errors when passing a parsed document to the component, ensure you are using the correct schema format. The component accepts:

1. A JSON string of the parsed document
2. An `AsyncAPIDocumentInterface` object from the parser
3. A plain JavaScript object matching the AsyncAPI specification

### Circular Reference Errors

When stringifying parsed documents, you may encounter circular reference errors. The AsyncAPI parser handles references internally, so use `document.json()` to get a serializable version:

```typescript
const { document } = await parser.parse(schema);
const serializable = document.json(); // Safe for JSON.stringify
```

## Related Documentation

For more information, see:

1. [Configuration options](../configuration/config-modification.md) for customizing the component
2. [NextJS usage](./nextjs.md) for server side rendering examples
3. [Standalone bundle](./standalone-bundle.md) for non React environments
4. [AsyncAPI Parser documentation](https://github.com/asyncapi/parser-js) for parser API details