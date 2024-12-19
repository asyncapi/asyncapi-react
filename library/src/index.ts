import AsyncApiComponent from './containers/AsyncApi/AsyncApi';
import AsyncApiComponentWP from './containers/AsyncApi/Standalone';

export { AsyncApiProps } from './containers/AsyncApi/AsyncApi';
export { ConfigInterface } from './config/config';
export { FetchingSchemaInterface, ExtensionComponentProps } from './types';

import { hljs } from './helpers';

export { AsyncApiComponentWP, hljs };
export default AsyncApiComponent;
