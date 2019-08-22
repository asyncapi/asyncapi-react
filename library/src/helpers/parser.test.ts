import { parser } from './parser';

import invalidDoc from '../testAssets/async.json';

describe('parser', () => {
  describe('parse', () => {
    const errors = ['Invalid', undefined];

    test.each`
      doc              | errorCheck
      ${invalidDoc[0]} | ${errors[0]}
      ${invalidDoc[1]} | ${errors[1]}
    `('should not return errors for data from async.json', async ({ doc }) => {
      await parser.parse(doc).then(result => {
        expect(result.error).toBeFalsy();
        expect(result.data).toBeTruthy();
      });
    });

    test.each(invalidDoc.map(el => [el]))('%# test', async data => {
      await parser.parse(data).then(result => {
        // expect(result.error).toBeFalsy();
        expect(result.data).toBeTruthy();
      });
    });
  });
});
