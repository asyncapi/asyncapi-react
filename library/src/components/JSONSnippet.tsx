import React from 'react';

import { Markdown } from './index';

interface Props {
  snippet: string | object;
}

export const JSONSnippet: React.FunctionComponent<Props> = ({ snippet }) => {
  if (typeof snippet === 'object') {
    // change code to markdown's json code block
    snippet = '```json\n' + JSON.stringify(snippet, undefined, 2) + '\n```';
  }

  return <Markdown>{snippet}</Markdown>;
};
