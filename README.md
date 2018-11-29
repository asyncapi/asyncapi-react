# AsyncAPI React Component

## Overview

This project is an official [React](https://reactjs.org/) component for AsyncAPI specification. It allows you to validate and render AsyncAPI specification using your own styles.

### Project structure

This repository has the following structure:

```
  ├── docs                        # Directory with project-related documents
  ├── library                     # Structure of the AsyncApi React component
  │    ├── src                    # Source code of the AsyncApi React component
  │    │    ├── components        # Source code of generic components used in the "containers" directory
  │    │    ├── config            # Configuration of the AsyncApi React component
  │    │    ├── containers        # Subcomponents for specific parts of the AsyncApi React component
  │    │    ├── helpers           # Various helper functions
  │    │    └── theme             # Theme-related files for the AsyncApi React component
  │    └── test                   # Tests for the AsyncApi React component
  └── playground                  # Structure of the Playground application for the AsyncApi React component
       ├── public                 # Fonts, images, and icons used in the Playground application
       ├── src                    # Source code of the Playground application
       │    ├── common            # Various helper functions including mocks
       │    └── components        # Components used in the Playground application
       └── test                   # Tests for the Playground application
```

## Prerequisites

Use the following tools to develop the AsyncApi React component:

* React (version 16.0.0 or higher)
* [Styled-components](https://github.com/styled-components/styled-components) (version 4.0.0 or higher)
* TypeScript (version 3.0.0 or higher)

## Installation

Run this command to install the component:

``` sh
$ npm install --save asyncapi-react
```

## Usage

Import the component to you project under the desired location:

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

## License

This project is published under the Apache 2.0 license. For more information, see the [`LICENSE`](LICENSE) file.

## Credits

<p align="center">
 <a href="https://github.com/kyma-project/kyma" target="_blank">
  <img src="https://raw.githubusercontent.com/kyma-project/kyma/master/logo.png" width="235">
 </a>
</p>
