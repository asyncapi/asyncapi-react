import { JsonSchemaModel } from './schema-no-parser';

// interface for a security requirement used by ParsedDocument servers
export interface SecurityRequirementsLike {
  all(): {
    scheme():
      | {
          type(): string;
          flows():
            | { password(): { tokenUrl(): string | undefined } | undefined }
            | undefined;
          hasDescription(): boolean;
        }
      | undefined;
    scopes(): string[];
  }[];
}

// interface for a parsed AsyncAPI document, avoiding parser dependency in public declarations
export interface ParsedDocument {
  info():
    | { title(): string; version(): string; [key: string]: unknown }
    | undefined;
  servers(): {
    all(): {
      id(): string;
      security(): SecurityRequirementsLike[];
      [key: string]: unknown;
    }[];
  };
  channels(): { all(): { id(): string; [key: string]: unknown }[] };
  operations(): { all(): Record<string, unknown>[] };
  components(): Record<string, unknown>;
  version(): string;
  [key: string]: unknown;
}

// interface for a tag model used by containTags/operationsTags/serversTags.
export interface TagLike {
  name(): string;
  json(): unknown;
}

type RawObject = Record<string, unknown>;

class ModelCollection<T> {
  private readonly items: T[];

  constructor(items: T[]) {
    this.items = items;
  }

  all(): T[] {
    return this.items;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  get length(): number {
    return this.items.length;
  }
}

class BindingModel {
  constructor(
    private readonly protocolName: string,
    private readonly bindingValue: unknown,
  ) {}

  protocol(): string {
    return this.protocolName;
  }

  value(): unknown {
    return this.bindingValue;
  }
}

class BindingsModel {
  private readonly bindings: BindingModel[];

  constructor(raw: unknown) {
    this.bindings =
      raw && typeof raw === 'object'
        ? Object.entries(raw as RawObject).map(
            ([protocol, value]) => new BindingModel(protocol, value),
          )
        : [];
  }

  all(): BindingModel[] {
    return this.bindings;
  }

  isEmpty(): boolean {
    return this.bindings.length === 0;
  }

  get length(): number {
    return this.bindings.length;
  }
}

class TagModel {
  constructor(private readonly raw: RawObject) {}

  name(): string {
    return String(this.raw.name ?? '');
  }

  json(): unknown {
    return this.raw;
  }

  description(): string | undefined {
    return this.raw.description as string | undefined;
  }

  externalDocs(): (GenericModel & { url(): string | undefined }) | undefined {
    const externalDocs = this.raw.externalDocs;
    if (!externalDocs || typeof externalDocs !== 'object') return undefined;
    const model = new GenericModel(externalDocs) as GenericModel & {
      url(): string | undefined;
    };
    model.url = () => (externalDocs as RawObject).url as string | undefined;
    return model;
  }
}

class TagCollection {
  constructor(private readonly raw: unknown) {}

  all(): TagModel[] {
    if (!Array.isArray(this.raw)) return [];
    return this.raw.map(
      (tag) =>
        new TagModel(
          typeof tag === 'object' && tag !== null
            ? (tag as RawObject)
            : { name: String(tag) },
        ),
    );
  }

  get length(): number {
    return this.all().length;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  forEach(callback: (tag: TagModel) => void): void {
    this.all().forEach(callback);
  }
}

class GenericModel {
  constructor(protected readonly raw: unknown) {}

  json(): unknown {
    return this.raw;
  }

  id(): string | undefined {
    return typeof this.rawObject().id === 'string'
      ? (this.rawObject().id as string)
      : undefined;
  }

  name(): string | undefined {
    return this.rawObject().name as string | undefined;
  }

  url(): string | undefined {
    return this.rawObject().url as string | undefined;
  }

  email(): string | undefined {
    return this.rawObject().email as string | undefined;
  }

  description(): string | undefined {
    return this.rawObject().description as string | undefined;
  }

  protected rawObject(): RawObject {
    return typeof this.raw === 'object' && this.raw !== null
      ? (this.raw as RawObject)
      : {};
  }

  extensions(): {
    all(): { id(): string; value(): unknown }[];
    get(id: string): { id(): string; value(): unknown } | undefined;
  } {
    const extensions = Object.entries(this.rawObject())
      .filter(([key]) => key.startsWith('x-') && key !== 'x-parser-spec-parsed')
      .map(([key, value]) => ({
        id: () => key,
        value: () => value,
      }));
    return {
      all: () => extensions,
      get: (id: string) =>
        extensions.find((extension) => extension.id() === id),
    };
  }

