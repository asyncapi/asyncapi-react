/**
 * @jest-environment jsdom
 */

/* eslint-disable sonarjs/no-duplicate-string */

import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  BindingV2 as BindingSchema,
  BindingsV2 as BindingsSchema,
} from '@asyncapi/parser';

import { Bindings } from '../Bindings';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createBinding(bindingObj: Record<string, any>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bindings: BindingSchema<any>[] = [];
  for (const [protocol, binding] of Object.entries(bindingObj)) {
    const obj: Record<string, unknown> = {};
    obj[protocol] = binding;
    bindings.push(
      new BindingSchema(binding, {
        asyncapi: {} as never,
        pointer: '',
        protocol,
      }),
    );
  }
  return new BindingsSchema(bindings);
}
describe('Bindings component', () => {
  test('should work with simple data', () => {
    const bindings = {
      mqtt: {
        fooMqtt: 'barMqtt',
      },
      kafka: {
        fooKafka: 'barKafka',
      },
    };
    render(<Bindings bindings={createBinding(bindings)} />);

    expect(screen.getAllByText('Binding specific information')).toBeDefined();
    expect(screen.getAllByText('Binding specific information')).toHaveLength(2);
    expect(screen.getByText('mqtt')).toBeDefined();
    expect(screen.getByText('fooMqtt')).toBeDefined();
    expect(screen.getByText('barMqtt')).toBeDefined();
    expect(screen.getByText('kafka')).toBeDefined();
    expect(screen.getByText('fooKafka')).toBeDefined();
    expect(screen.getByText('barKafka')).toBeDefined();
  });

  test('should render empty binding as string', () => {
    const bindings = {
      mqtt: {
        foo: 'bar',
      },
      kafka: undefined,
      http: null,
    };
    render(<Bindings bindings={createBinding(bindings)} />);

    expect(screen.getAllByText('Binding specific information')).toBeDefined();
    expect(screen.getAllByText('Binding specific information')).toHaveLength(3);
    expect(screen.getByText('mqtt')).toBeDefined();
    expect(screen.getByText('foo')).toBeDefined();
    expect(screen.getByText('bar')).toBeDefined();
    expect(screen.getByText('kafka')).toBeDefined();
    expect(screen.getByText('http')).toBeDefined();
    expect(screen.queryByText('undefined')).toEqual(null);
    expect(screen.queryByText('null')).toEqual(null);
  });
});
