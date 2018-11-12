import React from 'react';
import DOMPurify from 'dompurify'
const markdownIt = require('markdown-it')();

import { Markdown } from '../../components';

function renderMd(md?: string) {
  const html = markdownIt.render(md || '');
  return <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(html)}} />
}

export default renderMd;