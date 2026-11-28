/* eslint-disable sonarjs/no-duplicate-string */
import { MessageHelpers } from '../message';
import { MessageV2 as Message } from '@asyncapi/parser';

describe('MessageHelpers', () => {
  describe('.generateExample', () => {
    test('should return empty string by default', () => {
      expect(MessageHelpers.generateExample({})).toEqual('');
    });

    test('should instantiate all properties', () => {
      expect(
        MessageHelpers.generateExample({
          properties: {
            a: { type: 'string' },
            b: { type: 'integer' },
          },
        }),
      ).toEqual({
        a: 'string',
        b: 0,
      });
    });

    test('should preserve falsy and primitive generated examples', () => {
      expect(
        MessageHelpers.generateExample({
          type: 'integer',
          enum: [0],
        }),
      ).toBe(0);

      expect(
        MessageHelpers.generateExample({
          type: 'boolean',
          enum: [false],
        }),
      ).toBe(false);

      expect(
        MessageHelpers.generateExample({
          type: 'string',
          enum: [''],
        }),
      ).toBe('');

      expect(
        MessageHelpers.generateExample({
          type: 'null',
        }),
      ).toBeNull();

      expect(
        MessageHelpers.generateExample({
          type: 'integer',
          enum: [42],
        }),
      ).toBe(42);
    });

    test('should distinguish empty string example from missing example', () => {
      expect(MessageHelpers.generateExampleValue({})).toEqual({
        hasExample: false,
      });

      expect(
        MessageHelpers.generateExampleValue({
          type: 'string',
          enum: [''],
        }),
      ).toEqual({
        hasExample: true,
        value: '',
      });

      expect(
        MessageHelpers.generateExampleValue({
          type: 'null',
        }),
      ).toEqual({
        hasExample: true,
        value: null,
      });
    });
  });

  describe('.sanitizeExample', () => {
    test('should sanitize example', () => {
      expect(
        MessageHelpers.sanitizeExample({
          properties: {
            a: { type: 'string' },
            b: { type: 'integer', 'x-schema-private-foo': true },
          },
          'x-parser-foo': true,
        }),
      ).toEqual({
        properties: {
          a: { type: 'string' },
          b: { type: 'integer' },
        },
      });
    });
  });

  describe('.getPayloadExamples', () => {
    test('should return epmty examples', () => {
      const result = MessageHelpers.getPayloadExamples(
        new Message({
          examples: [
            {
              name: 'example name',
              summary: 'example summary',
              headers: { foo: 'bar' },
            },
            {
              name: 'example name',
              summary: 'example summary',
              headers: { bar: 'foo' },
            },
          ],
        }),
      );
      expect(result).toEqual(undefined);
    });

    test('should return payload examples', () => {
      const result = MessageHelpers.getPayloadExamples(
        new Message({
          examples: [
            {
              name: 'example name',
              summary: 'example summary',
              payload: { foo: 'bar' },
            },
            {
              name: 'example name',
              summary: 'example summary',
              payload: { bar: 'foo' },
            },
          ],
        }),
      );
      expect(result).toEqual([
        {
          name: 'example name',
          summary: 'example summary',
          example: { foo: 'bar' },
        },
        {
          name: 'example name',
          summary: 'example summary',
          example: { bar: 'foo' },
        },
      ]);
    });

    test('should return examples from payload schema', () => {
      const result = MessageHelpers.getPayloadExamples(
        new Message({
          payload: {
            examples: [{ foo: 'bar' }, { bar: 'foo' }],
          },
        }),
      );
      expect(result).toEqual([
        {
          example: { foo: 'bar' },
        },
        {
          example: { bar: 'foo' },
        },
      ]);
    });

    test('should return examples from payload schema - case when only headers examples are defined in `examples` field', () => {
      const result = MessageHelpers.getPayloadExamples(
        new Message({
          payload: {
            examples: [{ foo: 'bar' }, { bar: 'foo' }],
          },
          examples: [
            {
              name: 'example name',
              summary: 'example summary',
              headers: { foo: 'bar' },
            },
            {
              name: 'example name',
              summary: 'example summary',
              headers: { bar: 'foo' },
            },
          ],
        }),
      );
      expect(result).toEqual([
        {
          example: { foo: 'bar' },
        },
        {
          example: { bar: 'foo' },
        },
      ]);
    });

    test('should return examples for payload - case when at least one item in `examples` array has `payload` field with existing `payload.examples`', () => {
      const result = MessageHelpers.getPayloadExamples(
        new Message({
          payload: {
            examples: [{ foo: 'bar' }, { bar: 'foo' }],
          },
          examples: [
            {
              name: 'example name',
              summary: 'example summary',
              headers: { foo: 'bar' },
            },
            {
              name: 'example name',
              summary: 'example summary',
              payload: { bar: 'foo' },
            },
          ],
        }),
      );
      expect(result).toEqual([
        {
          name: 'example name',
          summary: 'example summary',
          example: { bar: 'foo' },
        },
      ]);
    });

    test('should preserve falsy primitive payload examples', () => {
      const result = MessageHelpers.getPayloadExamples(
        new Message({
          examples: [
            { name: 'zero', payload: 0 },
            { name: 'falseVal', payload: false },
            { name: 'emptyString', payload: '' },
            { name: 'nullVal', payload: null },
            { name: 'headersOnly', headers: { foo: 'bar' } },
          ],
        }),
      );
      expect(result).toEqual([
        { name: 'zero', summary: undefined, example: 0 },
        { name: 'falseVal', summary: undefined, example: false },
        { name: 'emptyString', summary: undefined, example: '' },
        { name: 'nullVal', summary: undefined, example: null },
      ]);
    });
  });

  describe('.getHeadersExamples', () => {
    test('should return epmty examples', () => {
      const result = MessageHelpers.getHeadersExamples(
        new Message({
          examples: [
            {
              name: 'example name',
              summary: 'example summary',
              payload: { foo: 'bar' },
            },
            {
              name: 'example name',
              summary: 'example summary',
              payload: { bar: 'foo' },
            },
          ],
        }),
      );
      expect(result).toEqual(undefined);
    });

    test('should return headers examples', () => {
      const result = MessageHelpers.getHeadersExamples(
        new Message({
          examples: [
            {
              name: 'example name',
              summary: 'example summary',
              headers: { foo: 'bar' },
            },
            {
              name: 'example name',
              summary: 'example summary',
              headers: { bar: 'foo' },
            },
          ],
        }),
      );
      expect(result).toEqual([
        {
          name: 'example name',
          summary: 'example summary',
          example: { foo: 'bar' },
        },
        {
          name: 'example name',
          summary: 'example summary',
          example: { bar: 'foo' },
        },
      ]);
    });

    test('should return examples from headers schema', () => {
      const result = MessageHelpers.getHeadersExamples(
        new Message({
          headers: {
            examples: [{ foo: 'bar' }, { bar: 'foo' }],
          },
        }),
      );
      expect(result).toEqual([
        {
          example: { foo: 'bar' },
        },
        {
          example: { bar: 'foo' },
        },
      ]);
    });

    test('should return examples from headers schema - case when only payload examples are defined in `examples` field', () => {
      const result = MessageHelpers.getHeadersExamples(
        new Message({
          headers: {
            examples: [{ foo: 'bar' }, { bar: 'foo' }],
          },
          examples: [
            {
              name: 'example name',
              summary: 'example summary',
              payload: { foo: 'bar' },
            },
            {
              name: 'example name',
              summary: 'example summary',
              payload: { bar: 'foo' },
            },
          ],
        }),
      );
      expect(result).toEqual([
        {
          example: { foo: 'bar' },
        },
        {
          example: { bar: 'foo' },
        },
      ]);
    });

    test('should return examples for headers - case when at least one item in `examples` array has `headers` field with existing `headers.examples`', () => {
      const result = MessageHelpers.getHeadersExamples(
        new Message({
          headers: {
            examples: [{ foo: 'bar' }, { bar: 'foo' }],
          },
          examples: [
            {
              name: 'example name',
              summary: 'example summary',
              payload: { foo: 'bar' },
            },
            {
              name: 'example name',
              summary: 'example summary',
              headers: { bar: 'foo' },
            },
          ],
        }),
      );
      expect(result).toEqual([
        {
          name: 'example name',
          summary: 'example summary',
          example: { bar: 'foo' },
        },
      ]);
    });
  });
});
