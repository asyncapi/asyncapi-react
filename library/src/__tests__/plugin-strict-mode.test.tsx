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
  const finishUninstalls: (() => void)[] = [];
  let resourceActive = false;
  let lifecycleOverlapped = false;
  const install = jest.fn((api: PluginAPI) => {
    if (resourceActive) lifecycleOverlapped = true;
    resourceActive = true;
    api.registerComponent(PluginSlot.OPERATION, PluginPanel);
  });
  const uninstall = jest.fn(
    () =>
      new Promise<void>((resolve) => {
        finishUninstalls.push(() => {
          resourceActive = false;
          resolve();
        });
      }),
  );
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

  finishUninstalls[0]();

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

  result.rerender(
    <StrictMode>
      <AsyncApiComponent schema={schema} plugins={[]} />
    </StrictMode>,
  );
  await waitFor(() => expect(uninstall).toHaveBeenCalledTimes(2));

  result.rerender(
    <StrictMode>
      <AsyncApiComponent schema={schema} plugins={[plugin]} />
    </StrictMode>,
  );
  expect(install).toHaveBeenCalledTimes(2);

  finishUninstalls[1]();
  await waitFor(() => expect(install).toHaveBeenCalledTimes(3));
  expect(lifecycleOverlapped).toBe(false);

  result.unmount();
  await waitFor(() => expect(uninstall).toHaveBeenCalledTimes(3));
  finishUninstalls[2]();
});

test('waits for a same-name plugin to uninstall before installing its replacement', async () => {
  let finishUninstall: (() => void) | undefined;
  const firstInstall = jest.fn();
  const firstUninstall = jest.fn(
    () =>
      new Promise<void>((resolve) => {
        finishUninstall = resolve;
      }),
  );
  const replacementInstall = jest.fn();
  const firstPlugin: AsyncApiPlugin = {
    name: 'replaceable-plugin',
    version: '1.0.0',
    install: firstInstall,
    uninstall: firstUninstall,
  };
  const replacementPlugin: AsyncApiPlugin = {
    name: 'replaceable-plugin',
    version: '2.0.0',
    install: replacementInstall,
  };

  const result = render(
    <AsyncApiComponent schema={schema} plugins={[firstPlugin]} />,
  );
  await waitFor(() => expect(firstInstall).toHaveBeenCalledTimes(1));

  result.rerender(
    <AsyncApiComponent schema={schema} plugins={[replacementPlugin]} />,
  );
  await waitFor(() => expect(firstUninstall).toHaveBeenCalledTimes(1));
  expect(replacementInstall).not.toHaveBeenCalled();

  finishUninstall?.();
  await waitFor(() => expect(replacementInstall).toHaveBeenCalledTimes(1));

  result.unmount();
});
