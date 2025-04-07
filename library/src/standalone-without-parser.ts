import type { AsyncApiProps } from './containers/AsyncApi/Standalone';
import AsyncApiComponent from './containers/AsyncApi/Standalone';

import { createRender, createHydrate } from './standalone-codebase';
import { hljs } from './helpers';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  render: createRender<AsyncApiProps>(AsyncApiComponent),
  hydrate: createHydrate<AsyncApiProps>(AsyncApiComponent),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  hljs,
};
