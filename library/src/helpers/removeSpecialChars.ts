export function removeSpecialChars(str?: string): string {
  if (!str) {
    return '';
  }
  return str.replace(/[^\w\s]/gi, '').replace(/[0-9]/gi, '');
}
