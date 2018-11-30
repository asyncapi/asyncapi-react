# AsyncAPI React Component

## Overview

[React](https://reactjs.org/) component for AsyncAPI specification. It allows you to render the documentation of your asynchronous API provided in the AsyncAPI specification format and validate this specification. You can fully restyle the component using your own styles.

## Playground

This repository comes in with a Playground application. Test it to see the component in action and play with it before you use it in your application.

Run this command to install all dependencies:
```
npm install
npm run bootstrap
```

Run this command to start the local server with the Playground application:

```
npm run start
```


## Usage

> **NOTE:** Use React ^16.0.0. If you want to restyle the component, you must use styled-components ^4.0.0.

Run this command to install the component:

``` sh
$ npm install --save asyncapi-react
```

Add this code to your application to use the component. Make sure to pass stringified AsyncAPI specification into the `schema` property

``` js
import React from "react";
import { render } from "react-dom";
import AsyncApiComponent from "asyncapi-react";

import { schema } from "./mock";

const App = () => (
  <AsyncApiComponent schema={schema} />
);

render(<App />, document.getElementById("root"));
```

### Props

The list of props for the AsyncApi React component includes:

   - **schema: string | AsyncApiInterface**
   The `schema` property is required and contains AsyncAPI specification. It should be one of the `string` or [`AsyncApiInterface`](./library/src/types.ts#L13) type. For more information on what it contains and what it should look like, read [AsyncAPI Specification](https://github.com/asyncapi/asyncapi#asyncapi-specification).

   - **theme?: Partial<ThemeInterface>**
   The `theme` property is optional and contains styles for specific parts of the AsyncApi component. For information on how to change styles, read the [Theme Modification](./docs/theme-modification.md) document.

> **NOTE:** If you do not pass the [**disableDefaultTheme**](./docs/config-modification.md) config as `true`, this property is concatenated with the [default theme](./library/src/theme/default.ts)

   - **config?: Partial<ConfigInterface>**
   The `config` property is optional and contains configuration for the AsyncApi component. For more information on the available configuration options, read the [Configuration Modification](./docs/config-modification.md) document.

   This property is concatenated with the [default configuration](./library/src/config/default.ts).

> **NOTE:** The `Partial<T>` type means that every field in the `T` type is optional.

## Development

For information on how to set up a development environment, write and run tests, follow the naming and architecture convention defined for the project in the [Development Guide](./development-guide.md).

## Contribution

If you have a feature request, add it as an issue or propose changes in a pull request (PR). Make sure you follow contributing rules described in the [`CONTRIBUTING.md`](CONTRIBUTING.md) document.

If you have a bug to report, reproduce it in an online code editor. For example, use [CodeSandbox](https://codesandbox.io/). Attach the link to the reproduced bug to your issue.

## Credits

<p align="center">
 <a href="https://github.com/kyma-project/kyma" target="_blank">
  <img src="https://raw.githubusercontent.com/kyma-project/kyma/master/logo.png" width="235">
 </a>
</p>
