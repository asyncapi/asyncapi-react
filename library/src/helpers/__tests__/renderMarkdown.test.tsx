import React from 'react';
import { renderMd } from '../renderMarkdown';

describe('renderMd', () => {
  test('should return input value (input is ReactNode)', () => {
    const input = <div>foobar</div>;
    const result = renderMd(input);

    expect(result).toEqual(input);
  });

  test('should return input value (input is number)', () => {
    const input = 0;
    const result = renderMd(input);

    expect(result).toEqual(input);
  });
});
