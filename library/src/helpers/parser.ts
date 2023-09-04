import { Parser as AsyncapiParser, fromURL } from '@asyncapi/parser';
import { OpenAPISchemaParser } from '@asyncapi/openapi-schema-parser';
import { AvroSchemaParser } from '@asyncapi/avro-schema-parser';
// @ts-ignore
import protoSchemaParser from '@asyncapi/protobuf-schema-parser';

import { ErrorObject, ParserReturn, FetchingSchemaInterface } from '../types';

import { VALIDATION_ERRORS_TYPE } from '../constants';

const asyncapiParser = new AsyncapiParser();
asyncapiParser.registerSchemaParser(OpenAPISchemaParser());
asyncapiParser.registerSchemaParser(AvroSchemaParser());
// Waiting for schema parser to be upgraded
// asyncapiParser.registerSchemaParser(protoSchemaParser);

export class Parser {
  static async parse(
    content: string | any,
    parserOptions?: any,
  ): Promise<ParserReturn> {
    try {
      const { document } = await asyncapiParser.parse(content, parserOptions);
      return { asyncapi: document };
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
