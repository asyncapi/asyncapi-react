import {
  AsyncAPIDocumentInterface,
  TagInterface,
  isAsyncAPIDocument,
  isOldAsyncAPIDocument,
  toAsyncAPIDocument,
  unstringify,
} from '@asyncapi/parser';
import { isStringifiedDocument } from '@asyncapi/parser/cjs/document';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class SpecificationHelpers {
  /**
   * Returns parsed AsyncAPI specification.
   */
  static retrieveParsedSpec(
    schema: unknown,
  ): AsyncAPIDocumentInterface | undefined {
    if (!schema) {
      return undefined;
    }

    if (isAsyncAPIDocument(schema)) {
      return schema;
    }

    if (isOldAsyncAPIDocument(schema)) {
      // Is from old parser
      const parsedJSON = schema.json();
      return toAsyncAPIDocument(parsedJSON);
    }

    // check if input is a string and try parse it
    if (typeof schema === 'string') {
      try {
        schema = JSON.parse(schema) as Record<string, unknown>;
      } catch (e) {
        return undefined;
      }
    }

    // at the end check if schema is a parsed JS object (as output from AsyncAPI Parser)
    if (isStringifiedDocument(schema)) {
      return unstringify(schema);
    }

    return toAsyncAPIDocument(schema);
  }

  /**
   * Check if given schema have one of the specified tags.
   */
  static containTags(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schema: any,
    tags: TagInterface | TagInterface[],
  ): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const tagsToCheck =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      typeof schema.tags === 'function' ? schema.tags() : undefined;
    if (tagsToCheck === undefined || !Array.isArray(tagsToCheck)) {
      return false;
    }
    const tagsArr = Array.isArray(tags) ? tags : [tags];
    return tagsToCheck.some((tag: TagInterface) =>
      tagsArr.some(t => t.name() === tag.name()),
    );
  }

  /**
   * Return all tags from operations
   */
  static operationsTags(spec: AsyncAPIDocumentInterface) {
    const tags = new Map<string, TagInterface>();
    Object.entries(spec.operations().all()).forEach(([, operation]) => {
      if (operation?.tags().length > 0) {
        operation
          .tags()
          .all()
          .forEach(tag => tags.set(tag.name(), tag));
      }
    });
    return Array.from(tags.values());
  }

  /**
   * Return all tags from servers
   */
  static serversTags(spec: AsyncAPIDocumentInterface) {
    const tags: Record<string, string[]> = {};
    Object.entries(spec.servers()).forEach(([_, server]) => {
      if (server.tags().length > 0) {
        server
          .tags()
          .all()
          .forEach(tag => {
            if (tags[tag.name()]) {
              tags[tag.name()].push(_);
            } else {
              tags[tag.name()] = [_];
            }
          });
      }
    });
    return tags;
  }
}
