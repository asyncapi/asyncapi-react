# Configuration Modification

## Overview

Learn how to use various configuration options available in `ConfigInterface`.

## Definition

See the definition of the object that you must pass to props to modify the component configuration:

```ts
interface ConfigInterface {
  schemaID?: string;
  show?: {
    info?: boolean;
    servers?: boolean;
    operations?: boolean;
    messages?: boolean;
    sidebar?: boolean;
    errors?: boolean;
  };
  parserOptions?: ParserOptions;
}
```

- **schemaID?: string**

  This field contains a schema name.
  This field is set to `asyncapi` by default.

- **show?: Partial<ShowConfig>**

  This field contains configuration responsible for rendering specific parts of the AsyncAPI component.
  All except the `sidebar` fields are set to `true` by default.

- **parserOptions?: ParserOptions**

  This field contains configuration for [`asyncapi-parser`](https://github.com/asyncapi/parser). See available options [here](https://github.com/asyncapi/parser-js/blob/master/API.md#module_@asyncapi/parser..parse).
  This field is set to `null` by default.

## Examples

See exemplary component configuration in TypeScript and JavaScript.

### TypeScript

```tsx
import * as React from "react";
import { render } from "react-dom";
import AsyncApiComponent, { ConfigInterface } from "asyncapi-react";

import { schema } from "./mock";

const config: Partial<ConfigInterface> = {
  schemaID: 'custom-spec',
  show: {
    operations: false,
    errors: false,
  },
};

const App = () => <AsyncApiComponent schema={schema} config={config} />;

render(<App />, document.getElementById("root"));
```

### JavaScript

```jsx
import * as React from "react";
import { render } from "react-dom";
import AsyncApiComponent from "asyncapi-react";

import { schema } from "./mock";

const config = {
  schemaID: 'custom-spec',
  show: {
    operations: false,
    errors: false,
  },
};

const App = () => <AsyncApiComponent schema={schema} config={config} />;

render(<App />, document.getElementById("root"));
```

In the above examples, after concatenation with the default configuration, the resulting configuration looks as follows:

```js
{
  schemaID: 'custom-spec',
  show: {
    info: true,
    servers: true,
    operations: false,
    messages: true,
    sidebar: false,
    errors: false,
  },
}
```
