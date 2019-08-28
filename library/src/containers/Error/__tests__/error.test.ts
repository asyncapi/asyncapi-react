import { formatErrors } from '../Error';
import { ErrorObject } from 'ajv';

// first argument, expected result
type ErrorsInputShape = Array<[ErrorObject, string]>;

const message = `testMsg`;
const keyword = `key`;
const dataPath = `testDataPath`;
const schemaPath = `schemaPath`;

const paramsWithKeyword = { keyword: 'testKeyword' };
const paramsWithFormat = { format: 'testFormat' };

const typeKeyword = `type`;

const errorsInput: ErrorsInputShape = [
  [
    {
      message,
      keyword,
      dataPath,
      schemaPath,
      params: paramsWithKeyword,
    },
    `${dataPath} ${message}: ${paramsWithKeyword.keyword}`,
  ],
  [
    {
      message,
      keyword,
      dataPath,
      schemaPath,
      params: paramsWithFormat,
    },
    `${dataPath} ${message}: ${paramsWithFormat.format}`,
  ],
];

describe('Error component', () => {
  describe('formatErrors', () => {
    test.each(errorsInput)(
      `given:
      %o
      should respond with %p`,
      (data, response) => {
        expect(formatErrors(data)).toBe(response);
      },
    );

    test('should handle case when keyword="type"', () => {
      const testObj = {
        message,
        keyword: typeKeyword,
        dataPath,
        schemaPath,
        params: paramsWithFormat,
      };

      const response = `${testObj.dataPath} ${testObj.message}`;
      expect(formatErrors(testObj)).toBe(response);
    });

    test.todo('should handle more test cases');
  });
});
