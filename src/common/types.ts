import { Map, PrimitiveType } from './utils';

export type AsyncApi = {
  asyncapi: AsyncApiVersion;
  info: Info;
  baseTopic?: BaseTopic;
  servers?: Server[];
  topics?: Map<string, Topic>;
  stream?: Stream;
  events?: Event;
  components?: Components;
  security?: SecurityScheme;
  tags?: Tag[];
  externalDocs?: ExternalDocs;
};

export type AsyncApiVersion = string;
export type BaseTopic = string;
export type ExternalSpecification = Map<string, any>;
export type ReferenceString = string;
export type OneOf = "oneOf";

export type Info = {
  title: string;
  version: string;
  description?: string;
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
  description?: string;
  variables?: Map<string, ServerVariable>;
};

export type ServerVariable = {
  enum?: string[];
  default?: string;
  description?: string;
};

export type Topic = {
  $ref?: ReferenceString;
  subscribe?: Reference | Message | Map<OneOf, Array<Message | Reference>>;
  publish?: Reference | Message | Map<OneOf, Array<Message | Reference>>;
  parameters?: [Parameter | Reference];
};

export type Parameter = {
  name?: string;
  description?: string;
  schema: Schema;
};

export type Reference = {
  $ref: ReferenceString;
};

export type Stream = {
  framing: StreamFraming;
  read?: Array<Message | Reference>;
  write?: Array<Message | Reference>;
};

export type StreamFraming = {
  type: string;
  delimiter?: string;
};

export type Event = {
  receive?: Array<Message | Reference>;
  send?: Array<Message | Reference>;
};

export type Message = {
  headers?: Schema;
  payload?: Schema;
  summary?: string;
  description?: string;
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
  schemas?: Map<string, Schema | Reference>;
  messages?: Map<string, Message | Reference>;
  securitySchemes?: Map<string, SecurityScheme | Reference>;
  parameters?: Map<string, Parameter | Reference>;
};

export type SecurityScheme = {
  type: string;
  description?: string;
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
  description?: string;
  allOf?: Schema[];
  oneOf?: Schema[];
  anyOf?: Schema[];
  title?: string;
  type?: string | string[];
  definitions?: Map<string, any>;
  format?: string;
  items?: Schema | Schema[];
  minItems?: number;
  additionalItems?: { anyOf: Schema[]; } | Schema;
  enum?: PrimitiveType[] | Schema[];
  default?: PrimitiveType | Object;
  additionalProperties?: Schema | boolean;
  required?: string[];
  propertyOrder?: string[];
  properties?: Map<string, any>;
  defaultProperties?: string[];
  patternProperties?: Map<string, Schema>;
  typeof?: "function";
} | Reference;
