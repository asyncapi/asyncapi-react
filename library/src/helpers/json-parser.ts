export const parse = <T extends {}>(str?: string): T => {
  if (!str) return {} as T;

  try {
    return JSON.parse(str) as T;
  } catch (e) {
    return {} as T;
  }
};

export const stringify = <T extends {}>(content?: T): string => {
  if (!content) '';

  try {
    return JSON.stringify(content);
  } catch (e) {
    return '';
  }
};
