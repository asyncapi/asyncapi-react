const jsonSchemaTypes = [
  'string',
  'number',
  'integer',
  'boolean',
  'array',
  'object',
  'null',
];

export enum SchemaCustomTypes {
  // for `true` and `{}` schemas
  ANY = 'any',
  // for schemas without `type` keyword
  RESTRICTED_ANY = 'restricted any',
  // for `false` and `{ not: {}, ... }` schemas
  NEVER = 'never',
  // for types that we cannot infer
  UNKNOWN = 'unknown',
}

const jsonSchemaKeywordTypes: Record<string, string> = {
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
  additionalItems: 'array',
  // object
  maxProperties: 'object',
  minProperties: 'object',
  required: 'object',
  properties: 'object',
  patternProperties: 'object',
  propertyNames: 'object',
  dependencies: 'object',
  additionalProperties: 'object',
};
const jsonSchemaKeywords = Object.keys(jsonSchemaKeywordTypes);

// keywords that unambiguously mark an object as a JSON Schema rather than arbitrary data.
// Validation-only keywords (e.g. `minLength`, `maximum`, `pattern`) are intentionally
// excluded because they also appear in plain data / extension objects, which would
// otherwise be rendered as schemas with their remaining fields dropped.
const jsonSchemaDetectionKeywords = [
  // structural / reference keywords
  '$ref',
  '$schema',
  '$id',
  '$defs',
  'definitions',
  // composition / conditional keywords
  'oneOf',
  'anyOf',
  'allOf',
  'not',
  'if',
  'then',
  'else',
  // value keywords
  'enum',
  'const',
  // shape keywords that describe an object or array schema
  'properties',
  'patternProperties',
  'propertyNames',
  'required',
  'items',
  'additionalItems',
  'additionalProperties',
  'contains',
  'dependencies',
  // annotation keyword that is commonly used to mark a schema
  'format',
];

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

interface ExtensionModel {
  id(): string;
  value(): unknown;
}

interface ExtensionsModel {
  all(): ExtensionModel[];
  get(id: string): ExtensionModel | undefined;
}

// this interface covers the schema methods used by SchemaHelpers and rendering components.
// Both JsonSchemaModel and SchemaV2 from @asyncapi/parser satisfy this interface.

export interface SchemaLike {
  json(): unknown;
  isBooleanSchema(): boolean;
  isCircular(): boolean;
  type(): string | string[] | undefined;
  title(): string | undefined;
  $id(): string | undefined;
  id?(): string | undefined;
  description(): string | undefined;
  contentMediaType(): string | undefined;
  format(): string | undefined;
  pattern(): string | undefined;
  contentEncoding(): string | undefined;
  const(): unknown;
  default(): unknown;
  enum(): unknown[] | undefined;
  examples(): unknown[] | undefined;
  minimum(): number | undefined;
  exclusiveMinimum(): number | undefined;
  maximum(): number | undefined;
  exclusiveMaximum(): number | undefined;
  multipleOf(): number | undefined;
  minLength(): number | undefined;
  maxLength(): number | undefined;
  uniqueItems(): boolean | undefined;
  minItems(): number | undefined;
  maxItems(): number | undefined;
  minProperties(): number | undefined;
  maxProperties(): number | undefined;
  deprecated(): boolean | undefined;
  writeOnly(): boolean | undefined;
  readOnly(): boolean | undefined;
  properties(): Record<string, SchemaLike> | undefined;
  patternProperties(): Record<string, SchemaLike> | undefined;
  required(): string[] | undefined;
  items(): SchemaLike | SchemaLike[] | undefined;
  additionalItems(): SchemaLike | boolean | undefined;
  additionalProperties(): SchemaLike | boolean | undefined;
  oneOf(): SchemaLike[] | undefined;
  anyOf(): SchemaLike[] | undefined;
  allOf(): SchemaLike[] | undefined;
  not(): SchemaLike | undefined;
  propertyNames(): SchemaLike | undefined;
  contains(): SchemaLike | undefined;
  if(): SchemaLike | undefined;
  then(): SchemaLike | undefined;
  else(): SchemaLike | undefined;
  dependencies(): Record<string, unknown> | undefined;
  externalDocs():
    | { url(): string; description(): string | undefined }
    | undefined;
  extensions(): ExtensionsModel;
}

// a value that already exposes the SchemaLike accessors (e.g. a parser Schema model)
function isSchemaModel(value: unknown): value is SchemaLike {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as { json?: unknown }).json === 'function'
  );
}

