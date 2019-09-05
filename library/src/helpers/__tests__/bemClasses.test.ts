import { CSS_PREFIX } from '../../constants';
import { bemClasses } from '../bemClasses';

describe('bemClasses', () => {
  describe('element', () => {
    test('should be equal', () => {
      const element = `foo-bar`;
      const expectedClassName = `${CSS_PREFIX}__${element}`;

      expect(bemClasses.element(element)).toBe(expectedClassName);
    });

    test('should be empty', () => {
      const element = ``;
      const expectedClassName = ``;

      expect(bemClasses.element(element)).toBe(expectedClassName);
    });
  });

  describe('modifier', () => {
    test('should be equal with element', () => {
      const modifier = `modifier`;
      const element = `element`;
      const expectedClassName = `${CSS_PREFIX}__${element}--${modifier}`;

      expect(bemClasses.modifier(modifier, element)).toBe(expectedClassName);
    });

    test('should be equal without element', () => {
      const modifier = `modifier`;
      const expectedClassName = `${CSS_PREFIX}--${modifier}`;

      expect(bemClasses.modifier(modifier)).toBe(expectedClassName);
    });

    test('should be empty', () => {
      const modifier = ``;
      const expectedClassName = ``;

      expect(bemClasses.modifier(modifier)).toBe(expectedClassName);
    });
  });

  describe('concatenate', () => {
    test('should return empty string if input is empty array', () => {
      const arr: string[] = [];
      const expectedClassName = ``;

      expect(bemClasses.concatenate(arr)).toBe(expectedClassName);
    });

    test('should return empty string if input is empty array', () => {
      const arr: string[] = [`foo`, `bar`];
      const expectedClassName = `foo bar`;

      expect(bemClasses.concatenate(arr)).toBe(expectedClassName);
    });

    test('should filter false values from input array', () => {
      const arr: string[] = [`foo`, `bar`, ``];
      const expectedClassName = `foo bar`;

      expect(bemClasses.concatenate(arr)).toBe(expectedClassName);
    });
  });
});
