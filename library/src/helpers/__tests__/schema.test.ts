import { SchemaHelpers } from '../schema';

// @ts-ignore
import Schema from '@asyncapi/parser/lib/models/schema';

describe('SchemaHelpers', () => {
  describe('.toSchemaType', () => {
    test('should handle true schemas', () => {
      const result = SchemaHelpers.toSchemaType(true);
      expect(result).toEqual(`any`);
    });

    test('should handle empty schema', () => {
      const schema = new Schema({});
      const result = SchemaHelpers.toSchemaType(schema);
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
      const schema = new Schema({ type: ['string', 'boolean', 'number'] });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(`string | boolean | number`);
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

    test(`shouldn't infer number type when explicit is defined only integer type`, () => {
      const schema = new Schema({ type: 'integer', multipleOf: 2 });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(`integer`);
    });

    test(`should handle integer and number types together`, () => {
      const schema = new Schema({ type: ['integer', 'number'] });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(`number`);
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

  describe('.humanizeConstraints', () => {
    test('should handle number/integer inclusive range', () => {
      const schema = new Schema({ minimum: 2, maximum: 5 });
      const result = SchemaHelpers.humanizeConstraints(schema);
      expect(result).toEqual(['[ 2 .. 5 ]']);
    });

    test('should handle number/integer exclusive range', () => {
      const schema = new Schema({ minimum: 2, exclusiveMaximum: 5 });
      const result = SchemaHelpers.humanizeConstraints(schema);
      expect(result).toEqual(['[ 2 .. 5 )']);
    });

    test('should handle inclusive minimum', () => {
      const schema = new Schema({ minimum: 2 });
      const result = SchemaHelpers.humanizeConstraints(schema);
      expect(result).toEqual(['>= 2']);
    });

    test('should handle inclusive maximum', () => {
      const schema = new Schema({ maximum: 2 });
      const result = SchemaHelpers.humanizeConstraints(schema);
      expect(result).toEqual(['<= 2']);
    });

    test('should handle exclusive minimum', () => {
      const schema = new Schema({ exclusiveMinimum: 5 });
      const result = SchemaHelpers.humanizeConstraints(schema);
      expect(result).toEqual(['> 5']);
    });

    test('should handle exclusive maximum', () => {
      const schema = new Schema({ exclusiveMaximum: 5 });
      const result = SchemaHelpers.humanizeConstraints(schema);
      expect(result).toEqual(['< 5']);
    });

    test('should handle integer multipleOf', () => {
      const schema = new Schema({ multipleOf: 2 });
      const result = SchemaHelpers.humanizeConstraints(schema);
      expect(result).toEqual(['multiple of 2']);
    });

    test('should handle number multipleOf', () => {
      const schema = new Schema({ multipleOf: 1.5 });
      const result = SchemaHelpers.humanizeConstraints(schema);
      expect(result).toEqual(['multiple of 1.5']);
    });

    test('should handle min length', () => {
      const schema = new Schema({ minLength: 2 });
      const result = SchemaHelpers.humanizeConstraints(schema);
      expect(result).toEqual(['>= 2 characters']);
    });

    test('should handle max length', () => {
      const schema = new Schema({ maxLength: 2 });
      const result = SchemaHelpers.humanizeConstraints(schema);
      expect(result).toEqual(['<= 2 characters']);
    });

    test('should handle min items', () => {
      const schema = new Schema({ minItems: 2 });
      const result = SchemaHelpers.humanizeConstraints(schema);
      expect(result).toEqual(['>= 2 items']);
    });

    test('should handle max items', () => {
      const schema = new Schema({ maxItems: 2 });
      const result = SchemaHelpers.humanizeConstraints(schema);
      expect(result).toEqual(['<= 2 items']);
    });

    test('should handle unique items', () => {
      const schema = new Schema({ maxItems: 2, uniqueItems: true });
      const result = SchemaHelpers.humanizeConstraints(schema);
      expect(result).toEqual(['<= 2 unique items']);
    });

    test('should handle min properties', () => {
      const schema = new Schema({ minProperties: 2 });
      const result = SchemaHelpers.humanizeConstraints(schema);
      expect(result).toEqual(['>= 2 properties']);
    });

    test('should handle max properties', () => {
      const schema = new Schema({ maxProperties: 2 });
      const result = SchemaHelpers.humanizeConstraints(schema);
      expect(result).toEqual(['<= 2 properties']);
    });
  });
});
