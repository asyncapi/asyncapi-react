export interface ConfigInterface {
  show: ShowConfig,
  disableDefaultTheme: boolean,
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
  