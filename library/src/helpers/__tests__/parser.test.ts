import { Options as ParserOptions } from 'json-schema-ref-parser';

import { Parser } from '../parser';
import { AsyncAPI } from '../../types';

import validDoc from './async.json';

const mockParse = (d: AsyncAPI) =>
  jest.fn(async (c: string | any, opts?: ParserOptions) => d);

const mockParseErr = <T extends Error>(err: T) =>
  jest.fn(async (c: string | any, opts?: ParserOptions) => {
    throw err;
  });

const mockParseURL = (d: AsyncAPI) =>
  jest.fn(async (a: string, b?: RequestInit, c?: ParserOptions) => d);

const mockParseURLErr = <T extends Error>(err: T) =>
  jest.fn(async (a: string, b?: RequestInit, c?: ParserOptions) => {
    throw err;
  });

describe('Parser', () => {
  describe('parse', () => {
    const parseURL = mockParseURLErr(new Error('not implemented'));

    test('should return no errors and data when doc is valid', async () => {
      const doc: AsyncAPI = (validDoc as any) as AsyncAPI;
      const parse = mockParse(doc);
      const parser = new Parser(parse, parseURL);
      await parser.parse('mocked').then(result => {
        expect(result.error).toBeFalsy();
        expect(result.data).toBeTruthy();
      });
    });
  });

  describe('parseURL', () => {
    const parse = mockParseErr(new Error('not implemented'));

    test('should return no errors and data when doc is valid', async () => {
      const doc: AsyncAPI = (validDoc as any) as AsyncAPI;
      const parseURL = mockParseURL(doc);
      const parser = new Parser(parse, parseURL);
      await parser.parseFromUrl({ url: 'mocked' }).then(result => {
        expect(result.error).toBeFalsy();
        expect(result.data).toBeTruthy();
      });
    });
  });
});
