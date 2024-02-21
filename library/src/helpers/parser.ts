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

export class Parser {
  static async parse(
    content: string | any,
    parserOptions?: any,
  ): Promise<ParserReturn> {
    try {
      const parseResult = await asyncapiParser.parse(content, parserOptions);

      let error: {
        title: string | undefined;
        validationErrors: ValidationError[] | undefined;
      } = {
        title: 'There were errors validating Asyncapi document',
        validationErrors: undefined,
      };

      if (parseResult.document === undefined) {
        parseResult.diagnostics.forEach(diagnostic => {
          if (diagnostic.code.toString().includes('error')) {
            const tempObj = { title: diagnostic.message };
            error.validationErrors = [(tempObj as unknown) as ValidationError];
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
    parserOptions?: any,
  ): Promise<ParserReturn> {
    try {
      const fromResult = fromURL(
        asyncapiParser,
        arg.url,
        arg.requestOptions as any,
      );
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
