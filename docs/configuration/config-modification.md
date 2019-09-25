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
    channels?: boolean;
    servers?: boolean;
    messages?: boolean;
    schemas?: boolean;
  };
  expand?: {
    channels?: {
      root?: boolean;
      elements?: boolean;
    };
    servers?: {
      root?: boolean;
      elements?: boolean;
    };
    messages?: {
      root?: boolean;
      elements?: boolean;
    };
    schemas?: {
      root?: boolean;
      elements?: boolean;
    };
  },
  showErrors?: boolean;
  parserOptions?: ParserOptions;
  pushStateBehavior?: (hash: string) => void;
}
```

- **schemaID?: string**

  This field contains a schema name.
  This field is set to `asyncapi` by default.

- **show?: Partial<ShowConfig>**

  This field contains configuration responsible for rendering specific parts of the AsyncAPI component.
  All fields are set to `true` by default.

- **expand?: Partial<ExpandConfig>**

  This field contains configuration responsible for expanding specific parts of the AsyncAPI component automatically.
  `root` refers to a root component for specific parts of the AsyncAPI component, and `elements` refers to elements inside the `root` component.
  By default, `expand.channels.root` is set to `true`.

- **showErrors?: boolean**

  This field turns on or off the option displaying validation or parsing errors that show at the top of the component.
  This field is set to `true` by default.

- **parserOptions?: ParserOptions**

  This field contains configuration for [`asyncapi-parser`](https://github.com/asyncapi/parser). See available options [here](https://github.com/asyncapi/parser-js/blob/master/API.md#parser).
  This field is set to `null` by default.

- **pushStateBehavior?: (hash: string) => void**

  This field contains custom logic for changing the `hash` parameter in the URL of a page.
  See the default logic [here](../../library/src/store/useChangeHash.ts#L11).

## Examples

See exemplary component configuration in TypeScript and JavaScript.

### TypeScript

```tsx
import * as React from "react";
import { render } from "react-dom";
import AsyncApiComponent, { ConfigInterface } from "asyncapi-react";

import { schema } from "./mock";

const config: Partial<ConfigInterface> = {
  schemaID: 'custom-name',
  show: {
    schemas: false
  },
  showErrors: false
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
  schemaID: 'custom-name',
  show: {
    schemas: false
  },
  showErrors: false
};

const App = () => <AsyncApiComponent schema={schema} config={config} />;

render(<App />, document.getElementById("root"));
```

In the above examples, after concatenation with the default configuration, the resulting configuration looks as follows:

```js
{
  schemaID: 'custom-name',
  show: {
    info: true,
    servers: true,
    channels: true,
    messages: true,
    schemas: false
  },
  showErrors: false
}
```
