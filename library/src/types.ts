export type PropsSchema = string | FetchingSchemaInterface | object;

export function isFetchingSchemaInterface(
  schema: PropsSchema,
): schema is FetchingSchemaInterface {
  return (schema as FetchingSchemaInterface).url !== undefined;
}

export interface FetchingSchemaInterface {
  url: string;
  requestOptions?: RequestInit;
}

export enum PayloadType {
  SEND = 'send',
  RECEIVE = 'receive',
  REQUEST = 'request',
  REPLY = 'reply',
}

export interface MessageExample {
  name?: string;
  summary?: string;
  example: unknown;
}

export interface ValidationError {
  title: string;
  location?: {
    jsonPointer: string;
    startLine: number;
    startColumn: number;
    startOffset: number;
    endLine: number;
    endColumn: number;
    endOffset: number;
  };
}

export interface ErrorObject {
  type: string;
  title: string;
  detail?: string;
  parsedJSON?: unknown;
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

// Plugin interface

export enum PluginSlot {
  OPERATION = 'operation',
  INFO = 'info',
}

export interface PluginContext {
  schema?: PropsSchema;
}

export interface ComponentSlotProps<C = unknown> {
  context: C;
  onClose?: () => void;
}

export interface ExtensionComponentProps<V = unknown> {
  propertyName: string;
  propertyValue: V;
  document: unknown;
  parent: unknown;
}

export interface AsyncApiPlugin {
  name: string;
  version: string;
  description?: string;

  install(api: PluginAPI): void | Promise<void>;
  /**
   * Releases whatever `install()` acquired (connections, timers, DOM listeners). Called on
   * `unregister()` and when the component unmounts, with the same `PluginAPI` instance
   * `install()` received.
   */
  uninstall?(api: PluginAPI): void | Promise<void>;
}

export interface PluginErrorPayload {
  pluginName: string;
  message: string;
  timestamp: string;
}

export type PluginInstance =
  | AsyncApiPlugin
  | React.ComponentType<ComponentSlotProps>;

export type EventListener = (...args: unknown[]) => void;

export interface MessageBus {
  on(eventName: string, callback: (data: unknown) => void): void;
  off(eventName: string, callback: (data: unknown) => void): void;
  emit(eventName: string, data: unknown): void;
  listeners(eventName: string): EventListener[];
  eventNames(): string[];
}

export interface PluginAPI {
  /** Aborted when this plugin installation is cancelled or begins teardown. */
  readonly signal: AbortSignal;

  registerComponent<S extends PluginSlot>(
    slot: S,
    component: React.ComponentType<ComponentSlotProps>,
    options?: { priority?: number; label?: string },
  ): void;

  onSpecLoaded(callback: (spec: unknown) => void): void;

  getContext(): PluginContext;

  on(eventName: string, callback: (data: unknown) => void): void;
  off(eventName: string, callback: (data: unknown) => void): void;
  emit(eventName: string, data: unknown): void;
}
