/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, act } from '@testing-library/react';
import { useResizeObserver } from 'use-resize-observer';
import AsyncApiLayout from '../Layout';
import asyncapi from '../../../__tests__/docs/v3/streetlights-kafka.json';
import { Parser } from '../../../helpers';
import { AsyncAPIDocumentInterface } from '@asyncapi/parser';

jest.mock('use-resize-observer', () => ({
  __esModule: true,
  useResizeObserver: jest.fn(),
}));

describe('AsyncApiLayout responsive container classes', () => {
  let parsed: AsyncAPIDocumentInterface;
  let onResizeCallback: ((size: { width?: number }) => void) | undefined;

  beforeAll(async () => {
    const parsedDoc = await Parser.parse(asyncapi, {});
    // eslint-disable-next-line jest/no-standalone-expect
    expect(parsedDoc.error).toBeUndefined();
    // eslint-disable-next-line jest/no-standalone-expect
    expect(parsedDoc.asyncapi).toBeDefined();
    parsed = parsedDoc.asyncapi!;
  });

  beforeEach(() => {
    onResizeCallback = undefined;
    (useResizeObserver as jest.Mock).mockImplementation(
      (opts?: { onResize?: (size: { width?: number }) => void }) => {
        onResizeCallback = opts?.onResize;
        return { ref: jest.fn() };
      },
    );
    jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: FrameRequestCallback) => {
        cb(0);
        return 0;
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('applies container:lg at widths <= 1024, container:xl between 1025 and 1536, and container:base above 1536', () => {
    const { container } = render(
      <AsyncApiLayout asyncapi={parsed} config={{ show: { sidebar: true } }} />,
    );

    const getRootClassName = () =>
      container.querySelector('.aui-root > div')?.className;

    expect(getRootClassName()).toContain('container:xl');

    act(() => {
      onResizeCallback?.({ width: 900 });
    });
    expect(getRootClassName()).toContain('container:lg');

    act(() => {
      onResizeCallback?.({ width: 1280 });
    });
    expect(getRootClassName()).toContain('container:xl');

    act(() => {
      onResizeCallback?.({ width: 1600 });
    });
    expect(getRootClassName()).toContain('container:base');
  });
});
