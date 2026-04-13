# @asyncapi/react-component (No-Parser Bundle)

## What is this?

This is the **no-parser** distribution of `@asyncapi/react-component`. It provides the same React components and TypeScript types **without bundling the AsyncAPI parser runtime**.

## When to use this?

- You already parse your AsyncAPI document server-side or via a separate library
- You want to minimize client-side bundle size (saves ~200KB+)
- You use SSR/SSG frameworks (Next.js, Remix, etc.) where parsing happens at build time
- You provide pre-parsed schema objects to the component

## Installation

```bash
npm install @asyncapi/react-component
```

The no-parser entry point is available automatically — just import from the correct path (see Usage below).

## Usage

### Basic Example

```tsx
import AsyncApiComponent from '@asyncapi/react-component/lib/without-parser';
import type { AsyncAPIDocumentInterface } from '@asyncapi/parser';

// Your pre-parsed AsyncAPI document (parsed on server or at build time)
const asyncapiDocument: AsyncAPIDocumentInterface = {
  asyncapi: '3.0.0',
  info: { title: 'My API', version: '1.0.0' },
  // ... full document
};

function App() {
  return (
    <AsyncApiComponent
      schema={asyncapiDocument}
      config={{ showErrors: true }}
    />
  );
}
```

### With Next.js (SSR)

```tsx
// app/page.tsx
import AsyncApiComponent from '@asyncapi/react-component/lib/without-parser';
import type { AsyncAPIDocumentInterface } from '@asyncapi/parser';

async function getSchema(): Promise<AsyncAPIDocumentInterface> {
  const res = await fetch('https://example.com/asyncapi.yaml');
  const text = await res.text();
  // Parse on the server using @asyncapi/parser
  const { parse } = await import('@asyncapi/parser');
  const result = await parse(text);
  return result.document;
}

export default async function Page() {
  const schema = await getSchema();
  return <AsyncApiComponent schema={schema} />;
}
```

### Standalone (No React)

```ts
import standalone from '@asyncapi/react-component/lib/standalone-without-parser';
import type { AsyncAPIDocumentInterface } from '@asyncapi/parser';

const schema: AsyncAPIDocumentInterface = { /* ... */ };

// Client-side rendering
standalone.render({
  schema,
  config: {},
}, document.getElementById('app'));
```

## Type Imports

Import types from `@asyncapi/parser` without pulling in the parser runtime:

```ts
// ✅ Correct: types only (tree-shaken by bundler)
import type { AsyncAPIDocumentInterface, BaseModel } from '@asyncapi/parser';

// ❌ Avoid: imports the full parser (~200KB)
import { parse } from '@asyncapi/parser';
```

### Key Types

| Type | Description |
|------|-------------|
| `AsyncAPIDocumentInterface` | Parsed AsyncAPI document object |
| `BaseModel` | Base class for parsed model instances |
| `AsyncApiProps` | Props accepted by `<AsyncApiComponent>` |
| `ConfigInterface` | Configuration options for the component |

## Bundle Size Comparison

| Bundle | Size (min+gzip) |
|--------|----------------|
| Full (with parser) | ~350KB |
| **No-parser** | **~150KB** |
| Savings | **~57%** |

## API Reference

### Props (`AsyncApiProps`)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `schema` | `AsyncAPIDocumentInterface \| object` | _(required)_ | Pre-parsed AsyncAPI document |
| `config` | `ConfigInterface` | `{}` | Component configuration |
| `schemaFormat` | `string?` | Auto-detected | Schema format hint |

See the main [README](../README.md) for full configuration options.
