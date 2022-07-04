import { ConfigInterface } from './config';
import {
  PUBLISH_LABEL_DEFAULT_TEXT,
  SUBSCRIBE_LABEL_DEFAULT_TEXT,
} from '../constants';

export const defaultConfig: ConfigInterface = {
  schemaID: '',
  show: {
    sidebar: false,
    info: true,
    servers: true,
    operations: true,
    messages: true,
    schemas: true,
    errors: true,
  },
  sidebar: {
    showOperations: 'byOperationsTags',
  },
  publishLabel: PUBLISH_LABEL_DEFAULT_TEXT,
  subscribeLabel: SUBSCRIBE_LABEL_DEFAULT_TEXT,
  expand: {
    messageExamples: false,
  },
};
