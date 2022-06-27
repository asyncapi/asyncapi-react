export interface ConfigInterface {
  schemaID?: string;
  show?: ShowConfig;
  sidebar?: SideBarConfig;
  parserOptions?: any;
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

export interface SideBarConfig {
  showOperations?: 'byDefault' | 'bySpecTags' | 'byOperationsTags';
  collapsed?: boolean;
}
