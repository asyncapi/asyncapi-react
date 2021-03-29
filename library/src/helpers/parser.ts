import { parse, parseFromUrl, registerSchemaParser } from '@asyncapi/parser';
import openapiSchemaParser from '@asyncapi/openapi-schema-parser';
import avroSchemaParser from '@asyncapi/avro-schema-parser';

import { ErrorObject, ParserReturn, FetchingSchemaInterface } from '../types';

import { VALIDATION_ERRORS_TYPE } from '../constants';

registerSchemaParser(openapiSchemaParser);
registerSchemaParser(avroSchemaParser);

class Parser {
  async parse(
    content: string | any,
    parserOptions?: any,
  ): Promise<ParserReturn> {
    try {
      const asyncapi = await parse(content, parserOptions);
      return { asyncapi };
    } catch (err) {
      return this.handleError(err);
    }
  }

  async parseFromUrl(
    arg: FetchingSchemaInterface,
    parserOptions?: any,
  ): Promise<ParserReturn> {
    try {
      const asyncapi = await parseFromUrl(
        arg.url,
        arg.requestOptions,
        parserOptions,
      );
      return { asyncapi };
    } catch (err) {
      return this.handleError(err);
    }
  }

  private handleError = (err: ErrorObject): ParserReturn => {
    if (err.type === VALIDATION_ERRORS_TYPE) {
      return {
        error: err,
      };
    }
    return { error: err };
  };
}

export const parser = new Parser();
