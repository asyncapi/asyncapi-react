// eslint-disable-next-line @typescript-eslint/ban-types
export const parse = <T extends {}>(str?: string): T => {
  if (!str) {
    return {} as T;
  }

  try {
    return JSON.parse(str) as T;
  } catch (e) {
    return {} as T;
  }
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const stringify = <T extends {}>(content?: T): string => {
  if (!content) {
    return '';
  }

  try {
    return JSON.stringify(content);
  } catch (e) {
    return '';
  }
};

export const fetchSchema = async (link: string): Promise<any> => {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(link, requestOptions).then(handleResponse);
};

function handleResponse(response: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, arrow-body-style
  return response.text().then((data: string) => data);
}

export function debounce(
  func: (...args: any[]) => void,
  wait: number,
  onStart: () => void,
  onCancel: () => void,
): () => any {
  let timeout: NodeJS.Timeout | undefined;
  return (...args: any[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    onStart();
    timeout = setTimeout(() => {
      timeout = undefined;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      func(...args);
      onCancel();
    }, wait || 1000);
  };
}
