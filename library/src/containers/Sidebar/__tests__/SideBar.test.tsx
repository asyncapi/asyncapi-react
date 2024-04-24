/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Sidebar } from '../Sidebar';
import { ConfigContext, SpecificationContext } from '../../../contexts';
import asyncapi from '../../../__tests__/docs/v3/streetlights-kafka.json';
import { Parser } from '../../../helpers';
import { AsyncAPIDocumentInterface } from '@asyncapi/parser';
describe('Sidebar component', () => {
  let parsed: AsyncAPIDocumentInterface;
  beforeAll(async () => {
    const parsedDoc = await Parser.parse(asyncapi, {});
    // eslint-disable-next-line jest/no-standalone-expect
    expect(parsedDoc.error).toBeUndefined();
    // eslint-disable-next-line jest/no-standalone-expect
    expect(parsedDoc.asyncapi).toBeDefined();
    parsed = parsedDoc.asyncapi!;
  });
  // eslint-disable-next-line jest/expect-expect
  test('should render sidebar with showOperations: byDefault', () => {
    render(
      <ConfigContext.Provider
        value={{ sidebar: { showOperations: 'byDefault' } }}
      >
        <SpecificationContext.Provider value={parsed}>
          <Sidebar />
        </SpecificationContext.Provider>
      </ConfigContext.Provider>,
    );
  });
  // eslint-disable-next-line jest/expect-expect
  test('should render sidebar with showOperations: byOperationsTags', () => {
    render(
      <ConfigContext.Provider
        value={{ sidebar: { showOperations: 'byOperationsTags' } }}
      >
        <SpecificationContext.Provider value={parsed}>
          <Sidebar />
        </SpecificationContext.Provider>
      </ConfigContext.Provider>,
    );
  });
  // eslint-disable-next-line jest/expect-expect
  test('should render sidebar with showOperations: bySpecTags', () => {
    render(
      <ConfigContext.Provider
        value={{ sidebar: { showOperations: 'bySpecTags' } }}
      >
        <SpecificationContext.Provider value={parsed}>
          <Sidebar />
        </SpecificationContext.Provider>
      </ConfigContext.Provider>,
    );
  });
  // eslint-disable-next-line jest/expect-expect
  test('should render sidebar with showServers: byDefault', () => {
    render(
      <ConfigContext.Provider value={{ sidebar: { showServers: 'byDefault' } }}>
        <SpecificationContext.Provider value={parsed}>
          <Sidebar />
        </SpecificationContext.Provider>
      </ConfigContext.Provider>,
    );
  });
  // eslint-disable-next-line jest/expect-expect
  test('should render sidebar with showServers: byServersTags', () => {
    render(
      <ConfigContext.Provider
        value={{ sidebar: { showServers: 'byServersTags' } }}
      >
        <SpecificationContext.Provider value={parsed}>
          <Sidebar />
        </SpecificationContext.Provider>
      </ConfigContext.Provider>,
    );
  });
  // eslint-disable-next-line jest/expect-expect
  test('should render sidebar with showServers: bySpecTags', () => {
    render(
      <ConfigContext.Provider
        value={{ sidebar: { showServers: 'bySpecTags' } }}
      >
        <SpecificationContext.Provider value={parsed}>
          <Sidebar />
        </SpecificationContext.Provider>
      </ConfigContext.Provider>,
    );
  });
  // eslint-disable-next-line jest/expect-expect
  test('should render with showOperations: byDefault, showServers: byDefault', () => {
    render(
      <ConfigContext.Provider
        value={{
          sidebar: { showOperations: 'byDefault', showServers: 'byDefault' },
        }}
      >
        <SpecificationContext.Provider value={parsed}>
          <Sidebar />
        </SpecificationContext.Provider>
      </ConfigContext.Provider>,
    );
  });
});
