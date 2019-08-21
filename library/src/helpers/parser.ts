import {
  parse,
  parseFromUrl as parseUrl,
  ParserErrorUnsupportedVersion,
  ParserErrorNoJS,
} from 'asyncapi-parser';

import { AsyncApi, ParserReturn, FetchingSchemaInterface } from '../types';

// ask tws about this error msg
const UNSUPPORTED_SCHEMA_VERSION =
  'AsyncAPI version is unsupported. Use version 2.0 or higher';

class Parser {
  async parse(content: string): Promise<ParserReturn> {
    try {
      const { _json }: { _json: AsyncApi } = await parse(content);

      if (!this.isCorrectSchemaVersion(_json.asyncapi)) {
        return { data: null, error: { message: UNSUPPORTED_SCHEMA_VERSION } };
      }
      return { data: _json as AsyncApi };
    } catch (err) {
      return this.handleError(err);
    }
  }

  async parseFromUrl(arg: FetchingSchemaInterface): Promise<ParserReturn> {
    try {
      const data: AsyncApi = await parseUrl(arg.url, arg.requestOptions);

      if (!this.isCorrectSchemaVersion(data.asyncapi)) {
        return { data: null, error: { message: UNSUPPORTED_SCHEMA_VERSION } };
      }

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

    if (
      err.parsedJSON &&
      !this.isCorrectSchemaVersion(err.parsedJSON.asyncapi)
    ) {
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

  isCorrectSchemaVersion = (version: string): boolean =>
    !version.startsWith('1');
}

export const parser = new Parser();
