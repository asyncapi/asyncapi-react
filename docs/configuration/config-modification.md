# Configuration Modification

## Overview

Learn how to use various configuration options available in `ConfigInterface`.

## Definition

See the definition of the object that you must pass to props to modify the component configuration:

```ts
interface ConfigInterface {
  schemaID?: string;
  show?: {
    sidebar?: boolean;
    info?: boolean;
    servers?: boolean;
    operations?: boolean;
    messages?: boolean;
    schemas?: boolean;
    errors?: boolean;
  };
  expand?: {
    messageExamples?: boolean;
  },
  sidebar?: {
    showServers?: 'byDefault' | 'bySpecTags' | 'byServersTags';
    showOperations?: 'byDefault' | 'bySpecTags' | 'byOperationsTags';
    useChannelAddressAsIdentifier?: boolean;
  },
  parserOptions?: ParserOptions;
  publishLabel?: string;
  subscribeLabel?: string;
  sendLabel?: string;
  receiveLabel?: string;
  requestLabel?: string;
  replyLabel?: string;
}
```

- **schemaID?: string**

  This field contains a schema name.
  This field is set to `asyncapi` by default.

- **show?: Partial<ShowConfig>**

  This field contains configuration responsible for rendering specific parts of the AsyncAPI component.
  All except the `sidebar` fields are set to `true` by default.

- **sidebar?: Partial<SideBarConfig>**

  This field contains configuration responsible for the way of working of the sidebar.
  `showServers` field is set to `byDefault` by default.
  `showOperations` field is set to `byDefault` by default.
  `useChannelAddressAsIdentifier` uses the channel address or operation summary in the sidebar instead of the operationId, for both AsyncAPI v2 and v3 documents.
  The default behaviour is to do this only for v2 documents.
  
- **expand?: Partial<ExpandConfig>**

  This field contains configuration responsible for collapsing and expanding component sections.
  `messageExamples` field is set to `false` by default.

- **parserOptions?: ParserOptions**

  This field contains configuration for [`asyncapi-parser`](https://github.com/asyncapi/parser). See available options [here](https://github.com/asyncapi/parser-js/blob/master/API.md#module_@asyncapi/parser..parse).
  This field is set to `null` by default.

- **publishLabel?: string**

  This field contains configuration responsible for customizing the label for publish operations.This take effect for AsyncAPI v2 documents.
  This field is set to `PUB` by default. 

- **subscribeLabel?: string**

  This field contains configuration responsible for customizing the label for subscribe operations. This take effect for AsyncAPI v2 documents.
  This field is set to `SUB` by default.

- **sendLabel?: string**

  This field contains configuration responsible for customizing the label for send operation. This takes effect when rendering AsyncAPI v3 documents.
  This field is set to `SEND` by default.

- **receiveLabel?: string**

  This field contains configuration responsible for customizing the label for receive operation. This takes effect when rendering AsyncAPI v3 documents.
  This field is set to `RECEIVE` by default.

- **requestLabel?: string**

  This field contains configuration responsible for customizing the label for request operation. This takes effect when rendering AsyncAPI v3 documents.
  This field is set to `REQUEST` by default.

- **replyLabel?: string**

  This field contains configuration responsible for customizing the label for response operation. This takes effect when rendering AsyncAPI v3 documents.
  This field is set to `REPLY` by default.

## Examples

See exemplary component configuration in TypeScript and JavaScript.

### TypeScript

```tsx
import * as React from "react";
import { render } from "react-dom";
import AsyncAPIComponent, { ConfigInterface } from "@asyncapi/react-component";

import { schema } from "./mock";

const config: ConfigInterface = {
  schemaID: 'custom-spec',
  show: {
    operations: false,
    errors: false,
  },
  sidebar: {
    showServers: 'byServersTags',
    showOperations: 'bySpecTags',
  },
  expand: {
    messageExamples: false,
  },
};

const App = () => <AsyncAPIComponent schema={schema} config={config} />;

render(<App />, document.getElementById("root"));
```

### JavaScript

```jsx
import * as React from "react";
import { render } from "react-dom";
import AsyncAPIComponent from "@asyncapi/react-component";

import { schema } from "./mock";

const config = {
  schemaID: 'custom-spec',
  show: {
    operations: false,
    errors: false,
  },
  sidebar: {
    showServers: 'byServersTags',
    showOperations: 'bySpecTags',
  },
  expand: {
    messageExamples: true,
  },
};

const App = () => <AsyncAPIComponent schema={schema} config={config} />;

render(<App />, document.getElementById("root"));
```

In the above examples, after concatenation with the default configuration, the resulting configuration looks as follows:

```js
{
  schemaID: 'custom-spec',
  show: {
    sidebar: false,
    info: true,
    servers: true,
    operations: false,
    messages: true,
    schemas: true,
    errors: false,
  },
  expand: {
    messageExamples: true,
  },
  sidebar: {
    showServers: 'byServersTags',
    showOperations: 'bySpecTags',
  },
  publishLabel: 'PUB',
  subscribeLabel: 'SUB',
  sendLabel: 'SEND',
  receiveLabel: 'RECEIVE',
  requestLabel: 'REQUEST',
  replyLabel: 'REPLY'
}
```
