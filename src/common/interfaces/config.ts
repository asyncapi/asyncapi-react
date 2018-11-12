export interface Config {
  show: {
    info: boolean;
    security: boolean;
    servers: boolean;
    topics: boolean;
    stream: boolean;
    events: boolean;
    messages: boolean;
    schemas: boolean;
  }
}

export const defaultConfig: Config = {
  show: {
    info: true,
    servers: true,
    security: true,
    topics: true,
    stream: true,
    events: true,
    messages: true,
    schemas: true,
  }
}