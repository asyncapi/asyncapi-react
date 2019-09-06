import { Options as ParserOptions } from 'json-schema-ref-parser';

export interface ConfigInterface {
  show?: ShowConfig;
  collapse?: CollapseConfig;
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

export interface CollapseNestedConfig {
  root?: boolean;
  elements?: boolean;
}

export interface CollapseConfig {
  channels?: CollapseNestedConfig;
  servers?: CollapseNestedConfig;
  messages?: CollapseNestedConfig;
  schemas?: CollapseNestedConfig;
}
