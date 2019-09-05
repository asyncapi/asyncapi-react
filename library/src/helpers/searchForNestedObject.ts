export const searchForNestedObject = (
  input: Record<string, any>,
  key: string,
): Record<string, any> | null => {
  if (!input) {
    return null;
  }
  if (input.hasOwnProperty(key)) {
    return input;
  }

  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < Object.keys(input).length; i++) {
    const nextInputObject = input[Object.keys(input)[i]];

    if (typeof nextInputObject === 'object') {
      const o = searchForNestedObject(nextInputObject, key);
      if (o !== null) {
        return o;
      }
    }
  }
  return null;
};
