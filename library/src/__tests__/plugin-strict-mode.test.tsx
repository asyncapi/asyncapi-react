/**
 * @jest-environment jsdom
 */

import React, { StrictMode } from 'react';
import { render, waitFor } from '@testing-library/react';
import AsyncApiComponent from '..';
import { AsyncApiPlugin, PluginAPI, PluginSlot } from '../types';

jest.mock('use-resize-observer', () => ({
  __esModule: true,
  useResizeObserver: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
}));
jest.setTimeout(20000);

const schema = {
  asyncapi: '3.0.0',
  info: { title: 'Strict Mode API', version: '1.0.0' },
  channels: {
    userSignedUp: {
      address: 'user/signedup',
      messages: { UserSignedUp: { payload: { type: 'string' } } },
    },
  },
  operations: {
    onUserSignedUp: {
      action: 'receive',
      channel: { $ref: '#/channels/userSignedUp' },
    },
  },
};

const PluginPanel = () => <div data-testid="plugin-panel">panel</div>;

test('keeps plugins registered when StrictMode remounts the component', async () => {
  let finishFirstUninstall!: () => void;
  let resourceActive = false;
  let lifecycleOverlapped = false;
  const install = jest.fn((api: PluginAPI) => {
    if (resourceActive) lifecycleOverlapped = true;
    resourceActive = true;
    api.registerComponent(PluginSlot.OPERATION, PluginPanel);
  });
  const uninstall = jest.fn(() => {
    if (uninstall.mock.calls.length > 1) {
      resourceActive = false;
      return;
    }
    return new Promise<void>((resolve) => {
      finishFirstUninstall = () => {
        resourceActive = false;
        resolve();
      };
    });
  });
  const plugin: AsyncApiPlugin = {
    name: 'strict-mode-plugin',
    version: '1.0.0',
    install,
    uninstall,
  };

  const result = render(
    <StrictMode>
      <AsyncApiComponent schema={schema} plugins={[plugin]} />
    </StrictMode>,
  );

  await waitFor(() => expect(uninstall).toHaveBeenCalledTimes(1));
  expect(install).toHaveBeenCalledTimes(1);

  finishFirstUninstall();

  await waitFor(
    () => {
      expect(
        result.container.querySelector('[data-testid="plugin-panel"]'),
      ).toBeTruthy();
    },
    { timeout: 15000 },
  );
  expect(install).toHaveBeenCalledTimes(2);
  expect(lifecycleOverlapped).toBe(false);

  result.unmount();
});
