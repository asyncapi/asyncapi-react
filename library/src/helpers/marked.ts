import { marked } from 'marked';

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

const markedOptions: marked.MarkedOptions = {
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

export function renderMarkdown(content: string): string {
  return marked(content, markedOptions);
}

export { hljs };
