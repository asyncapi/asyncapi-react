/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { SchemaV2 as SchemaModel } from '@asyncapi/parser';

import { Schema } from '../Schema';

describe('Schema component', () => {
  test('should work with true schema', async () => {
    const schema = true;
    const schemaModel = new SchemaModel(schema as any);

    render(<Schema schema={schemaModel} />);
  });

  test('should work with false schema', async () => {
    const schema = false;
    const schemaModel = new SchemaModel(schema as any);

    render(<Schema schema={schemaModel} />);
  });
  test('should work with circular references in schema', async () => {
    const schema = {
      type: 'object',
      properties: {
        nonCircular: {
          type: 'string',
        },
        circular: {},
        circularTwo: {},
      },
    };
    schema.properties.circular = schema;
    schema.properties.circularTwo = schema;
    const schemaModel = new SchemaModel(schema as any);

    render(<Schema schema={schemaModel} />);

    // properties
    expect(screen.getByText('nonCircular')).toBeDefined();
    expect(screen.getByText('circular')).toBeDefined();
    expect(screen.getByText('circularTwo')).toBeDefined();
    // [CIRCULAR] annotation
    expect(screen.getAllByText('object [CIRCULAR]')).toBeDefined();
    expect(screen.getAllByText('object [CIRCULAR]')).toHaveLength(2);
  });

  describe('should render boolean values', () => {
    test('defined as defaults', async () => {
      const schema = {
        type: 'object',
        properties: {
          trueValue: {
            type: 'boolean',
            default: true,
          },
          falseValue: {
            type: 'boolean',
            default: false,
          },
        },
      };
      const schemaModel = new SchemaModel(schema as any);

      render(<Schema schema={schemaModel} />);

      expect(screen.getByText('true')).toBeDefined();
      expect(screen.getByText('false')).toBeDefined();
    });

    test('defined as const', async () => {
      const schema = {
        type: 'object',
        properties: {
          trueValue: {
            type: 'boolean',
            const: true,
          },
          falseValue: {
            type: 'boolean',
            const: false,
          },
        },
      };
      const schemaModel = new SchemaModel(schema as any);

      render(<Schema schema={schemaModel} />);

      expect(screen.getByText('true')).toBeDefined();
      expect(screen.getByText('false')).toBeDefined();
    });
  });
});
