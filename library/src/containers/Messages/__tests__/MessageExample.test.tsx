/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { MessageV2 as Message } from '@asyncapi/parser';
import { MessageExample } from '../MessageExample';
import { ConfigContext } from '../../../contexts';
import { defaultConfig } from '../../../config';

const JSON_CODE_SELECTOR = 'pre code.language-json';

const renderExpandedExample = (message: Message) =>
  render(
    <ConfigContext.Provider
      value={{
        ...defaultConfig,
        show: { ...defaultConfig.show, messageExamples: true },
        expand: { ...defaultConfig.expand, messageExamples: true },
      }}
    >
      <MessageExample message={message} />
    </ConfigContext.Provider>,
  );

describe('MessageExample component', () => {
  test('should render generated primitive payload examples including 0, false, empty string, and null', () => {
    const cases: [Record<string, unknown>, string][] = [
      [{ type: 'integer', enum: [0] }, '0'],
      [{ type: 'boolean', enum: [false] }, 'false'],
      [{ type: 'integer', enum: [42] }, '42'],
      [{ type: 'string', enum: [''] }, '""'],
      [{ type: 'null' }, 'null'],
    ];

    for (const [payloadSchema, expected] of cases) {
      const message = new Message({ payload: payloadSchema });
      const { container } = renderExpandedExample(message);
      const code = container.querySelector(JSON_CODE_SELECTOR);
      expect(code).not.toBeNull();
      expect(code?.textContent?.trim()).toBe(expected);
    }
  });

  test('should render explicit primitive payload examples', () => {
    const message = new Message({
      payload: { type: 'integer' },
      examples: [
        { name: 'zero', payload: 0 },
        { name: 'falseValue', payload: false },
        { name: 'emptyString', payload: '' },
        { name: 'nullValue', payload: null },
      ],
    });

    const { container } = renderExpandedExample(message);
    const codes = Array.from(
      container.querySelectorAll(JSON_CODE_SELECTOR),
    ).map((el) => el.textContent?.trim());

    expect(codes).toEqual(['0', 'false', '""', 'null']);
  });

  test('should continue rendering object and array payload examples', () => {
    const message = new Message({
      payload: {
        type: 'object',
        properties: {
          count: { type: 'integer', enum: [0] },
          enabled: { type: 'boolean', enum: [false] },
        },
      },
      examples: [{ name: 'arrayExample', payload: [1, 2] }],
    });

    const { container } = renderExpandedExample(message);
    const code = container.querySelector(JSON_CODE_SELECTOR);
    expect(code?.textContent?.trim()).toBe('[\n  1,\n  2\n]');
  });

  test('should not render an empty JSON string when schema has no sample', () => {
    const message = new Message({ payload: {} });
    const { container } = renderExpandedExample(message);
    expect(container.querySelector(JSON_CODE_SELECTOR)).toBeNull();
  });
});
