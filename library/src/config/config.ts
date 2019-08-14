export interface ConfigInterface {
  show: ShowConfig;
  disableDefaultTheme: boolean;
  showErrors: boolean;
}

interface ShowConfig {
  info: boolean;
  security: boolean;
  servers: boolean;
  channels: boolean;
  topics: boolean;
  stream: boolean;
  events: boolean;
  messages: boolean;
  schemas: boolean;
}
