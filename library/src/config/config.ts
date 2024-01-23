export interface ConfigInterface {
  schemaID?: string;
  show?: ShowConfig;
  expand?: ExpandConfig;
  sidebar?: SideBarConfig;
  parserOptions?: any;
  publishLabel?: string;
  subscribeLabel?: string;
  sendLabel?: string;
  receiveLabel?: string;
  requestLabel?: string;
  replyLabel?: string;
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
  showServers?: 'byDefault' | 'bySpecTags' | 'byServersTags';
  showOperations?: 'byDefault' | 'bySpecTags' | 'byOperationsTags';
}
