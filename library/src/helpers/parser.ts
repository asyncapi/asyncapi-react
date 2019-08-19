import { FetchingSchemaInterface, defaultRequestOptions } from './fetchSchema';
import { ErrorObject } from 'ajv';
import { parse, parseUrl } from 'asyncapi-parser';

import { AsyncApi } from '../types';

const UNSUPPORTED_SCHEMA_VERSION = 'AsyncAPI version is missing or unsupported';

export interface ParserError {
  message: string;
  validationError?: ErrorObject[] | null;
}

export interface ParserReturn {
  data: AsyncApi | null;
  error?: ParserError;
}

class Parser {
  async parse(content: string): Promise<ParserReturn> {
    try {
      const { _json }: { _json: AsyncApi } = await parse(content);

      if (!this.validateSchemaVersion(_json.asyncapi)) {
        return { data: null, error: { message: UNSUPPORTED_SCHEMA_VERSION } };
      }
      return { data: _json as AsyncApi };
    } catch (err) {
      const parsedSchema = err.parsedJSON;

      if (!this.validateSchemaVersion(parsedSchema.asyncapi, err.message)) {
        return { data: null, error: { message: err.message } };
      }

      return {
        data: parsedSchema || null,
        error: { message: err.message, validationError: err.errors },
      };
    }
  }

  async parseFromUrl(arg: FetchingSchemaInterface): Promise<ParserReturn> {
    try {
      const data: AsyncApi = await parseUrl(
        arg.url,
        arg.requestOptions || defaultRequestOptions,
      );

      if (!this.validateSchemaVersion(data.asyncapi)) {
        return { data: null, error: { message: UNSUPPORTED_SCHEMA_VERSION } };
      }

      return { data };
    } catch (err) {
      const parsedSchema = err.parsedJSON;
      if (!this.validateSchemaVersion(parsedSchema.asyncapi, err.message)) {
        return { data: null, error: { message: err.message } };
      }

      return {
        data: err.parsedJSON || null,
        error: { message: err.message, validationError: err.errors },
      };
    }
  }

  validateSchemaVersion = (version: string, errorMsg?: string): boolean => {
    if (
      version.startsWith('1') ||
      // I don't like this but for now it can stay, to be discussed during review
      (errorMsg && errorMsg.startsWith(UNSUPPORTED_SCHEMA_VERSION))
    ) {
      return false;
    }
    return true;
  };
}

export const parser = new Parser();
