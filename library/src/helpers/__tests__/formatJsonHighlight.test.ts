import { formatJsonHighlight } from '../formatJsonHighlight';

describe('formatJsonHighlight', () => {
  test('It works', () => {
    const out = formatJsonHighlight({ a: '11' });
    expect(out).toBe(
      '{\n  <span style="" class="text-orange-500">"a":</span> <span style="word-wrap:break-word;white-space:pre-wrap;" class="text-teal-500">"11"</span>\n}',
    );
  });

  test('It works with html tags in field values', () => {
    const out = formatJsonHighlight({ a: 'this is <p>a paragraph</p>' });
    expect(out).toBe(
      '{\n  <span style="" class="text-orange-500">"a":</span> <span style="word-wrap:break-word;white-space:pre-wrap;" class="text-teal-500">"this is &lt;p&gt;a paragraph&lt;/p&gt;"</span>\n}',
    );
  });

  test('It works with one double quote in field values', () => {
    const out = formatJsonHighlight({ a: 'this is a "' });
    expect(out).toBe(
      '{\n  <span style="" class="text-orange-500">"a":</span> <span style="word-wrap:break-word;white-space:pre-wrap;" class="text-teal-500">"this is a \\&quot;"</span>\n}',
    );
  });

  test('It works with two double quotes in field values', () => {
    const out = formatJsonHighlight({ a: 'this is a "quote"' });
    expect(out).toBe(
      '{\n  <span style="" class="text-orange-500">"a":</span> <span style="word-wrap:break-word;white-space:pre-wrap;" class="text-teal-500">"this is a \\&quot;quote\\&quot;"</span>\n}',
    );
  });

  test('It works with html tags and quotes in field values', () => {
    const out = formatJsonHighlight({ a: 'this is <p>a "p"</p>' });
    expect(out).toBe(
      '{\n  <span style="" class="text-orange-500">"a":</span> <span style="word-wrap:break-word;white-space:pre-wrap;" class="text-teal-500">"this is &lt;p&gt;a \\&quot;p\\&quot;&lt;/p&gt;"</span>\n}',
    );
  });

  test('It works with html tags and quotes and newlines in field values', () => {
    const out = formatJsonHighlight({ a: 'this is <p>a "p"</p>\n\t\r' });
    expect(out).toBe(
      '{\n  <span style="" class="text-orange-500">"a":</span> <span style="word-wrap:break-word;white-space:pre-wrap;" class="text-teal-500">"this is &lt;p&gt;a \\&quot;p\\&quot;&lt;/p&gt;\\n\\t\\r"</span>\n}',
    );
  });

  test('It works with value undefined', () => {
    const out = formatJsonHighlight(undefined);
    expect(out).toBe('undefined');
  });

  test('It works with value null', () => {
    const out = formatJsonHighlight(null);
    expect(out).toBe('<span style="" class="text-gray-500">null</span>');
  });

  test('It works with value false', () => {
    const out = formatJsonHighlight(false);
    expect(out).toBe('<span style="" class="text-blue-500">false</span>');
  });

  test('It works with value true', () => {
    const out = formatJsonHighlight(true);
    expect(out).toBe('<span style="" class="text-blue-500">true</span>');
  });

  test('It works with number value', () => {
    const out = formatJsonHighlight(12345.678);
    expect(out).toBe('<span style="" class="text-blue-500">12345.678</span>');
  });

  test('It works with empty string', () => {
    const out = formatJsonHighlight('');
    expect(out).toBe('');
  });

  test('It works with not-empty string', () => {
    const out = formatJsonHighlight('not empty');
    expect(out).toBe('not empty');
  });

  test('It works with function', () => {
    const out = formatJsonHighlight(() => {
      // is intended
    });
    expect(out).toBe('function');
  });
});
