import { parser } from '../src/helpers/parser';
import { ParserError } from '../src/types';
import invalidDoc from './testAssets/async.json';

describe('parser', () => {
  const hasErrors = (error: ParserError) => expect(error).not.toBeNull();
  describe('parse', () => {
    it.each`
      doc              | errorCheck
      ${invalidDoc[0]} | ${hasErrors}
      ${invalidDoc[1]} | ${hasErrors}
    `('should ...', data => {
      parser.parse(data.doc).then(result => {
        expect(result.error).not.toBeNull();
      });
    });
  });
});
