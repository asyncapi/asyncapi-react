export type PrimitiveType = number | boolean | string | null;
export type Map<K extends string, V = any> = { [key in K]: V };
export type PropsWithDefaults<T, D> = T & D;
export type TypeWithKey<T, V> = { key: T; content: V };
export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };

export type AsyncApiVersion = string;
export type BaseTopic = string;
export type DescriptionHTML = string | React.ReactNode;
export type ExternalSpecification = Map<string, any>;
export type ReferenceString = string;
export type OneOf = 'oneOf';

export type AsyncApi = {
  asyncapi: AsyncApiVersion;
  info: Info;
  baseTopic?: BaseTopic;
  servers?: Server[];
  topics?: Map<string, Topic>;
  stream?: Stream;
  events?: Event;
  components?: Components;
  security?: Array<SecurityRequirement | SecurityScheme>;
  tags?: Tag[];
  externalDocs?: ExternalDocs;
};

export type Info = {
  title: string;
  version: string;
  description?: DescriptionHTML;
  termsOfService?: string;
  contact?: Contact;
  license?: License;
};

export type Contact = {
  name?: string;
  url?: string;
  email?: string;
};

export type License = {
  name: string;
  url?: string;
};

export type Server = {
  url: string;
  scheme: string;
  schemeVersion?: string;
  description?: DescriptionHTML;
  variables?: Map<string, ServerVariable>;
};

export type ServerVariable = {
  enum?: string[];
  default?: string;
  description?: DescriptionHTML;
};

export type Topic = {
  $ref?: ReferenceString;
  deprecated?: boolean;
  subscribe?: Message | Map<OneOf, Message[]>;
  publish?: Message | Map<OneOf, Message[]>;
  parameters?: Parameter[];
};

export type Parameter = {
  name?: string;
  description?: DescriptionHTML;
  schema: Schema;
};

export type Reference = {
  $ref: ReferenceString;
};

export type Stream = {
  framing: StreamFraming;
  read?: Message[];
  write?: Message[];
};

export type StreamFraming = {
  type: string;
  delimiter?: string;
};

export type Event = {
  receive?: Message[];
  send?: Message[];
};

export type Message = {
  deprecated?: boolean;
  headers?: Schema;
  payload?: Schema;
  summary?: DescriptionHTML;
  description?: DescriptionHTML;
  tags?: Tag[];
  externalDocs?: ExternalDocs;
};

export type Tag = {
  name: string;
  description?: string;
  externalDocs?: ExternalDocs;
};

export type ExternalDocs = {
  url: string;
  description?: string;
};

export type Components = {
  schemas?: Map<string, Schema>;
  messages?: Map<string, Message>;
  securitySchemes?: Map<string, SecurityScheme>;
  parameters?: Map<string, Parameter>;
};

export type SecurityScheme = {
  type: string;
  description?: DescriptionHTML;
  name: string;
  in: string;
  scheme: string;
  bearerFormat?: string;
};

export type XML = {
  name?: string;
  namespace?: string;
  prefix?: string;
  attribute?: boolean;
  wrapped?: boolean;
};

export type SecurityRequirement = {};

export type Schema = {
  $schema?: string;
  $id?: string;
  description?: DescriptionHTML;
  allOf?: Schema[];
  oneOf?: Schema[];
  anyOf?: Schema[];
  title?: string;
  type?: string | string[];
  definitions?: Map<string, any>;
  format?: string;
  items?: Schema;
  minItems?: number;
  additionalItems?: { anyOf: Schema[] } | Schema;
  enum?: PrimitiveType[] | Schema[];
  default?: PrimitiveType | Object;
  additionalProperties?: Map<string, Schema>;
  required?: string[];
  propertyOrder?: string[];
  properties?: Map<string, Schema>;
  defaultProperties?: string[];
  patternProperties?: Map<string, Schema>;
  typeof?: 'function';
  nullable?: boolean;
  discriminator?: string;
  readOnly?: boolean;
  writeOnly?: boolean;
  xml?: XML;
  externalDocs?: ExternalDocs;
  example?: any;
  deprecated?: boolean;
};
