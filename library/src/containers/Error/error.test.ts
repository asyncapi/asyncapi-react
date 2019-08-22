import { formatErrors } from './Error';
import { ErrorObject } from 'ajv';

type ErrorsInputShape = Array<[ErrorObject, string | null]>;
const errorsInput: ErrorsInputShape = [
  [
    {
      message: 'asd',
      keyword: 'data',
      dataPath: 'testDataPath',
      schemaPath: 'schemaPath',
      params: { keyword: 'format' },
    },
    null,
  ],
];

describe('Error component', () => {
  test.each(errorsInput)('asd', (data, response) => {
    expect(formatErrors(data)).toBe(response);
  });

  // test.each()(
  //   '.add(%i, %i)',
  //   (a, b, expected) => {
  //     expect(a + b).toBe(expected);
  //   },
  // );
});
