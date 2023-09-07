import { parse, parseFromUrl, registerSchemaParser } from '@asyncapi/parser';
import openapiSchemaParser from '@asyncapi/openapi-schema-parser';
import avroSchemaParser from '@asyncapi/avro-schema-parser';
import protoSchemaParser from '@asyncapi/protobuf-schema-parser';

import { ErrorObject, ParserReturn, FetchingSchemaInterface } from '../types';

import { VALIDATION_ERRORS_TYPE } from '../constants';

type ParseDocument = (content: string | any, options?: any) => Promise<any>;

type ParseDocumentFromURL = (
  url: string,
  requestOptions?: RequestInit,
  options?: any,
) => Promise<any>;

registerSchemaParser(openapiSchemaParser);
registerSchemaParser(avroSchemaParser);
registerSchemaParser(protoSchemaParser);

export class Parser {
  private parseSchema: ParseDocument;
  private parseSchemaFromURL: ParseDocumentFromURL;

  constructor() {
    this.parseSchema = parse;
    this.parseSchemaFromURL = parseFromUrl;
  }

  async parse(
    content: string | any,
    parserOptions?: any,
  ): Promise<ParserReturn> {
    try {
      const data = await this.parseSchema(content, parserOptions);
      return this.extractDocument(data);
    } catch (err) {
      return this.handleError(err as ErrorObject);
    }
  }

  async parseFromUrl(
    arg: FetchingSchemaInterface,
    parserOptions?: any,
  ): Promise<ParserReturn> {
    try {
      const data = await this.parseSchemaFromURL(
        arg.url,
        arg.requestOptions,
        parserOptions,
      );
      return this.extractDocument(data);
    } catch (err) {
      return this.handleError(err as ErrorObject);
    }
  }

  private handleError = (err: ErrorObject): ParserReturn => {
    if (err.type === VALIDATION_ERRORS_TYPE) {
      return {
        data: err.parsedJSON || null,
        error: err,
      };
    }

    return { data: null, error: err };
  };

  private extractDocument = (data: any): ParserReturn => {
    if (data.json instanceof Function) {
      return {
        data: data.json(),
      };
    }
    if (typeof data._json === 'object') {
      return {
        data: data._json,
      };
    }
    return {
      data,
    };
  };
}
