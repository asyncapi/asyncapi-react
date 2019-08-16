export type PrimitiveType = number | boolean | string | null;
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
export type ExternalSpecification = Record<string, any>;
export type ReferenceString = string;
export type OneOf = 'oneOf';
export type SchemaType =
  | 'array'
  | 'boolean'
  | 'integer'
  | 'null'
  | 'number'
  | 'object'
  | 'string';
export interface AsyncApi {
  asyncapi: AsyncApiVersion;
  channels: Channels;
  info: Info;
  id?: UniqueID;
  servers?: Servers;
  defaultContentType?: DefaultContentType;
  components?: Components;
  tags?: Tag[];
  externalDocs?: ExternalDocs;
  // below - deprecated
  // topics?: Record<string, Topic>;
  // stream?: Stream;
  // events?: Event;
  // security?: Array<SecurityRequirement | SecurityScheme>;
}

export interface Channels {
  [key: string]: ChannelItem;
}
export interface ChannelItem {
  parameters?: Parameters;
  description?: DescriptionHTML;
  publish?: Operation;
  subscribe?: Operation;
  deprecated?: boolean;
  protocolInfo?: ProtocolInfo;
}

export interface OperationTrait {
  summary?: string;
  description?: DescriptionHTML;
  tags?: Tag[];
  externalDocs?: ExternalDocs;
  operationId?: string;
  protocolInfo?: any;
}

export type TraitType = OperationTrait | [OperationTrait, any];

export interface Operation {
  traits?: TraitType[];
  summary?: string;
  description?: DescriptionHTML;
  tags?: Tag[];
  externalDocs?: ExternalDocs;
  operationId?: string;
  protocolInfo?: ProtocolInfo;
  message?: Message;
}

export interface ProtocolInfo {
  [key: string]: any; // done
}

export interface Parameters {
  [key: string]: Parameter; // done
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
  security?: SecurityRequirement[]; // discuss whether to extract it or keep it in same category
}

export interface ServerVariables {
  [k: string]: ServerVariable;
}

export interface ServerVariable {
  enum?: string[];
  default?: string;
  description?: DescriptionHTML;
  examples?: string[]; // needs to be implemented
}

export interface Topic {
  $ref?: ReferenceString;
  deprecated?: boolean;
  subscribe?: Message | Record<OneOf, Message[]>;
  publish?: Message | Record<OneOf, Message[]>;
  parameters?: Parameter[];
}

export interface Parameter {
  // done
  description?: DescriptionHTML;
  schema?: Schema;
  location?: string;
}

export interface Reference {
  $ref: ReferenceString;
}

// export interface Stream {
//   framing: StreamFraming;
//   read?: Message[];
//   write?: Message[];
// }

// export interface StreamFraming {
//   type: string;
//   delimiter?: string;
// }

// export interface Event {
//   receive?: Message[];
//   send?: Message[];
// }

export type Message = RawMessage | Record<OneOf, RawMessage[]>;

export function isRawMessage(message: Message): message is RawMessage {
  return !(message as any).oneOf;
}

export function isOneOfPayload(
  payload: any | Record<OneOf, any>,
): payload is Record<OneOf, any> {
  return (payload as Record<OneOf, any>).oneOf !== undefined;
}

export interface RawMessage {
  schemaFormat?: string;
  contentType?: string;
  headers?: Schema;
  payload?: Schema | Record<OneOf, Schema[]>; //payload is Schema, not any https://github.com/asyncapi/parser-js/blob/master/lib/models/message.js#L35
  correlationId?: CorrelationId;
  tags?: Tag[];
  summary?: DescriptionHTML;
  name?: string;
  title?: string;
  description?: DescriptionHTML;
  externalDocs?: ExternalDocs;
  deprecated?: boolean;
  examples?: any[];
  protocolInfo?: any;
  traits?: MessageTrait | [MessageTrait, any];
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
  description?: DescriptionHTML;
}

export interface CorrelationId {
  description?: string;
  location: string;
}

export interface MessageTrait {
  schemaFormat?: string;
  contentType?: string;
  headers?: Schema;
  correlationId?: CorrelationId;
  tags?: Tag[];
  summary?: string;
  name?: string;
  title?: string;
  description?: DescriptionHTML;
  externalDocs?: ExternalDocs;
  deprecated?: boolean;
  examples?: any[];
  protocolInfo?: Record<string, any>;
}

export interface Components {
  schemas?: Record<string, Schema>;
  messages?: Record<string, Message>;
  securitySchemes?: Record<string, SecurityScheme>;
  parameters?: Record<string, Parameter>;
  correlationIds?: CorrelationId;
  operationTraits?: Record<string, OperationTrait>;
  messageTraits?: Record<string, MessageTrait>;
}

export interface SecurityScheme {
  type: string;
  in: string;
  name: string;
  scheme: string;
  bearerFormat?: string;
  description?: DescriptionHTML;
}

export interface XML {
  name?: string;
  namespace?: string;
  prefix?: string;
  attribute?: boolean;
  wrapped?: boolean;
}

export interface SecurityRequirement {
  [key: string]: string[];
}

// as https://github.com/asyncapi/asyncapi/pull/256/files is merged now we have to rethink how to visualize schema
// this thing is now deprecated
export interface Schema {
  nullable?: boolean;
  format?: string;
  title?: string;
  description?: DescriptionHTML;
  default?: PrimitiveType | {};
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp | string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  enum?: any[];
  deprecated?: boolean;
  type?: SchemaType;
  items?: Schema /*| Schema[];*/; // todo: end this
  discriminator?: string;
  readOnly?: boolean;
  xml?: XML;
  externalDocs?: ExternalDocs;
  example?: any;
  examples?: any[];
  allOf?: Schema[];
  oneOf?: Schema[];
  anyOf?: Schema[];
  not?: Schema;
  properties?: Record<string, Schema>;

  // old field

  $schema?: string;
  $id?: string;

  definitions?: Record<string, any>;

  additionalItems?: { anyOf: Schema[] } | Schema;

  additionalProperties?: Record<string, Schema>;

  propertyOrder?: string[];

  defaultProperties?: string[];
}
