import { TableColumnName } from './types';

export const UNSUPPORTED_SCHEMA_VERSION =
  'AsyncAPI version is unsupported, use version 2.0 or higher';
export const SERVERS = 'Servers';

export const ONE_OF_PAYLOADS_TEXT = 'One of those payloads:';
export const ANY_OF_PAYLOADS_TEXT = 'Any of those payloads:';
export const GENERATED_BADGE = 'generated';
export const ONE_OF_FOLLOWING_MESSAGES =
  'You can send one of the following messages:';

export const CONTACT = 'Contact';
export const NAME = 'Name';
export const URL = 'Url';
export const EMAIL = 'Email';
export const LICENSE = 'License';
export const TERMS_OF_SERVICE = 'Terms of service';
export const URL_SUPPORT = 'Support';
export const EMAIL_SUPPORT = 'Email support';
export const LOCATION = 'Location';
export const TYPE = 'Type';
export const SPECIFICATION = 'Specification';

export const DEPRECATED = 'Deprecated';
export const PUBLISH = 'Publish';
export const SUBSCRIBE = 'Subscribe';
export const REQUIRED = 'Required';
export const GENERATED = 'Generated';

export const MESSAGES = 'Messages';
export const SCHEMAS_TEXT = 'Schemas';
export const MESSAGE = 'Message';

export const CHANNELS = 'Channels';
export const CHANNEL_PARAMETERS = 'Channel Parameters';
export const HEADERS = 'Headers';
export const MESSAGE_HEADERS = 'Message Headers';
export const HEADERS_EXAMPLE = 'Example of headers';
export const TAGS_TEXT = 'Tags';
export const PAYLOAD_TEXT = 'Payload';
export const MESSAGE_PAYLOAD_TEXT = 'Message Payload';
export const PAYLOAD_EXAMPLE_TEXT = 'Example of payload';
export const SCHEMA_EXAMPLE_TEXT = 'Example';

export const NONE_TEXT = 'None';
export const ANY_TEXT = 'Any';
export const ERROR = 'Error';
export const EXPAND_ERROR_BUTTON = 'Expand';
export const COLLAPSE_ERROR_BUTTON = 'Collapse';

export const SECURITY_TEXT = 'Security';

export const URL_VARIABLES_TEXT = 'URL Variables';

export const FLOWS = {
  FLOW: 'Flow',
  AUTHORIZATION_URL: 'Auth URL',
  TOKEN_URL: 'Token UR',
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
  'Protocol',
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
