export type AsyncApi = {
  asyncApi: AsyncApiVersion;
  info: Info;
  baseTopic?: BaseTopic;
  servers?: Server[];
  topics?: Map<string, Topic>;
  stream?: Stream;
  events?: Event;
  components?: Component[];
  security?: SecurityScheme;
  tags?: Tag[];
  externalDocs?: ExternalDocs;
};

export type AsyncApiVersion = string;
export type BaseTopic = string;
export type IExternalSpecification = Map<string, any>;

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
  schema: string;
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
  $ref: string;
  subscribe: string;
  publish: string;
  parameters?: [Parameter | Reference];
};

export type Parameter = {
  name?: string;
  description?: string;
  schema: Schema;
};

export type Reference = {
  $ref: string;
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
  headers?: Schema;
  payload?: Schema;
  summary?: string;
  description?: string;
  tags: Tag[];
  externalDocs: ExternalDocs;
};

export type Schema = {
  type: string;
  required: string[];
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

export type Component = {
  schemas?: Map<string, Schema | Reference>;
  messages?: Map<string, Schema | Reference>;
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
