export interface FetchingSchemaInterface {
  url: string;
  requestOptions?: RequestInit;
}

const defaultRequestOptions: RequestInit = {
  method: 'GET',
};

export const fetchSchema = async ({
  url,
  requestOptions = defaultRequestOptions,
}: FetchingSchemaInterface): Promise<any> => {
  return fetch(url, requestOptions).then(handleResponse);
};

function handleResponse(response: any) {
  return response.text().then((data: string) => data);
}
