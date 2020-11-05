import { getExamplesFromSpec } from '../getExamplesFromSpec';

describe('getExamplesFromSpec', () => {
  test('should return headers', () => {
    const result = getExamplesFromSpec(
      [
        {
          headers: {
            header1: 1,
          },
          payload: {
            prop1: 1,
          },
        },
        {
          headers: {
            header2: 2,
          },
          payload: {
            prop2: 2,
          },
        },
      ],
      'headers',
    );
    expect(result).toEqual([
      {
        header1: 1,
      },
      {
        header2: 2,
      },
    ]);
  });

  test('should return payload', () => {
    const result = getExamplesFromSpec(
      [
        {
          headers: {
            header1: 1,
          },
          payload: {
            prop1: 1,
          },
        },
        {
          headers: {
            header2: 2,
          },
          payload: {
            prop2: 2,
          },
        },
      ],
      'payload',
    );
    expect(result).toEqual([
      {
        prop1: 1,
      },
      {
        prop2: 2,
      },
    ]);
  });

  test('should return payload and no undefined', () => {
    const result = getExamplesFromSpec(
      [
        {
          headers: {
            header1: 1,
          },
          payload: {
            prop1: 1,
          },
        },
        {
          headers: {
            header2: 2,
          },
        },
      ],
      'payload',
    );
    expect(result).toEqual([
      {
        prop1: 1,
      },
    ]);
  });
});
