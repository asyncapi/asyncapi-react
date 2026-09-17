import assert from 'node:assert/strict';
import test from 'node:test';
import { getWebSocketServerFingerprint, isWebSocketSchema } from './helpers.ts';

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

void test('changes the WebSocket lifecycle key when server configuration changes', () => {
  const first = getWebSocketServerFingerprint(`
servers:
  production:
    host: first.example.com
    protocol: wss
`);
  const second = getWebSocketServerFingerprint(`
servers:
  production:
    host: second.example.com
    protocol: wss
`);

  assert.ok(first);
  assert.ok(second);
  assert.notEqual(first, second);
});

void test('keeps the WebSocket lifecycle key when server fields are reordered', () => {
  const first = getWebSocketServerFingerprint(`
servers:
  production:
    host: example.com
    protocol: wss
    description: Production
`);
  const reordered = getWebSocketServerFingerprint(`
servers:
  production:
    description: Production
    protocol: wss
    host: example.com
`);

  assert.equal(first, reordered);
});

void test('changes the WebSocket lifecycle key when server entries are reordered', () => {
  const first = getWebSocketServerFingerprint(`
servers:
  production:
    host: production.example.com
    protocol: wss
  staging:
    host: staging.example.com
    protocol: wss
`);
  const reordered = getWebSocketServerFingerprint(`
servers:
  staging:
    host: staging.example.com
    protocol: wss
  production:
    host: production.example.com
    protocol: wss
`);

  assert.notEqual(first, reordered);
});
