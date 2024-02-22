import { OperationInterface, TagV2, TagsV2 } from '@asyncapi/parser';
import { TagObject, filterObjectsByTags } from '../sidebar';

describe('sidebar', () => {
  describe('.filterObjectsByTags', () => {
    test('should handle empty objects and find nothing', () => {
      const tagsToFind = ['test'];
      const objects: Array<TagObject<OperationInterface>> = [];
      const filteredTags = filterObjectsByTags(tagsToFind, objects);
      expect(filteredTags.tagged.size).toEqual(0);
      expect(filteredTags.untagged.length).toEqual(0);
    });
    test('should handle find one instance', () => {
      const tagsToFind = ['test'];
      const tagsToSearch = new TagsV2([new TagV2({ name: 'test' })]);
      const objects: Array<TagObject<any>> = [
        { data: {}, name: '', tags: tagsToSearch },
      ];
      const filteredTags = filterObjectsByTags(tagsToFind, objects);
      expect(filteredTags.tagged.size).toEqual(1);
      expect(filteredTags.untagged.length).toEqual(0);
    });
    test('should handle find multiple instances', () => {
      const tagsToFind = ['test'];
      const obj1 = {
        data: {},
        name: '',
        tags: new TagsV2([new TagV2({ name: 'test' })]),
      };
      const obj2 = {
        data: {},
        name: '',
        tags: new TagsV2([new TagV2({ name: 'none' })]),
      };
      const obj3 = {
        data: {},
        name: '',
        tags: new TagsV2([new TagV2({ name: 'test' })]),
      };
      const objects: Array<TagObject<any>> = [obj1, obj2, obj3];
      const filteredTags = filterObjectsByTags(tagsToFind, objects);
      expect(filteredTags.tagged.size).toEqual(1);
      expect(filteredTags.tagged.get('test')!.length).toEqual(2);
      expect(filteredTags.untagged.length).toEqual(1);
    });
  });
});
