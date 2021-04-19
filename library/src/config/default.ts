import { ConfigInterface } from './config';

export const defaultConfig: ConfigInterface = {
  schemaID: 'asyncapi',
  show: {
    sidebar: false,
    info: true,
    operations: true,
    servers: true,
    messages: true,
    errors: true,
  },
  sidebar: {
    showOperations: 'byDefault',
  },
};
