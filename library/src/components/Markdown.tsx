import React from 'react';
import { sanitize } from 'isomorphic-dompurify';

import { renderMarkdown } from '../helpers';

export const Markdown: React.FunctionComponent = ({ children }) => {
  if (!children) {
    return null;
  }
  if (typeof children !== 'string') {
    return <>{children}</>;
  }

  return (
    <div
      className="prose max-w-none text-sm"
      dangerouslySetInnerHTML={{ __html: sanitize(renderMarkdown(children)) }}
    />
  );
};
