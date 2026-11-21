import type {
  AsyncAPIDocumentInterface,
  BaseModel,
  ChannelInterface,
  InfoInterface,
  OperationInterface,
} from '@asyncapi/parser';
import type { PropsSchema, ComponentSlotProps, PayloadType, PluginSlot, ErrorObject } from './types';

export type NullableAsyncApi = AsyncAPIDocumentInterface | null;

export interface AsyncApiState {
  validatedSchema: NullableAsyncApi;
  error?: ErrorObject;
}

export interface ParserReturn {
  asyncapi?: AsyncAPIDocumentInterface;
  error?: ErrorObject;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ExtensionComponentProps<V = any> {
  propertyName: string;
  propertyValue: V;
  document: AsyncAPIDocumentInterface;
  parent: BaseModel;
}

interface BaseSlotContext {
  /** The parsed AsyncAPI document being rendered. */
  document: AsyncAPIDocumentInterface;
  /**
   * @deprecated Use the typed fields on the slot context instead.
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

/** Parser-specific ComponentSlotProps with typed context. */
export type TypedComponentSlotProps<S extends PluginSlot = PluginSlot> =
  ComponentSlotProps<SlotContextMap[S]>;
