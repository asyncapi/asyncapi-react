import { FetchingSchemaInterface, defaultRequestOptions } from './fetchSchema';
import { ErrorObject } from 'ajv';
import { parse, parseUrl } from 'asyncapi-parser';

import { AsyncApi } from '../types';

export interface ParserReturn {
  data: AsyncApi | null;
  error?: ErrorObject[] | null;
}

class Parser {
  async parse(content: string): Promise<ParserReturn> {
    try {
      const data = (await parse(content)) as AsyncApi;

      return { data };
    } catch (err) {
      console.error(err);
      return {
        data: err.parsedJSON || null,
        error: err.errors,
      };
    }
  }

  async parseFromUrl(arg: FetchingSchemaInterface): Promise<ParserReturn> {
    try {
      const data: AsyncApi = await parseUrl(
        arg.url,
        arg.requestOptions || defaultRequestOptions,
      );
      return { data };
    } catch (err) {
      console.error(err);

      return {
        data: err.parsedJSON || null,
        error: err.errors,
      };
    }
  }
}

export const parser = new Parser();
