import AsyncApiComponent, {
  AsyncApiProps,
} from './containers/AsyncApi/Standalone';

import { createRender, createHydrate } from './standalone-codebase';
import { hljs } from './helpers';

export default {
  render: createRender<AsyncApiProps>(AsyncApiComponent),
  hydrate: createHydrate<AsyncApiProps>(AsyncApiComponent),
  hljs,
};
