import { Schema, ChannelParameter } from '@asyncapi/parser';

export class SchemaHelpers {
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

  static parametersToSchema(schema: Schema): boolean {
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

  // TODO: Fix exclusive fields
  private static humanizeNumberRangeConstraint(
    min: number | undefined,
    exclusiveMin: number | undefined,
    max: number | undefined,
    exclusiveMax: number | undefined,
  ): string | undefined {
    let numberRange;
    if (min !== undefined && max !== undefined) {
      numberRange = exclusiveMin !== undefined ? '( ' : '[ ';
      numberRange += min;
      numberRange += ' .. ';
      numberRange += max;
      numberRange += exclusiveMax !== undefined ? ' )' : ' ]';
    } else if (min !== undefined) {
      numberRange = exclusiveMin !== undefined ? '> ' : '>= ';
      numberRange += min;
    } else if (max !== undefined) {
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
}
