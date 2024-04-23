import { marked } from 'marked';

// @ts-expect-error no types
import hljs from 'highlight.js/lib/core';

// @ts-expect-error no types
import json from 'highlight.js/lib/languages/json';
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
hljs.registerLanguage('json', json);

// @ts-expect-error no types
import yaml from 'highlight.js/lib/languages/yaml';
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
hljs.registerLanguage('yaml', yaml);

// @ts-expect-error no types
import bash from 'highlight.js/lib/languages/bash';
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
hljs.registerLanguage('bash', bash);

const markedOptions: marked.MarkedOptions = {
  langPrefix: 'hljs language-',
  highlight: (code, language) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    if (!hljs.getLanguage(language)) {
      return code;
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
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
