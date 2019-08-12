export type PrimitiveType = number | boolean | string | null;
export type Map<K extends string, V = any> = { [key in K]: V };
export type PropsWithDefaults<T, D> = T & D;
export interface TypeWithKey<T, V> {
  key: T;
  content: V;
}
export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };

export type AsyncApiVersion = string;
export type UniqueID = string;
export type DefaultContentType = string;
export type BaseTopic = string;
export type DescriptionHTML = string | React.ReactNode;
export type ExternalSpecification = Map<string, any>;
export type ReferenceString = string;
export type OneOf = 'oneOf';

export interface AsyncApi {
  asyncapi: AsyncApiVersion;
  id?: UniqueID;
  info: Info;
  servers?: Servers;
  defaultContentType?: DefaultContentType;
  channels?: Channels;
  components?: Components;
  tags?: Tag[];
  externalDocs?: ExternalDocs;
  // below - deprecated
  topics?: Map<string, Topic>;
  stream?: Stream;
  events?: Event;
  security?: Array<SecurityRequirement | SecurityScheme>;
  baseTopic?: BaseTopic; //get rid of it
}

export interface Channels {
  [key: string]: ChannelItem;
}
export interface ChannelItem {
  descripiton: DescriptionHTML;
  parameters: Parameter;
}
export interface Info {
  title: string;
  version: string;
  description?: DescriptionHTML;
  termsOfService?: string;
  contact?: Contact;
  license?: License;
}

export interface Contact {
  name?: string;
  url?: string;
  email?: string;
}

export interface License {
  name: string;
  url?: string;
}

export interface Servers {
  [k: string]: Server; // done
}

export interface Server {
  url: string;
  protocol: string;
  protocolVersion?: string;
  description?: DescriptionHTML;
  variables?: ServerVariables;
  security?: SecurityRequirement[]; //needs to be implemented
}

export interface ServerVariables {
  [k: string]: ServerVariable;
}

export interface ServerVariable {
  enum?: string[];
  default?: string;
  description?: DescriptionHTML;
  examples?: string[]; //needs to be implemented
}

export interface Topic {
  $ref?: ReferenceString;
  deprecated?: boolean;
  subscribe?: Message | Map<OneOf, Message[]>;
  publish?: Message | Map<OneOf, Message[]>;
  parameters?: Parameter[];
}

export interface Parameter {
  location?: string;
  description?: DescriptionHTML;
  schema: Schema;
  name: string; //delet later
}

export interface Reference {
  $ref: ReferenceString;
}

export interface Stream {
  framing: StreamFraming;
  read?: Message[];
  write?: Message[];
}

export interface StreamFraming {
  type: string;
  delimiter?: string;
}

export interface Event {
  receive?: Message[];
  send?: Message[];
}

export interface Message {
  deprecated?: boolean;
  headers?: Schema;
  payload?: Schema;
  summary?: DescriptionHTML;
  description?: DescriptionHTML;
  tags?: Tag[];
  externalDocs?: ExternalDocs;
}

export interface Tag {
  // do not have to change
  name: string;
  description?: string;
  externalDocs?: ExternalDocs;
}

export interface ExternalDocs {
  // do not have to change
  url: string;
  description?: string;
}

export interface Components {
  schemas?: Map<string, Schema>;
  messages?: Map<string, Message>;
  securitySchemes?: Map<string, SecurityScheme>;
  parameters?: Map<string, Parameter>;
}

export interface SecurityScheme {
  type: string;
  description?: DescriptionHTML;
  name: string;
  in: string;
  scheme: string;
  bearerFormat?: string;
}

export interface XML {
  name?: string;
  namespace?: string;
  prefix?: string;
  attribute?: boolean;
  wrapped?: boolean;
}

export interface SecurityRequirement {
  // [key: string]: string[]; // TODO: obsluz mnie :D
}

export interface Schema {
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
}
