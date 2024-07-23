import { ExtensionComponentProps } from '../components';

export interface ConfigInterface {
  schemaID?: string;
  show?: ShowConfig;
  expand?: ExpandConfig;
  sidebar?: SideBarConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parserOptions?: any;
  publishLabel?: string;
  subscribeLabel?: string;
  sendLabel?: string;
  receiveLabel?: string;
  requestLabel?: string;
  replyLabel?: string;
  extensions?: Record<string, React.ComponentType<ExtensionComponentProps>>;
}

export interface ShowConfig {
  sidebar?: boolean;
  info?: boolean;
  servers?: boolean;
  operations?: boolean;
  messages?: boolean;
  messageExamples?: boolean;
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
