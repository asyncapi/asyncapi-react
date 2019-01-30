# Theme Modification

## Overview

This document describes `ThemeInterface` and explains how you can apply the new styles for specific parts of the AsyncApi component.

## Definition

See the basic definition of the interface:

``` ts
type styledCss = string | InterpolationValue[];

interface ThemeInterface {
  asyncApiWrapper: styledCss;
  header: styledCss;
  headerParagraph: styledCss;
  ...
}
```

For more details, check [this](../../library/src/theme/theme.ts) file.

> **NOTE:** The `InterpolationValue` type is taken from the [`styled-components`](https://github.com/styled-components/styled-components) library.

## How it works

[`Styled-components`](https://github.com/styled-components/styled-components) is a feature-rich library that allows you to think about styles as components. It is used to provide styles for relevant parts of the AsyncApi component. The component's architecture allows you to quickly modify the default styles for the appropriate class that you want to change in your project.

> **NOTE:** You can also configure the component not to support the default styles. For more information, see [this](./config-modification.md#definition) document.

For example, if you want to change styles for an element displaying generated examples of schemas, messages, and topics, you should create an appropriate object which has the following [structure](../../library/src/components/Code.tsx#L14):


``` tsx
<CodeWrapper>
  {title && <CodeHeader><CodeHeaderH4>{title}</CodeHeaderH4></CodeHeader>}
  <CodeBody language="javascript">{code}</CodeBody>
</CodeWrapper>
```

See an example of such an object:

``` ts
const theme = {
  codeWrapper: `...`,
  codeHeader: `...`,
  codeHeaderH4: `...`,
  codeBody: `...`
}
```

Provide the value ​​of the appropriate field in `ThemeInterface` either as a literal string or using the [`css`](https://www.styled-components.com/docs/api#css) function from the `styled-components` library.

## Examples

See exemplary theme configuration in JavaScript and TypeScript.

### JavaScript

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

### TypeScript

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
