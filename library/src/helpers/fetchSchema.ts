export interface FetchingSchemaInterface {
  url: string;
  requestOptions?: RequestInit;
}

export function isFetchingSchemaInterface(
  schema: FetchingSchemaInterface | string,
): schema is FetchingSchemaInterface {
  return (schema as FetchingSchemaInterface).url !== undefined;
}

const defaultRequestOptions: RequestInit = {
  method: 'GET',
};

export const fetchSchema = async ({
  url,
  requestOptions = defaultRequestOptions,
}: FetchingSchemaInterface): Promise<string> =>
  fetch(url, requestOptions).then(handleResponse);

function handleResponse(response: any): string {
  return response.text();
}
