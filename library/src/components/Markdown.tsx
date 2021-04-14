import React from 'react';
import DOMPurify from 'dompurify';
import MarkdownIt from 'markdown-it';

const markdownIt = new MarkdownIt();

export const Markdown: React.FunctionComponent = ({ children }) => {
  if (!children) {
    return null;
  }
  if (typeof children !== 'string') {
    return <>{children}</>;
  }

  const html = markdownIt.render(children);
  return (
    <div
      className="prose text-sm max-w-max"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    />
  );
};
