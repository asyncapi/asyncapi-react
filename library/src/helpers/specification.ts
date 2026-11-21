import {
  isAsyncAPIDocument,
  isOldAsyncAPIDocument,
  toAsyncAPIDocument,
  unstringify,
} from '@asyncapi/parser';
import type { AsyncAPIDocumentInterface } from '@asyncapi/parser';
import { isStringifiedDocument } from '@asyncapi/parser/cjs/document';
import { containTags,operationsTags,serversTags} from './parsed-document';

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
  static containTags = containTags;

  /**
   * Return all tags from operations
   */
  static operationsTags = operationsTags;

  /**
   * Return all tags from servers
   */
  static serversTags = serversTags;
}
