import { SchemaHelpers } from '../schema';

describe('SchemaHelpers', () => {
  describe('.prettifyValue', () => {
    test('should handle string', () => {
      const result = SchemaHelpers.prettifyValue('foobar');
      expect(result).toEqual(`"foobar"`);
    });

    test('should handle number', () => {
      const result = SchemaHelpers.prettifyValue(2137);
      expect(result).toEqual(2137);
    });

    test('should handle boolean', () => {
      const result = SchemaHelpers.prettifyValue(false);
      expect(result).toEqual(false);
    });

    test('should handle array', () => {
      const result = SchemaHelpers.prettifyValue(['foobar', 2137, false]);
      expect(result).toEqual('[foobar,2137,false]');
    });

    test('should handle object', () => {
      const result = SchemaHelpers.prettifyValue({ str: 'foobar' });
      expect(result).toEqual(`{"str":"foobar"}`);
    });
  });
});
