export interface ConfigInterface {
  schemaID?: string;
  show?: ShowConfig;
  sidebar?: SideBarConfig;
  parserOptions?: any;
  publishLabel?: string;
  subscribeLabel?: string;
  expanded?: ExpandedConfig;
}

export interface ShowConfig {
  sidebar?: boolean;
  info?: boolean;
  servers?: boolean;
  operations?: boolean;
  messages?: boolean;
  schemas?: boolean;
  errors?: boolean;
}

export interface ExpandedConfig {
  examples?: boolean;
}

export interface SideBarConfig {
  showOperations?: 'byDefault' | 'bySpecTags' | 'byOperationsTags';
}
