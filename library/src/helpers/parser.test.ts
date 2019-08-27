import { parser } from './parser';

import invalidDoc from '../testAssets/async.json';

describe('parser', () => {
  describe('parse', () => {
    test.each(invalidDoc.map(el => [el]))('%# test', async data => {
      await parser.parse(data).then(result => {
        expect(result.error).toBeFalsy();
        expect(result.data).toBeTruthy();
      });
    });
  });
});
