import React from 'react';
import DOMPurify from 'dompurify';
import MarkdownIt from 'markdown-it';

import { bemClasses } from '../helpers';

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
    <div className={bemClasses.element(`markdown`)}>
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
    </div>
  );
};
