import { SchemaV2 } from '@asyncapi/parser';
import {
  SchemaHelpers,
  SchemaCustomTypes,
  JsonSchemaModel,
} from '../schema-no-parser';

describe('SchemaHelpers no-parser utilities', () => {
  test('formats a parsed schema without constructing a parser model', () => {
    const schema = new SchemaV2({
      type: 'string',
      minLength: 2,
      maxLength: 10,
    });

    expect(SchemaHelpers.toSchemaType(schema)).toBe('string');
    expect(SchemaHelpers.humanizeConstraints(schema)).toEqual([
      '[ 2 .. 10 ] characters',
    ]);
  });

  test('returns parsed dependent schemas as separate models', () => {
    const schema = new SchemaV2({
      type: 'object',
      dependencies: {
        credit_card: {
          type: 'object',
          properties: {
            billing_address: { type: 'string' },
          },
        },
      },
    });

    const dependentSchemas = SchemaHelpers.getDependentSchemaModels(schema);

    expect(dependentSchemas?.credit_card).toBeDefined();
    // the parser exposes schema-valued dependencies as models; they must be passed
    // through so their properties stay reachable
    expect(
      dependentSchemas?.credit_card?.properties()?.billing_address?.type(),
    ).toBe('string');
    expect(SchemaHelpers.hasConditions(schema)).toBe(true);
    expect(SchemaCustomTypes.ANY).toBe('any');
  });

  describe('toSchemaType', () => {
    test('handles boolean schemas', () => {
      expect(new JsonSchemaModel(true).isBooleanSchema()).toBe(true);
      expect(SchemaHelpers.toSchemaType(new JsonSchemaModel(true))).toBe(
        SchemaCustomTypes.ANY,
      );
      expect(SchemaHelpers.toSchemaType(new JsonSchemaModel(false))).toBe(
        SchemaCustomTypes.NEVER,
      );
    });

    test('handles empty object schemas', () => {
      expect(SchemaHelpers.toSchemaType(new JsonSchemaModel({}))).toBe(
        SchemaCustomTypes.ANY,
      );
    });

    test('handles schemas with a single type', () => {
      expect(
        SchemaHelpers.toSchemaType(new JsonSchemaModel({ type: 'string' })),
      ).toBe('string');
    });

    test('handles schemas with multiple types', () => {
      expect(
        SchemaHelpers.toSchemaType(
          new JsonSchemaModel({ type: ['string', 'null'] }),
        ),
      ).toBe('string | null');
    });

    test('handles schemas without an explicit type', () => {
      expect(
        SchemaHelpers.toSchemaType(
          new JsonSchemaModel({ properties: { a: { type: 'string' } } }),
        ),
      ).toBe(SchemaCustomTypes.RESTRICTED_ANY);
    });

    test('handles invalid type values without throwing', () => {
      const model = new JsonSchemaModel({ type: 42 });
      expect(typeof SchemaHelpers.toSchemaType(model)).toBe('string');
    });

    test('handles unexpected raw values without throwing', () => {
      for (const raw of [null, undefined, 42, true, 'text', [1, 2]]) {
        expect(() =>
          SchemaHelpers.toSchemaType(new JsonSchemaModel(raw)),
        ).not.toThrow();
      }
      expect(SchemaHelpers.toSchemaType(new JsonSchemaModel(null))).toBe(
        SchemaCustomTypes.ANY,
      );
      expect(SchemaHelpers.toSchemaType(new JsonSchemaModel([1, 2]))).toBe(
        SchemaCustomTypes.ANY,
      );
    });
  });

  describe('type inference', () => {
    test('infers null for const: null', () => {
      expect(
        SchemaHelpers.toSchemaType(new JsonSchemaModel({ const: null })),
      ).toBe('null');
    });

    test('infers null when enum values contain null', () => {
      expect(
        SchemaHelpers.toSchemaType(new JsonSchemaModel({ enum: [null] })),
      ).toBe('null');
      expect(
        SchemaHelpers.toSchemaType(new JsonSchemaModel({ enum: [null, 'a'] })),
      ).toBe('null | string');
    });

    test('preserves inference for primitives', () => {
      expect(
        SchemaHelpers.toSchemaType(new JsonSchemaModel({ const: 5 })),
      ).toBe('number');
      expect(
        SchemaHelpers.toSchemaType(new JsonSchemaModel({ const: true })),
      ).toBe('boolean');
      expect(
        SchemaHelpers.toSchemaType(new JsonSchemaModel({ enum: ['a', 'b'] })),
      ).toBe('string');
    });
  });

  describe('nested structures', () => {
    test('exposes nested object properties', () => {
      const schema = new JsonSchemaModel({
        type: 'object',
        properties: {
          id: { type: 'string' },
          nested: {
            type: 'object',
            properties: { count: { type: 'integer' } },
          },
        },
      });

      expect(schema.properties()?.id?.type()).toBe('string');
      expect(schema.properties()?.nested?.properties()?.count?.type()).toBe(
        'integer',
      );
    });

    test('renders array item types', () => {
      expect(
        SchemaHelpers.toSchemaType(
          new JsonSchemaModel({ type: 'array', items: { type: 'number' } }),
        ),
      ).toBe('array<number>');
    });

    test('renders tuple item types', () => {
      expect(
        SchemaHelpers.toSchemaType(
          new JsonSchemaModel({
            type: 'array',
            items: [{ type: 'string' }, { type: 'number' }],
          }),
        ),
      ).toBe('tuple<string, number>');
    });
  });

  describe('circular references', () => {
    test('stops type formatting at a self-referential edge', () => {
      const circular: Record<string, unknown> = { type: 'array' };
      circular.items = circular;

      const model = new JsonSchemaModel(circular);
      expect(model.isCircular()).toBe(false);
      expect(SchemaHelpers.toSchemaType(model)).toBe('array<array>');
    });

    test('does not treat a schema reused in sibling branches as circular', () => {
      const shared = { type: 'string' };
      const model = new JsonSchemaModel({
        type: 'object',
        properties: { first: shared, second: shared },
      });

      expect(model.properties()?.first?.isCircular()).toBe(false);
      expect(model.properties()?.second?.isCircular()).toBe(false);
    });
  });

  describe('applicators', () => {
    test('reports combined types for oneOf, anyOf and allOf', () => {
      const nested = [{ type: 'string' }];
      expect(
        SchemaHelpers.toSchemaType(new JsonSchemaModel({ oneOf: nested })),
      ).toBe('oneOf');
      expect(
        SchemaHelpers.toSchemaType(new JsonSchemaModel({ anyOf: nested })),
      ).toBe('anyOf');
      expect(
        SchemaHelpers.toSchemaType(new JsonSchemaModel({ allOf: nested })),
      ).toBe('allOf');
    });

    test('reports never for `not: {}` schemas', () => {
      expect(SchemaHelpers.toSchemaType(new JsonSchemaModel({ not: {} }))).toBe(
        SchemaCustomTypes.NEVER,
      );
    });
  });

  describe('isExpandable', () => {
    test('is expandable for object and array types', () => {
      expect(
        SchemaHelpers.isExpandable(new JsonSchemaModel({ type: 'object' })),
      ).toBe(true);
      expect(
        SchemaHelpers.isExpandable(new JsonSchemaModel({ type: 'array' })),
      ).toBe(true);
    });

    test('is expandable for applicators and nested schemas', () => {
      const nested = [{ type: 'string' }];
      expect(
        SchemaHelpers.isExpandable(new JsonSchemaModel({ oneOf: nested })),
      ).toBe(true);
      expect(
        SchemaHelpers.isExpandable(new JsonSchemaModel({ anyOf: nested })),
      ).toBe(true);
      expect(
        SchemaHelpers.isExpandable(new JsonSchemaModel({ allOf: nested })),
      ).toBe(true);
      expect(
        SchemaHelpers.isExpandable(
          new JsonSchemaModel({ not: { type: 'string' } }),
        ),
      ).toBe(true);
      expect(
        SchemaHelpers.isExpandable(
          new JsonSchemaModel({ propertyNames: { type: 'string' } }),
        ),
      ).toBe(true);
      expect(
        SchemaHelpers.isExpandable(
          new JsonSchemaModel({ contains: { type: 'string' } }),
        ),
      ).toBe(true);
      expect(
        SchemaHelpers.isExpandable(
          new JsonSchemaModel({ properties: { a: { type: 'string' } } }),
        ),
      ).toBe(true);
    });

    test('is not expandable for plain scalars and unexpected values', () => {
      expect(
        SchemaHelpers.isExpandable(new JsonSchemaModel({ type: 'string' })),
      ).toBe(false);
      expect(SchemaHelpers.isExpandable(new JsonSchemaModel(null))).toBe(false);
      expect(SchemaHelpers.isExpandable(new JsonSchemaModel([1, 2]))).toBe(
        false,
      );
    });
  });

  describe('jsonToSchema schema detection', () => {
    test('detects schemas declared via keyword without an explicit type', () => {
      expect(
        SchemaHelpers.jsonToSchema({ properties: { a: { type: 'string' } } })
          .properties()
          ?.a?.type(),
      ).toBe('string');
      expect(SchemaHelpers.jsonToSchema({ $ref: '#/x' }).$ref()).toBe('#/x');
      expect(SchemaHelpers.jsonToSchema({ enum: ['a', 'b'] }).enum()).toEqual([
        'a',
        'b',
      ]);
      expect(SchemaHelpers.jsonToSchema({ const: 'x' }).const()).toBe('x');
      expect(
        SchemaHelpers.jsonToSchema({ items: { type: 'string' } }).items(),
      ).toBeInstanceOf(JsonSchemaModel);
    });

    test('detects valid single and multiple types', () => {
      expect(SchemaHelpers.jsonToSchema({ type: 'string' }).type()).toBe(
        'string',
      );
      expect(
        SchemaHelpers.jsonToSchema({ type: ['string', 'number'] }).type(),
      ).toEqual(['string', 'number']);
      expect(
        SchemaHelpers.jsonToSchema({ type: ['string', 'null'] }).type(),
      ).toEqual(['string', 'null']);
    });

    test('does not treat invalid type values as schemas', () => {
      const invalidSingle = SchemaHelpers.jsonToSchema({ type: 'invalid' });
      expect(invalidSingle.type()).toBe('object');
      expect(invalidSingle.properties()?.type).toBeDefined();

      const invalidArray = SchemaHelpers.jsonToSchema({
        type: ['string', 'invalid'],
      });
      expect(invalidArray.type()).toBe('object');
      expect(invalidArray.properties()?.type).toBeDefined();
    });

    test('keeps extension objects with schema-like data as raw values', () => {
      const model = SchemaHelpers.jsonToRawValueSchema({
        minLength: 3,
        owner: 'billing',
      });

      expect(model.type()).toBe('object');
      expect(model.properties()?.minLength?.const()).toBe('3');
      expect(model.properties()?.owner?.const()).toBe('billing');
      expect(SchemaHelpers.humanizeConstraints(model)).toEqual([]);
    });
    test('does not treat arbitrary JSON objects as schemas', () => {
      const model = SchemaHelpers.jsonToSchema({ name: 'John', age: 30 });
      expect(model.type()).toBe('object');
      expect(model.properties()?.name?.const()).toBe('John');
    });

    test('does not treat extension objects with validation keywords as schemas', () => {
      const model = SchemaHelpers.jsonToSchema({
        minLength: 3,
        owner: 'billing',
      });
      expect(model.type()).toBe('object');
      expect(model.properties()?.minLength).toBeDefined();
      expect(model.properties()?.owner?.const()).toBe('billing');
    });
  });

  describe('jsonToSchema runtime safety', () => {
    test('throws on direct circular references', () => {
      const circular: Record<string, unknown> = { key: 'value' };
      circular.self = circular;
      expect(() => SchemaHelpers.jsonToSchema(circular)).toThrow(
        'too much recursion. Please check document for recursion.',
      );
    });

    test('throws on indirect circular references', () => {
      const a: Record<string, unknown> = { name: 'a' };
      const b: Record<string, unknown> = { name: 'b', ref: a };
      a.ref = b;
      expect(() => SchemaHelpers.jsonToSchema(a)).toThrow(
        'too much recursion. Please check document for recursion.',
      );
    });

    test('does not throw when the same schema is shared in sibling branches', () => {
      const shared = { type: 'string', minLength: 1 };
      const value = {
        branch1: { c1: shared },
        branch2: { c2: shared },
      };
      expect(() => SchemaHelpers.jsonToSchema(value)).not.toThrow();
    });

    test('handles null and undefined entries without throwing', () => {
      expect(() =>
        SchemaHelpers.jsonToSchema({ a: null, b: 'x' }),
      ).not.toThrow();
      expect(() =>
        SchemaHelpers.jsonToSchema({ a: undefined, b: 42 }),
      ).not.toThrow();
    });
  });
});
