import { bemClasses } from './bemClasses';

export const createNestedClassName = (
  className: string,
  nested: boolean,
): string =>
  nested
    ? bemClasses.modifier(`nested`, className)
    : bemClasses.element(className);
