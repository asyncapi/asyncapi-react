import { getParsedDocument, isParsedDocument } from '../parsed-document';

describe('parsed document helpers', () => {
  test('recognizes an already parsed document', () => {
    const document = {
      info: () => undefined,
      channels: () => undefined,
    };

    expect(isParsedDocument(document)).toBe(true);
    expect(getParsedDocument(document)).toBe(document);
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
