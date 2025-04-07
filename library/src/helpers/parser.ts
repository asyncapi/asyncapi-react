import type { Diagnostic, DiagnosticSeverity } from '@asyncapi/parser';
import { Parser as AsyncapiParser, fromURL } from '@asyncapi/parser';
import { OpenAPISchemaParser } from '@asyncapi/openapi-schema-parser';
import { ProtoBuffSchemaParser } from '@asyncapi/protobuf-schema-parser';
import { AvroSchemaParser } from '@asyncapi/avro-schema-parser';

import type {
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
      const { document, diagnostics } = await asyncapiParser.parse(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        content,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        parserOptions,
      );

      if (document === undefined) {
        throw this.convertDiagnosticToErrorObject(diagnostics, [0]);
      }

      return { asyncapi: document };
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
      const { document, diagnostics } = await fromResult.parse(parserOptions);

      if (document == undefined) {
        // this means there are errors in the document.
        // so we gather all the severity 0 diagnostics and throw them as errors
        throw this.convertDiagnosticToErrorObject(diagnostics, [0]);
      }

      return { asyncapi: document, error: undefined };
    } catch (err) {
      return this.handleError(err as ErrorObject);
    }
  }

  static readonly convertDiagnosticToErrorObject = (
    diagnostics: Diagnostic[],
    severities: DiagnosticSeverity[],
  ): ErrorObject => {
    const error: ErrorObject = {
      title: 'There are errors in your Asyncapi document',
      type: 'VALIDATION_ERRORS_TYPE',
      validationErrors: [],
    };
    diagnostics.forEach((diagnostic) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      if (severities.includes(diagnostic.severity)) {
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
    return error;
  };

  private static handleError = (err: ErrorObject): ParserReturn => {
    if (err.type === VALIDATION_ERRORS_TYPE) {
      return {
        error: err,
      };
    }
    return { error: err };
  };
}
