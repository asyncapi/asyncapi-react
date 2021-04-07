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
    operations: {
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
  },
  showErrors: true,
  sidebar: {
    showOperations: 'bySpecTags',
  },
};
