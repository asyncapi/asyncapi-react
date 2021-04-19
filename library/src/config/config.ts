export interface ConfigInterface {
  schemaID?: string;
  show?: ShowConfig;
  sidebar?: SideBarConfig;
  parserOptions?: any;
}

export interface ShowConfig {
  sidebar?: boolean;
  info?: boolean;
  operations?: boolean;
  servers?: boolean;
  messages?: boolean;
  errors?: boolean;
}

export interface SideBarConfig {
  showOperations?: 'byDefault' | 'bySpecTags' | 'byOperationsTags';
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
