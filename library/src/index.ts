import AsyncApiComponent from './containers/AsyncApi/AsyncApi';
import AsyncApiComponentWP from './containers/AsyncApi/Standalone';

export type { AsyncApiProps } from './containers/AsyncApi/AsyncApi';
export type { ConfigInterface } from './config/config';
export {
  PLUGIN_EVENT_READY,
  PLUGIN_EVENT_ERROR,
  PLUGINEVENTS,
} from './constants';
export { PluginSlot, PayloadType } from './types';
export type {
  FetchingSchemaInterface,
  AsyncApiPlugin,
  PluginAPI,
  PluginContext,
  PluginErrorPayload,
  PluginInstance,
  ComponentSlotProps,
} from './types';
export type {
  ExtensionComponentProps,
  SlotContext,
  SlotContextMap,
  OperationSlotContext,
  InfoSlotContext,
} from './types-parser';

import { hljs } from './helpers';

export { AsyncApiComponentWP, hljs };
export default AsyncApiComponent;
