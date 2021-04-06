import { ConfigInterface } from './config';

export const defaultConfig: ConfigInterface = {
  schemaID: '',
  show: {
    sidebar: true,
    info: true,
    operations: true,
    servers: true,
    messages: true,
  },
  expand: {
    channels: {
      root: true,
      elements: false,
    },
    servers: {
      root: false,
      elements: false,
    },
    messages: {
      root: false,
      elements: false,
    },
    schemas: {
      root: false,
      elements: false,
    },
  },
  showErrors: true,
  sidebar: {
    showOperations: 'byOperationsTags',
  },
};
