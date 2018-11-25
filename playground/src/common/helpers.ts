export const parse = <T extends {}>(str: string): T => {
  return JSON.parse(str) as T
}

export const stringify = <T extends {}>(content: T): string => {
  return JSON.stringify(content)
}

export const fetchSchema = async (link: string): Promise<any> => {
  const requestOptions = {
    method: 'GET'
  };

  return fetch(link, requestOptions).then(handleResponse);
}

function handleResponse(response: any) {
  return response.text().then((data: string) => data);
}