import { AsyncAPIDocument, Tag } from '@asyncapi/parser';

export class SidebarHelpers {
  /**
   * Check if given schema have one of the specified tags.
   */
  static containTags(schema: any, tags: Tag | Tag[]): boolean {
    const tagsToCheck =
      typeof schema.tags === 'function' ? schema.tags() : undefined;
    if (tagsToCheck === undefined || !Array.isArray(tagsToCheck)) {
      return false;
    }
    tags = Array.isArray(tags) ? tags : [tags];
    return tagsToCheck.some((tag: Tag) =>
      (tags as Tag[]).some(t => t.name() === tag.name()),
    );
  }

  /**
   * Return all tags from operations
   */
  static operationsTags(spec: AsyncAPIDocument) {
    const tags = new Set<Tag>();
    Object.entries(spec.channels()).forEach(([_, channel]) => {
      const publish = channel.publish();
      if (publish && publish.hasTags()) {
        publish.tags().forEach(tag => tags.add(tag));
      }
      const subscribe = channel.subscribe();
      if (subscribe && subscribe.hasTags()) {
        subscribe.tags().forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags);
  }
}
