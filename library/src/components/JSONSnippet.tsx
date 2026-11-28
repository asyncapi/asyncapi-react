import React from 'react';

import { Markdown } from './index';

interface Props {
  snippet: unknown;
  formatStringAsJson?: boolean;
}

export const JSONSnippet: React.FunctionComponent<Props> = ({
  snippet,
  formatStringAsJson = false,
}) => {
  if (snippet === undefined) {
    return null;
  }

  let formattedSnippet: unknown = snippet;

  if (typeof snippet !== 'string' || formatStringAsJson) {
    const serialized = JSON.stringify(snippet, undefined, 2);
    if (serialized === undefined) {
      return null;
    }
    // change code to markdown's json code block
    formattedSnippet = '```json\n' + serialized + '\n```';
  }

  return <Markdown>{formattedSnippet as React.ReactNode}</Markdown>;
};