  isEmpty(): boolean {
    return Object.keys(this.rawObject()).length === 0;
  }

  tags(): TagCollection {
    return new TagCollection(this.rawObject().tags);
  }
}

class ChannelModel extends GenericModel {
  constructor(
    private readonly channelName: string,
    raw: unknown,
    private readonly serverIds: RawObject = {},
  ) {
    super(raw);
  }

  id(): string {
    return this.channelName;
  }

  address(): string {
    return typeof this.rawObject().address === 'string'
      ? (this.rawObject().address as string)
      : this.channelName;
  }

  /**
   * A channel lists the servers it is available on with different shapes: AsyncAPI v2
   * uses plain server names, while v3 uses `$ref` pointers or the already dereferenced
   * server objects. Every shape has to map back to the id used by the servers section.
   */
  private resolveServerId(server: unknown): string {
    if (typeof server === 'string') {
      return server.split('/').pop() ?? server;
    }
    if (server && typeof server === 'object') {
      const ref = (server as RawObject).$ref;
      if (typeof ref === 'string') {
        return pointerName(ref) ?? ref;
      }
      // A dereferenced server object is the same reference as the one in `servers`.
      const match = Object.entries(this.serverIds).find(
        ([, raw]) => raw === server,
      );
      if (match) return match[0];
    }
    return String(server);
  }

  servers(): ModelCollection<ServerModel> {
    const servers = this.rawObject().servers;
    if (!Array.isArray(servers)) return new ModelCollection([]);
    return new ModelCollection(
      servers.map(
        (server) => new ServerModel(this.resolveServerId(server), {}),
      ),
    );
  }

  parameters(): ModelCollection<ParameterModel> | undefined {
    const rawParameters = this.rawObject().parameters;
    if (!rawParameters || typeof rawParameters !== 'object') return undefined;
    const parameters = Object.entries(rawParameters as RawObject).map(
      ([name, raw]) => new ParameterModel(name, raw),
    );
    return new ModelCollection(parameters);
  }

  bindings(): BindingsModel | undefined {
    const bindings = this.rawObject().bindings;
    return bindings ? new BindingsModel(bindings) : undefined;
  }

  messages(): ModelCollection<MessageModel> {
    const rawMessages = this.rawObject().messages;
    if (!rawMessages || typeof rawMessages !== 'object') {
      return new ModelCollection([]);
    }
    return new ModelCollection(
      Object.entries(rawMessages as RawObject).map(
        ([name, raw]) => new MessageModel(name, raw),
      ),
    );
  }

  description(): string | undefined {
    return this.rawObject().description as string | undefined;
  }

  hasDescription(): boolean {
    return typeof this.description() === 'string';
  }
}

class ParameterModel extends GenericModel {
  constructor(
    private readonly parameterName: string,
    raw: unknown,
  ) {
    super(raw);
  }

  id(): string {
    return this.parameterName;
  }

  schema(): JsonSchemaModel | undefined {
    const schema = this.rawObject().schema;
    return schema ? JsonSchemaModel.fromJSON(schema) : undefined;
  }

  hasDescription(): boolean {
    return typeof this.rawObject().description === 'string';
  }

  description(): string | undefined {
    return this.rawObject().description as string | undefined;
  }

  hasLocation(): boolean {
    return typeof this.rawObject().location === 'string';
  }

  location(): string | undefined {
    return this.rawObject().location as string | undefined;
  }
}

// Base for models that expose security requirements resolved against the document's
// `securitySchemes` map.
abstract class SecurableModel extends GenericModel {
  constructor(
    raw: unknown,
    protected readonly securitySchemes: RawObject = {},
  ) {
    super(raw);
  }

  security(): SecurityRequirementsModel[] {
    return normalizeSecurityRequirements(
      this.rawObject().security,
      this.securitySchemes,
    );
  }
}

class ServerModel extends SecurableModel {
  constructor(
    private readonly serverName: string,
    raw: unknown,
    securitySchemes: RawObject = {},
  ) {
    super(raw, securitySchemes);
  }

  id(): string {
    return this.serverName;
  }

  url(): string {
    const raw = this.rawObject();
    if (typeof raw.url === 'string') {
      return raw.url;
    }
    // AsyncAPI v3 servers have no `url`; it is composed from protocol, host and pathname.
    const host = typeof raw.host === 'string' ? raw.host : '';
    if (!host) return '';
    const normalizedHost = host.endsWith('/') ? host : `${host}/`;
    const rawPathname = typeof raw.pathname === 'string' ? raw.pathname : '';
    const pathname = rawPathname.startsWith('/')
      ? rawPathname.substring(1)
      : rawPathname;
    return `${String(raw.protocol ?? '')}://${normalizedHost}${pathname}`;
  }