export class JsonSchemaModel implements SchemaLike {
  constructor(
    private readonly rawValue: unknown,
    private readonly ancestors: ReadonlySet<object> = new Set(),
  ) {}

  static fromJSON(value: unknown): JsonSchemaModel {
    return new JsonSchemaModel(value);
  }

  json(): unknown {
    return this.rawValue;
  }

  isBooleanSchema(): boolean {
    return typeof this.rawValue === 'boolean';
  }

  // A schema is circular when the same raw object already appears higher up in the
  // current ancestry chain (mirrors the parser's parent-chain check). Sibling branches
  // that reuse the same object are not circular because ancestry is copied per branch.
  isCircular(): boolean {
    return isPlainObject(this.rawValue) && this.ancestors.has(this.rawValue);
  }

  private rawSchema(): Record<string, unknown> {
    return isPlainObject(this.rawValue) ? this.rawValue : {};
  }

  // ancestry to propagate to child schemas: everything above plus this raw value
  private childAncestors(): ReadonlySet<object> {
    const ancestors = new Set(this.ancestors);
    if (isPlainObject(this.rawValue)) {
      ancestors.add(this.rawValue);
    }
    return ancestors;
  }

  private childSchema(value: unknown): JsonSchemaModel {
    return new JsonSchemaModel(value, this.childAncestors());
  }

  private arrayModels(key: string): JsonSchemaModel[] | undefined {
    const value = this.rawSchema()[key];
    if (!Array.isArray(value)) return undefined;
    const ancestors = this.childAncestors();
    return value.map((item) => new JsonSchemaModel(item, ancestors));
  }

  type(): string | string[] | undefined {
    const t = this.rawSchema().type;
    if (t === undefined || t === null) return undefined;
    if (Array.isArray(t)) return t.map(String);
    return String(t);
  }

  title(): string | undefined {
    return this.rawSchema().title as string | undefined;
  }

  $id(): string | undefined {
    return this.rawSchema().$id as string | undefined;
  }

  description(): string | undefined {
    return this.rawSchema().description as string | undefined;
  }

  contentMediaType(): string | undefined {
    return this.rawSchema().contentMediaType as string | undefined;
  }

  format(): string | undefined {
    return this.rawSchema().format as string | undefined;
  }

  pattern(): string | undefined {
    return this.rawSchema().pattern as string | undefined;
  }

  contentEncoding(): string | undefined {
    return this.rawSchema().contentEncoding as string | undefined;
  }

  const(): unknown {
    return this.rawSchema().const;
  }

  default(): unknown {
    return this.rawSchema().default;
  }

  enum(): unknown[] | undefined {
    const value = this.rawSchema().enum;
    return Array.isArray(value) ? value : undefined;
  }

  examples(): unknown[] | undefined {
    const value = this.rawSchema().examples;
    return Array.isArray(value) ? value : undefined;
  }

  minimum(): number | undefined {
    return this.rawSchema().minimum as number | undefined;
  }

  exclusiveMinimum(): number | undefined {
    return this.rawSchema().exclusiveMinimum as number | undefined;
  }

  maximum(): number | undefined {
    return this.rawSchema().maximum as number | undefined;
  }

  exclusiveMaximum(): number | undefined {
    return this.rawSchema().exclusiveMaximum as number | undefined;
  }

  multipleOf(): number | undefined {
    return this.rawSchema().multipleOf as number | undefined;
  }

  minLength(): number | undefined {
    return this.rawSchema().minLength as number | undefined;
  }

  maxLength(): number | undefined {
    return this.rawSchema().maxLength as number | undefined;
  }

  uniqueItems(): boolean | undefined {
    return this.rawSchema().uniqueItems as boolean | undefined;
  }

  minItems(): number | undefined {
    return this.rawSchema().minItems as number | undefined;
  }

  maxItems(): number | undefined {
    return this.rawSchema().maxItems as number | undefined;
  }

  minProperties(): number | undefined {
    return this.rawSchema().minProperties as number | undefined;
  }

  maxProperties(): number | undefined {
    return this.rawSchema().maxProperties as number | undefined;
  }

  deprecated(): boolean | undefined {
    return this.rawSchema().deprecated as boolean | undefined;
  }

  writeOnly(): boolean | undefined {
    return this.rawSchema().writeOnly as boolean | undefined;
  }

  readOnly(): boolean | undefined {
    return this.rawSchema().readOnly as boolean | undefined;
  }

