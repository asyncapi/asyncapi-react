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

const isWebSocketProtocol = (protocol?: string): boolean =>
  protocol === 'ws' || protocol === 'wss';

/**
 * Whether the schema in the editor describes a WebSocket API, i.e. declares a server using the
 * ws or wss protocol. The editor holds raw text, so this reads it as JSON when it can and falls
 * back to scanning YAML. It only decides whether to register the WebSocket plugin, so a wrong
 * guess costs a panel rather than correctness.
 */
export const isWebSocketSchema = (schema?: string): boolean => {
  if (!schema) {
    return false;
  }

  try {
    const parsed = JSON.parse(schema) as {
      servers?: Record<string, { protocol?: string } | undefined>;
    };
    return Object.values(parsed.servers ?? {}).some((server) =>
      isWebSocketProtocol(server?.protocol),
    );
  } catch {
    // YAML, e.g. `protocol: wss` or `protocol: 'ws'`.
    return /^\s*protocol:\s*['"]?wss?['"]?\s*$/m.test(schema);
  }
};

export const fetchSchema = async (link: string): Promise<unknown> => {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(link, requestOptions).then(handleResponse);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleResponse(response: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  return response.text().then((data: string) => data);
}

export function debounce(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  func: (...args: any[]) => void,
  wait: number,
  onStart: () => void,
  onCancel: () => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): () => any {
  let timeout: NodeJS.Timeout | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