  protocol(): string {
    return String(this.rawObject().protocol ?? '');
  }

  protocolVersion(): string | undefined {
    return this.rawObject().protocolVersion as string | undefined;
  }

  description(): string | undefined {
    return this.rawObject().description as string | undefined;
  }

  hasDescription(): boolean {
    return typeof this.description() === 'string';
  }

  variables(): ModelCollection<ServerVariableModel> | undefined {
    const variables = this.rawObject().variables;
    if (!variables || typeof variables !== 'object') return undefined;
    return new ModelCollection(
      Object.entries(variables as RawObject).map(
        ([name, raw]) => new ServerVariableModel(name, raw),
      ),
    );
  }

  bindings(): BindingsModel | undefined {
    const bindings = this.rawObject().bindings;
    return bindings ? new BindingsModel(bindings) : undefined;
  }

  tags(): TagCollection {
    return new TagCollection(this.rawObject().tags);
  }
}

class ServerVariableModel extends GenericModel {
  constructor(
    private readonly variableName: string,
    raw: unknown,
  ) {
    super(raw);
  }

  id(): string {
    return this.variableName;
  }
}

class OAuthFlowModel extends GenericModel {
  authorizationUrl(): string | undefined {
    return this.rawObject().authorizationUrl as string | undefined;
  }

  tokenUrl(): string | undefined {
    return this.rawObject().tokenUrl as string | undefined;
  }

  refreshUrl(): string | undefined {
    return this.rawObject().refreshUrl as string | undefined;
  }

  scopes(): Record<string, string> | undefined {
    const scopes = this.rawObject().availableScopes;
    if (!scopes || typeof scopes !== 'object') return undefined;
    return scopes as Record<string, string>;
  }
}

class OAuthFlowsModel {
  constructor(private readonly raw: RawObject) {}

  hasImplicit(): boolean {
    return !!this.raw.implicit;
  }

  implicit(): OAuthFlowModel | undefined {
    return this.raw.implicit
      ? new OAuthFlowModel(this.raw.implicit)
      : undefined;
  }

  hasAuthorizationCode(): boolean {
    return !!this.raw.authorizationCode;
  }

  authorizationCode(): OAuthFlowModel | undefined {
    return this.raw.authorizationCode
      ? new OAuthFlowModel(this.raw.authorizationCode)
      : undefined;
  }

  hasClientCredentials(): boolean {
    return !!this.raw.clientCredentials;
  }

  clientCredentials(): OAuthFlowModel | undefined {
    return this.raw.clientCredentials
      ? new OAuthFlowModel(this.raw.clientCredentials)
      : undefined;
  }

  hasPassword(): boolean {
    return !!this.raw.password;
  }

  password(): OAuthFlowModel | undefined {
    return this.raw.password
      ? new OAuthFlowModel(this.raw.password)
      : undefined;
  }
}

class SecuritySchemeModel extends GenericModel {
  description(): string | undefined {
    return this.rawObject().description as string | undefined;
  }

  hasDescription(): boolean {
    return typeof this.description() === 'string';
  }

  type(): string {
    return String(this.rawObject().type ?? '');
  }

  name(): string | undefined {
    return this.rawObject().name as string | undefined;
  }

  in(): string | undefined {
    return this.rawObject().in as string | undefined;
  }

  scheme(): string | undefined {
    return this.rawObject().scheme as string | undefined;
  }

  bearerFormat(): string | undefined {
    return this.rawObject().bearerFormat as string | undefined;
  }

  openIdConnectUrl(): string | undefined {
    return this.rawObject().openIdConnectUrl as string | undefined;
  }

  flows(): OAuthFlowsModel | undefined {
    const flows = this.rawObject().flows;
    if (!flows || typeof flows !== 'object') return undefined;
    return new OAuthFlowsModel(flows as RawObject);
  }
}

class SecurityRequirementModel {
  constructor(
    private readonly schemeValue: SecuritySchemeModel | undefined,
    private readonly scopeValues: string[],
  ) {}

  scheme(): SecuritySchemeModel | undefined {
    return this.schemeValue;
  }

  scopes(): string[] {
    return this.scopeValues;
  }
}

class SecurityRequirementsModel {
  constructor(private readonly requirements: SecurityRequirementModel[]) {}

