import {
  ParserErrorUnsupportedVersion,
  ParserErrorNoJS,
} from 'asyncapi-parser';

import {
  AsyncAPI,
  ParserReturn,
  FetchingSchemaInterface,
  AsyncApiProps,
} from '../types';

import { UNSUPPORTED_SCHEMA_VERSION } from '../constants';

type ParserOptions = AsyncApiProps['parserOptions'];

type ParseDocument = (
  content: string | any,
  parserOptions?: ParserOptions,
) => Promise<AsyncAPI>;

type ParseDocumentFromURL = (
  url: string,
  requestOptions?: RequestInit,
  parserOptions?: ParserOptions,
) => Promise<AsyncAPI>;

export default class Parser {
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
      const data: AsyncAPI = await this.parseSchema(content, parserOptions);
      return { data };
    } catch (err) {
      return this.handleError(err);
    }
  }

  async parseFromUrl(
    arg: FetchingSchemaInterface,
    parserOptions?: ParserOptions,
  ): Promise<ParserReturn> {
    try {
      const data: AsyncAPI = await this.parseSchemaFromURL(
        arg.url,
        arg.requestOptions,
        parserOptions,
      );
      return { data };
    } catch (err) {
      return this.handleError(err);
    }
  }

  handleError = (err: any): ParserReturn => {
    if (
      err instanceof ParserErrorUnsupportedVersion ||
      err instanceof ParserErrorNoJS
    ) {
      return { data: null, error: { message: err.message } };
    }

    if (err.parsedJSON && err.parsedJSON.asyncapi.startsWith('1')) {
      return {
        data: null,
        error: { message: UNSUPPORTED_SCHEMA_VERSION },
      };
    }

    return {
      data: err.parsedJSON || null,
      error: { message: err.message, validationError: err.errors },
    };
  };
}
