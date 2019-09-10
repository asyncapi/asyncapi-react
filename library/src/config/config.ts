import { Options as ParserOptions } from 'json-schema-ref-parser';

export interface ConfigInterface {
  show?: ShowConfig;
  expand?: ExpandConfig;
  showErrors?: boolean;
  parserOptions?: ParserOptions;
}

export interface ShowConfig {
  info?: boolean;
  channels?: boolean;
  servers?: boolean;
  messages?: boolean;
  schemas?: boolean;
}

export interface ExpandNestedConfig {
  root?: boolean;
  elements?: boolean;
}

export interface ExpandConfig {
  channels?: ExpandNestedConfig;
  servers?: ExpandNestedConfig;
  messages?: ExpandNestedConfig;
  schemas?: ExpandNestedConfig;
}