  all(): SecurityRequirementModel[] {
    return this.requirements;
  }
}

/**
 * Normalizes the security requirement shapes used by v2 and v3 into the model the
 * renderer consumes: a list of requirement sets whose schemes are resolved through
 * the document's `securitySchemes` map.
 */
function normalizeSecurityRequirements(
  security: unknown,
  securitySchemes: RawObject,
): SecurityRequirementsModel[] {
  if (!Array.isArray(security)) return [];

  return security.map((entry) => {
    if (!entry || typeof entry !== 'object') {
      return new SecurityRequirementsModel([]);
    }

    const rawEntry = entry as RawObject;
    const requirements: SecurityRequirementModel[] = [];

    const ref = typeof rawEntry.$ref === 'string' ? rawEntry.$ref : undefined;
    if (ref) {
      const schemeName = pointerName(ref);
      const schemeRaw = schemeName ? securitySchemes[schemeName] : undefined;
      requirements.push(
        new SecurityRequirementModel(
          schemeRaw && typeof schemeRaw === 'object'
            ? new SecuritySchemeModel(schemeRaw)
            : undefined,
          [],
        ),
      );
      return new SecurityRequirementsModel(requirements);
    }

    if (typeof rawEntry.type === 'string') {
      requirements.push(
        new SecurityRequirementModel(
          new SecuritySchemeModel(rawEntry),
          Array.isArray(rawEntry.scopes) ? rawEntry.scopes.map(String) : [],
        ),
      );
      return new SecurityRequirementsModel(requirements);
    }

    Object.entries(rawEntry).forEach(([schemeName, scopes]) => {
      const schemeRaw = securitySchemes[schemeName];
      requirements.push(
        new SecurityRequirementModel(
          schemeRaw && typeof schemeRaw === 'object'
            ? new SecuritySchemeModel(schemeRaw)
            : undefined,
          Array.isArray(scopes) ? scopes.map(String) : [],
        ),
      );
    });
    return new SecurityRequirementsModel(requirements);
  });
}

function decodePointerSegment(segment: string): string {
  return segment.replace(/~1/g, '/').replace(/~0/g, '~');
}

function pointerName(pointer: unknown): string | undefined {
  if (typeof pointer !== 'string' || !pointer.startsWith('#/'))
    return undefined;
  const segments = pointer.substring(2).split('/');
  return decodePointerSegment(segments[segments.length - 1] ?? '');
}

/** Resolves a local `#/...` JSON pointer against the document, returning the input untouched otherwise. */
function resolveDocumentRef(ref: unknown, document: RawObject): unknown {
  if (!ref || typeof ref !== 'object') return ref;
  const pointer = (ref as RawObject).$ref;
  if (typeof pointer !== 'string' || !pointer.startsWith('#/')) return ref;
  let current: unknown = document;
  for (const segment of pointer
    .substring(2)
    .split('/')
    .map(decodePointerSegment)) {
    if (!current || typeof current !== 'object') return ref;
    current = (current as RawObject)[segment];
  }
  return current ?? ref;
}

class ExampleModel extends GenericModel {
  summary(): string | undefined {
    return this.rawObject().summary as string | undefined;
  }

  hasPayload(): boolean {
    return this.rawObject().payload !== undefined;
  }

  payload(): unknown {
    return this.rawObject().payload;
  }

  hasHeaders(): boolean {
    return this.rawObject().headers !== undefined;
  }

  headers(): unknown {
    return this.rawObject().headers;
  }
}

function unwrapPayloadSchema(payload: unknown): unknown {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return payload;
  }
  const envelope = payload as RawObject;
  const format = envelope.schemaFormat;
  const supportedFormat =
    typeof format === 'string' &&
    (/^application\/vnd\.aai\.asyncapi(?:\+json)?;version=3\.0\.0$/.test(
      format,
    ) ||
      /^application\/schema\+json;version=(?:draft-07|draft-2019-09|draft-2020-12)$/.test(
        format,
      ));
  return supportedFormat && 'schema' in envelope ? envelope.schema : payload;
}
class MessageModel extends GenericModel {
  constructor(
    private readonly messageName: string,
    raw: unknown,
  ) {
    super(raw);
  }

  id(): string {
    return this.messageName;
  }

  payload(): JsonSchemaModel | undefined {
    const payload = unwrapPayloadSchema(this.rawObject().payload);
    // `false` is a valid boolean schema, so only an absent payload is dropped.
    return payload === undefined
      ? undefined
      : JsonSchemaModel.fromJSON(payload);
  }

