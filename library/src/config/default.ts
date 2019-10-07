import { ConfigInterface } from './config';

export const defaultConfig: ConfigInterface = {
  schemaID: '',
  show: {
    info: true,
    channels: true,
    servers: true,
    messages: true,
    schemas: true,
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
};
