/** @jest-environment jsdom */
import React from 'react';
import { act, render } from '@testing-library/react';
import AsyncApiComponent from '../containers/AsyncApi/AsyncApi';
import { Parser, SpecificationHelpers } from '../helpers';
import { ParserReturn } from '../types';

jest.mock('../containers/AsyncApi/Standalone', () => ({
  __esModule: true,
  default: () => null,
}));

function deferred() {
  let resolve!: (value: ParserReturn) => void;
  const promise = new Promise<ParserReturn>((done) => { resolve = done; });
  return { promise, resolve };
}

afterEach(() => jest.restoreAllMocks());

test('ignores an older remote parsing result after the latest result commits', async () => {
  jest.spyOn(SpecificationHelpers, 'retrieveParsedSpec').mockReturnValue(undefined);
  const older = deferred();
  const newer = deferred();
  jest.spyOn(Parser, 'parseFromUrl')
    .mockReturnValueOnce(older.promise)
    .mockReturnValueOnce(newer.promise);
  const ref = React.createRef<AsyncApiComponent>();
  const view = render(<AsyncApiComponent ref={ref} schema={{ url: 'https://example.com/a' }} />);
  view.rerender(<AsyncApiComponent ref={ref} schema={{ url: 'https://example.com/b' }} />);
  const latest = { error: { title: 'latest error' } };
  await act(async () => { newer.resolve(latest); });
  expect(ref.current?.state.error).toEqual(latest.error);
  await act(async () => { older.resolve({ error: { title: 'outdated error' } }); });
  expect(ref.current?.state.error).toEqual(latest.error);
});