  headers(): JsonSchemaModel | undefined {
    const headers = this.rawObject().headers;
    return headers === undefined
      ? undefined
      : JsonSchemaModel.fromJSON(headers);
  }

  examples(): ModelCollection<ExampleModel> {
    const examples = this.rawObject().examples;
    return new ModelCollection(
      Array.isArray(examples)
        ? examples.map(
            (example) =>
              new ExampleModel(
                example && typeof example === 'object' ? example : {},
              ),
          )
        : [],
    );
  }

  description(): string | undefined {
    return this.rawObject().description as string | undefined;
  }

  hasDescription(): boolean {
    return typeof this.description() === 'string';
  }

  title(): string | undefined {
    return this.rawObject().title as string | undefined;
  }

  summary(): string | undefined {
    return this.rawObject().summary as string | undefined;
  }

  correlationId():
    | (GenericModel & {
        location(): string | undefined;
        hasDescription(): boolean;
      })
    | undefined {
    const correlationId = this.rawObject().correlationId;
    if (!correlationId || typeof correlationId !== 'object') return undefined;
    const model = new GenericModel(correlationId) as GenericModel & {
      location(): string | undefined;
      hasDescription(): boolean;
    };
    model.location = () =>
      (correlationId as RawObject).location as string | undefined;
    model.hasDescription = () =>
      typeof (correlationId as RawObject).description === 'string';
    return model;
  }

  contentType(): string | undefined {
    return this.rawObject().contentType as string | undefined;
  }

  externalDocs(): GenericModel | undefined {
    const externalDocs = this.rawObject().externalDocs;
    return externalDocs ? new GenericModel(externalDocs) : undefined;
  }

  bindings(): BindingsModel {
    const bindings = this.rawObject().bindings;
    return new BindingsModel(bindings);
  }
}

class ComponentsModel extends GenericModel {
  messages(): ModelCollection<MessageModel> {
    const messages = (this.rawObject().messages as RawObject | undefined) ?? {};
    return new ModelCollection(
      Object.entries(messages).map(
        ([name, raw]) => new MessageModel(name, raw),
      ),
    );
  }

  schemas(): ModelCollection<JsonSchemaModel & { id(): string }> {
    const schemas = (this.rawObject().schemas as RawObject | undefined) ?? {};
    return new ModelCollection(
      Object.entries(schemas).map(([name, raw]) => {
        const schema = JsonSchemaModel.fromJSON(raw) as JsonSchemaModel & {
          id(): string;
        };
        schema.id = () => name;
        return schema;
      }),
    );
  }
}

class OperationReplyModel extends GenericModel {
  private readonly channelModel?: ChannelModel;
  private readonly messageModels: MessageModel[];

  constructor(
    raw: unknown,
    documentRaw: RawObject = {},
    serverIds: RawObject = {},
  ) {
    super(raw);
    const replyRaw = this.rawObject();

    const channelRef = replyRaw.channel;
    const channelRaw = resolveDocumentRef(channelRef, documentRaw);
    if (channelRaw && typeof channelRaw === 'object') {
      const ref =
        channelRef && typeof channelRef === 'object'
          ? ((channelRef as RawObject).$ref as string | undefined)
          : undefined;
      const channelName =
        pointerName(ref) ??
        (typeof (channelRaw as RawObject).address === 'string'
          ? ((channelRaw as RawObject).address as string)
          : 'reply');
      this.channelModel = new ChannelModel(channelName, channelRaw, serverIds);
    }

    const messages = Array.isArray(replyRaw.messages) ? replyRaw.messages : [];
    this.messageModels = messages.map(
      (message, index) =>
        new MessageModel(
          `reply-${index}`,
          resolveDocumentRef(message, documentRaw),
        ),
    );
  }

  channel(): ChannelModel | undefined {
    return this.channelModel;
  }

  messages(): ModelCollection<MessageModel> {
    return new ModelCollection(this.messageModels);
  }

  address(): (GenericModel & { location(): string | undefined }) | undefined {
    const address = this.rawObject().address;
    if (!address || typeof address !== 'object') return undefined;
    const model = new GenericModel(address) as GenericModel & {
      location(): string | undefined;
    };
    model.location = () =>
      (address as RawObject).location as string | undefined;
    return model;
  }
}

class OperationModel extends SecurableModel {
  private readonly channel: ChannelModel;
  private readonly payloadDirection: 'send' | 'receive';

