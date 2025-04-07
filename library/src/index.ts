import AsyncApiComponent from './containers/AsyncApi/AsyncApi';
import AsyncApiComponentWP from './containers/AsyncApi/Standalone';

export type { AsyncApiProps } from './containers/AsyncApi/AsyncApi';
export type { ConfigInterface } from './config/config';
export type { FetchingSchemaInterface, ExtensionComponentProps } from './types';

import { hljs } from './helpers';

export { AsyncApiComponentWP, hljs };
export default AsyncApiComponent;
