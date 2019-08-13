import React from 'react';
import DOMPurify from 'dompurify';
import MarkdownIt from 'markdown-it';

const markdownIt = new MarkdownIt();

function renderMd(md?: string) {
  const html = markdownIt.render(md || '');
  return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />;
}

export default renderMd;
