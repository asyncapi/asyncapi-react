import { Options as ParserOptions } from 'json-schema-ref-parser';

import { ErrorObject, ParserReturn, FetchingSchemaInterface } from '../types';

import { VALIDATION_ERRORS_TYPE } from '../constants';

type ParseDocument = (
  content: string | any,
  parserOptions?: ParserOptions,
) => Promise<any>;

type ParseDocumentFromURL = (
  url: string,
  requestOptions?: RequestInit,
  parserOptions?: ParserOptions,
) => Promise<any>;

export class Parser {
  private parseSchema: ParseDocument;
  private parseSchemaFromURL: ParseDocumentFromURL;

  constructor(parse: ParseDocument, parseURL: ParseDocumentFromURL) {
    this.parseSchema = parse;
    this.parseSchemaFromURL = parseURL;
  }

  async parse(
    content: string | any,
    parserOptions?: ParserOptions,
  ): Promise<ParserReturn> {
    try {
      const data = await this.parseSchema(content, parserOptions);
      return this.extractDocument(data);
    } catch (err) {
      return this.handleError(err);
    }
  }

  async parseFromUrl(
    arg: FetchingSchemaInterface,
    parserOptions?: ParserOptions,
  ): Promise<ParserReturn> {
    try {
      const data = await this.parseSchemaFromURL(
        arg.url,
        arg.requestOptions,
        parserOptions,
      );
      return this.extractDocument(data);
    } catch (err) {
      return this.handleError(err);
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
    if (data._json instanceof Object) {
      return {
        data: data._json,
      };
    }
    return {
      data,
    };
  };
}
