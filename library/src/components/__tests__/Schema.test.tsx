/**
 * @jest-environment jsdom
 */

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { SchemaV2 as SchemaModel } from '@asyncapi/parser';
import { Schema } from '../Schema';

const expandAll = () => {
  fireEvent.click(screen.getByRole('button', { name: 'Expand all' }));
};

describe('Schema component', () => {
  // eslint-disable-next-line jest/expect-expect
  test('should work with true schema', () => {
    const schema = true;
    const schemaModel = new SchemaModel(schema as never);

    render(<Schema schema={schemaModel} />);
  });

  // eslint-disable-next-line jest/expect-expect
  test('should work with false schema', () => {
    const schema = false;
    const schemaModel = new SchemaModel(schema as never);

    render(<Schema schema={schemaModel} />);
  });
  test('should work with circular references in schema', () => {
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
    const schemaModel = new SchemaModel(schema as never);

    render(<Schema schema={schemaModel} />);

    expandAll();

    // properties
    expect(screen.getByText('nonCircular')).toBeDefined();
    expect(screen.getByText('circular')).toBeDefined();
    expect(screen.getByText('circularTwo')).toBeDefined();
    // [CIRCULAR] annotation
    expect(screen.getAllByText('object [CIRCULAR]')).toBeDefined();
    expect(screen.getAllByText('object [CIRCULAR]')).toHaveLength(2);
  });

  describe('should render boolean values', () => {
    test('defined as defaults', () => {
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
      const schemaModel = new SchemaModel(schema as never);

      render(<Schema schema={schemaModel} />);

      expandAll();

      expect(screen.getByText('true')).toBeDefined();
      expect(screen.getByText('false')).toBeDefined();
    });

    test('defined as const', () => {
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
      const schemaModel = new SchemaModel(schema as never);

      render(<Schema schema={schemaModel} />);

      expandAll();

      const constantValueElements = screen.getAllByText('Constant value:');
      expect(constantValueElements).toBeDefined();
      expect(constantValueElements).toHaveLength(2);

      expect(screen.getByText('true')).toBeDefined();
      expect(screen.getByText('false')).toBeDefined();
    });
  });

  describe('should render arrays', () => {
    test('which includes oneOf', () => {
      const schemaModel = new SchemaModel({
        title: 'Sets',
        type: 'array',
        items: {
          title: 'Set',
          type: 'object',
          properties: {
            pets: {
              title: 'Pets',
              type: 'array',
              items: {
                title: 'Pet',
                type: 'object',
                discriminator: 'type',
                properties: {
                  type: {
                    title: 'Pet.Type',
                    type: 'string',
                    enum: ['CAT', 'DOG'],
                  },
                },
                oneOf: [
                  {
                    title: 'Cat',
                    type: 'object',
                    properties: {
                      type: {
                        const: 'CAT',
                      },
                    },
                  },
                  {
                    title: 'Dog',
                    type: 'object',
                    properties: {
                      type: {
                        const: 'DOG',
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      });

      render(<Schema schema={schemaModel} />);

      expandAll();

      expandAll();

      expect(
        screen.getAllByRole('heading', {
          name: /can be one of the following/i,
        }),
      ).toBeDefined();

      expect(screen.getByText('Cat:')).toBeDefined();
      expect(screen.getByText('Dog:')).toBeDefined();
    });
  });
});
