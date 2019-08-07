export interface FetchingSchemaInterface {
  url: string;
  requestOptions?: RequestInit;
}

export function isFetchingSchemaInterface(schema: any) {
  return (schema as FetchingSchemaInterface).url !== undefined;
}

const defaultRequestOptions: RequestInit = {
  method: 'GET',
};

export const fetchSchema = async ({
  url,
  requestOptions = defaultRequestOptions,
}: FetchingSchemaInterface): Promise<any> =>
  fetch(url, requestOptions).then(handleResponse);

function handleResponse(response: any) {
  return response.text().then((data: string) => data);
}
