import { ChannelParameter, Schema } from '@asyncapi/parser';
// @ts-ignore
import SchemaClass from '@asyncapi/parser/lib/models/schema';

export class SchemaHelpers {
  static extRenderType = 'x-schema-private-render-type';
  static extRenderAdditionalInfo = 'x-schema-private-render-additional-info';
  static exthasValue = 'x-schema-private-has-value';

  static toSchemaType(schema: Schema): string {
    let type = schema.type();
    if (Array.isArray(type)) {
      return type.map(t => this.toType(t, schema)).join(' | ');
    }
    type = this.toType(type, schema);
    const combinedType = this.toCombinedType(schema);

    if (type && combinedType) {
      return `${type} ${combinedType}`;
    } else if (combinedType) {
      return combinedType;
    }
    return type;
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
    let type = schema.type();
    type = Array.isArray(type) ? type : [type];
    if (type.includes('object') || type.includes('array')) {
      return true;
    }

    if (
      schema.oneOf() ||
      schema.anyOf() ||
      schema.allOf() ||
      Object.keys(schema.properties()).length ||
      schema.additionalProperties() ||
      schema.items() ||
      schema.additionalItems()
    ) {
      return true;
    }

    return false;
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

  static getCustomExtensions(value: any) {
    if (!value || typeof value.extensions !== 'function') {
      return;
    }
    return Object.entries(value.extensions() || {}).reduce(
      (obj, [extName, ext]) => {
        if (
          !extName.startsWith('x-parser-') &&
          !extName.startsWith('x-schema-private')
        ) {
          obj[extName] = ext;
        }
        return obj;
      },
      {},
    );
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
      let types = 'Unknown';
      if (Array.isArray(items)) {
        types = items.map(item => this.toSchemaType(item)).join(', ');
      } else if (items) {
        types = this.toSchemaType(items);
      }
      return `Array<${types}>`;
    }
    return type;
  }

  private static toCombinedType(schema: Schema): string | undefined {
    if (schema.oneOf()) {
      return 'OneOf';
    }
    if (schema.anyOf()) {
      return 'AnyOf';
    }
    if (schema.allOf()) {
      return 'AllOf';
    }
    return;
  }

  private static humanizeNumberRangeConstraint(
    min: number | undefined,
    exclusiveMin: number | undefined,
    max: number | undefined,
    exclusiveMax: number | undefined,
  ): string | undefined {
    const hasMin = min !== undefined || exclusiveMin !== undefined;
    const hasMax = max !== undefined || exclusiveMax !== undefined;

    let numberRange;
    if (hasMin && hasMax) {
      numberRange = exclusiveMin !== undefined ? '( ' : '[ ';
      numberRange += exclusiveMin !== undefined ? exclusiveMin : min;
      numberRange += ' .. ';
      numberRange += exclusiveMax !== undefined ? exclusiveMax : max;
      numberRange += exclusiveMax !== undefined ? ' )' : ' ]';
    } else if (hasMin) {
      numberRange = exclusiveMin !== undefined ? '> ' : '>= ';
      numberRange += min;
    } else if (hasMax) {
      numberRange = exclusiveMax !== undefined ? '< ' : '<= ';
      numberRange += max;
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
      return {
        type: 'string',
        const: value,
        [this.exthasValue]: true,
      };
    }
    if (this.isJSONSchema(value)) {
      return value;
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
