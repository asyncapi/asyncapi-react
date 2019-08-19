export interface FetchingSchemaInterface {
  url: string;
  requestOptions?: RequestInit;
}

export function isFetchingSchemaInterface(
  schema: FetchingSchemaInterface | string,
): schema is FetchingSchemaInterface {
  return (schema as FetchingSchemaInterface).url !== undefined;
}

export const defaultRequestOptions: RequestInit = {
  method: 'GET',
};
