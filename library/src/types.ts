import { AsyncAPIDocumentInterface, BaseModel } from '@asyncapi/parser';

export type PropsSchema =
  | string
  | FetchingSchemaInterface
  | AsyncAPIDocumentInterface
  | object;

export type NullableAsyncApi = AsyncAPIDocumentInterface | null;

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
  asyncapi?: AsyncAPIDocumentInterface;
  error?: ErrorObject;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ExtensionComponentProps<V = any> {
  propertyName: string;
  propertyValue: V;
  document: AsyncAPIDocumentInterface;
  parent: BaseModel;
}

// Plugin interface

export enum PluginSlot {
  OPERATION = 'operation',
}

export interface PluginContext {
  schema?: PropsSchema;
}

export interface ComponentSlotProps {
  context: PluginContext;
  onClose?: () => void;
}

export interface AsyncApiPlugin {
  name: string;
  version: string;
  description?: string;

  install(api: PluginAPI): void;

  uninstall?(): void;
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
  registerComponent(
    slot: PluginSlot,
    component: React.ComponentType<ComponentSlotProps>,
    options?: { priority?: number; label?: string },
  ): void;

  onSpecLoaded(callback: (spec: unknown) => void): void;

  getContext(): PluginContext;

  on(eventName: string, callback: (data: unknown) => void): void;
  off(eventName: string, callback: (data: unknown) => void): void;
  emit(eventName: string, data: unknown): void;
}
