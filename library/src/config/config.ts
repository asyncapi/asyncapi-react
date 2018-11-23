export interface ConfigInterface {
  show: ShowConfig
}

interface ShowConfig {
  info: boolean;
  security: boolean;
  servers: boolean;
  topics: boolean;
  stream: boolean;
  events: boolean;
  messages: boolean;
  schemas: boolean;
}
  