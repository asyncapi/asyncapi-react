# Configuration

## Overview

This file describe what options are available in `ConfigInterface`.

## Definition

``` ts
interface ConfigInterface {
    show?: {
        info?: boolean,
        security?: boolean,
        servers?: boolean,
        topics?: boolean,
        stream?: boolean,
        events?: boolean,
        messages?: boolean,
        schemas?: boolean
    },
    disableDefaultTheme?: boolean
}
```

#### `show?: Partial<ShowConfig>`

This field contains configuration about what specific parts of the `AsyncApi` component will be displayed.

By default all fields are true.

#### `disableDefaultTheme?: boolean`

This field informs whether the forwarded [`ThemeInterface`](../library/src/theme/theme.ts#L5) should be concatenated with the [default](../library/src/theme/default.ts), or `AsyncApi` component should consider only the forwarded one.

By default this field is false.

> **NOTE:** By setting this flag to true, remember that you should provide definitions of all styles.

## Examples

#### JavaScript

``` jsx
import * as React from "react";
import { render } from "react-dom";
import AsyncApiComponent from "asyncapi-react";

import { schema } from "./mock";

const config = {
  show: {
    security: false,
    schemas: false,
  },
  disableDefaultTheme: true
}

const App = () => (
  <AsyncApiComponent schema={schema} config={config} />
);

render(<App />, document.getElementById("root"));
```

#### TypeScript

``` tsx
import * as React from "react";
import { render } from "react-dom";
import AsyncApiComponent, { ConfigInterface } from "asyncapi-react";

import { schema } from "./mock";

const config: Partial<ConfigInterface> = {
  show: {
    security: false,
    schemas: false,
  },
  disableDefaultTheme: true
}

const App = () => (
  <AsyncApiComponent schema={schema} config={config} />
);

render(<App />, document.getElementById("root"));
```

In the above examples, after concatenation with the default configuration, the resulting configuration will look like:

``` js
{
    show: {
        info: true,
        security: false,
        servers: true,
        topics: true,
        stream: true,
        events: true,
        messages: true,
        schemas: false
    },
    disableDefaultTheme: true
}
```
