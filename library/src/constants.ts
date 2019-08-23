import { TableColumnName } from './types';

export const UNSUPPORTED_SCHEMA_VERSION =
  'AsyncAPI version is unsupported, use version 2.0 or higher';
export const CONNECTION_DETAILS = 'Connection details';

export const ONE_OF_PAYLOADS_TEXT = 'One of those payloads:';
export const ANY_OF_PAYLOADS_TEXT = 'Any of those payloads:';
export const GENERATED_BADGE = 'generated';
export const TERMS_OF_SERVICE = 'Terms of service';
export const ONE_OF_FOLLOWING_MESSAGES =
  'You can send one of the following messages:';

export const CONTACT = 'Contact';
export const NAME = 'Name';
export const URL = 'Url';
export const EMAIL = 'Email';
export const LICENSE = 'License';
export const TYPE = 'Type';
export const SPECIFICATION = 'Specification';
export const DEPRECATED_BADGE = 'Deprecated';
export const PUBLISH = 'Publish';
export const SUBSCRIBE = 'Subscribe';

export const MESSAGES = 'Messages';
export const SCHEMAS_TEXT = 'Schemas';
export const MESSAGE = 'Message';

export const CHANNELS = 'Channels';
export const HEADERS = 'Headers';
export const MESSAGE_HEADERS = 'Message Headers';
export const HEADERS_EXAMPLE = 'Example of headers';
export const TAGS_TEXT = 'Tags';
export const PAYLOAD_TEXT = 'Payload';
export const MESSAGE_PAYLOAD_TEXT = 'Message Payload';
export const PAYLOAD_EXAMPLE_TEXT = 'Example of payload';

export const NONE_TEXT = 'None';
export const ANY_TEXT = 'Any';

export const SECURITY_TEXT = 'Security';

export const URL_VARIABLES_TEXT = 'URL Variables';

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
  'Stage',
  'Protocol',
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
