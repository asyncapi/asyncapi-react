import { ParameterObject } from '@asyncapi/parser/esm/spec-types/v2';
import { SchemaHelpers, SchemaCustomTypes } from '../schema';
import {
  SchemaV2 as Schema,
  ServerVariableV2 as ServerVariable,
  ChannelParameterV2 as ChannelParameter,
  ChannelParametersV2 as ChannelParameters,
  ServerVariablesV2,
} from '@asyncapi/parser';

describe('SchemaHelpers', () => {
  describe('.toSchemaType', () => {
    test('should handle falsy value', () => {
      const result = SchemaHelpers.toSchemaType(null as any);
      expect(result).toEqual(SchemaCustomTypes.UNKNOWN);
    });

    test('should handle object without .json() function', () => {
      const result = SchemaHelpers.toSchemaType({} as any);
      expect(result).toEqual(SchemaCustomTypes.UNKNOWN);
    });

    test('should handle true schemas', () => {
      const schema = new Schema(true);
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(SchemaCustomTypes.ANY);
    });

    test('should handle empty schema', () => {
      const schema = new Schema({});
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(SchemaCustomTypes.ANY);
    });

    test('should handle schema with non JSON Schema keywords ', () => {
      const schema = new Schema({ foo: 'bar', 'x-ext': 'someExt' });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(SchemaCustomTypes.ANY);
    });

    test('should handle false schemas', () => {
      const schema = new Schema(false);
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(SchemaCustomTypes.NEVER);
    });

    test('should handle empty not schemas', () => {
      const schema = new Schema({ not: {}, type: 'string' });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(SchemaCustomTypes.NEVER);
    });

    test('should handle not schemas with non JSON Schema keywords', () => {
      const schema = new Schema({ not: { foo: 'bar', 'x-ext': 'someExt' } });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(SchemaCustomTypes.NEVER);
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
      expect(result).toEqual(SchemaCustomTypes.RESTRICTED_ANY);
    });

    test('should handle union types in array', () => {
      const schema = new Schema({
        type: 'array',
        items: { type: ['string', 'number'] },
      });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(`array<string | number>`);
    });

    test('should handle empty array type', () => {
      const schema = new Schema({
        type: 'array',
      });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(`array<${SchemaCustomTypes.ANY}>`);
    });

    test('should handle tuple types', () => {
      const schema = new Schema({
        type: 'array',
        items: [{ type: 'object' }, { type: 'string' }, {}],
      });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(
        `tuple<object, string, ${SchemaCustomTypes.ANY}, ...optional<${SchemaCustomTypes.ANY}>>`,
      );
    });

    test('should handle tuple types with custom additionalItems', () => {
      const schema = new Schema({
        type: 'array',
        items: [{ type: 'object' }, { type: 'string' }, {}],
        additionalItems: { type: 'string' },
      });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(
        `tuple<object, string, ${SchemaCustomTypes.ANY}, ...optional<string>>`,
      );
    });

    test('should handle tuple types with additionalItems set to true', () => {
      const schema = new Schema({
        type: 'array',
        items: [{ type: 'object' }, { type: 'string' }, {}],
        additionalItems: true,
      });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(
        `tuple<object, string, ${SchemaCustomTypes.ANY}, ...optional<${SchemaCustomTypes.ANY}>>`,
      );
    });

    test('should handle tuple types with additionalItems set to false', () => {
      const schema = new Schema({
        type: 'array',
        items: [{ type: 'object' }, { type: 'string' }, {}],
        additionalItems: false,
      });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(`tuple<object, string, ${SchemaCustomTypes.ANY}>`);
    });

    test('should handle combined types', () => {
      const schema = new Schema({ type: 'string', oneOf: [] });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(`string oneOf`);
    });

    test('should handle combined types without type', () => {
      const schema = new Schema({ oneOf: [] });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(`oneOf`);
    });

    test(`should handle integer and number types together`, () => {
      const schema = new Schema({ type: ['integer', 'number'] });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(`number`);
    });

    test(`should handle const`, () => {
      const schema = new Schema({ const: 'foobar' });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(`string`);
    });

    test(`should handle enum`, () => {
      const schema = new Schema({ enum: [1.5, 'foobar', true] });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual(`number | string | boolean`);
    });

    test('should handle append title to object', () => {
      const schema = new Schema({ type: 'object', title: 'SampleType' });
      const result = SchemaHelpers.toSchemaType(schema);
      expect(result).toEqual('object [SampleType]');
    });
  });

  describe('.prettifyValue', () => {
    test('should handle string', () => {
      const result = SchemaHelpers.prettifyValue('foobar');
      expect(result).toEqual(`"foobar"`);
    });

    test('should handle string in strict mode (default behaviour)', () => {
      const result = SchemaHelpers.prettifyValue('foobar');
      expect(result).toEqual(`"foobar"`);
    });

    test('should handle string in non strict mode', () => {
      const result = SchemaHelpers.prettifyValue('foobar', false);
      expect(result).toEqual(`foobar`);
    });

    test('should handle number', () => {
      const result = SchemaHelpers.prettifyValue(2137);
      expect(result).toEqual('2137');
    });

    test('should handle boolean', () => {
      const result = SchemaHelpers.prettifyValue(false);
      expect(result).toEqual('false');
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

    test('should handle decimal multipleOf', () => {
      const schema = new Schema({ multipleOf: 0.0001 });
      const result = SchemaHelpers.humanizeConstraints(schema);
      expect(result).toEqual(['decimal places <= 4']);
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

    test('should handle not empty string', () => {
      const schema = new Schema({ minLength: 1 });
      const result = SchemaHelpers.humanizeConstraints(schema);
      expect(result).toEqual(['non-empty']);
    });

    test('should handle not empty array', () => {
      const schema = new Schema({ minItems: 1 });
      const result = SchemaHelpers.humanizeConstraints(schema);
      expect(result).toEqual(['non-empty']);
    });

    test('should handle not empty object', () => {
      const schema = new Schema({ minProperties: 1 });
      const result = SchemaHelpers.humanizeConstraints(schema);
      expect(result).toEqual(['non-empty']);
    });
  });

  describe('.isExpandable', () => {
    test('object should be expandable', () => {
      const schema = new Schema({ type: 'object' });
      const result = SchemaHelpers.isExpandable(schema);
      expect(result).toEqual(true);
    });

    test('array should be expandable', () => {
      const schema = new Schema({ type: 'array' });
      const result = SchemaHelpers.isExpandable(schema);
      expect(result).toEqual(true);
    });

    test('oneOf should be expandable', () => {
      const schema = new Schema({ oneOf: [] });
      const result = SchemaHelpers.isExpandable(schema);
      expect(result).toEqual(true);
    });

    test('anyOf should be expandable', () => {
      const schema = new Schema({ anyOf: [] });
      const result = SchemaHelpers.isExpandable(schema);
      expect(result).toEqual(true);
    });

    test('allOf should be expandable', () => {
      const schema = new Schema({ allOf: [] });
      const result = SchemaHelpers.isExpandable(schema);
      expect(result).toEqual(true);
    });

    test('not should be expandable', () => {
      const schema = new Schema({ not: {} });
      const result = SchemaHelpers.isExpandable(schema);
      expect(result).toEqual(true);
    });

    test('if should be expandable', () => {
      const schema = new Schema({ if: {} });
      const result = SchemaHelpers.isExpandable(schema);
      expect(result).toEqual(true);
    });

    test('then should be expandable', () => {
      const schema = new Schema({ then: {} });
      const result = SchemaHelpers.isExpandable(schema);
      expect(result).toEqual(true);
    });

    test('else should be expandable', () => {
      const schema = new Schema({ else: {} });
      const result = SchemaHelpers.isExpandable(schema);
      expect(result).toEqual(true);
    });

    test('string should not be expandable', () => {
      const schema = new Schema({ type: 'string' });
      const result = SchemaHelpers.isExpandable(schema);
      expect(result).toEqual(false);
    });

    test('number should not be expandable', () => {
      const schema = new Schema({ type: 'number' });
      const result = SchemaHelpers.isExpandable(schema);
      expect(result).toEqual(false);
    });

    test('integer should not be expandable', () => {
      const schema = new Schema({ type: 'integer' });
      const result = SchemaHelpers.isExpandable(schema);
      expect(result).toEqual(false);
    });

    test('boolean should not be expandable', () => {
      const schema = new Schema({ type: 'boolean' });
      const result = SchemaHelpers.isExpandable(schema);
      expect(result).toEqual(false);
    });

    test('union type should not be expandable', () => {
      const schema = new Schema({ type: ['string', 'number'] });
      const result = SchemaHelpers.isExpandable(schema);
      expect(result).toEqual(false);
    });

    test('empty schema should not be expandable', () => {
      const schema = new Schema({});
      const result = SchemaHelpers.isExpandable(schema);
      expect(result).toEqual(false);
    });
  });

  describe('.serverVariablesToSchema', () => {
    test('should transform variables to schema', () => {
      const variables = new ServerVariablesV2([
        new ServerVariable(
          { enum: ['foo', 'bar'], default: 'foo' },
          { asyncapi: {} as any, pointer: '', id: 'foo' },
        ),
        new ServerVariable(
          {
            enum: ['foo', 'bar'],
            default: 'bar',
            examples: ['foo', 'bar'],
            description: 'Some description',
          },
          { asyncapi: {} as any, pointer: '', id: 'bar' },
        ),
      ]);
      const schema = new Schema({
        type: 'object',
        properties: {
          bar: {
            type: 'string',
            default: 'bar',
            enum: ['foo', 'bar'],
            examples: ['foo', 'bar'],
            description: 'Some description',
          },
          foo: {
            type: 'string',
            default: 'foo',
            enum: ['foo', 'bar'],
          },
        },
        required: ['foo', 'bar'],
        'x-schema-private-render-additional-info': false,
      });
      const result = SchemaHelpers.serverVariablesToSchema(variables);
      expect(result).toEqual(schema);
    });
  });

  describe('.parametersToSchema', () => {
    function createParameter(parameters: Record<string, any>) {
      const params = [];
      for (const [paramProperty, param] of Object.entries(parameters)) {
        params.push(
          new ChannelParameter(param as ParameterObject, {
            asyncapi: {} as any,
            pointer: '',
            id: paramProperty,
          }),
        );
      }
      return new ChannelParameters(params);
    }
    test('should transform parameters to schema', () => {
      const parameters = createParameter({
        foo: { schema: { type: 'string' } },
        bar: {
          schema: { type: 'string' },
          location: '$message.payload#/user/id',
          description: 'Some description',
        },
      });
      const schema = new Schema({
        type: 'object',
        properties: {
          foo: {
            type: 'string',
            description: undefined,
            'x-schema-private-parameter-location': undefined,
          },
          bar: {
            type: 'string',
            description: 'Some description',
            'x-schema-private-parameter-location': '$message.payload#/user/id',
          },
        },
        required: ['foo', 'bar'],
        'x-schema-private-render-additional-info': false,
      });
      const result = SchemaHelpers.parametersToSchema(parameters);

      expect(result?.json()).toEqual(schema.json());
    });

    test('should handle empty schema of parameter', () => {
      const parameters = createParameter({
        foo: {
          description: 'Some description',
        },
        bar: {
          location: '$message.payload#/user/id',
        },
      });
      const schema = new Schema({
        type: 'object',
        properties: {
          foo: {
            description: 'Some description',
            'x-schema-private-parameter-location': undefined,
          },
          bar: {
            description: undefined,
            'x-schema-private-parameter-location': '$message.payload#/user/id',
          },
        },
        required: ['foo', 'bar'],
        'x-schema-private-render-additional-info': false,
      });
      const result = SchemaHelpers.parametersToSchema(parameters);
      expect(result?.json()).toEqual(schema.json());
    });
  });

  describe('.jsonToSchema', () => {
    test('should transform string to schema', () => {
      const json = 'foobar';
      const schema = new Schema({
        type: 'string',
        const: 'foobar',
        'x-schema-private-raw-value': true,
      });
      const result = SchemaHelpers.jsonToSchema(json);
      expect(result).toEqual(schema);
    });

    test('should transform number to schema', () => {
      const json = 2137;
      const schema = new Schema({
        type: 'string',
        const: '2137',
        'x-schema-private-raw-value': true,
      });
      const result = SchemaHelpers.jsonToSchema(json);
      expect(result).toEqual(schema);
    });

    test('should transform boolean to schema', () => {
      const json = true;
      const schema = new Schema({
        type: 'string',
        const: 'true',
        'x-schema-private-raw-value': true,
      });
      const result = SchemaHelpers.jsonToSchema(json);
      expect(result).toEqual(schema);
    });

    test('should transform array to schema', () => {
      const json = ['bar', 2137, true];
      const schema = new Schema({
        type: 'array',
        items: [
          {
            type: 'string',
            const: 'bar',
            'x-schema-private-raw-value': true,
          },
          {
            type: 'string',
            const: '2137',
            'x-schema-private-raw-value': true,
          },
          {
            type: 'string',
            const: 'true',
            'x-schema-private-raw-value': true,
          },
        ],
        'x-schema-private-render-additional-info': false,
      });
      const result = SchemaHelpers.jsonToSchema(json);
      expect(result).toEqual(schema);
    });

    test('should transform object to schema', () => {
      const json = {
        bar: 'foo',
      };
      const schema = new Schema({
        type: 'object',
        properties: {
          bar: {
            type: 'string',
            const: 'foo',
            'x-schema-private-raw-value': true,
          },
        },
        'x-schema-private-render-additional-info': false,
      });
      const result = SchemaHelpers.jsonToSchema(json);
      expect(result).toEqual(schema);
    });

    test('should transform complex data to schema', () => {
      const json = {
        foo: ['bar', 2137, true],
        bar: 'foo',
      };
      const schema = new Schema({
        type: 'object',
        properties: {
          foo: {
            type: 'array',
            items: [
              {
                type: 'string',
                const: 'bar',
                'x-schema-private-raw-value': true,
              },
              {
                type: 'string',
                const: '2137',
                'x-schema-private-raw-value': true,
              },
              {
                type: 'string',
                const: 'true',
                'x-schema-private-raw-value': true,
              },
            ],
            'x-schema-private-render-additional-info': false,
          },
          bar: {
            type: 'string',
            const: 'foo',
            'x-schema-private-raw-value': true,
          },
        },
        'x-schema-private-render-additional-info': false,
      });
      const result = SchemaHelpers.jsonToSchema(json);
      expect(result).toEqual(schema);
    });

    test('should return empty string when data is null', () => {
      const result = SchemaHelpers.jsonToSchema(null);
      const schema = new Schema({
        type: 'string',
        const: '',
        'x-schema-private-raw-value': true,
      });
      expect(result).toEqual(schema);
    });

    test('should return empty string when data is undefined', () => {
      const result = SchemaHelpers.jsonToSchema(undefined);
      const schema = new Schema({
        type: 'string',
        const: '',
        'x-schema-private-raw-value': true,
      });
      expect(result).toEqual(schema);
    });
  });

  describe('.getCustomExtensions', () => {
    test('should return extensions', () => {
      const schema = new Schema({
        type: 'string',
        minLength: 1,
        'x-foo': true,
        'x-bar': false,
      });
      const result = SchemaHelpers.getCustomExtensions(schema);
      expect(result).toEqual({ 'x-foo': true, 'x-bar': false });
    });

    test('should skip private extensions', () => {
      const schema = new Schema({
        type: 'object',
        additionalProperties: false,
        'x-foo': true,
        'x-bar': false,
        'x-parser-foo': true,
        'x-schema-private-bar': false,
      });
      const result = SchemaHelpers.getCustomExtensions(schema);
      expect(result).toEqual({ 'x-foo': true, 'x-bar': false });
    });
  });

  describe('.getDependentRequired', () => {
    test('should return undefined when dependencies is not defined', () => {
      const schema = new Schema({
        properties: {
          foo: { type: 'string' },
          bar: { type: 'string' },
          zor: { type: 'string' },
        },
      });

      const fooResult = SchemaHelpers.getDependentRequired('foo', schema);
      expect(fooResult).toEqual(undefined);
      const barResult = SchemaHelpers.getDependentRequired('bar', schema);
      expect(barResult).toEqual(undefined);
      const zorResult = SchemaHelpers.getDependentRequired('zor', schema);
      expect(zorResult).toEqual(undefined);
    });

    test('should return dependent required (simple case)', () => {
      const schema = new Schema({
        properties: {
          foo: { type: 'string' },
          bar: { type: 'string' },
          zor: { type: 'string' },
        },
        dependencies: {
          foo: ['bar'],
        },
      });

      const fooResult = SchemaHelpers.getDependentRequired('foo', schema);
      expect(fooResult).toEqual(undefined);
      const barResult = SchemaHelpers.getDependentRequired('bar', schema);
      expect(barResult).toEqual(['foo']);
      const zorResult = SchemaHelpers.getDependentRequired('zor', schema);
      expect(zorResult).toEqual(undefined);
    });

    test('should return dependent required (complex case)', () => {
      const schema = new Schema({
        properties: {
          foo: { type: 'string' },
          bar: { type: 'string' },
          zor: { type: 'string' },
        },
        dependencies: {
          foo: ['bar'],
          bar: ['foo', 'zor'],
          zor: ['foo', 'bar'],
        },
      });

      const fooResult = SchemaHelpers.getDependentRequired('foo', schema);
      expect(fooResult).toEqual(['bar', 'zor']);
      const barResult = SchemaHelpers.getDependentRequired('bar', schema);
      expect(barResult).toEqual(['foo', 'zor']);
      const zorResult = SchemaHelpers.getDependentRequired('zor', schema);
      expect(zorResult).toEqual(['bar']);
    });
  });

  describe('.getDependentSchemas', () => {
    test('should return undefined when dependencies is not defined', () => {
      const schema = new Schema({
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          credit_card: {
            type: 'string',
          },
        },
        required: ['name'],
      });

      const result = SchemaHelpers.getDependentSchemas(schema);
      expect(result).toEqual(undefined);
    });

    test('should return dependent schemas (simple case)', () => {
      const jsonSchema = {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          credit_card: {
            type: 'string',
          },
        },
        required: ['name'],
        dependencies: {
          credit_card: {
            properties: {
              billing_address: { type: 'string' },
            },
            required: ['billing_address'],
          },
        },
      };
      const schema = new Schema(jsonSchema as any);
      const expected = new Schema({
        type: 'object',
        properties: {
          credit_card: {
            properties: {
              billing_address: { type: 'string' },
            },
            required: ['billing_address'],
          },
        },
        'x-schema-private-render-additional-info': false,
      });

      const result = SchemaHelpers.getDependentSchemas(schema);
      expect(result).toEqual(expected);
    });

    test('should return dependent schemas (complex case)', () => {
      const jsonSchema = {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          credit_card: {
            type: 'string',
          },
        },
        required: ['name'],
        dependencies: {
          credit_card: {
            properties: {
              billing_address: { type: 'string' },
            },
            required: ['billing_address'],
          },
          billing_address: {
            properties: {
              account: { type: 'string' },
            },
            required: ['account'],
          },
        },
      };
      const schema = new Schema(jsonSchema as any);
      const expected = new Schema({
        type: 'object',
        properties: {
          credit_card: {
            properties: {
              billing_address: { type: 'string' },
            },
            required: ['billing_address'],
          },
          billing_address: {
            properties: {
              account: { type: 'string' },
            },
            required: ['account'],
          },
        },
        'x-schema-private-render-additional-info': false,
      });

      const result = SchemaHelpers.getDependentSchemas(schema);
      expect(result).toEqual(expected);
    });
  });

  describe('.applicatorSchemaName', () => {
    const FIRST_CASE = 'first case';
    const OTHER_CASES = 'other cases';

    test('should not render title because title is null', () => {
      expect(
        SchemaHelpers.applicatorSchemaName(
          0,
          FIRST_CASE,
          OTHER_CASES,
          null as never,
        ),
      ).toMatchSnapshot();

      expect(
        SchemaHelpers.applicatorSchemaName(
          1,
          FIRST_CASE,
          OTHER_CASES,
          null as never,
        ),
      ).toMatchSnapshot();
    });

    test('should not render title because title is undefined', () => {
      expect(
        SchemaHelpers.applicatorSchemaName(
          0,
          FIRST_CASE,
          OTHER_CASES,
          undefined,
        ),
      ).toMatchSnapshot();

      expect(
        SchemaHelpers.applicatorSchemaName(
          1,
          FIRST_CASE,
          OTHER_CASES,
          undefined,
        ),
      ).toMatchSnapshot();
    });

    test('should render title', () => {
      const TITLE = 'title example';
      expect(
        SchemaHelpers.applicatorSchemaName(0, FIRST_CASE, OTHER_CASES, TITLE),
      ).toMatchSnapshot();

      expect(
        SchemaHelpers.applicatorSchemaName(1, FIRST_CASE, OTHER_CASES, TITLE),
      ).toMatchSnapshot();
    });
  });
});
