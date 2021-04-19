import { AsyncAPIDocument, Tag } from '@asyncapi/parser';
// @ts-ignore
import AsyncAPIDocumentClass from '@asyncapi/parser/lib/models/asyncapi';

export class SpecificationHelpers {
  /**
   * Returns parsed AsyncAPI specification.
   */
  static retrieveParsedSpec(schema: any) {
    // check if schema is an instance of AsyncAPIDocument (model from AsyncAPI Parser)
    if (schema.constructor && schema.constructor.name === 'AsyncAPIDocument') {
      return schema;
    }

    // then check if schema is a parsed JS object (as output from AsyncAPI Parser)
    if (typeof schema === 'object' && schema['x-parser-parsed'] === true) {
      return new AsyncAPIDocumentClass(schema);
    }

    // at the end check if schema is an instance of AsyncAPIDocument (model from AsyncAPI Parser)
    // this check is used for security in case of code mangling (unification)
    if (
      typeof schema.version === 'function' &&
      schema._json &&
      schema._json.asyncapi
    ) {
      return schema;
    }
  }

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
