import { SchemaHelpers } from '../schema';

// @ts-ignore
import Schema from '@asyncapi/parser/lib/models/schema';

describe('SchemaHelpers', () => {
  describe('.toSchemaType', () => {
    test('should handle true schemas', () => {
      const result = SchemaHelpers.toSchemaType(true);
      expect(result).toEqual(`any`);
    });

    test('should handle false schemas', () => {
      const result = SchemaHelpers.toSchemaType(false);
      expect(result).toEqual(`never`);
    });

    test('should handle flat types', () => {
      const schema = new Schema({ type: 'string' });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(`string`);
    });

    test('should handle union types', () => {
      const schema = new Schema({ type: ['string', 'integer', 'number'] });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(`string | integer | number`);
    });

    test('should infer types', () => {
      const schema = new Schema({
        pattern: '^foo',
        properties: {},
        items: { multipleOf: 2 },
      });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(`string | array<number> | object`);
    });

    test('should handle union types in array', () => {
      const schema = new Schema({ items: { multipleOf: 2, type: 'string' } });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(`array<string | number>`);
    });

    test('should handle tuple types', () => {
      const schema = new Schema({
        items: [{ properties: {} }, { pattern: '^foo' }, {}],
      });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(`array<object, string, any>`);
    });

    test('should handle tuple types', () => {
      const schema = new Schema({
        items: [{ properties: {} }, { pattern: '^foo' }, {}],
      });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(`array<object, string, any>`);
    });

    test('should handle combined types', () => {
      const schema = new Schema({ type: 'string', oneOf: [] });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(`string oneOf`);
    });
  });

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
