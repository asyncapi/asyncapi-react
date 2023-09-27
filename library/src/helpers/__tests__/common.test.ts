import { CommonHelpers } from '../common';

describe('CommonHelpers', () => {
  describe('.getIdentifier', () => {
    test('should return identifier without config argument', () => {
      const result = CommonHelpers.getIdentifier('test');
      expect(result).toEqual(`test`);
    });

    test('should return identifier without config argument', () => {
      const result = CommonHelpers.getIdentifier('test', {
        schemaID: 'prefix-id',
      });
      expect(result).toEqual(`prefix-id-test`);
    });
  });
});
