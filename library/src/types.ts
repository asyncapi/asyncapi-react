import { ConfigInterface } from './config';

// Helpers
export type PrimitiveType = number | boolean | string | null;
export type PropsWithDefaults<T, D> = T & D;
export type ExcludeNullable<T> = Exclude<T, null | undefined>;
export interface TypeWithKey<TKey, TContent> {
  key: TKey;
  content: TContent;
}
export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };

// Types
export type AsyncAPIVersion = string;
export type UniqueID = string;
export type DefaultContentType = string;
export type BaseTopic = string;
export type DescriptionHTML = string | React.ReactNode;
export type ExternalSpecification = Record<string, any>;
export type ReferenceString = string;
export type OneOf = 'oneOf';
export type AnyOf = 'anyOf';
export type SchemaType =
  | 'array'
  | 'boolean'
  | 'integer'
  | 'null'
  | 'number'
  | 'object'
  | 'string';

// AsyncAPI types
export enum BindingsType {
  http = 'http',
  ws = 'ws',
  kafka = 'kafka',
  amqp = 'amqp',
  amqp1 = 'amqp1',
  mqtt = 'mqtt',
  mqtt5 = 'mqtt5',
  nats = 'nats',
  jms = 'jms',
  sns = 'sns',
  sqs = 'sqs',
  stomp = 'stomp',
  redis = 'redis',
}
export type Bindings = keyof typeof BindingsType;

export interface AsyncAPI {
  asyncapi: AsyncAPIVersion;
  id?: UniqueID;
  info: Info;
  servers?: Servers;
  channels: Channels;
  defaultContentType?: DefaultContentType;
  components?: Components;
  tags?: Tag[];
  externalDocs?: ExternalDocs;
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
  [k: string]: Server;
}

export interface Server {
  url: string;
  protocol: string;
  protocolVersion?: string;
  description?: DescriptionHTML;
  variables?: ServerVariables;
  security?: SecurityRequirement[];
  bindings?: ServerBindings[];
}

export interface ServerVariables {
  [k: string]: ServerVariable;
}

export interface ServerVariable {
  enum?: string[];
  default?: string;
  description?: DescriptionHTML;
  examples?: string[];
}

export interface SecurityRequirement {
  [key: string]: string[];
}

export interface ServerBindings {
  [key: string]: any;
}

export interface Channels {
  [key: string]: Channel;
}

export interface Channel {
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
  [key: string]: any;
}

export interface Parameters {
  [key: string]: Parameter;
}

export interface Topic {
  $ref?: ReferenceString;
  deprecated?: boolean;
  subscribe?: Message | Record<OneOf, Message[]>;
  publish?: Message | Record<OneOf, Message[]>;
  parameters?: Parameter[];
}

export interface Parameter {
  description?: DescriptionHTML;
  schema?: Schema;
  location?: string;
}

export interface Reference {
  $ref: ReferenceString;
}

export type Message = RawMessage | Record<OneOf, RawMessage[]>;

export function isRawMessage(message: Message): message is RawMessage {
  return !(message as any).oneOf;
}

export enum PayloadType {
  PUBLISH = 'publish',
  SUBSCRIBE = 'subscribe',
}

export function isOneOfPayload(
  payload: RawMessage['payload'],
): payload is Record<OneOf, Schema[]> {
  return !!payload && (payload as Record<OneOf, Schema[]>).oneOf !== undefined;
}

export function isAnyOfPayload(
  payload: RawMessage['payload'],
): payload is Record<AnyOf, Schema[]> {
  return !!payload && (payload as Record<AnyOf, Schema[]>).anyOf !== undefined;
}

export interface RawMessage {
  schemaFormat?: string;
  contentType?: string;
  headers?: Schema;
  payload?: Schema | Record<OneOf, Schema[]> | Record<AnyOf, Schema[]>; // payload is Schema, not any https://github.com/asyncapi/parser-js/blob/master/lib/models/message.js#L35
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
  name: string;
  description?: string;
  externalDocs?: ExternalDocs;
}

