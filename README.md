<h1 align="center">A official AsyncAPI React Component</h1>

## Table of Contents

* [Philosophy](#philosophy)
* [Live Demo](#live-demo)
* [Install](#install)
* [Requirements](#requirements)
* [Usage](#usage)
* [Props](#props)
* [Development](#development)
* [Contributing](#contributing)
* [License](#license)
* [Authors](#authors)

## Philosophy



## Live Demo

A [live playground](https://magicmatatjahu.github.io/asyncapi-react/) is hosted on gh-pages.

## Install

``` sh
$ npm install --save asyncapi-react
```

## Requirements
* TypeScript ^3.0.0
* React ^16.0.0
* [`styled-components`](https://github.com/styled-components/styled-components) ^4.0.0

## Usage

``` tsx
import * as React from "react";
import { render } from "react-dom";
import AsyncApiComponent from "asyncapi-react";

import { schema } from "./mock";

const App = () => (
  <AsyncApiComponent schema={schema} />
);

render(<App />, document.getElementById("root"));
```

## Props

#### `schema: string | AsyncApiInterface`

The `schema` property is required and contains **AsyncAPI** specification and should be one of type: `string` or [`AsyncApiInterface`](./library/src/types.ts#L13). For more information about what it should look like and what contains, please read [this](https://github.com/asyncapi/asyncapi#asyncapi-specification) document.

#### `theme?: Partial<ThemeInterface>`*

The `theme` property is optional and contains styles for specific part of `AsyncApi` component. For more information about changing styles, please read [this](./docs/theme-modification.md) document.

> **NOTE:** This props is concatenated with the [default theme](./library/src/theme/default.ts) if you not pass [`disableDefaultTheme`](./docs/config-modification.md) config as true.

#### `config?: Partial<ConfigInterface>`*

The `config` property is optional and contains configuration for `AsyncApi` component. For more information about what options are available, please read [this](./docs/config-modification.md) document.

> **NOTE:** This props is concatenated with the [default configuration](./library/src/config/default.ts)

\* `Partial<T>` type means that every field in type `T` is optional. 

## Development

For more information about development process - setup development environment, run and write test, follow naming and accepted architecture convention of the project, please check [`DEVELOPMENT.md`](DEVELOPMENT.md) document.

## Contributing

If you have a feature request, please add it as an issue or make a pull request by following [`CONTRIBUTING.md`](CONTRIBUTING.md) file.

If you have a bug to report, please reproduce the bug in the app like a [`CodeSandbox`](https://codesandbox.io/) to help us easily isolate it.

## License

This project is under a **Apache 2.0** license. For more information, please check [`LICENSE`](LICENSE) file.

## Authors
* Fran Méndez ([@fmvilas](http://twitter.com/fmvilas)) - author of `AsyncAPI` specification
* Maciej Urbańczyk ([@magicmatatjahu](https://github.com/magicmatatjahu)) - author of `AsyncAPI React` component
