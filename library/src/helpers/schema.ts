import { ChannelParameter, ServerVariable, Schema } from '@asyncapi/parser';
// @ts-ignore
import SchemaClass from '@asyncapi/parser/lib/models/schema';

export class SchemaHelpers {
  static extRenderType = 'x-schema-private-render-type';
  static extRenderAdditionalInfo = 'x-schema-private-render-additional-info';
  static extRawValue = 'x-schema-private-raw-value';
  static extParameterLocation = 'x-schema-private-parameter-location';

  static toSchemaType(schema: Schema | boolean): string {
    if (schema === true) {
      return 'any';
    }
    if (schema === false) {
      return 'never';
    }
    if (Object.keys(schema.json()).length === 0) {
      return 'any';
    }

    let type = this.inferType(schema);
    if (Array.isArray(type)) {
      return type.map(t => this.toType(t, schema)).join(' | ');
    }
    type = this.toType(type, schema);
    const combinedType = this.toCombinedType(schema);

    if (type && combinedType) {
      return `${type} ${combinedType}`;
    }
    if (combinedType) {
      return combinedType;
    }
    return type;
  }

  static prettifyValue(value: any) {
    const typeOf = typeof value;
    if (typeOf === 'string') {
      return `"${value}"`;
    }
    if (typeOf === 'number' || typeOf === 'bigint' || typeOf === 'boolean') {
      return value;
    }
    if (Array.isArray(value)) {
      return `[${value.toString()}]`;
    }
    return JSON.stringify(value);
  }

  static humanizeConstraints(schema: Schema): string[] {
    const constraints: string[] = [];

    // related to number/integer
    const numberRange = this.humanizeNumberRangeConstraint(
      schema.minimum(),
      schema.exclusiveMinimum(),
      schema.maximum(),
      schema.exclusiveMaximum(),
    );
    if (numberRange !== undefined) {
      constraints.push(numberRange);
    }
    const multipleOfConstraint = this.humanizeMultipleOfConstraint(
      schema.multipleOf(),
    );
    if (multipleOfConstraint !== undefined) {
      constraints.push(multipleOfConstraint);
    }

    // related to string
    const stringRange = this.humanizeRangeConstraint(
      'characters',
      schema.minLength(),
      schema.maxLength(),
    );
    if (stringRange !== undefined) {
      constraints.push(stringRange);
    }

    // related to array
    const hasUniqueItems = schema.uniqueItems();
    const arrayRange = this.humanizeRangeConstraint(
      hasUniqueItems ? 'unique items' : 'items',
      schema.minItems(),
      schema.maxItems(),
    );
    if (arrayRange !== undefined) {
      constraints.push(arrayRange);
    }

    // related to object
    const objectRange = this.humanizeRangeConstraint(
      'properties',
      schema.minProperties(),
      schema.maxProperties(),
    );
    if (objectRange !== undefined) {
      constraints.push(objectRange);
    }

    return constraints;
  }

  static isExpandable(schema: Schema): boolean {
    let type = this.inferType(schema);
    type = Array.isArray(type) ? type : [type];
    if (type.includes('object') || type.includes('array')) {
      return true;
    }

    if (
      schema.oneOf() ||
      schema.anyOf() ||
      schema.allOf() ||
      schema.not() ||
      schema.if() ||
      schema.then() ||
      schema.else()
    ) {
      return true;
    }

    const customExtensions = this.getCustomExtensions(schema);
    if (customExtensions && Object.keys(customExtensions).length) {
      return true;
    }

    return false;
  }

  static getCustomExtensions(value: any) {
    if (!value || typeof value.extensions !== 'function') {
      return;
    }
    return Object.entries(value.extensions() || {}).reduce(
      (obj, [extName, ext]) => {
        if (
          !extName.startsWith('x-parser-') &&
          !extName.startsWith('x-schema-private-')
        ) {
          obj[extName] = ext;
        }
        return obj;
      },
      {},
    );
  }

