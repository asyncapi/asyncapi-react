import { ConfigInterface } from './config';
import {
  PUBLISH_LABEL_DEFAULT_TEXT,
  RECEIVE_TEXT_LABEL_DEFAULT_TEXT,
  REPLIER_LABEL_DEFAULT_TEXT,
  REQUEST_LABEL_DEFAULT_TEXT,
  SEND_LABEL_DEFAULT_TEXT,
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
    messageExamples: false,
    schemas: true,
    errors: true,
  },
  expand: {
    messageExamples: false,
  },
  sidebar: {
    showServers: 'byDefault',
    showOperations: 'byDefault',
  },
  publishLabel: PUBLISH_LABEL_DEFAULT_TEXT,
  subscribeLabel: SUBSCRIBE_LABEL_DEFAULT_TEXT,
  sendLabel: SEND_LABEL_DEFAULT_TEXT,
  receiveLabel: RECEIVE_TEXT_LABEL_DEFAULT_TEXT,
  requestLabel: REQUEST_LABEL_DEFAULT_TEXT,
  replyLabel: REPLIER_LABEL_DEFAULT_TEXT,
};