  properties(): Record<string, JsonSchemaModel> | undefined {
    const value = this.rawSchema().properties;
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return undefined;
    }
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, this.childSchema(item)]),
    );
  }

  patternProperties(): Record<string, JsonSchemaModel> | undefined {
    const value = this.rawSchema().patternProperties;
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return undefined;
    }
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, this.childSchema(item)]),
    );
  }

  required(): string[] | undefined {
    const value = this.rawSchema().required;
    return Array.isArray(value) ? value.map(String) : undefined;
  }

  items(): JsonSchemaModel | JsonSchemaModel[] | undefined {
    const value = this.rawSchema().items;
    if (Array.isArray(value)) {
      return value.map((item) => this.childSchema(item));
    }
    return value === undefined ? undefined : this.childSchema(value);
  }

  additionalItems(): JsonSchemaModel | boolean | undefined {
    const value = this.rawSchema().additionalItems;
    if (value === undefined) return undefined;
    if (typeof value === 'boolean') return value;
    return this.childSchema(value);
  }

  additionalProperties(): JsonSchemaModel | boolean | undefined {
    const value = this.rawSchema().additionalProperties;
    if (value === undefined) return undefined;
    if (typeof value === 'boolean') return value;
    return this.childSchema(value);
  }

  oneOf(): JsonSchemaModel[] | undefined {
    return this.arrayModels('oneOf');
  }

  anyOf(): JsonSchemaModel[] | undefined {
    return this.arrayModels('anyOf');
  }

  allOf(): JsonSchemaModel[] | undefined {
    return this.arrayModels('allOf');
  }

  not(): JsonSchemaModel | undefined {
    const value = this.rawSchema().not;
    return value === undefined ? undefined : this.childSchema(value);
  }

  propertyNames(): JsonSchemaModel | undefined {
    const value = this.rawSchema().propertyNames;
    return value === undefined ? undefined : this.childSchema(value);
  }

  contains(): JsonSchemaModel | undefined {
    const value = this.rawSchema().contains;
    return value === undefined ? undefined : this.childSchema(value);
  }

  if(): JsonSchemaModel | undefined {
    const value = this.rawSchema().if;
    return value === undefined ? undefined : this.childSchema(value);
  }

  then(): JsonSchemaModel | undefined {
    const value = this.rawSchema().then;
    return value === undefined ? undefined : this.childSchema(value);
  }

  else(): JsonSchemaModel | undefined {
    const value = this.rawSchema().else;
    return value === undefined ? undefined : this.childSchema(value);
  }

  dependencies(): Record<string, unknown> | undefined {
    const value = this.rawSchema().dependencies;
    return value && typeof value === 'object' && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : undefined;
  }

  externalDocs():
    | { url(): string; description(): string | undefined }
    | undefined {
    const value = this.rawSchema().externalDocs;
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return undefined;
    }
    const externalDocs = value as { url?: string; description?: string };
    if (!externalDocs.url) return undefined;
    return {
      url: () => externalDocs.url!,
      description: () => externalDocs.description,
    };
  }

  extensions(): ExtensionsModel {
    const all = Object.entries(this.rawSchema())
      .filter(([key]) => key.startsWith('x-'))
      .map(([key, value]) => ({
        id: () => key,
        value: () => value,
      }));
    return {
      all: () => all,
      get: (id: string) => all.find((extension) => extension.id() === id),
    };
  }

  $ref(): string | undefined {
    return this.rawSchema().$ref as string | undefined;
  }

  $schema(): string | undefined {
    return this.rawSchema().$schema as string | undefined;
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class SchemaHelpers {
  static extRenderAdditionalInfo = 'x-schema-private-render-additional-info';
  static extRawValue = 'x-schema-private-raw-value';
  static extParameterLocation = 'x-schema-private-parameter-location';

  static toSchemaType(schema: SchemaLike): string {
    if (!schema || typeof schema.json !== 'function') {
      return SchemaCustomTypes.UNKNOWN;
    }
    const json = schema.json();
    if (schema.isBooleanSchema()) {
      if (json === true) {
        return SchemaCustomTypes.ANY;
      } else {
        return SchemaCustomTypes.NEVER;
      }
    }
    // handle case with `{}` schemas
    if (isPlainObject(json) && Object.keys(json).length === 0) {
      return SchemaCustomTypes.ANY;
    }
    // handle case with `{ not: {}, ... }` schemas
    if (this.isNeverSchema(schema)) {
      return SchemaCustomTypes.NEVER;
    }

    let type = this.inferType(schema);
    type = Array.isArray(type)
      ? type.map((t) => this.toType(t, schema)).join(' | ')
      : this.toType(type, schema);
    const combinedType = this.toCombinedType(schema);

    if (type && combinedType) {
      return `${type} ${combinedType}`;
    }
    if (combinedType) {
      return combinedType;
    }

    if (schema.title() && type !== schema.title()) {
      type += ' [' + schema.title() + ']';
    }
    return type;
  }

  static applicatorSchemaName(
    idx: number,
    firstCase: string,
    otherCases: string,
    title?: string,
  ) {
    let suffix = title ? ` ${title}:` : ':';
    if (suffix.startsWith(' <anonymous-schema-')) suffix = ' Anonymous Schema';
    if (idx === 0) {
      return `${firstCase}${suffix}`;
    } else {
      return `${otherCases}${suffix}`;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static prettifyValue(value: any, strict = true): string {
    const typeOf = typeof value;
    if (typeOf === 'string') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return strict ? `"${value}"` : value;
    }
    if (typeOf === 'number' || typeOf === 'bigint' || typeOf === 'boolean') {
      return `${value}`;
    }
    if (Array.isArray(value)) {
      return `[${value
        .map((item) => this.prettifyValue(item, strict))
        .join(',')}]`;
    }
    return JSON.stringify(value);
  }

  static humanizeConstraints(schema: SchemaLike): string[] {
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

  static isExpandable(schema: SchemaLike): boolean {
    if (schema.isBooleanSchema()) {
      return false;
    }

    const inferred = this.inferType(schema);
    const types = Array.isArray(inferred) ? inferred : [inferred];
    if (types.includes('object') || types.includes('array')) {
      return true;
    }

    const compositions = [schema.oneOf(), schema.anyOf(), schema.allOf()];
    const hasComposition = compositions.some(
      (items) => (items?.length ?? 0) > 0,
    );

    const nestedSchemas = [
      schema.not(),
      schema.if(),
      schema.then(),
      schema.else(),
      schema.items(),
      schema.additionalItems(),
      schema.additionalProperties(),
      schema.contains(),
      schema.propertyNames(),
      schema.dependencies(),
    ];
    const hasNestedSchema =
      nestedSchemas.some((value) => value !== undefined && value !== false) ||
      Object.keys(schema.properties() ?? {}).length > 0 ||
      Object.keys(schema.patternProperties() ?? {}).length > 0;

    if (hasComposition || hasNestedSchema) {
      return true;
    }

    const customExtensions = this.getCustomExtensions(schema);

    return !!(customExtensions && Object.keys(customExtensions).length);
  }

  static serverVariablesToSchema(urlVariables?: {
    length: number;
    all(): { id(): string; json(): Record<string, unknown> }[];
  }): JsonSchemaModel | undefined {
    if (!urlVariables || urlVariables.length === 0) {
      return undefined;
    }
    const properties: Record<string, Record<string, unknown>> = {};
    urlVariables.all().forEach((variable) => {
      properties[variable.id()] = {
        ...(isPlainObject(variable.json()) ? variable.json() : {}),
        type: 'string',
      };
    });

    return new JsonSchemaModel({
      type: 'object',
      properties,
      required: Object.keys(properties),
      [this.extRenderAdditionalInfo]: false,
    });
  }

  static parametersToSchema(parameters?: {
    isEmpty(): boolean;
    all(): {
      id(): string;
      schema(): { json(): Record<string, unknown> } | undefined;
      hasDescription(): boolean;
      description(): string | undefined;
      hasLocation(): boolean;
      location(): string | undefined;
    }[];
  }): JsonSchemaModel | undefined {
    if (!parameters || parameters.isEmpty()) {
      return undefined;
    }
    const properties: Record<string, Record<string, unknown>> = {};
    parameters.all().forEach((parameter) => {
      const parameterSchema = parameter.schema();
      properties[parameter.id()] = {
        ...(isPlainObject(parameterSchema?.json())
          ? parameterSchema.json()
          : {}),
        description: parameter.hasDescription()
          ? parameter.description()
          : undefined,
        [this.extParameterLocation]: parameter.hasLocation()
          ? parameter.location()
          : undefined,
      };
    });

    return new JsonSchemaModel({
      type: 'object',
      properties,
      required: Object.keys(properties),
      [this.extRenderAdditionalInfo]: false,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static jsonToSchema(value: any): JsonSchemaModel {
    return new JsonSchemaModel(this.jsonFieldToSchema(value));
  }

  // Converts extension data as values, without interpreting objects as schemas.
  static jsonToRawValueSchema(value: unknown): JsonSchemaModel {
    return new JsonSchemaModel(
      this.jsonFieldToSchema(value, new Set<object>(), false),
    );
  }

  /**
   * Retrieves from given value all custom extensions (value with key started by `x-`).
   * However, it skips those private extensions that begin with `x-parser-` and `x-schema-private-`.
   *
   * @param value
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getCustomExtensions(value: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!value || typeof value.extensions !== 'function') {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const extensions = value.extensions() as ExtensionsModel;
    const filteredExtensions: Record<string, unknown> = {};
    for (const ext of extensions.all()) {
      if (
        !ext.id().startsWith('x-parser-') &&
        !ext.id().startsWith('x-schema-private-')
      ) {
        filteredExtensions[ext.id()] = ext.value();
      }
    }
    return filteredExtensions;
  }

  /**
   * Retrieves from given schema all dependent required requires by given propertyName from `dependencies` object.
   *
   * @param propertyName
   * @param schema
   */
  static getDependentRequired(
    propertyName: string,
    schema: SchemaLike,
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
  static getDependentSchemaModels(
    schema: SchemaLike,
  ): Record<string, SchemaLike> | undefined {
    const dependencies = schema.dependencies();
    if (!dependencies) {
      return undefined;
    }

    const records: Record<string, SchemaLike> = {};
    for (const [propertyName, propertySchema] of Object.entries(dependencies)) {
      // dependencies may hold either a subschema (object or boolean schema) or an
      // array of required property names. The parser exposes schema-valued entries
      // as schema models, so pass those through and only wrap raw schema values.
      if (isSchemaModel(propertySchema)) {
        records[propertyName] = propertySchema;
      } else if (
        typeof propertySchema === 'boolean' ||
        isPlainObject(propertySchema)
      ) {
        records[propertyName] = new JsonSchemaModel(propertySchema);
      }
    }
    return Object.keys(records).length ? records : undefined;
  }

  private static jsonFieldToSchema(
    value: unknown,
    visitedInPath = new Set<object>(),
    interpretSchemas = true,
  ): unknown {
    if (value === undefined || value === null) {
      return {
        type: 'string',
        const: '',
        [this.extRawValue]: true,
      };
    }
    if (typeof value !== 'object') {
      const stringValue =
        typeof (value as { toString?: unknown }).toString === 'function'
          ? String(value)
          : value;
      return {
        type: 'string',
        const: stringValue,
        [this.extRawValue]: true,
      };
    }

    const valueObject = value;
    if (visitedInPath.has(valueObject)) {
      throw new Error(
        'too much recursion. Please check document for recursion.',
      );
    }

    visitedInPath.add(valueObject);
    try {
      if (interpretSchemas && this.isJSONSchema(value)) {
        return value;
      }
      if (Array.isArray(value)) {
        return {
          type: 'array',
          items: value.map((item) =>
            this.jsonFieldToSchema(item, visitedInPath, interpretSchemas),
          ),
          [this.extRenderAdditionalInfo]: false,
        };
      }
      return {
        type: 'object',
        properties: Object.entries(value).reduce(
          (properties, [key, item]) => {
            properties[key] = this.jsonFieldToSchema(
              item,
              visitedInPath,
              interpretSchemas,
            );
            return properties;
          },
          {} as Record<string, unknown>,
        ),
        [this.extRenderAdditionalInfo]: false,
      };
    } finally {
      visitedInPath.delete(valueObject);
    }
  }

  private static isJSONSchema(value: unknown): boolean {
    if (!isPlainObject(value)) return false;

    const type = value.type;
    if (typeof type === 'string') {
      return jsonSchemaTypes.includes(type);
    }
    if (Array.isArray(type)) {
      // a valid array-valued `type` lists only known JSON Schema types
      return (
        type.length > 0 &&
        type.every(
          (entry) =>
            typeof entry === 'string' && jsonSchemaTypes.includes(entry),
        )
      );
    }

    // schemas may omit `type` and instead be identified by other keywords
    return jsonSchemaDetectionKeywords.some((keyword) =>
      Object.prototype.hasOwnProperty.call(value, keyword),
    );
  }

  // `{ not: {}, ... }` schemas accept nothing
  private static isNeverSchema(schema: SchemaLike): boolean {
    const not = schema.not();
    return Boolean(not && this.inferType(not) === SchemaCustomTypes.ANY);
  }

  private static toType(type: string, schema: SchemaLike): string {
    if (schema.isCircular()) {
      return type;
    }
    if (type === 'array') {
      const items = schema.items();
      if (Array.isArray(items)) {
        return this.toItemsType(items, schema);
      }
      if (!items) {
        return `array<${SchemaCustomTypes.ANY}>`;
      }
      return `array<${this.toSchemaType(items) || SchemaCustomTypes.UNKNOWN}>`;
    }
    return type;
  }

  private static toItemsType(items: SchemaLike[], schema: SchemaLike): string {
    const types = items.map((item) => this.toSchemaType(item)).join(', ');
    const additionalItems = schema.additionalItems();
    if (additionalItems !== undefined && additionalItems !== false) {
      const additionalType =
        additionalItems === true
          ? SchemaCustomTypes.ANY
          : this.toSchemaType(additionalItems);
      return `tuple<${
        types || SchemaCustomTypes.UNKNOWN
      }, ...optional<${additionalType}>>`;
    }
    return `tuple<${types || SchemaCustomTypes.UNKNOWN}>`;
  }

  private static toCombinedType(schema: SchemaLike): string | undefined {
    if (schema.oneOf()?.length) return 'oneOf';
    if (schema.anyOf()?.length) return 'anyOf';
    if (schema.allOf()?.length) return 'allOf';
    return undefined;
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  private static inferType(schema: SchemaLike): string[] | string {
    if (schema.isBooleanSchema()) {
      return schema.json() === true
        ? SchemaCustomTypes.ANY
        : SchemaCustomTypes.NEVER;
    }
    let types = schema.type();

    if (types !== undefined) {
      if (Array.isArray(types)) {
        // if types have `integer` and `number` types, `integer` is unnecessary
        if (types.includes('integer') && types.includes('number')) {
          types = types.filter((t) => t !== 'integer');
        }
        return types.length === 1 ? types[0] : types;
      }
      return types;
    }

    const constValue = schema.const();
    if (constValue !== undefined) {
      return this.typeOfValue(constValue);
    }
    const enumValue = schema.enum();
    if (Array.isArray(enumValue) && enumValue.length) {
      const inferredType = Array.from(
        new Set(enumValue.map((e) => this.typeOfValue(e))),
      );
      return inferredType.length === 1 ? inferredType[0] : inferredType;
    }

    const json = schema.json();
    const schemaKeys = isPlainObject(json) ? Object.keys(json) : [];
    const hasInferredTypes = jsonSchemaKeywords.some((key) =>
      schemaKeys.includes(key),
    );
    if (hasInferredTypes === true) {
      return SchemaCustomTypes.RESTRICTED_ANY;
    }
    if (this.toCombinedType(schema)) {
      return '';
    }
    return SchemaCustomTypes.ANY;
  }

  private static typeOfValue(value: unknown): string {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    return typeof value;
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
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
      // number range format: "0 <= value <= 1"
      numberRange = '';
      numberRange += hasExclusiveMin ? exclusiveMin : min;
      numberRange += hasExclusiveMin ? ' < ' : ' <= ';
      numberRange += 'value';
      numberRange += hasExclusiveMax ? ' < ' : ' <= ';
      numberRange += hasExclusiveMax ? exclusiveMax : max;
    } else if (hasMin) {
      numberRange = '';
      numberRange += hasExclusiveMin ? exclusiveMin : min;
      numberRange += hasExclusiveMin ? ' < ' : ' <= ';
      numberRange += 'value';
    } else if (hasMax) {
      numberRange = '';
      numberRange += 'value';
      numberRange += hasExclusiveMax ? ' < ' : ' <= ';
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

  public static hasRules(schema: SchemaLike, constraints: string[]): boolean {
    return !!(
      /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
      (
        schema.format() ||
        schema.pattern() ||
        constraints.length > 0 ||
        schema.contentEncoding() ||
        schema.enum() ||
        schema.default() !== undefined ||
        schema.const() !== undefined
      )
      /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
    );
  }

  public static hasConditions(schema: SchemaLike): boolean {
    return !!(
      /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
      (
        schema.oneOf()?.length ||
        schema.anyOf()?.length ||
        schema.allOf()?.length ||
        schema.not() ||
        schema.propertyNames() ||
        schema.contains() ||
        schema.if() ||
        schema.then() ||
        schema.else() ||
        this.getDependentSchemaModels(schema)
      )
      /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
    );
  }
}