  static serverVariablesToSchema(
    urlVariables?: Record<string, ServerVariable>,
  ): Schema | undefined {
    if (!urlVariables || !Object.keys(urlVariables).length) {
      return undefined;
    }

    const json = {
      type: 'object',
      properties: Object.entries(urlVariables).reduce((obj, [urlName, url]) => {
        obj[urlName] = Object.assign({}, url.json());
        obj[urlName].type = 'string';
        return obj;
      }, {}),
      required: Object.keys(urlVariables),
      [this.extRenderType]: false,
      [this.extRenderAdditionalInfo]: false,
    };
    return new SchemaClass(json);
  }

  static parametersToSchema(
    parameters?: Record<string, ChannelParameter>,
  ): Schema | undefined {
    if (!parameters || !Object.keys(parameters).length) {
      return undefined;
    }

    const json = {
      type: 'object',
      properties: Object.entries(parameters).reduce(
        (obj, [paramaterName, parameter]) => {
          obj[paramaterName] = Object.assign({}, parameter.schema().json());
          obj[paramaterName].description =
            parameter.description() || obj[paramaterName].description;
          obj[paramaterName][this.extParameterLocation] = parameter.location();
          return obj;
        },
        {},
      ),
      required: Object.keys(parameters),
      [this.extRenderType]: false,
      [this.extRenderAdditionalInfo]: false,
    };
    return new SchemaClass(json);
  }

  static jsonToSchema(value: any): any {
    const json = this.jsonFieldToSchema(value);
    return new SchemaClass(json);
  }

  private static jsonSchemaTypes = [
    'string',
    'number',
    'integer',
    'boolean',
    'array',
    'object',
    'null',
  ];
  private static jsonSchemaKeywordTypes: Record<string, string> = {
    // string
    maxLength: 'string',
    minLength: 'string',
    pattern: 'string',
    contentMediaType: 'string',
    contentEncoding: 'string',
    // number
    multipleOf: 'number',
    maximum: 'number',
    exclusiveMaximum: 'number',
    minimum: 'number',
    exclusiveMinimum: 'number',
    // array
    items: 'array',
    maxItems: 'array',
    minItems: 'array',
    uniqueItems: 'array',
    contains: 'array',
    maxContains: 'array',
    minContains: 'array',
    prefixItems: 'array',
    additionalItems: 'array',
    unevaluatedItems: 'array',
    // object
    maxProperties: 'object',
    minProperties: 'object',
    required: 'object',
    properties: 'object',
    patternProperties: 'object',
    propertyNames: 'object',
    dependencies: 'object',
    dependentRequired: 'object',
    dependentSchemas: 'object',
    additionalProperties: 'object',
    unevaluatedProperties: 'object',
  };

  private static toType(type: string, schema: Schema): string {
    if (type === 'array') {
      const items = schema.items();
      let types = undefined;
      if (Array.isArray(items)) {
        types = items.map(item => this.toSchemaType(item)).join(', ');
        types = types.length ? types : 'unknown';
      } else if (items) {
        types = this.toSchemaType(items);
        types = types || 'unknown';
      }
      return `array<${types}>`;
    }
    return type;
  }

  private static toCombinedType(schema: Schema): string | undefined {
    if (schema.oneOf()) {
      return 'oneOf';
    }
    if (schema.anyOf()) {
      return 'anyOf';
    }
    if (schema.allOf()) {
      return 'allOf';
    }
    return;
  }

  private static inferType(schema: Schema): string[] | string {
    const jsonSchema = schema.json();
    const keywords = Object.keys(this.jsonSchemaKeywordTypes);
    const keywordsLength = keywords.length;

    const possibleTypes: Record<string, undefined> = {};

    const jsonTypes = jsonSchema.type;
    if (jsonTypes !== undefined) {
      if (Array.isArray(jsonTypes)) {
        for (var i = 0, l = jsonTypes.length; i < l; i++) {
          possibleTypes[jsonTypes[i]] = undefined;
        }
      } else {
        possibleTypes[jsonTypes] = undefined;
      }
    }

    for (var i = 0; i < keywordsLength; i++) {
      let keyword = keywords[i];
      if (jsonSchema[keyword] !== undefined) {
        possibleTypes[this.jsonSchemaKeywordTypes[keyword]] = undefined;
      }
    }
    if (jsonSchema.enum) {
      for (let value of jsonSchema.enum) {
        possibleTypes[typeof value] = undefined;
      }
    }

    const types = Object.keys(possibleTypes);
    if (types.length === 1) {
      return types[0];
    }
    // we cannot infer `number` type when schema has explicit defined `integer` type
    if (jsonTypes === 'integer') {
      return types.filter(t => t !== 'number');
    }
    if (
      Array.isArray(jsonTypes) &&
      jsonTypes.includes('integer') &&
      !jsonTypes.includes('number')
    ) {
      return types.filter(t => t !== 'number');
    }
    // if types have inferred `integer` and `number` types, `integer` is unnecessary
    if (types.includes('integer') && types.includes('number')) {
      return types.filter(t => t !== 'integer');
    }
    return types;
  }

