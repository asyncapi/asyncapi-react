import { TableColumnName } from './types';

export const CSS_PREFIX = 'asyncapi';
export const CONTENT_TYPES_SITE =
  'https://www.iana.org/assignments/media-types';
export const COLLAPSE_ALL_TEXT = 'Collapse All';
export const EXPAND_ALL_TEXT = 'Expand All';

export const VALIDATION_ERRORS_TYPE =
  'https://github.com/asyncapi/parser-js/validation-errors';
export const SERVERS = 'Servers';

export const ONE_OF_PAYLOADS_TEXT = 'One of those payloads:';
export const ANY_OF_PAYLOADS_TEXT = 'Any of those payloads:';
export const GENERATED_BADGE_TEXT = 'generated';
export const ONE_OF_FOLLOWING_MESSAGES_PUBLISH_TEXT =
  'You can send one of the following messages:';
export const ONE_OF_FOLLOWING_MESSAGES_PUBLISH_SINGLE_TEXT =
  'You can send the following message:';
export const ONE_OF_FOLLOWING_MESSAGES_SUBSCRIBE_TEXT =
  'You can subscribe to one of the following messages:';
export const ONE_OF_FOLLOWING_MESSAGES_SUBSCRIBE_SINGLE_TEXT =
  'You can subscribe to the following message:';

export const CONTACT_TEXT = 'Contact';
export const NAM_TEXTE = 'Name';
export const URL_TEXT = 'Url';
export const EMAIL_TEXT = 'Email';
export const LICENSE_TEXT = 'License';
export const TERMS_OF_SERVICE_TEXT = 'Terms of service';
export const URL_SUPPORT_TEXT = 'Support';
export const EMAIL_SUPPORT_TEXT = 'Email support';
export const LOCATION_TEXT = 'Location';
export const TYPE_TEXT = 'Type';
export const SPECIFICATION_TEXT = 'Specification';

export const DEPRECATED_TEXT = 'Deprecated';
export const PUBLISH_TEXT = 'Publish';
export const SUBSCRIBE_TEXT = 'Subscribe';
export const REQUIRED_TEXT = 'Required';
export const GENERATED_TEXT = 'Generated';

export const MESSAGES_TEXT = 'Messages';
export const SCHEMAS_TEXT = 'Schemas';
export const MESSAGE_TEXT = 'Message';

export const CHANNELS_TEXT = 'Channels';
export const PARAMETERS_TEXT = 'Parameters';
export const HEADERS_TEXT = 'Headers';
export const MESSAGE_HEADERS_TEXT = 'Message Headers';
export const HEADERS_EXAMPLE_TEXT = 'Example of headers';
export const TAGS_TEXT = 'Tags';
export const PAYLOAD_TEXT = 'Payload';
export const MESSAGE_PAYLOAD_TEXT = 'Message Payload';
export const PAYLOAD_EXAMPLE_TEXT = 'Example of payload';
export const SCHEMA_EXAMPLE_TEXT = 'Example';

export const SERVER_BINDINGS_TEXT = 'Server Bindings';
export const CHANNEL_BINDINGS_TEXT = 'Channel Bindings';
export const OPERATION_BINDINGS_TEXT = 'Operation Bindings';
export const MESSAGE_BINDINGS_TEXT = 'Message Bindings';

export const NONE_TEXT = 'None';
export const ANY_TEXT = 'Any';
export const ERROR_TEXT = 'Error';
export const EXPAND_ERROR_BUTTON_TEXT = 'Expand';
export const COLLAPSE_ERROR_BUTTON_TEXT = 'Collapse';

export const SECURITY_TEXT = 'Security';

export const URL_VARIABLES_TEXT = 'URL Variables';

export const FLOWS_TEXTS = {
  FLOW: 'Flow',
  AUTHORIZATION_URL: 'Authorization URL',
  TOKEN_URL: 'Token URL',
  REFRESH_URL: 'Refresh URL',
  SCOPES: 'Scopes',
};

export const SECURITY_COLUMNS_NAMES: TableColumnName[] = [
  'Type',
  'Stage',
  'In',
  'Name',
  'Scheme',
  'Format',
  'Description',
];

export const SERVER_COLUMN_NAMES: TableColumnName[] = [
  'URL',
  'Default',
  'Possible values',
  'Description',
];

export const SERVER_SECURITY_COLUMN_NAMES: TableColumnName[] = [
  'Type',
  'Bearer format',
  'In',
  'Scheme',
  'Header',
  'Description',
];

export const SCHEMA_COLUMN_NAMES: TableColumnName[] = [
  'Name',
  'Title',
  'Type',
  'Format',
  'Default',
  'Description',
];

export const SERVER_VARIABLES_COLUMN_NAMES: TableColumnName[] = [
  'Name',
  'Default value',
  'Possible values',
  'Description',
];

export enum CONTAINER_LABELS {
  INFO = 'info',
  CHANNELS = 'channels',
  SERVERS = 'servers',
  MESSAGES = 'messages',
  SCHEMAS = 'schemas',
}
export const CONTAINER_LABELS_VALUES = Object.values<string>(CONTAINER_LABELS);
export enum ITEM_LABELS {
  CHANNEL = 'channel',
  SERVER = 'server',
  MESSAGE = 'message',
  SCHEMA = 'schema',
}
export const ITEM_LABELS_VALUES = Object.values<string>(ITEM_LABELS);
