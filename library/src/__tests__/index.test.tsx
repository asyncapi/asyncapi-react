/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import AsyncApiComponent from '..';

describe('Bindings component', () => {
  test('should work with simple data', async () => {
    const schema = {
      asyncapi: '3.0.0',
      info: {
        title: 'Kraken Websockets API',
        version: '1.8.0',
        description:
          "WebSockets API offers real-time market data updates. WebSockets is a bidirectional protocol offering fastest real-time data, helping you build real-time applications. The public message types presented below do not require authentication. Private-data messages can be subscribed on a separate authenticated endpoint. \n\n### General Considerations\n\n- TLS with SNI (Server Name Indication) is required in order to establish a Kraken WebSockets API connection. See Cloudflare's [What is SNI?](https://www.cloudflare.com/learning/ssl/what-is-sni/) guide for more details.\n- All messages sent and received via WebSockets are encoded in JSON format\n- All decimal fields (including timestamps) are quoted to preserve precision.\n- Timestamps should not be considered unique and not be considered as aliases for transaction IDs. Also, the granularity of timestamps is not representative of transaction rates.\n- At least one private message should be subscribed to keep the authenticated client connection open.\n- Please use REST API endpoint [AssetPairs](https://www.kraken.com/features/api#get-tradable-pairs) to fetch the list of pairs which can be subscribed via WebSockets API. For example, field 'wsname' gives the supported pairs name which can be used to subscribe.\n- Cloudflare imposes a connection/re-connection rate limit (per IP address) of approximately 150 attempts per rolling 10 minutes. If this is exceeded, the IP is banned for 10 minutes.\n- Recommended reconnection behaviour is to (1) attempt reconnection instantly up to a handful of times if the websocket is dropped randomly during normal operation but (2) after maintenance or extended downtime, attempt to reconnect no more quickly than once every 5 seconds. There is no advantage to reconnecting more rapidly after maintenance during cancel_only mode.\n",
      },
      channels: {
        currencyExchange: {
          address: '/',
          messages: {
            ping: {
              $ref: '#/components/messages/ping',
            },
            pong: {
              $ref: '#/components/messages/pong',
            },
          },
        },
      },
      operations: {
        pingPong: {
          action: 'send',
          channel: {
            $ref: '#/channels/currencyExchange',
          },
          messages: [
            {
              $ref: '#/components/messages/ping',
            },
          ],
          reply: {
            channel: {
              $ref: '#/channels/currencyExchange',
            },
            messages: [
              {
                $ref: '#/components/messages/pong',
              },
            ],
          },
        },
      },
      components: {
        messages: {
          ping: {
            summary: 'Ping server to determine whether connection is alive',
            description:
              'Client can ping server to determine whether connection is alive, server responds with pong. This is an application level ping as opposed to default ping in websockets standard which is server initiated',
            payload: {
              $ref: '#/components/schemas/ping',
            },
            correlationId: {
              location: '$message.payload#/reqid',
            },
          },
          pong: {
            summary: 'Pong is a response to ping message',
            description:
              'Server pong response to a ping to determine whether connection is alive. This is an application level pong as opposed to default pong in websockets standard which is sent by client in response to a ping',
            payload: {
              $ref: '#/components/schemas/pong',
            },
            correlationId: {
              location: '$message.payload#/reqid',
            },
          },
        },
        schemas: {
          ping: {
            type: 'object',
            properties: {
              event: {
                type: 'string',
                const: 'ping',
              },
              reqid: {
                $ref: '#/components/schemas/reqid',
              },
            },
            required: ['event'],
          },
          pong: {
            type: 'object',
            properties: {
              event: {
                type: 'string',
                const: 'pong',
              },
              reqid: {
                $ref: '#/components/schemas/reqid',
              },
            },
          },
          reqid: {
            type: 'integer',
            description: 'client originated ID reflected in response message.',
          },
        },
      },
    };
    render(<AsyncApiComponent schema={schema} />);

    screen.debug();
    expect(screen.getAllByText('Kraken Websockets API')).toBeDefined();
  });
});
