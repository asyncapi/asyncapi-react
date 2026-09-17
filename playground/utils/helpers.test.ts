import assert from 'node:assert/strict';
import test from 'node:test';
import { isWebSocketSchema } from './helpers.ts';

void test('detects WebSocket protocols on top-level YAML servers', () => {
  assert.equal(
    isWebSocketSchema(`
asyncapi: 3.0.0
servers:
  production:
    host: example.com
    protocol: wss
`),
    true,
  );
});

void test('ignores nested protocol properties outside top-level servers', () => {
  assert.equal(
    isWebSocketSchema(`
asyncapi: 3.0.0
components:
  schemas:
    metadata:
      type: object
      properties:
        protocol:
          type: string
          const: wss
`),
    false,
  );
});
