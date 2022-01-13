import { AsyncAPIDocument } from '@asyncapi/parser';

export type PropsSchema =
  | string
  | FetchingSchemaInterface
  | AsyncAPIDocument
  | object;

export type NullableAsyncApi = AsyncAPIDocument | null;

export interface AsyncApiState {
  validatedSchema: NullableAsyncApi;
  error?: ErrorObject;
}

export function isFetchingSchemaInterface(
  schema: PropsSchema,
): schema is FetchingSchemaInterface {
  return (schema as FetchingSchemaInterface).url !== undefined;
}

export interface FetchingSchemaInterface {
  url: string;
  requestOptions?: RequestInit;
}

export interface ParserReturn {
  asyncapi?: AsyncAPIDocument;
  error?: ErrorObject;
}

export enum PayloadType {
  PUBLISH = 'publish',
  SUBSCRIBE = 'subscribe',
}

export interface MessageExample {
  name?: string;
  summary?: string;
  example: any;
}

export interface ValidationError {
  title: string;
  location: {
    jsonPointer: string;
    startLine: number;
    startColumn: number;
    startOffset: number;
    endLine: number;
    endColumn: number;
    endOffset: number;
  };
}

export interface ErrorObject {
  type: string;
  title: string;
  detail?: string;
  parsedJSON?: any;
  validationErrors?: ValidationError[];
  location?: {
    startLine: number;
    startColumn: number;
    startOffset: number;
  };
  refs?: Array<{
    title: string;
    jsonPointer: string;
    startLine: number;
    startColumn: number;
    startOffset: number;
    endLine: number;
    endColumn: number;
    endOffset: number;
  }>;
}
