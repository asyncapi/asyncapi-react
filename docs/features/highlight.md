# Highlight markdown's code blocks

## Overview

The component internally uses [`highlight.js`](https://highlightjs.org/) to highlight the markdown code blocks. To reduce the size of the component, it only uses the configuration for 3 languages: `json`, `yaml` and `bash`. The rest are rendered as plain text. However, the package provides the instance of the [`highlight.js`](https://highlightjs.org/) outside the package with which you can, for example, add a custom language configuration.

## Usage

To add configuration for an additional language, import configuration from `highlight.js/lib/languages/{LANGUAGE}` where `LANGUAGE` is a language name and load it using the `registerLanguage` function. [There](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md) is a list of supported languages.

See how to add a configuration in the example below:

```js
import AsyncApiComponent, { hljs } from "@asyncapi/react-component";

import csharp from 'highlight.js/lib/languages/csharp';
hljs.registerLanguage('csharp', csharp);

// And then you can use the comppnent.
render(<AsyncApiComponent schema={schema} config={config} />, document.getElementById("root"));
```

> **NOTE**: You need to load the configuration before rendering the component.
