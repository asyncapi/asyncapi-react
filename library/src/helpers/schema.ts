import { ChannelParameter, ServerVariable, Schema } from '@asyncapi/parser';
// @ts-ignore
import SchemaClass from '@asyncapi/parser/lib/models/schema';

export class SchemaHelpers {
  static extRenderType = 'x-schema-private-render-type';
  static extRenderAdditionalInfo = 'x-schema-private-render-additional-info';
  static extRawValue = 'x-schema-private-raw-value';
  static extParameterLocation = 'x-schema-private-parameter-location';

  static toSchemaType(schema: Schema): string {
    if (schema.isBooleanSchema()) {
      if (schema.booleanValue() === true) {
        return 'any';
      } else {
        return 'never';
      }
    }
    // handle case with `{}`
    if (Object.keys(schema.json()).length === 0) {
      return 'any';
    }
    // handle case with `{ not: {} }`
    const not = schema.not();
    if (not && Object.keys(not.json()).length === 0) {
      return 'never';
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

  /**
   * Retrieves from given value all custom extensions (value with key started by `x-`).
   * However, it skips those private extensions that begin with `x-parser-` and `x-schema-private-`.
   *
   * @param value
   */
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

  /**
   * Retrieves from given schema all dependent required requires by given propertyName from `dependencies` object.
   *
   * @param propertyName
   * @param schema
   */
  static getDependentRequired(
    propertyName: string,
    schema: Schema,
  ): string[] | undefined {
    const dependentRequired: string[] = [];
    const dependencies = schema.dependencies();
    if (!dependencies) {
      return;
    }

    for (const [prop, array] of Object.entries(dependencies)) {
      if (Array.isArray(array) && array.includes(propertyName)) {
        dependentRequired.push(prop);
      }
    }
    return dependentRequired.length ? dependentRequired : undefined;
  }

  /**
   * Retrieves from given schema all dependent schemas from `dependencies` object.
   *
   * @param schema
   */
  static getDependentSchemas(schema: Schema): Schema | undefined {
    const dependencies = schema.dependencies();
    if (!dependencies) {
      return;
    }

    const records: Record<string, Schema> = {};
    for (const [prop, propSchema] of Object.entries(dependencies)) {
      if (typeof propSchema === 'object' && !Array.isArray(propSchema)) {
        records[prop] = propSchema;
      }
    }
    if (!Object.keys(records).length) {
      return undefined;
    }

    const json = {
      type: 'object',
      properties: Object.entries(records).reduce(
        (obj, [propertyName, propertySchema]) => {
          obj[propertyName] = Object.assign({}, propertySchema.json());
          return obj;
        },
        {},
      ),
      [this.extRenderType]: false,
      [this.extRenderAdditionalInfo]: false,
    };
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

  private static toType(type: string, schema: Schema): string {
    if (type === 'array') {
      const items = schema.items();
      let types: string = 'unknown';
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
    const types = schema.type();
    if (types === undefined) {
      const constValue = schema.const();
      if (constValue !== undefined) {
        return typeof constValue;
      }
      const enumValue = schema.enum();
      if (Array.isArray(enumValue) && enumValue.length) {
        const inferredType = Array.from(new Set(enumValue.map(e => typeof e)));
        return inferredType.length === 1 ? inferredType[0] : inferredType;
      }
      return 'restricted any';
    }

    if (Array.isArray(types)) {
      // if types have `integer` and `number` types, `integer` is unnecessary
      if (types.includes('integer') && types.includes('number')) {
        return types.filter(t => t !== 'integer');
      }
      return types.length === 1 ? types[0] : types;
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
