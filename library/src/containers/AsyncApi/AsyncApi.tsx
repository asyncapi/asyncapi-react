import React, { Component } from 'react';
import { AsyncAPIDocumentInterface } from '@asyncapi/parser';

import AsyncApiStandalone from './Standalone';
import { Highlight } from '../../components/Highlight/Highlight';

import {
  isFetchingSchemaInterface,
  ErrorObject,
  PropsSchema,
} from '../../types';
import { ConfigInterface } from '../../config';
import { SpecificationHelpers, Parser } from '../../helpers';
import { ChangeTracker } from '../../helpers/ChangeTracker';

export interface AsyncApiProps {
  schema: PropsSchema;
  config?: Partial<ConfigInterface>;
}

interface AsyncAPIState {
  asyncapi?: AsyncAPIDocumentInterface;
  error?: ErrorObject;
  highlightedElement?: string;
}

class AsyncApiComponent extends Component<AsyncApiProps, AsyncAPIState> {
  state: AsyncAPIState = {
    asyncapi: undefined,
    error: undefined,
    highlightedElement: undefined,
  };

  async componentDidMount() {
    if (this.props.schema) {
      const { schema, config } = this.props;
      await this.parseSchema(schema, config?.parserOptions);
    }
  }

  async componentDidUpdate(prevProps: AsyncApiProps) {
    const oldSchema = prevProps.schema;
    const newSchema = this.props.schema;

    if (oldSchema !== newSchema) {
      const { config } = this.props;
      await this.parseSchema(newSchema, config?.parserOptions);

      // Detect changes and update highlight
      if (typeof oldSchema === 'string' && typeof newSchema === 'string') {
        const changes = await ChangeTracker.detectChanges(oldSchema, newSchema);
        if (changes.length > 0) {
          // Get the first changed element to highlight
          this.setState({ highlightedElement: changes[0].elementId });
        }
      }
    }
  }

  render() {
    const { schema, config } = this.props;
    const { asyncapi, error, highlightedElement } = this.state;

    return (
      <>
        <AsyncApiStandalone
          schema={asyncapi ?? schema}
          config={config}
          error={error}
        />
        {highlightedElement && (
          <Highlight
            elementId={highlightedElement}
            duration={2000}
          />
        )}
      </>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async parseSchema(schema: PropsSchema, parserOptions?: any) {
    const parsedSpec = SpecificationHelpers.retrieveParsedSpec(schema);
    if (parsedSpec) {
      this.setState({
        asyncapi: parsedSpec,
      });
      return;
    }

    if (isFetchingSchemaInterface(schema)) {
      const parsedFromUrl = await Parser.parseFromUrl(schema, parserOptions);
      this.setState({
        asyncapi: parsedFromUrl.asyncapi,
        error: parsedFromUrl.error,
      });
      return;
    }

    const parsed = await Parser.parse(schema, parserOptions);
    this.setState({
      asyncapi: parsed.asyncapi,
      error: parsed.error,
    });
  }
}

export default AsyncApiComponent;