  private static humanizeNumberRangeConstraint(
    min: number | undefined,
    exclusiveMin: number | undefined,
    max: number | undefined,
    exclusiveMax: number | undefined,
  ): string | undefined {
    const hasExclusiveMin = exclusiveMin !== undefined;
    const hasMin = min !== undefined || hasExclusiveMin;
    const hasExclusiveMax = exclusiveMax !== undefined;
    const hasMax = max !== undefined || hasExclusiveMax;

    let numberRange;
    if (hasMin && hasMax) {
      numberRange = hasExclusiveMin ? '( ' : '[ ';
      numberRange += hasExclusiveMin ? exclusiveMin : min;
      numberRange += ' .. ';
      numberRange += hasExclusiveMax ? exclusiveMax : max;
      numberRange += hasExclusiveMax ? ' )' : ' ]';
    } else if (hasMin) {
      numberRange = hasExclusiveMin ? '> ' : '>= ';
      numberRange += hasExclusiveMin ? exclusiveMin : min;
    } else if (hasMax) {
      numberRange = hasExclusiveMax ? '< ' : '<= ';
      numberRange += hasExclusiveMax ? exclusiveMax : max;
    }
    return numberRange;
  }

  private static humanizeMultipleOfConstraint(
    multipleOf: number | undefined,
  ): string | undefined {
    if (multipleOf === undefined) {
      return;
    }
    const strigifiedMultipleOf = multipleOf.toString(10);
    if (!/^0\.0*1$/.test(strigifiedMultipleOf)) {
      return `multiple of ${strigifiedMultipleOf}`;
    }
    return `decimal places <= ${strigifiedMultipleOf.split('.')[1].length}`;
  }

  private static humanizeRangeConstraint(
    description: string,
    min: number | undefined,
    max: number | undefined,
  ): string | undefined {
    let stringRange;
    if (min !== undefined && max !== undefined) {
      if (min === max) {
        stringRange = `${min} ${description}`;
      } else {
        stringRange = `[ ${min} .. ${max} ] ${description}`;
      }
    } else if (max !== undefined) {
      stringRange = `<= ${max} ${description}`;
    } else if (min !== undefined) {
      if (min === 1) {
        stringRange = 'non-empty';
      } else {
        stringRange = `>= ${min} ${description}`;
      }
    }
    return stringRange;
  }

  private static jsonFieldToSchema(value: any): any {
    if (typeof value !== 'object') {
      const str =
        typeof value.toString === 'function' ? value.toString() : value;
      return {
        type: 'string',
        const: str,
        [this.extRawValue]: true,
      };
    }
    if (this.isJSONSchema(value)) {
      return value;
    }
    if (Array.isArray(value)) {
      return {
        type: 'array',
        items: value.map(v => this.jsonFieldToSchema(v)),
        [this.extRenderType]: false,
        [this.extRenderAdditionalInfo]: false,
      };
    }
    return {
      type: 'object',
      properties: Object.entries(value).reduce((obj, [k, v]) => {
        obj[k] = this.jsonFieldToSchema(v);
        return obj;
      }, {}),
      [this.extRenderType]: false,
      [this.extRenderAdditionalInfo]: false,
    };
  }

  private static isJSONSchema(value: any): boolean {
    if (
      value &&
      typeof value === 'object' &&
      (this.jsonSchemaTypes.includes(value.type) ||
        (Array.isArray(value.type) &&
          value.type.some((t: string) => !this.jsonSchemaTypes.includes(t))))
    ) {
      return true;
    }
    return false;
  }
}
