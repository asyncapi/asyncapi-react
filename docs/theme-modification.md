# Theme

## Overview

This file describe how `ThemeInterface` look and how apply the new styles for specific parts of `AsyncApi` component.

## Definition

``` ts
type styledCss = string | InterpolationValue[];

interface ThemeInterface {
  asyncApiWrapper: styledCss;
  header: styledCss;
  headerParagraph: styledCss;
  ...
}
```

For complex definition of `ThemeInterface`, please check [this](../library/src/theme/theme.ts#L5) file.

> **NOTE:** The `InterpolationValue` type is from [`styled-components`](https://github.com/styled-components/styled-components) library.

## How it works

[`Styled-components`](https://github.com/styled-components/styled-components) is a awesome library and allows us to think about styles as …components. We use it in our project to give styles to the relevant parts of `AsyncApi` component. Our architecture also allows you to quickly change the default styles for the appropriate class that you would like to change in your project.

> **NOTE:** You can also define that default styles are not supported. More info about that [here](./config-modification.md#disabledefaulttheme-boolean).

For example, if you would like to change styles for an element displaying generated examples of schemas, messages and topics, which has such an [architecture](../library/src/components/Code.tsx#L14):

``` tsx
<CodeWrapper>
  {title && <CodeHeader><CodeHeaderH4>{title}</CodeHeaderH4></CodeHeader>}
  <CodeBody language="javascript">{code}</CodeBody>
</CodeWrapper>
```

you should create an appropriate object:

``` ts
const theme = {
  codeWrapper: `...`,
  codeHeader: `...`,
  codeHeaderH4: `...`,
  codeBody: `...`
}
```

The value ​​of the appropriate field in the `ThemeInterface` should be provided as a literal string or by [`css`](https://www.styled-components.com/docs/api#css) function from `styled-components` library.

## Examples

#### JavaScript

``` jsx
import * as React from "react";
import { render } from "react-dom";
import AsyncApiComponent from "asyncapi-react";
import { css } from "styled-components";

import { schema } from "./mock";

const theme = {
  asyncApiWrapper: `
    padding: 16px;
    background-color: #fff;
  `,
  header: css`
    font-size: 32px;
    color: #000;
    text-align: center;
  `
}

const App = () => (
  <AsyncApiComponent schema={schema} theme={theme} />
);

render(<App />, document.getElementById("root"));
```

#### TypeScript

``` tsx
import * as React from "react";
import { render } from "react-dom";
import AsyncApiComponent, { ThemeInterface } from "asyncapi-react";
import { css } from "styled-components";

import { schema } from "./mock";

const theme: Partial<ThemeInterface> = {
  asyncApiWrapper: `
    padding: 16px;
    background-color: #fff;
  `,
  header: css`
    font-size: 32px;
    color: #000;
    text-align: center;
  `
}

const App = () => (
  <AsyncApiComponent schema={schema} theme={theme} />
);

render(<App />, document.getElementById("root"));
```
