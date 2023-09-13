/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import AsyncApiComponent from '..';
import adoaKafka from './docs/v3/adeo-kafka-request-reply.json';
import krakenMessageFilter from './docs/v3/kraken-websocket-request-reply-message-filter-in-reply.json';
import krakenMultipleChannels from './docs/v3/kraken-websocket-request-reply-multiple-channels.json';
import streetlightsKafka from './docs/v3/streetlights-kafka.json';
import streetlightsMqtt from './docs/v3/streetlights-mqtt.json';
import websocketGemini from './docs/v3/websocket-gemini.json';

jest.mock('use-resize-observer', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
}));
jest.setTimeout(10000);

describe('AsyncAPI component', () => {
  describe('should work with v3', () => {
    test('should work with minimal v3', async () => {
      const schema = {
        asyncapi: '3.0.0',
        info: {
          title: 'Kraken Websockets API',
          version: '1.8.0',
          description:
            "WebSockets API offers real-time market data updates. WebSockets is a bidirectional protocol offering fastest real-time data, helping you build real-time applications. The public message types presented below do not require authentication. Private-data messages can be subscribed on a separate authenticated endpoint. \n\n### General Considerations\n\n- TLS with SNI (Server Name Indication) is required in order to establish a Kraken WebSockets API connection. See Cloudflare's [What is SNI?](https://www.cloudflare.com/learning/ssl/what-is-sni/) guide for more details.\n- All messages sent and received via WebSockets are encoded in JSON format\n- All decimal fields (including timestamps) are quoted to preserve precision.\n- Timestamps should not be considered unique and not be considered as aliases for transaction IDs. Also, the granularity of timestamps is not representative of transaction rates.\n- At least one private message should be subscribed to keep the authenticated client connection open.\n- Please use REST API endpoint [AssetPairs](https://www.kraken.com/features/api#get-tradable-pairs) to fetch the list of pairs which can be subscribed via WebSockets API. For example, field 'wsname' gives the supported pairs name which can be used to subscribe.\n- Cloudflare imposes a connection/re-connection rate limit (per IP address) of approximately 150 attempts per rolling 10 minutes. If this is exceeded, the IP is banned for 10 minutes.\n- Recommended reconnection behaviour is to (1) attempt reconnection instantly up to a handful of times if the websocket is dropped randomly during normal operation but (2) after maintenance or extended downtime, attempt to reconnect no more quickly than once every 5 seconds. There is no advantage to reconnecting more rapidly after maintenance during cancel_only mode.\n",
        },
      };
      const result = render(<AsyncApiComponent schema={schema} />);

      await waitFor(() =>
        expect(result.container.querySelector('#introduction')).toBeDefined(),
      );
    });

    test('and adeo kafka request reply example', async () => {
      const schema = adoaKafka;
      const result = render(<AsyncApiComponent schema={schema} />);

      await waitFor(() =>
        expect(result.container.querySelector('#introduction')).toBeDefined(),
      );
    });

    test('and kraken message filtering example', async () => {
      const schema = krakenMessageFilter;
      const result = render(<AsyncApiComponent schema={schema} />);

      await waitFor(() =>
        expect(result.container.querySelector('#introduction')).toBeDefined(),
      );
    });

    test('and kraken multiple channels example', async () => {
      const schema = krakenMultipleChannels;
      const result = render(<AsyncApiComponent schema={schema} />);

      await waitFor(() =>
        expect(result.container.querySelector('#introduction')).toBeDefined(),
      );
    });

    test('and streetlight kafka example', async () => {
      const schema = streetlightsKafka;
      const result = render(<AsyncApiComponent schema={schema} />);

      await waitFor(() =>
        expect(result.container.querySelector('#introduction')).toBeDefined(),
      );
    });

    test('and streetlight mqtt example', async () => {
      const schema = streetlightsMqtt;
      const result = render(<AsyncApiComponent schema={schema} />);

      await waitFor(() =>
        expect(result.container.querySelector('#introduction')).toBeDefined(),
      );
    });

    test('and streetlight websocket gemini example', async () => {
      const schema = websocketGemini;
      const result = render(<AsyncApiComponent schema={schema} />);

      await waitFor(() =>
        expect(result.container.querySelector('#introduction')).toBeDefined(),
      );
    });
  });
  test('should work with simple v2', async () => {
    const schema = {
      asyncapi: '2.0.0',
      info: {
        title: 'Kraken Websockets API',
        version: '1.8.0',
        description:
          "WebSockets API offers real-time market data updates. WebSockets is a bidirectional protocol offering fastest real-time data, helping you build real-time applications. The public message types presented below do not require authentication. Private-data messages can be subscribed on a separate authenticated endpoint. \n\n### General Considerations\n\n- TLS with SNI (Server Name Indication) is required in order to establish a Kraken WebSockets API connection. See Cloudflare's [What is SNI?](https://www.cloudflare.com/learning/ssl/what-is-sni/) guide for more details.\n- All messages sent and received via WebSockets are encoded in JSON format\n- All decimal fields (including timestamps) are quoted to preserve precision.\n- Timestamps should not be considered unique and not be considered as aliases for transaction IDs. Also, the granularity of timestamps is not representative of transaction rates.\n- At least one private message should be subscribed to keep the authenticated client connection open.\n- Please use REST API endpoint [AssetPairs](https://www.kraken.com/features/api#get-tradable-pairs) to fetch the list of pairs which can be subscribed via WebSockets API. For example, field 'wsname' gives the supported pairs name which can be used to subscribe.\n- Cloudflare imposes a connection/re-connection rate limit (per IP address) of approximately 150 attempts per rolling 10 minutes. If this is exceeded, the IP is banned for 10 minutes.\n- Recommended reconnection behaviour is to (1) attempt reconnection instantly up to a handful of times if the websocket is dropped randomly during normal operation but (2) after maintenance or extended downtime, attempt to reconnect no more quickly than once every 5 seconds. There is no advantage to reconnecting more rapidly after maintenance during cancel_only mode.\n",
      },
      channels: {},
    };
    const result = render(<AsyncApiComponent schema={schema} />);

    await waitFor(() =>
      expect(result.container.querySelector('#introduction')).toBeDefined(),
    );
  });
  test('should work with complex v2', async () => {
    const schema = {
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
              payload: {
                type: 'object',
                properties: {
                  exampleField: {
                    type: 'string',
                  },
                  exampleNumber: {
                    type: 'number',
                  },
                  exampleDate: {
                    type: 'string',
                    format: 'date-time',
                  },
                },
              },
            },
          },
        },
      },
    };
    const result = render(<AsyncApiComponent schema={schema} />);

    await waitFor(() =>
      expect(result.container.querySelector('#introduction')).toBeDefined(),
    );
  });

  test('should work with all options', async () => {
    const schema = {
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
              payload: {
                type: 'object',
                properties: {
                  exampleField: {
                    type: 'string',
                  },
                  exampleNumber: {
                    type: 'number',
                  },
                  exampleDate: {
                    type: 'string',
                    format: 'date-time',
                  },
                },
              },
            },
          },
        },
      },
    };
    const result = render(
      <AsyncApiComponent
        schema={schema}
        config={{
          show: {
            sidebar: true,
            info: true,
            servers: true,
            operations: true,
            messages: true,
            schemas: true,
            errors: true,
          },
        }}
      />,
    );

    await waitFor(() =>
      expect(result.container.querySelector('#introduction')).toBeDefined(),
    );
  });
});
