import React from 'react';
import { sanitize } from 'isomorphic-dompurify';
import marked from 'marked';

export const Markdown: React.FunctionComponent = ({ children }) => {
  if (!children) {
    return null;
  }
  if (typeof children !== 'string') {
    return <>{children}</>;
  }

  const html = marked(children);
  return (
    <div
      className="prose text-sm"
      dangerouslySetInnerHTML={{ __html: sanitize(html) }}
    />
  );
};
