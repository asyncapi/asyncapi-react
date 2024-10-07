import { Parser as AsyncapiParser, fromURL } from '@asyncapi/parser';
import { OpenAPISchemaParser } from '@asyncapi/openapi-schema-parser';
import { ProtoBuffSchemaParser } from '@asyncapi/protobuf-schema-parser';
import { AvroSchemaParser } from '@asyncapi/avro-schema-parser';

import {
  ErrorObject,
  ParserReturn,
  FetchingSchemaInterface,
  ValidationError,
} from '../types';

import { VALIDATION_ERRORS_TYPE } from '../constants';

const asyncapiParser = new AsyncapiParser();
asyncapiParser.registerSchemaParser(OpenAPISchemaParser());
asyncapiParser.registerSchemaParser(AvroSchemaParser());
asyncapiParser.registerSchemaParser(ProtoBuffSchemaParser());

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Parser {
  static async parse(
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/no-explicit-any
    content: string | any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parserOptions?: any,
  ): Promise<ParserReturn> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const parseResult = await asyncapiParser.parse(content, parserOptions);

      const error: {
        title: string | undefined;
        validationErrors: ValidationError[] | undefined;
      } = {
        title: 'There are errors in your Asyncapi document',
        validationErrors: [],
      };

      if (parseResult.document === undefined) {
        parseResult.diagnostics.forEach((diagnostic) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
          if (diagnostic.severity == 0) {
            const tempObj: ValidationError = {
              title: diagnostic.message,
              location: {
                jsonPointer: '/' + diagnostic.path.join('/'),
                startLine: diagnostic.range.start.line,
                startColumn: diagnostic.range.start.character,
                // as of @asyncapi/parser 3.3.0 offset of 1 correctly shows the error line
                startOffset: 1,
                endLine: diagnostic.range.end.line,
                endColumn: diagnostic.range.end.character,
                endOffset: 0,
              },
            };
            error.validationErrors?.push(tempObj);
          }
        });
        throw error;
      }

      return { asyncapi: parseResult.document };
    } catch (err) {
      return this.handleError(err as ErrorObject);
    }
  }

  static async parseFromUrl(
    arg: FetchingSchemaInterface,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parserOptions?: any,
  ): Promise<ParserReturn> {
    try {
      const fromResult = fromURL(
        asyncapiParser,
        arg.url,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        arg.requestOptions as any,
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const { document } = await fromResult.parse(parserOptions);
      return { asyncapi: document };
    } catch (err) {
      return this.handleError(err as ErrorObject);
    }
  }

  private static handleError = (err: ErrorObject): ParserReturn => {
    if (err.type === VALIDATION_ERRORS_TYPE) {
      return {
        error: err,
      };
    }
    return { error: err };
  };
}
