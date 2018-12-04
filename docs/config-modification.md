# Configuration Modification

## Overview

Learn how to use various configuration options available in `ConfigInterface`.

## Definition

See the definition of the object that you must pass to probs to modify the component configuration:

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
    disableDefaultTheme?: boolean #TODO: Explain the difference between the example and the source code.
}
```

   - **show?: Partial<ShowConfig>**

       This field contains configuration responsible for rendering specific parts of the AsyncApi component.
       All fields are set to `true` by default.

   - **disableDefaultTheme?: boolean**
   
      This field informs whether the forwarded [`ThemeInterface`](../library/src/theme/theme.ts#L5) should be concatenated with the [default theme](../library/src/theme/default.ts) or if the AsyncApi component should consider only the forwarded one.
     This field is set to `false` by default.

     > **NOTE:** When you set this flag to `true`, you must provide definitions of all styles.

## Examples

See exemplary component configuration in JavaScript and TypeScript.

### JavaScript

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

### TypeScript

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
