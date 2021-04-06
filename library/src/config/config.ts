import { PushStateBehavior } from '../types';

export interface ConfigInterface {
  schemaID?: string;
  show?: ShowConfig;
  expand?: ExpandConfig;
  sidebar?: SideBarConfig;
  showErrors?: boolean;
  parserOptions?: any;
  pushStateBehavior?: PushStateBehavior;
}

export interface ShowConfig {
  sidebar?: boolean;
  info?: boolean;
  operations?: boolean;
  servers?: boolean;
  messages?: boolean;
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

export interface SideBarConfig {
  showOperations?: 'default' | 'byRootTags' | 'byOperationsTags';
}
