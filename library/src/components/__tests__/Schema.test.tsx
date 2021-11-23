/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';

// @ts-ignore
import SchemaModel from '@asyncapi/parser/lib/models/schema';

import { Schema } from '../Schema';

describe('Schema component', () => {
  test('should work with circular references in schema - using `x-parser-circular-props` extensions', async () => {
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
    const schemaModel = new SchemaModel(schema);

    render(<Schema schema={schemaModel} />);

    // properties
    expect(screen.getByText('nonCircular')).toBeDefined();
    expect(screen.getByText('circular')).toBeDefined();
    expect(screen.getByText('circularTwo')).toBeDefined();
    // [CIRCULAR] annotation
    expect(screen.getAllByText('object [CIRCULAR]')).toBeDefined();
    expect(screen.getAllByText('object [CIRCULAR]')).toHaveLength(2);
  });

  test('should work with circular references in schema - using `x-parser-circular-props` extensions', async () => {
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
    schema['x-parser-circular-props'] = ['circular', 'circularTwo'];
    const schemaModel = new SchemaModel(schema);

    render(<Schema schema={schemaModel} />);

    // properties
    expect(screen.getByText('nonCircular')).toBeDefined();
    expect(screen.getByText('circular')).toBeDefined();
    expect(screen.getByText('circularTwo')).toBeDefined();
    // [CIRCULAR] annotation
    expect(screen.getAllByText('object [CIRCULAR]')).toBeDefined();
    expect(screen.getAllByText('object [CIRCULAR]')).toHaveLength(2);
  });
});
