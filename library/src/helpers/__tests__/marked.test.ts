import { renderMarkdown } from '../marked';

describe('marked', () => {
  test('should render simple markdown', () => {
    const result = renderMarkdown('text');
    expect(result).toEqual(`<p>text</p>\n`);
  });

  test('should render complex markdown', () => {
    const result = renderMarkdown(`
# heading

paragraph

**bold**
`);
    expect(result).toEqual(
      `<h1 id="heading">heading</h1>\n<p>paragraph</p>\n<p><strong>bold</strong></p>\n`,
    );
  });

  test('should render code blocks with highlights', () => {
    const result = renderMarkdown(`
\`\`\`json
{"foo": "bar"}
\`\`\`
`);
    expect(result).toEqual(
      `<pre><code class="hljs language-json">{<span class="hljs-attr">&quot;foo&quot;</span>: <span class="hljs-string">&quot;bar&quot;</span>}\n</code></pre>\n`,
    );
  });
});
