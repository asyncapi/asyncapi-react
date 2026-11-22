import {
  getParsedDocument,
  isParsedDocument,
  operationsTags,
} from '../parsed-document';
import type { DocumentLike } from '../parsed-document';
import { AsyncAPIDocumentV3 } from '@asyncapi/parser';

describe('parsed document helpers', () => {
  test('recognizes and passes through a complete parsed document', () => {
    const document = {
      info: () => undefined,
      version: () => '3.0.0',
      servers: () => ({ all: () => [] }),
      channels: () => ({ all: () => [] }),
      operations: () => ({ all: () => [] }),
      components: () => ({}),
    };

    expect(isParsedDocument(document)).toBe(true);
    expect(getParsedDocument(document)).toBe(document);
  });

  test('preserves identity for a real parser v3 document', () => {
    const parserDocument = new AsyncAPIDocumentV3({
      asyncapi: '3.0.0',
      info: { title: 'Parser API', version: '1.0.0' },
      channels: {
        orders: {
          address: 'orders',
          messages: {
            created: { payload: { type: 'string' } },
          },
        },
      },
      operations: {
        receiveOrders: {
          action: 'receive',
          channel: { $ref: '#/channels/orders' },
          messages: [{ $ref: '#/channels/orders/messages/created' }],
        },
      },
    });

    const parsedDocument = getParsedDocument(parserDocument);

    expect(isParsedDocument(parserDocument)).toBe(true);
    expect(parsedDocument).toBe(parserDocument);
    expect(parserDocument.messages().all()).toHaveLength(1);
  });
  test('normalizes legacy models whose operations return a Map', () => {
    const rawDocument = {
      asyncapi: '2.6.0',
      info: { title: 'Legacy API', version: '1.0.0' },
      channels: {
        events: {
          publish: {
            tags: [{ name: 'legacy-operation' }],
            message: { payload: { type: 'string' } },
          },
        },
      },
    };
    const legacyModel = {
      info: () => ({}),
      version: () => '2.6.0',
      servers: () => ({ all: () => [] }),
      channels: () => ({ all: () => [] }),
      operations: () => new Map(),
      components: () => ({}),
      json: () => rawDocument,
    };

    expect(isParsedDocument(legacyModel)).toBe(false);
    const normalized = getParsedDocument(legacyModel);

    expect(normalized).toBeDefined();
    expect(normalized).not.toBe(legacyModel);
    expect(
      operationsTags(normalized as unknown as DocumentLike).map((tag) =>
        tag.name(),
      ),
    ).toEqual(['legacy-operation']);
  });
  test('rejects an incomplete document model', () => {
    const document = {
      info: () => undefined,
      channels: () => undefined,
    };

    expect(isParsedDocument(document)).toBe(false);
    expect(getParsedDocument(document)).toBeUndefined();
  });

  test('wraps a plain parsed AsyncAPI object', () => {
    const document = {
      asyncapi: '2.0.0',
      info: {
        title: 'Example AsyncAPI',
        version: '0.1.0',
      },
      servers: {
        'example-server': {
          url: 'test.example.org',
          protocol: 'mqtt',
        },
      },
      channels: {
        'example-channel': {
          subscribe: {
            message: {
              payload: { type: 'object' },
            },
          },
        },
      },
    };

    const wrapped = getParsedDocument(document);

    expect(wrapped?.info()?.title()).toBe('Example AsyncAPI');
    expect(wrapped?.servers().all()[0].id()).toBe('example-server');
    expect(wrapped?.channels().all()[0].id()).toBe('example-channel');
  });

  test('resolves v3 channels by local pointer or dereferenced identity', () => {
    const channelName = 'orders/created';
    const dereferencedChannel = { address: channelName, messages: {} };
    const document = getParsedDocument({
      asyncapi: '3.0.0',
      info: { title: 'Channel API', version: '1.0.0' },
      channels: {
        [channelName]: dereferencedChannel,
      },
      operations: {
        byPointer: {
          action: 'send',
          channel: { $ref: '#/channels/orders~1created' },
        },
        byResolvedObject: {
          action: 'receive',
          channel: dereferencedChannel,
        },
      },
    });
    const operations = document?.operations().all() as unknown as {
      channels(): { all(): { id(): string }[] };
    }[];

    expect(
      operations.map((operation) => operation.channels().all()[0]?.id()),
    ).toEqual([channelName, channelName]);
  });
  test('unwraps supported v3 multi-format payload schemas', () => {
    const wrapped = getParsedDocument({
      asyncapi: '3.0.0',
      info: { title: 'Payload API', version: '1.0.0' },
      channels: {
        orders: {
          address: 'orders',
          messages: {
            multiFormat: {
              payload: {
                schemaFormat: 'application/vnd.aai.asyncapi+json;version=3.0.0',
                schema: { type: 'string' },
              },
            },
            ordinary: { payload: { type: 'number' } },
            boolean: { payload: false },
          },
        },
      },
      operations: {
        receiveOrders: {
          action: 'receive',
          channel: { $ref: '#/channels/orders' },
          messages: [
            { $ref: '#/channels/orders/messages/multiFormat' },
            { $ref: '#/channels/orders/messages/ordinary' },
            { $ref: '#/channels/orders/messages/boolean' },
          ],
        },
      },
    });
    const operation = wrapped?.operations().all()[0] as unknown as {
      messages(): {
        all(): {
          payload():
            | {
                type(): string | string[] | undefined;
                isBooleanSchema(): boolean;
              }
            | undefined;
        }[];
      };
    };
    const payloads = operation
      .messages()
      .all()
      .map((message) => message.payload());

    expect(payloads[0]?.type()).toBe('string');
    expect(payloads[1]?.type()).toBe('number');
    expect(payloads[2]?.isBooleanSchema()).toBe(true);
  });
  test('wraps plain parsed server security requirements', () => {
    const document = {
      asyncapi: '3.0.0',
      info: { title: 'Secure API', version: '1.0.0' },
      servers: {
        secure: {
          url: 'mqtt.example.com',
          protocol: 'mqtt',
          security: [
            { $ref: '#/components/securitySchemes/apiKey' },
            {
              type: 'oauth2',
              flows: {
                password: {
                  tokenUrl: 'https://example.com/token',
                  availableScopes: { read: 'Read data' },
                },
              },
              scopes: ['read'],
            },
          ],
        },
      },
      components: {
        securitySchemes: {
          apiKey: { type: 'apiKey', in: 'user' },
        },
      },
    };

    const wrapped = getParsedDocument(document);
    const server = wrapped?.servers().all()[0];
    const requirements = server?.security();

    expect(requirements).toHaveLength(2);
    expect(requirements?.[0].all()[0].scheme()?.type()).toBe('apiKey');
    expect(
      requirements?.[1].all()[0].scheme()?.flows()?.password()?.tokenUrl(),
    ).toBe('https://example.com/token');
    expect(requirements?.[1].all()[0].scheme()?.hasDescription()).toBe(false);
  });

  test('does not normalize unsupported input', () => {
    expect(isParsedDocument('asyncapi: 2.0.0')).toBe(false);
    expect(getParsedDocument('asyncapi: 2.0.0')).toBeUndefined();
    expect(getParsedDocument({ url: 'https://example.com/asyncapi.yml' })).toBe(
      undefined,
    );
  });
});
