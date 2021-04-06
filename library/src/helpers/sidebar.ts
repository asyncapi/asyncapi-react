import { AsyncAPIDocument, Channel, Tag } from '@asyncapi/parser';

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
   * Check if there is a channel which does not have one of the specified tags.
   */
  static containNoTags(
    channels: Record<string, Channel>,
    tags: Tag | Tag[],
  ): boolean {
    if (!Object.keys(channels).length) {
      return false;
    }

    tags = Array.isArray(tags) ? tags : [tags];
    const checkFn = (tag: Tag): boolean =>
      (tags as Tag[]).some(t => t.name() === tag.name());

    for (const [_, channel] of Object.entries(channels)) {
      const hasPublish = channel.hasPublish();
      const publish = channel.publish();

      const hasSubscribe = channel.hasSubscribe();
      const subscribe = channel.subscribe();

      // one does not contain tags
      if (
        (hasPublish && (!publish.tags() || publish.tags().length === 0)) ||
        (hasSubscribe && (!subscribe.tags() || subscribe.tags().length === 0))
      ) {
        return true;
      }

      // Ensure pubsub tags are checked for the group tags
      const publishContainsNoTag =
        hasPublish && publish.tags() ? publish.tags().some(checkFn) : false;
      if (publishContainsNoTag === true) {
        return true;
      }

      const subscribeContainsNoTag =
        hasSubscribe && subscribe.tags()
          ? subscribe.tags().some(checkFn)
          : false;
      if (subscribeContainsNoTag === true) {
        return true;
      }
    }

    return false;
  }

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
