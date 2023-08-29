import { MessageHelpers } from '../message';
import { MessageV2 as Message } from '@asyncapi/parser';

describe('MessageHelpers', () => {
  describe('.generateExample', () => {
    test('should return empty string by default', () => {
      const result = MessageHelpers.generateExample({});
      expect(result).toEqual('');
    });

    test('should instantiate all properties', () => {
      const result = MessageHelpers.generateExample({
        properties: {
          a: { type: 'string' },
          b: { type: 'integer' },
        },
      });
      expect(result).toEqual({
        a: 'string',
        b: 0,
      });
    });
  });

  describe('.sanitizeExample', () => {
    test('should sanitize example', () => {
      const result = MessageHelpers.sanitizeExample({
        properties: {
          a: { type: 'string' },
          b: { type: 'integer', 'x-schema-private-foo': true },
        },
        'x-parser-foo': true,
      });
      expect(result).toEqual({
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
