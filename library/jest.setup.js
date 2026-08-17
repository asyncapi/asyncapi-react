const { TextDecoder, TextEncoder } = require('node:util');

// jsdom does not implement the Encoding API, so suites using the
// `@jest-environment jsdom` docblock run without TextDecoder/TextEncoder.
// protobufjs v8, pulled in by @asyncapi/protobuf-schema-parser, constructs a
// TextDecoder at module scope, which makes those suites fail to load.
if (global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}
if (global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
