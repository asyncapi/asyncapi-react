/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';

// @ts-ignore
import { SchemaV2 as SchemaModel } from '@asyncapi/parser';

import { Extensions } from '../Extensions';

describe('Extensions component', () => {
  test('should work with simple data', async () => {
    const schema = {
      'x-foo': 'xBar',
      'x-bar': 'xFoo',
    };
    const schemaModel = new SchemaModel(schema);
    render(<Extensions item={schemaModel} />);

    expect(screen.getByText('Extensions')).toBeDefined();
    expect(screen.getByText('x-foo')).toBeDefined();
    expect(screen.getByText('xBar')).toBeDefined();
    expect(screen.getByText('x-bar')).toBeDefined();
    expect(screen.getByText('xFoo')).toBeDefined();
  });

  test('should filter non extensions', async () => {
    const schema = {
      foo: {
        foo: 'bar',
      },
      bar: {
        foo: 'bar',
      },
      'x-foo': 'xBar',
      'x-bar': 'xFoo',
    };
    const schemaModel = new SchemaModel(schema);
    render(<Extensions item={schemaModel} />);

    expect(screen.getByText('Extensions')).toBeDefined();
    expect(screen.getByText('x-foo')).toBeDefined();
    expect(screen.getByText('xBar')).toBeDefined();
    expect(screen.getByText('x-bar')).toBeDefined();
    expect(screen.getByText('xFoo')).toBeDefined();
    expect(screen.queryByText('foo')).toEqual(null);
    expect(screen.queryByText('bar')).toEqual(null);
  });

  test('should render empty extension as string', async () => {
    const schema = {
      'x-foo': 'xBar',
      'x-bar': undefined,
      'x-foobar': null,
    };
    const schemaModel = new SchemaModel(schema);
    render(<Extensions item={schemaModel} />);

    expect(screen.getByText('Extensions')).toBeDefined();
    expect(screen.getByText('x-foo')).toBeDefined();
    expect(screen.getByText('xBar')).toBeDefined();
    expect(screen.getByText('x-bar')).toBeDefined();
    expect(screen.getByText('x-foobar')).toBeDefined();
    expect(screen.queryByText('undefined')).toEqual(null);
    expect(screen.queryByText('null')).toEqual(null);
  });
});
