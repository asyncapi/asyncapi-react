import { parse as parseYaml } from 'yaml';

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

const canonicalizeServerValue = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(canonicalizeServerValue);
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, nestedValue]) => [
          key,
          canonicalizeServerValue(nestedValue),
        ]),
    );
  }
  return value;
};

/**
 * Whether the schema in the editor describes a WebSocket API, i.e. declares a server using the
 * ws or wss protocol. The editor holds JSON or YAML text, so parse it before inspecting only the
 * top-level servers collection.
 */
export const isWebSocketSchema = (schema?: string): boolean => {
  return getWebSocketServerFingerprint(schema) !== undefined;
};

/** A stable lifecycle key for the WebSocket servers declared by the active schema. */
export const getWebSocketServerFingerprint = (
  schema?: string,
): string | undefined => {
  if (!schema) {
    return undefined;
  }

  try {
    const parsed = parseYaml(schema) as {
      servers?: Record<string, { protocol?: string } | undefined>;
    } | null;
    const servers = parsed?.servers ?? {};
    const hasWebSocketServer = Object.values(servers).some((server) =>
      isWebSocketProtocol(server?.protocol),
    );
    if (!hasWebSocketServer) return undefined;

    // Server declaration order determines the plugin's initial target and menu order. Field order
    // inside each definition is not semantic, so normalize only the values of these entries.
    return JSON.stringify(
      Object.entries(servers).map(([name, server]) => [
        name,
        canonicalizeServerValue(server),
      ]),
    );
  } catch {
    return undefined;
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
