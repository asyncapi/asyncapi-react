import { SidebarHelpers } from '../sidebar';

// @ts-ignore
import AsyncAPIDocument from '@asyncapi/parser/lib/models/asyncapi';
// @ts-ignore
import Operation from '@asyncapi/parser/lib/models/operation';
// @ts-ignore
import Tag from '@asyncapi/parser/lib/models/tag';

describe('SidebarHelpers', () => {
  describe('.containTags', () => {
    test('should return false if no tag in the object match with the given tags to check', () => {
      const foo = new Tag({ name: 'foo' });
      const bar = new Tag({ name: 'bar' });
      const operation = new Operation({ tags: [{ name: 'anotherTag' }] });

      const result = SidebarHelpers.containTags(operation, [foo, bar]);
      expect(result).toEqual(false);
    });

    test('should return true if at least one tag in the object matches with the given tags to check', () => {
      const foo = new Tag({ name: 'foo' });
      const bar = new Tag({ name: 'bar' });
      const operation = new Operation({ tags: [{ name: 'foo' }] });

      const result = SidebarHelpers.containTags(operation, [foo, bar]);
      expect(result).toEqual(true);
    });
  });

  describe('.operationsTags', () => {
    test('should extract the pub/sub tags names from the channel in the given spec', () => {
      const input = {
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

      const result = SidebarHelpers.operationsTags(doc);
      expect(result).toEqual([
        new Tag({ name: 'smartylighting' }),
        new Tag({ name: 'measure' }),
        new Tag({ name: 'dim' }),
      ]);
    });

    test('should return empty array if any operations tags are present in the given spec', () => {
      const input = {
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

      const result = SidebarHelpers.operationsTags(doc);
      expect(result).toEqual([]);
    });
  });
});
