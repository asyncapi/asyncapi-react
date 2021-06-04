import AsyncApiComponent, {
  AsyncApiProps,
} from './containers/AsyncApi/Standalone';

import { createRender, createHydrate } from './standalone-codebase';

export default {
  render: createRender<AsyncApiProps>(AsyncApiComponent),
  hydrate: createHydrate<AsyncApiProps>(AsyncApiComponent),
};
