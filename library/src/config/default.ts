import { ConfigInterface } from './config';

export const defaultConfig: ConfigInterface = {
  show: {
    info: true,
    servers: true,
    security: true,
    topics: true,
    stream: true,
    events: true,
    messages: true,
    schemas: true,
  },
  disableDefaultTheme: false,
}