  constructor(
    private readonly operationName: string,
    raw: unknown,
    channelName: string,
    channelRaw: unknown = {},
    payloadDirection: 'send' | 'receive' = 'receive',
    private readonly serverIds: RawObject = {},
    securitySchemes: RawObject = {},
    private readonly documentRaw: RawObject = {},
  ) {
    super(raw, securitySchemes);
    this.channel = new ChannelModel(channelName, channelRaw, serverIds);
    this.payloadDirection = payloadDirection;
  }

  id(): string {
    return this.operationName;
  }

  action(): 'send' | 'receive' | undefined {
    const action = this.rawObject().action;
    return action === 'send' || action === 'receive' ? action : undefined;
  }

  channels(): ModelCollection<ChannelModel> {
    return new ModelCollection([this.channel]);
  }

  summary(): string | undefined {
    return this.rawObject().summary as string | undefined;
  }

  description(): string | undefined {
    return this.rawObject().description as string | undefined;
  }

  tags(): TagCollection {
    return new TagCollection(this.rawObject().tags);
  }

  isSend(): boolean {
    return this.payloadDirection === 'send';
  }

  isReceive(): boolean {
    return this.payloadDirection === 'receive';
  }

  reply(): OperationReplyModel | undefined {
    const reply = this.rawObject().reply;
    if (!reply || typeof reply !== 'object') return undefined;
    return new OperationReplyModel(reply, this.documentRaw, this.serverIds);
  }

  bindings(): BindingsModel | undefined {
    const bindings = this.rawObject().bindings;
    return bindings ? new BindingsModel(bindings) : undefined;
  }

  hasDescription(): boolean {
    return typeof this.description() === 'string';
  }

  externalDocs(): GenericModel | undefined {
    const externalDocs = this.rawObject().externalDocs;
    return externalDocs ? new GenericModel(externalDocs) : undefined;
  }

  messages(): ModelCollection<MessageModel> {
    const raw = this.rawObject();

    // AsyncAPI v3 operations list their messages by reference.
    if (Array.isArray(raw.messages)) {
      return new ModelCollection(
        raw.messages.map(
          (message, index) =>
            new MessageModel(
              `${this.operationName}-${index}`,
              resolveDocumentRef(message, this.documentRaw),
            ),
        ),
      );
    }

    // AsyncAPI v2 operations carry the message inline, optionally as `oneOf`.
    const message = raw.message;
    if (message && typeof message === 'object') {
      const oneOf = (message as RawObject).oneOf;
      if (Array.isArray(oneOf)) {
        return new ModelCollection(
          oneOf.map(
            (entry, index) =>
              new MessageModel(
                `${this.operationName}-${index}`,
                resolveDocumentRef(entry, this.documentRaw),
              ),
          ),
        );
      }
      return new ModelCollection([
        new MessageModel(
          this.operationName,
          resolveDocumentRef(message, this.documentRaw),
        ),
      ]);
    }

    // v3 operations can inherit their messages from the referenced channel.
    return this.channel.messages();
  }
}

class InfoModel extends GenericModel {
  title(): string {
    return String(this.rawObject().title ?? '');
  }

  version(): string {
    return String(this.rawObject().version ?? '');
  }

  description(): string | undefined {
    return this.rawObject().description as string | undefined;
  }

  hasDescription(): boolean {
    return typeof this.description() === 'string';
  }

  tags(): TagCollection {
    return new TagCollection(this.rawObject().tags);
  }

  license(): GenericModel | undefined {
    const license = this.rawObject().license;
    return license ? new GenericModel(license) : undefined;
  }

  termsOfService(): string | undefined {
    return this.rawObject().termsOfService as string | undefined;
  }

  contact(): GenericModel | undefined {
    const contact = this.rawObject().contact;
    return contact ? new GenericModel(contact) : undefined;
  }

  externalDocs(): GenericModel | undefined {
    const externalDocs = this.rawObject().externalDocs;
    return externalDocs ? new GenericModel(externalDocs) : undefined;
  }
}

class AsyncApiDocumentModel extends GenericModel {
  version(): string {
    return String(this.rawObject().asyncapi ?? '');
  }

  defaultContentType(): string | undefined {
    return this.rawObject().defaultContentType as string | undefined;
  }

  info(): InfoModel | undefined {
    const info = this.rawObject().info;
    return info ? new InfoModel(info) : undefined;
  }

  /** Security scheme definitions shared by servers and operations. */
  private securitySchemes(): RawObject {
    const components = this.rawObject().components;
    return components &&
      typeof components === 'object' &&
      typeof (components as RawObject).securitySchemes === 'object'
      ? ((components as RawObject).securitySchemes as RawObject)
      : {};
  }

