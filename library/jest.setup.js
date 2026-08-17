const { TextDecoder, TextEncoder } = process.getBuiltinModule('util');

// jsdom does not implement the Encoding API, so suites using the
// `@jest-environment jsdom` docblock run without TextDecoder/TextEncoder.
// protobufjs v8, pulled in by @asyncapi/protobuf-schema-parser, constructs a
// TextDecoder at module scope, which makes those suites fail to load.

if (global.TextDecoder === undefined) {
  Object.defineProperty(global, 'TextDecoder', {
    value: TextDecoder,
    writable: true,
    configurable: true,
  });
}

if (global.TextEncoder === undefined) {
  Object.defineProperty(global, 'TextEncoder', {
    value: TextEncoder,
    writable: true,
    configurable: true,
  });
}