export interface ExternalDocs {
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
  securitySchemes?: Record<Bindings, SecurityScheme>;
  parameters?: Record<string, Parameter>;
  correlationIds?: CorrelationId;
  operationTraits?: Record<string, OperationTrait>;
  messageTraits?: Record<string, MessageTrait>;
}

export enum SecuritySchemeType {
  userPassword = 'User / Password',
  apiKey = 'API key',
  X509 = 'X509',
  symmetricEncryption = 'Symmetric Encryption',
  asymmetricEncryption = 'Asymmetric Encryption',
  httpApiKey = 'HTTP API key',
  http = 'HTTP',
  oauth2 = 'OAuth2',
  openIdConnect = 'Open ID',
}
export type SecuritySchemeTypes = keyof typeof SecuritySchemeType;

export interface SecurityScheme {
  type: SecuritySchemeTypes;
  description?: DescriptionHTML;
  in: string;
  name: string;
  scheme: string;
  bearerFormat?: string;
  flows?: OAuthFlows;
  openIdConnectUrl?: string;
}

export enum OAuthFlowsType {
  implicit = 'Implicit',
  password = 'Password',
  clientCredentials = 'Client Credentials',
  authorizationCode = 'Authorization Code',
}
export type OAuthFlowsTypes = keyof typeof OAuthFlowsType;

export interface OAuthFlows {
  implicit?: OAuthFlow;
  password?: OAuthFlow;
  clientCredentials?: OAuthFlow;
  authorizationCode?: OAuthFlow;
}

export interface OAuthFlow {
  authorizationUrl: string;
  tokenUrl: string;
  refreshUrl?: string;
  scopes: Record<string, string>;
}

export interface XML {
  name?: string;
  namespace?: string;
  prefix?: string;
  attribute?: boolean;
  wrapped?: boolean;
}

export type AdditionalProperties = boolean | Record<string, Schema>;

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

  additionalProperties?: AdditionalProperties;

  // old field

  // $schema?: string;
  // $id?: string;

  // definitions?: Record<string, any>;

  // additionalItems?: { anyOf: Schema[] } | Schema;

  // propertyOrder?: string[];

  // defaultProperties?: string[];
}

export type PropsSchema = string | FetchingSchemaInterface | any; // any for JSON input

export interface AsyncApiProps {
  schema: PropsSchema;
  config?: Partial<ConfigInterface>;
}

export type NullableAsyncApi = AsyncAPI | null;

export interface AsyncApiState {
  validatedSchema: NullableAsyncApi;
  error?: ErrorObject;
}

export function isFetchingSchemaInterface(
  schema: PropsSchema,
): schema is FetchingSchemaInterface {
  return (schema as FetchingSchemaInterface).url !== undefined;
}

export interface FetchingSchemaInterface {
  url: string;
  requestOptions?: RequestInit;
}

export interface ParserReturn {
  data: NullableAsyncApi;
  error?: ErrorObject;
}

export type TableColumnName = string;

export type PushStateBehavior = (hash: string) => void;

export interface Identifier {
  id: string;
  toKebabCase?: boolean;
}

export interface ValidationError {
  title: string;
  jsonPointer: string;
  startLine: number;
  startColumn: number;
  startOffset: number;
  endLine: number;
  endColumn: number;
  endOffset: number;
}

export interface ErrorObject {
  type: string;
  title: string;
  detail?: string;
  parsedJSON?: any;
  validationErrors?: ValidationError[];
  location?: {
    startLine: number;
    startColumn: number;
    startOffset: number;
  };
  refs?: {
    title: string;
    jsonPointer: string;
    startLine: number;
    startColumn: number;
    startOffset: number;
    endLine: number;
    endColumn: number;
    endOffset: number;
  }[];
}
