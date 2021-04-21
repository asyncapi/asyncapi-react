import { ConfigInterface } from './config';

export const defaultConfig: ConfigInterface = {
  schemaID: '',
  show: {
    sidebar: true,
    info: true,
    servers: true,
    operations: true,
    messages: true,
    errors: true,
  },
  sidebar: {
    showOperations: 'bySpecTags',
  },
};