  /** Raw servers keyed by name, used to resolve channel server references. */
  private serverDefinitions(): RawObject {
    const servers = this.rawObject().servers;
    return servers && typeof servers === 'object' ? (servers as RawObject) : {};
  }

  servers(): ModelCollection<ServerModel> {
    const securitySchemes = this.securitySchemes();
    return new ModelCollection(
      Object.entries(this.serverDefinitions()).map(
        ([name, raw]) => new ServerModel(name, raw, securitySchemes),
      ),
    );
  }

  channels(): ModelCollection<ChannelModel> {
    const channels = this.rawObject().channels;
    if (!channels || typeof channels !== 'object') {
      return new ModelCollection([]);
    }
    const serverIds = this.serverDefinitions();
    return new ModelCollection(
      Object.entries(channels as RawObject).map(
        ([name, raw]) => new ChannelModel(name, raw, serverIds),
      ),
    );
  }

  operations(): ModelCollection<OperationModel> {
    const documentRaw = this.rawObject();
    const serverIds = this.serverDefinitions();
    const securitySchemes = this.securitySchemes();
    const rawOperations = this.rawObject().operations;
    if (rawOperations && typeof rawOperations === 'object') {
      const channels = this.rawObject().channels as RawObject | undefined;
      let channelIdentityIndex: Map<unknown, string> | undefined;
      const findChannelName = (channel: unknown): string | undefined => {
        if (!channel || typeof channel !== 'object' || !channels) {
          return undefined;
        }
        if (!channelIdentityIndex) {
          const identityIndex = new Map<unknown, string>();
          Object.entries(channels).forEach(([id, raw]) =>
            identityIndex.set(raw, id),
          );
          channelIdentityIndex = identityIndex;
        }
        return channelIdentityIndex.get(channel);
      };
      return new ModelCollection(
        Object.entries(rawOperations as RawObject).map(([name, raw]) => {
          const operationRaw =
            typeof raw === 'object' && raw !== null ? (raw as RawObject) : {};
          const channelRef =
            typeof operationRaw.channel === 'object' &&
            operationRaw.channel !== null
              ? ((operationRaw.channel as RawObject).$ref as string | undefined)
              : undefined;
          const channelPointerName =
            typeof channelRef === 'string' &&
            channelRef.startsWith('#/channels/')
              ? pointerName(channelRef)
              : undefined;
          const pointedChannel =
            channelPointerName !== undefined &&
            channels !== undefined &&
            Object.prototype.hasOwnProperty.call(channels, channelPointerName)
              ? { id: channelPointerName, raw: channels[channelPointerName] }
              : undefined;

          const resolvedChannel = pointedChannel
            ? pointedChannel.raw
            : resolveDocumentRef(operationRaw.channel, documentRaw);
          const channelName =
            pointedChannel?.id ?? findChannelName(resolvedChannel) ?? name;
          const channelRaw =
            pointedChannel?.raw ?? channels?.[channelName] ?? resolvedChannel;
          return new OperationModel(
            name,
            operationRaw,
            channelName,
            channelRaw,
            operationRaw.action === 'send' ? 'send' : 'receive',
            serverIds,
            securitySchemes,
            documentRaw,
          );
        }),
      );
    }

    const operations: OperationModel[] = [];
    const channels = this.rawObject().channels;
    if (channels && typeof channels === 'object') {
      Object.entries(channels as RawObject).forEach(
        ([channelName, channelValue]) => {
          const channelRaw =
            typeof channelValue === 'object' && channelValue !== null
              ? (channelValue as RawObject)
              : {};

          // In AsyncAPI v2 a `subscribe` operation sends messages and `publish` receives them.
          const subscribe = channelRaw.subscribe;
          if (subscribe && typeof subscribe === 'object') {
            const raw = subscribe as RawObject;
            const name =
              typeof raw.operationId === 'string'
                ? raw.operationId
                : `subscribe-${channelName}`;
            operations.push(
              new OperationModel(
                name,
                raw,
                channelName,
                channelRaw,
                'send',
                serverIds,
                securitySchemes,
                documentRaw,
              ),
            );
          }

          const publish = channelRaw.publish;
          if (publish && typeof publish === 'object') {
            const raw = publish as RawObject;
            const name =
              typeof raw.operationId === 'string'
                ? raw.operationId
                : `publish-${channelName}`;
            operations.push(
              new OperationModel(
                name,
                raw,
                channelName,
                channelRaw,
                'receive',
                serverIds,
                securitySchemes,
                documentRaw,
              ),
            );
          }
        },
      );
    }
    return new ModelCollection(operations);
  }

