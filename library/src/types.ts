import type {
  AsyncAPIDocumentInterface,
  ChannelInterface,
  InfoInterface,
  OperationInterface,
} from '@asyncapi/parser';

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

interface BaseSlotContext {
  /** The parsed AsyncAPI document being rendered. */
  document: AsyncAPIDocumentInterface;
  /**
   * @deprecated Use the typed fields on the slot context instead. Holds the
   * operation props in the `operation` slot and the info model in the `info` slot.
   */
  schema?: PropsSchema;
}

export interface OperationSlotContext extends BaseSlotContext {
  slot: PluginSlot.OPERATION;
  operation: OperationInterface;
  channel: ChannelInterface;
  channelName: string;
  type: PayloadType;
}

export interface InfoSlotContext extends BaseSlotContext {
  slot: PluginSlot.INFO;
  info: InfoInterface;
}

export interface SlotContextMap {
  [PluginSlot.OPERATION]: OperationSlotContext;
  [PluginSlot.INFO]: InfoSlotContext;
}

export type SlotContext = SlotContextMap[PluginSlot];

interface BaseSlotProps {
  onClose?: () => void;
}

/**
 * Parser-independent props contract: a component that only needs an arbitrary context value.
 */
export interface SlotComponentProps<C = unknown> extends BaseSlotProps {
  context: C;
}

export interface ComponentSlotProps<S extends PluginSlot = PluginSlot>
  extends BaseSlotProps {
  context: SlotContextMap[S];
}

/** Backward-compatible name for parser-backed, slot-keyed component props. */
export type TypedComponentSlotProps<S extends PluginSlot = PluginSlot> =
  ComponentSlotProps<S>;

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
    component: React.ComponentType<ComponentSlotProps<S>>,
    options?: { priority?: number; label?: string },
  ): void;

  onSpecLoaded(callback: (spec: unknown) => void): void;

  getContext(): PluginContext;

  on(eventName: string, callback: (data: unknown) => void): void;
  off(eventName: string, callback: (data: unknown) => void): void;
  emit(eventName: string, data: unknown): void;
}
