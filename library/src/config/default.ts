import { ConfigInterface } from './config';

export const defaultConfig: ConfigInterface = {
  show: {
    info: true,
    servers: true,
    security: false,
    messages: true,
    schemas: true,
    channels: true,
  },
  showErrors: true,
  prefixClassName: 'asyncapi',
};
