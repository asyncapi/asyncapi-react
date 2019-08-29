export interface ConfigInterface {
  show?: ShowConfig;
  disableDefaultTheme?: boolean;
  showErrors?: boolean;
  prefixClassName?: string;
}

interface ShowConfig {
  info?: boolean;
  security?: boolean;
  servers?: boolean;
  channels?: boolean;
  messages?: boolean;
  schemas?: boolean;
}