  components(): ComponentsModel {
    const components = this.rawObject().components;
    return new ComponentsModel(
      components && typeof components === 'object' ? components : {},
    );
  }
}

/**
 * The containers only render documents exposing the full accessor contract: `info`,
 * `servers`, `channels`, `operations` and `version`. Older parser models predate some
 * of these (or return Maps without `all()`), so they must be normalized first.
 */
interface RendererDocumentShape {
  info(): unknown;
  servers(): unknown;
  channels(): unknown;
  operations(): unknown;
  components(): unknown;
  version(): unknown;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasArrayCollection(value: unknown): boolean {
  if (!isRecord(value) || typeof value.all !== 'function') return false;
  try {
    return Array.isArray(value.all());
  } catch {
    return false;
  }
}

function meetsRendererContract(schema: object): schema is ParsedDocument {
  const candidate = schema as Partial<RendererDocumentShape>;
  if (
    typeof candidate.info !== 'function' ||
    typeof candidate.servers !== 'function' ||
    typeof candidate.channels !== 'function' ||
    typeof candidate.operations !== 'function' ||
    typeof candidate.components !== 'function' ||
    typeof candidate.version !== 'function'
  ) {
    return false;
  }

  try {
    const info = candidate.info();
    return (
      (info === undefined || isRecord(info)) &&
      hasArrayCollection(candidate.servers()) &&
      hasArrayCollection(candidate.channels()) &&
      hasArrayCollection(candidate.operations()) &&
      isRecord(candidate.components()) &&
      typeof candidate.version() === 'string'
    );
  } catch {
    return false;
  }
}
export function isParsedDocument(schema: unknown): schema is ParsedDocument {
  return (
    typeof schema === 'object' &&
    schema !== null &&
    meetsRendererContract(schema)
  );
}

export function getParsedDocument(schema: unknown): ParsedDocument | undefined {
  if (typeof schema !== 'object' || schema === null) return undefined;

  // Preserve identity only when the object implements the complete renderer contract.
  if (meetsRendererContract(schema)) return schema;

  const document = schema as {
    asyncapi?: unknown;
    info?: unknown;
    json?: unknown;
  };

  // Raw AsyncAPI JSON is wrapped in the parser independent adapter.
  if (
    typeof document.asyncapi === 'string' &&
    typeof document.info === 'object'
  ) {
    return new AsyncApiDocumentModel(schema) as unknown as ParsedDocument;
  }

  // Legacy parser models are normalized from their JSON representation.
  if (typeof document.json === 'function') {
    const raw = (document.json as () => unknown)();
    if (raw && typeof raw === 'object') {
      return new AsyncApiDocumentModel(raw) as unknown as ParsedDocument;
    }
  }

  return undefined;
}
export function containTags(
  schema: { tags?: () => { length: number; all: () => TagLike[] } },
  tags: TagLike | TagLike[],
): boolean {
  const tagsToCheck = schema.tags?.();
  if (!tagsToCheck || tagsToCheck.length === 0) {
    return false;
  }

  const tagsArr = Array.isArray(tags) ? tags : [tags];
  return tagsToCheck
    .all()
    .some((tag) =>
      tagsArr.some((tagToCheck) => tagToCheck.name() === tag.name()),
    );
}

/** Structural interface for a document model used by operationsTags/serversTags. */
export interface DocumentLike {
  operations(): {
    all(): { tags(): { length: number; all(): TagLike[] } }[];
  };
  servers(): {
    all(): {
      id(): string;
      tags(): { length: number; all(): TagLike[] };
    }[];
  };
}

export function operationsTags(spec: DocumentLike): TagLike[] {
  const tags = new Map<string, TagLike>();
  spec
    .operations()
    .all()
    .forEach((operation) => {
      if (operation?.tags().length > 0) {
        operation
          .tags()
          .all()
          .forEach((tag) => tags.set(tag.name(), tag));
      }
    });
  return Array.from(tags.values());
}

export function serversTags(spec: DocumentLike): Record<string, string[]> {
  // Null prototype avoids collisions with names such as `constructor` or `toString`.
  const tags = Object.create(null) as Record<string, string[]>;
  spec
    .servers()
    .all()
    .forEach((server) => {
      const serverName = server.id();
      if (server.tags().length > 0) {
        server
          .tags()
          .all()
          .forEach((tag) => {
            if (tags[tag.name()]) {
              tags[tag.name()].push(serverName);
            } else {
              tags[tag.name()] = [serverName];
            }
          });
      }
    });
  return tags;
}
