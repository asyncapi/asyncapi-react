import AsyncApiComponent from './containers/AsyncApi/AsyncApi';
import AsyncApiComponentWP from './containers/AsyncApi/Standalone';

export { AsyncApiProps } from './containers/AsyncApi/AsyncApi';
export { ConfigInterface } from './config/config';
export {
  PLUGIN_EVENT_READY,
  PLUGIN_EVENT_ERROR,
  PLUGINEVENTS,
} from './constants';
export {
  FetchingSchemaInterface,
  ExtensionComponentProps,
  AsyncApiPlugin,
  PluginAPI,
  PluginSlot,
  PluginContext,
  PluginErrorPayload,
} from './types';

import { hljs } from './helpers';

export { AsyncApiComponentWP, hljs };
export default AsyncApiComponent;
