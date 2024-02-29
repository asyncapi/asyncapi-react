/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  BindingV2 as BindingSchema,
  BindingsV2 as BindingsSchema,
} from '@asyncapi/parser';

import { Bindings } from '../Bindings';
function createBinding(bindingObj: Record<string, any>) {
  const bindings: BindingSchema[] = [];
  for (const [protocol, binding] of Object.entries(bindingObj)) {
    const obj = {};
    obj[protocol] = binding;
    bindings.push(
      new BindingSchema(binding, {
        asyncapi: {} as any,
        pointer: '',
        protocol,
      }),
    );
  }
  return new BindingsSchema(bindings);
}
describe('Bindings component', () => {
  test('should work with simple data', async () => {
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

  test('should render empty binding as string', async () => {
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
