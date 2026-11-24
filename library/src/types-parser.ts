import type { AsyncAPIDocumentInterface, BaseModel } from '@asyncapi/parser';
import type { ErrorObject } from './types';

export type {
  OperationSlotContext,
  InfoSlotContext,
  SlotContextMap,
  SlotContext,
  TypedComponentSlotProps,
} from './types';

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
