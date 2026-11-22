/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import Standalone from '../containers/AsyncApi/Standalone';
import type { PluginManager } from '../helpers/pluginManager';

jest.mock('@asyncapi/parser', () => {
  throw new Error('@asyncapi/parser must not load in the no-parser entry');
});

jest.mock('@asyncapi/openapi-schema-parser', () => {
  throw new Error(
    '@asyncapi/openapi-schema-parser must not load in the no-parser entry',
  );
});

jest.mock('@asyncapi/protobuf-schema-parser', () => {
  throw new Error(
    '@asyncapi/protobuf-schema-parser must not load in the no-parser entry',
  );
});

jest.mock('@asyncapi/avro-schema-parser', () => {
  throw new Error(
    '@asyncapi/avro-schema-parser must not load in the no-parser entry',
  );
});

describe('without-parser entry', () => {
  test('loads without requiring the AsyncAPI Parser runtime', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const entry = require('../without-parser') as {
      default: unknown;
      hljs: unknown;
    };

    expect(entry.default).toBeDefined();
    expect(entry.hljs).toBeDefined();
  });

  test('clears plugin context when the document is removed', async () => {
    global.ResizeObserver = class ResizeObserver {
      observe = jest.fn();
      unobserve = jest.fn();
      disconnect = jest.fn();
    } as unknown as typeof ResizeObserver;

    let pluginManager: PluginManager | undefined;
    const schema = {
      asyncapi: '2.0.0',
      info: { title: 'Active document', version: '1.0.0' },
      channels: {},
    };
    const result = render(
      <Standalone
        schema={schema}
        onPluginManagerReady={(manager) => {
          pluginManager = manager;
        }}
      />,
    );

    expect(pluginManager).toBeDefined();
    result.rerender(
      <Standalone
        schema={undefined}
        onPluginManagerReady={(manager) => {
          pluginManager = manager;
        }}
      />,
    );

    if (!pluginManager) throw new Error('PluginManager was not initialized');
    const onSpecLoaded = jest.fn();
    await pluginManager.register({
      name: 'late-plugin',
      version: '1.0.0',
      install: (api) => api.onSpecLoaded(onSpecLoaded),
    });

    expect(onSpecLoaded).not.toHaveBeenCalled();
  });
  test('renders a plain parsed object fixture', async () => {
    global.ResizeObserver = class ResizeObserver {
      observe = jest.fn();
      unobserve = jest.fn();
      disconnect = jest.fn();
    } as unknown as typeof ResizeObserver;

    const result = render(
      <Standalone
        schema={{
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
        }}
      />,
    );

    expect(await result.findByText(/Example AsyncAPI/)).toBeTruthy();
    expect(await result.findByText('example-server')).toBeTruthy();
    expect(await result.findByText('example-channel')).toBeTruthy();
  });
});
