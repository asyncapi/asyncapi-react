import { CSS_PREFIX } from '../../constants';
import { createNestedClassName } from '../createNestedClassName';

describe('createNestedClassName', () => {
  test('should create className with nested modifier', () => {
    const element = `foo-bar`;
    const expectedClassName = `${CSS_PREFIX}__${element}--nested`;

    expect(createNestedClassName(element, true)).toBe(expectedClassName);
  });

  test('should create className without nested suffix', () => {
    const element = `foo-bar`;
    const expectedClassName = `${CSS_PREFIX}__${element}`;

    expect(createNestedClassName(element, false)).toBe(expectedClassName);
  });
});
