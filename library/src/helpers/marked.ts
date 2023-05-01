import { marked } from 'marked';
import { initializeMermaidOnce }  from './mermaid';

// @ts-ignore
import hljs from 'highlight.js/lib/core';

// @ts-ignore
import json from 'highlight.js/lib/languages/json';
hljs.registerLanguage('json', json);

// @ts-ignore
import yaml from 'highlight.js/lib/languages/yaml';
hljs.registerLanguage('yaml', yaml);

// @ts-ignore
import bash from 'highlight.js/lib/languages/bash';
hljs.registerLanguage('bash', bash);

const codeHighlightOptions: marked.MarkedOptions = {
  langPrefix: 'hljs language-',
  highlight: (code, language) => {
    if (!hljs.getLanguage(language)) {
      return code;
    }
    try {
      return hljs.highlight(code, { language }).value;
    } catch (e) {
      return code;
    }
  },
};
const codeHighlightRenderer = new marked.Renderer(codeHighlightOptions);
const markdownRenderer = new marked.Renderer();
markdownRenderer.code = (code, language, isEscaped) => {
  if (language === 'mermaid') {
    initializeMermaidOnce();
    return '<pre class="mermaid">' + code + '</pre>';
  }
  return codeHighlightRenderer.code(code, language, isEscaped);
};

export function renderMarkdown(content: string): string {
  return marked(content, { renderer: markdownRenderer });
}

export { hljs };
