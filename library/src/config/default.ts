import { ConfigInterface } from './config';

export const defaultConfig: ConfigInterface = {
  show: {
    info: true,
    servers: true,
    security: true,
    messages: true,
    schemas: true,
    channels: true,
  },
  showErrors: true,
  prefixClassName: 'asyncapi',
};
