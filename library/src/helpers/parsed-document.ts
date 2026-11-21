import { JsonSchemaModel } from './schema-no-parser';

// interface for a security requirement used by ParsedDocument servers
export interface SecurityRequirementsLike {
  all(): Array<{
    scheme(): {
      type(): string;
      flows(): { password(): { tokenUrl(): string | undefined } | undefined } | undefined;
      hasDescription(): boolean;
    } | undefined;
    scopes(): string[];
  }>;
}

// interface for a parsed AsyncAPI document, avoiding parser dependency in public declarations
export interface ParsedDocument {
  info(): { title(): string; version(): string; [key: string]: unknown } | undefined;
  servers(): { all(): Array<{ id(): string; security(): SecurityRequirementsLike[]; [key: string]: unknown }> };
  channels(): { all(): Array<{ id(): string; [key: string]: unknown }> };
  operations(): { all(): Array<{ [key: string]: unknown }> };
  components(): { [key: string]: unknown };
  version(): string;
  [key: string]: unknown;
}

// interface for a tag model used by containTags/operationsTags/serversTags. 
export interface TagLike {
  name(): string;
  json(): unknown;
}

interface RawObject {
  [key: string]: unknown;
}

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
    all(): Array<{ id(): string; value(): unknown }>;
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

  servers(): ModelCollection<ServerModel> {
    const servers = this.rawObject().servers;
    if (!Array.isArray(servers)) return new ModelCollection([]);
    return new ModelCollection(
      servers.map((server) => new ServerModel(String(server), {})),
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

class ServerModel extends GenericModel {
  constructor(
    private readonly serverName: string,
    raw: unknown,
    private readonly securitySchemes: RawObject = {},
  ) {
    super(raw);
  }

  id(): string {
    return this.serverName;
  }

  url(): string {
    return String(this.rawObject().url ?? '');
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

  security(): SecurityRequirementsModel[] {
    const security = this.rawObject().security;
    if (!Array.isArray(security)) return [];

    return security.map((entry) => {
      if (!entry || typeof entry !== 'object') {
        return new SecurityRequirementsModel([]);
      }

      const rawEntry = entry as RawObject;
      const requirements: SecurityRequirementModel[] = [];

      const ref = typeof rawEntry.$ref === 'string' ? rawEntry.$ref : undefined;
      if (ref) {
        const schemeName = ref.split('/').pop();
        const schemeRaw = schemeName
          ? this.securitySchemes[schemeName]
          : undefined;
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
        const schemeRaw = this.securitySchemes[schemeName];
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
    const payload = this.rawObject().payload;
    return payload ? JsonSchemaModel.fromJSON(payload) : undefined;
  }

  headers(): JsonSchemaModel | undefined {
    const headers = this.rawObject().headers;
    return headers ? JsonSchemaModel.fromJSON(headers) : undefined;
  }

  examples(): ModelCollection<GenericModel> {
    const examples = this.rawObject().examples;
    return new ModelCollection(
      Array.isArray(examples)
        ? examples.map((example) => new GenericModel(example))
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
  constructor(raw: unknown) {
    super(raw);
  }

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

class OperationModel extends GenericModel {
  private readonly channel: ChannelModel;
  private readonly payloadDirection: 'send' | 'receive';

  constructor(
    private readonly operationName: string,
    raw: unknown,
    channelName: string,
    channelRaw: unknown = {},
    payloadDirection: 'send' | 'receive' = 'receive',
  ) {
    super(raw);
    this.channel = new ChannelModel(channelName, channelRaw);
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

  security(): unknown[] {
    return Array.isArray(this.rawObject().security)
      ? (this.rawObject().security as unknown[])
      : [];
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

  reply(): undefined {
    return undefined;
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
    const message = this.rawObject().message;
    if (!message || typeof message !== 'object') {
      return new ModelCollection([]);
    }
    return new ModelCollection([new MessageModel(this.operationName, message)]);
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
  constructor(raw: unknown) {
    super(raw);
  }

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

  servers(): ModelCollection<ServerModel> {
    const servers = this.rawObject().servers;
    if (!servers || typeof servers !== 'object') {
      return new ModelCollection([]);
    }
    const components = this.rawObject().components;
    const securitySchemes =
      components &&
      typeof components === 'object' &&
      typeof (components as RawObject).securitySchemes === 'object'
        ? ((components as RawObject).securitySchemes as RawObject)
        : {};
    return new ModelCollection(
      Object.entries(servers as RawObject).map(
        ([name, raw]) => new ServerModel(name, raw, securitySchemes),
      ),
    );
  }

  channels(): ModelCollection<ChannelModel> {
    const channels = this.rawObject().channels;
    if (!channels || typeof channels !== 'object') {
      return new ModelCollection([]);
    }
    return new ModelCollection(
      Object.entries(channels as RawObject).map(
        ([name, raw]) => new ChannelModel(name, raw),
      ),
    );
  }

  operations(): ModelCollection<OperationModel> {
    const rawOperations = this.rawObject().operations;
    if (rawOperations && typeof rawOperations === 'object') {
      return new ModelCollection(
        Object.entries(rawOperations as RawObject).map(([name, raw]) => {
          const operationRaw =
            typeof raw === 'object' && raw !== null ? (raw as RawObject) : {};
          const channelRef =
            typeof operationRaw.channel === 'object' &&
            operationRaw.channel !== null
              ? ((operationRaw.channel as RawObject).$ref as string | undefined)
              : undefined;
          const channelName = channelRef?.split('/').pop() ?? name;
          const channels = this.rawObject().channels as RawObject | undefined;
          const channelRaw =
            channels?.[channelName] ??
            channels?.[channelName.replace(/.*[/]/, '')];
          return new OperationModel(
            name,
            operationRaw,
            channelName,
            channelRaw,
            operationRaw.action === 'send' ? 'send' : 'receive',
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

          const subscribe = channelRaw.subscribe;
          if (subscribe && typeof subscribe === 'object') {
            const raw = subscribe as RawObject;
            const name =
              typeof raw.operationId === 'string'
                ? raw.operationId
                : `subscribe-${channelName}`;
            operations.push(
              new OperationModel(name, raw, channelName, channelRaw, 'receive'),
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
              new OperationModel(name, raw, channelName, channelRaw, 'send'),
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

export function isParsedDocument(
  schema: unknown,
): schema is ParsedDocument {
  if (typeof schema !== 'object' || schema === null) {
    return false;
  }

  const document = schema as {
    asyncapi?: unknown;
    info?: unknown;
    channels?: unknown;
    json?: unknown;
  };

  if (
    typeof document.asyncapi === 'string' &&
    typeof document.info === 'object'
  ) {
    return true;
  }

  if (
    typeof document.json === 'function' &&
    typeof document.info !== 'undefined'
  ) {
    return true;
  }

  return (
    typeof document.info === 'function' &&
    typeof document.channels === 'function'
  );
}

export function getParsedDocument(
  schema: unknown,
): ParsedDocument | undefined {
  if (!isParsedDocument(schema)) return undefined;
  if (typeof (schema as { info?: unknown }).info !== 'function') {
    return new AsyncApiDocumentModel(schema) as unknown as ParsedDocument;
  }
  return schema as ParsedDocument;
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
  operations(): { all(): Array<{ tags(): { length: number; all(): TagLike[] } }> };
  servers(): { all(): Array<{ id(): string; tags(): { length: number; all(): TagLike[] } }> };
}

export function operationsTags(spec: DocumentLike): TagLike[] {
  const tags = new Map<string, TagLike>();
  spec.operations().all().forEach((operation) => {
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
  const tags: Record<string, string[]> = {};
  spec.servers().all().forEach((server) => {
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
