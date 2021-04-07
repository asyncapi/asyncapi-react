import { MessageHelpers } from '../message';

// @ts-ignore
import Message from '@asyncapi/parser/lib/models/message';

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
              headers: { foo: 'bar' },
            },
            {
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
              payload: { foo: 'bar' },
            },
            {
              payload: { bar: 'foo' },
            },
          ],
        }),
      );
      expect(result).toEqual([{ foo: 'bar' }, { bar: 'foo' }]);
    });

    test('should return examples from payload schema', () => {
      const result = MessageHelpers.getPayloadExamples(
        new Message({
          payload: {
            examples: [{ foo: 'bar' }, { bar: 'foo' }],
          },
        }),
      );
      expect(result).toEqual([{ foo: 'bar' }, { bar: 'foo' }]);
    });
  });

  describe('.getHeadersExamples', () => {
    test('should return epmty examples', () => {
      const result = MessageHelpers.getHeadersExamples(
        new Message({
          examples: [
            {
              payload: { foo: 'bar' },
            },
            {
              payload: { bar: 'foo' },
            },
          ],
        }),
      );
      expect(result).toEqual(undefined);
    });

    test('should return payload examples', () => {
      const result = MessageHelpers.getHeadersExamples(
        new Message({
          examples: [
            {
              headers: { foo: 'bar' },
            },
            {
              headers: { bar: 'foo' },
            },
          ],
        }),
      );
      expect(result).toEqual([{ foo: 'bar' }, { bar: 'foo' }]);
    });

    test('should return examples from heaers schema', () => {
      const result = MessageHelpers.getHeadersExamples(
        new Message({
          headers: {
            examples: [{ foo: 'bar' }, { bar: 'foo' }],
          },
        }),
      );
      expect(result).toEqual([{ foo: 'bar' }, { bar: 'foo' }]);
    });
  });
});
