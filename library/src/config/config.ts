export interface ConfigInterface {
  schemaID?: string;
  show?: ShowConfig;
  sidebar?: SideBarConfig;
  parserOptions?: any;
  publishLabel?: string;
  subscribeLabel?: string;
  expand?: ExpandConfig;
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

export interface ExpandConfig {
  messageExamples?: boolean;
}

export interface SideBarConfig {
  showOperations?: 'byDefault' | 'bySpecTags' | 'byOperationsTags';
}
