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
    expect(parsedDoc.error).toBeUndefined();
    expect(parsedDoc.asyncapi).toBeDefined();
    parsed = parsedDoc.asyncapi!;
  });
  test('should render sidebar with showOperations: byDefault', async () => {
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
  test('should render sidebar with showOperations: byOperationsTags', async () => {
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
  test('should render sidebar with showOperations: bySpecTags', async () => {
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
  test('should render sidebar with showServers: byDefault', async () => {
    render(
      <ConfigContext.Provider value={{ sidebar: { showServers: 'byDefault' } }}>
        <SpecificationContext.Provider value={parsed}>
          <Sidebar />
        </SpecificationContext.Provider>
      </ConfigContext.Provider>,
    );
  });
  test('should render sidebar with showServers: byServersTags', async () => {
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
  test('should render sidebar with showServers: bySpecTags', async () => {
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
  test('should render with showOperations: byDefault, showServers: byDefault', async () => {
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
