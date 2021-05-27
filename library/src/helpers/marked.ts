import marked from 'marked';

// @ts-ignore
import hljs from 'highlight.js/lib/core';

// @ts-ignore
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

// @ts-ignore
import json from 'highlight.js/lib/languages/json';
hljs.registerLanguage('json', json);

// @ts-ignore
import yaml from 'highlight.js/lib/languages/yaml';
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('yml', yaml);

// @ts-ignore
import bash from 'highlight.js/lib/languages/bash';
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('sh', bash);

const markedOptions: marked.MarkedOptions = {
  langPrefix: 'hljs language-',
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'javascript';
    return hljs.highlight(code, { language }).value;
  },
};

export function renderMarkdown(content: string): string {
  return marked(content, markedOptions);
}
