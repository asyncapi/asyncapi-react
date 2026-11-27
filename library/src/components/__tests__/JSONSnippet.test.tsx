/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { JSONSnippet } from '../JSONSnippet';
import { Markdown } from '../Markdown';

const JSON_CODE_SELECTOR = 'pre code.language-json';

describe('JSONSnippet component', () => {
  test('should render primitive JSON values inside json code blocks', () => {
    const cases: [unknown, string][] = [
      [0, '0'],
      [false, 'false'],
      [true, 'true'],
      [42, '42'],
      [null, 'null'],
    ];

    for (const [value, expected] of cases) {
      const { container } = render(<JSONSnippet snippet={value} />);
      const code = container.querySelector(JSON_CODE_SELECTOR);
      expect(code).not.toBeNull();
      expect(code?.textContent?.trim()).toBe(expected);
    }
  });

  test('should render string values as JSON when formatStringAsJson is enabled', () => {
    const emptyResult = render(<JSONSnippet snippet="" formatStringAsJson />);
    const emptyCode = emptyResult.container.querySelector(JSON_CODE_SELECTOR);
    expect(emptyCode).not.toBeNull();
    expect(emptyCode?.textContent?.trim()).toBe('""');

    const textResult = render(
      <JSONSnippet snippet="hello" formatStringAsJson />,
    );
    const textCode = textResult.container.querySelector(JSON_CODE_SELECTOR);
    expect(textCode).not.toBeNull();
    expect(textCode?.textContent?.trim()).toBe('"hello"');
  });

  test('should preserve preformatted Markdown strings by default', () => {
    const markdown = '```json\n{"foo": "bar"}\n```';
    const { container } = render(<JSONSnippet snippet={markdown} />);
    const code = container.querySelector(JSON_CODE_SELECTOR);
    expect(code).not.toBeNull();
    expect(code?.textContent?.trim()).toBe('{"foo": "bar"}');
  });

  test('should render objects and arrays as JSON code blocks', () => {
    const objectResult = render(<JSONSnippet snippet={{ foo: 'bar' }} />);
    expect(
      objectResult.container
        .querySelector(JSON_CODE_SELECTOR)
        ?.textContent?.trim(),
    ).toBe('{\n  "foo": "bar"\n}');

    const arrayResult = render(<JSONSnippet snippet={[1, 2, 3]} />);
    expect(
      arrayResult.container
        .querySelector(JSON_CODE_SELECTOR)
        ?.textContent?.trim(),
    ).toBe('[\n  1,\n  2,\n  3\n]');
  });

  test('should render nothing for undefined snippet', () => {
    const { container } = render(<JSONSnippet snippet={undefined} />);
    expect(container.firstChild).toBeNull();
  });
});

describe('Markdown component', () => {
  test('should render numeric 0 children instead of returning null', () => {
    const { container } = render(<Markdown>{0}</Markdown>);
    expect(container.textContent).toBe('0');
  });

  test('should return null for empty string, null, or undefined children', () => {
    expect(render(<Markdown>{''}</Markdown>).container.firstChild).toBeNull();
    expect(render(<Markdown>{null}</Markdown>).container.firstChild).toBeNull();
    expect(
      render(<Markdown>{undefined}</Markdown>).container.firstChild,
    ).toBeNull();
  });
});
