export function toKebabCase(str?: string): string {
  if (!str) {
    return '';
  }

  const matched = str.match(
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
  );

  if (matched) {
    return matched.map(x => x.toLowerCase()).join('-');
  }

  return str;
}
