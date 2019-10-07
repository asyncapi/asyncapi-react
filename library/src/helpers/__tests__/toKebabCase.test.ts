import { toKebabCase } from '../toKebabCase';

describe('toKebabCase', () => {
  test('should return empty string if input is empty string', () => {
    expect('').toEqual(toKebabCase(''));
  });

  test('should return empty string if input is undefined', () => {
    expect('').toEqual(toKebabCase(undefined));
  });

  test('should work with `lorem ipsum BIG-letter @!#$% something`', () => {
    const testString = 'lorem ipsum BIG-letter @!#$% something';
    const ret = 'lorem-ipsum-big-letter-something';

    expect(ret).toEqual(toKebabCase(testString));
  });
});
