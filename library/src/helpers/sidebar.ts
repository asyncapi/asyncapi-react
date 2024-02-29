import { TagsInterface } from '@asyncapi/parser';

export interface TagObject<T = any> {
  name: string;
  tags: TagsInterface;
  data: T;
}
export interface SortedReturnType {
  tagged: Map<string, TagObject[]>;
  untagged: TagObject[];
}

/**
 * Filter an array of objects by certain tags
 */
export function filterObjectsByTags<T>(
  tags: string[],
  objects: Array<TagObject<T>>,
): SortedReturnType {
  const taggedObjects = new Set<TagObject>();
  const tagged = new Map<string, TagObject[]>();
  tags.forEach(tag => {
    const taggedForTag: TagObject[] = [];
    objects.forEach(obj => {
      const objTags = obj.tags;
      const nameTags = (objTags.all() ?? []).map(t => t.name());
      const hasTag = nameTags.includes(tag);
      if (hasTag) {
        taggedForTag.push(obj);
        taggedObjects.add(obj);
      }
    });
    if (taggedForTag.length > 0) {
      tagged.set(tag, taggedForTag);
    }
  });

  const untagged: TagObject[] = [];
  objects.forEach(obj => {
    if (!taggedObjects.has(obj)) {
      untagged.push(obj);
    }
  });

  return { tagged, untagged };
}
