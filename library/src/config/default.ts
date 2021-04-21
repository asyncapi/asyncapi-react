import { ConfigInterface } from './config';

export const defaultConfig: ConfigInterface = {
  schemaID: '',
  show: {
    sidebar: false,
    info: true,
    servers: true,
    operations: true,
    messages: true,
    errors: true,
  },
  sidebar: {
    showOperations: 'byDefault',
  },
};
