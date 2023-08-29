import { SpecificationHelpers } from '../specification';
import {
  AsyncAPIDocumentV2 as AsyncAPIDocument,
  OperationV2 as Operation,
  TagV2 as Tag,
  stringify,
} from '@asyncapi/parser';

describe('SpecificationHelpers', () => {
  describe('.retrieveParsedSpec', () => {
    test('should return parsed specification when is passed AsyncAPIDocument instance', () => {
      const doc = new AsyncAPIDocument({
        asyncapi: '2.0.0',
        info: { title: 'test', version: '0.0.0' },
        channels: {},
      });

      const result = SpecificationHelpers.retrieveParsedSpec(doc);
      expect(result).not.toBeUndefined();
      expect(result instanceof AsyncAPIDocument).toEqual(true);
    });

    test('should return parsed specification when is passed parsed stringified spec (by string) ', () => {
      const doc = {
        asyncapi: '2.0.0',
        info: { title: 'test', version: '0.0.0' },
        channels: {},
        'x-parser-spec-parsed': true,
      };
      const expected = new AsyncAPIDocument(doc);
      const stringified = stringify(expected);
      const result = SpecificationHelpers.retrieveParsedSpec(stringified);
      expect(result).not.toBeUndefined();
      expect(result instanceof AsyncAPIDocument).toEqual(true);
    });

    test('should return parsed specification when is passed parsed JS object', () => {
      const doc = {
        asyncapi: '2.0.0',
        info: { title: 'test', version: '0.0.0' },
        channels: {},
        'x-parser-spec-parsed': true,
      };

      const result = SpecificationHelpers.retrieveParsedSpec(doc);
      expect(result).not.toBeUndefined();
      expect(result instanceof AsyncAPIDocument).toEqual(true);
    });

    test('should return parsed specification when is passed old AsyncAPI document', () => {
      const doc = {
        json: () => ({
          asyncapi: '2.0.0',
          info: { title: 'test', version: '0.0.0' },
          channels: {},
          'x-parser-spec-parsed': true,
          'x-parser-api-version': 0,
        }),
      };
      const result = SpecificationHelpers.retrieveParsedSpec(doc);
      expect(result).not.toBeUndefined();
      expect(result instanceof AsyncAPIDocument).toEqual(true);
    });
  });

  describe('.containTags', () => {
    test('should return false if no tag in the object match with the given tags to check', () => {
      const foo = new Tag({ name: 'foo' });
      const bar = new Tag({ name: 'bar' });
      const operation = new Operation({ tags: [{ name: 'anotherTag' }] });

      const result = SpecificationHelpers.containTags(operation, [foo, bar]);
      expect(result).toEqual(false);
    });

    test('should return true if at least one tag in the object matches with the given tags to check', () => {
      const foo = new Tag({ name: 'foo' });
      const bar = new Tag({ name: 'bar' });
      const operation = new Operation({ tags: [{ name: 'foo' }] });

      const result = SpecificationHelpers.containTags(operation, [foo, bar]);
      expect(result).toEqual(true);
    });
  });

  describe('.operationsTags', () => {
    test('should extract the pub/sub tags names from the channel in the given spec', () => {
      const input = {
        asyncapi: '2.0.0',
        info: { title: 'test', version: '0.0.0' },
        channels: {
          'smartylighting/streetlights/1/0/event/1/lighting/measured': {
            publish: {
              tags: [{ name: 'smartylighting' }, { name: 'measure' }],
            },
          },
          'smartylighting/streetlights/1/0/action/1/dim': {
            subscribe: {
              tags: [{ name: 'dim' }],
            },
          },
        },
      };
      const doc = new AsyncAPIDocument(input);

      const result = SpecificationHelpers.operationsTags(doc);

      expect(result[0].json()).toEqual(
        new Tag({ name: 'smartylighting' }).json(),
      );
      expect(result[1].json()).toEqual(new Tag({ name: 'measure' }).json());
      expect(result[2].json()).toEqual(new Tag({ name: 'dim' }).json());
    });

    test('should return empty array if any operations tags are present in the given spec', () => {
      const input = {
        asyncapi: '2.0.0',
        info: { title: 'test', version: '0.0.0' },
        channels: {
          'smartylighting/streetlights/1/0/event/1/lighting/measured': {
            publish: {
              operationId: 'foobar',
            },
          },
          'smartylighting/streetlights/1/0/action/1/dim': {
            subscribe: {
              operationId: 'foobar',
            },
          },
        },
      };
      const doc = new AsyncAPIDocument(input);

      const result = SpecificationHelpers.operationsTags(doc);
      expect(result).toEqual([]);
    });
  });
});
