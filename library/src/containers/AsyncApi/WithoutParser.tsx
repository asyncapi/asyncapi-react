import React, { Component } from 'react';
import { AsyncAPIDocument } from '@asyncapi/parser';
// @ts-ignore
import AsyncAPIDocumentClass from '@asyncapi/parser/lib/models/asyncapi';

import { ErrorObject, PropsSchema } from '../../types';
import { ConfigInterface, defaultConfig } from '../../config';
import { bemClasses, stateHelpers } from '../../helpers';
import { CSS_PREFIX } from '../../constants';
import { useSpec, useExpandedContext, useChangeHashContext } from '../../store';

import { ErrorComponent } from '../Error/Error';
import { Sidebar } from '../Sidebar/Sidebar';
import { Info } from '../Info/Info';
import { Servers } from '../Servers/Servers';
import { Operations } from '../Operations/Operations';
import { Messages } from '../Messages/Messages';

export interface AsyncApiProps {
  schema: PropsSchema;
  config?: Partial<ConfigInterface>;
}

interface AsyncAPIState {
  asyncapi?: AsyncAPIDocument;
  error?: ErrorObject;
}

class AsyncApiComponent extends Component<AsyncApiProps, AsyncAPIState> {
  state: AsyncAPIState = {
    asyncapi: undefined,
    error: undefined,
  };

  constructor(props: AsyncApiProps) {
    super(props);

    const { schema } = props;
    if (
      schema &&
      schema.constructor &&
      schema.constructor.name === 'AsyncAPIDocument'
    ) {
      this.state = { asyncapi: schema };
    }
    if (
      schema &&
      typeof schema === 'object' &&
      schema['x-parser-parsed'] === true
    ) {
      this.state = { asyncapi: new AsyncAPIDocumentClass(schema) };
    }
  }

  async componentDidMount() {
    if (!this.state.asyncapi) {
      this.updateState(this.props.schema);
    }
  }

  async componentDidUpdate(prevProps: AsyncApiProps) {
    const oldSchema = prevProps.schema;
    const newSchema = this.props.schema;

    if (oldSchema !== newSchema) {
      this.updateState(newSchema);
    }
  }

  render() {
    const { config } = this.props;
    const { asyncapi, error } = this.state;
    const concatenatedConfig: ConfigInterface = {
      ...defaultConfig,
      ...config,
      show: {
        ...defaultConfig.show,
        ...(!!config && config.show),
      },
      expand: {
        ...defaultConfig.expand,
        ...(!!config && config.expand),
      },
    };

    if (asyncapi === undefined) {
      if (!error) {
        return null;
      }
      return concatenatedConfig.showErrors && <ErrorComponent error={error} />;
    }

    if (!concatenatedConfig.show) {
      return null;
    }

    bemClasses.setSchemaID(concatenatedConfig.schemaID);
    const numberOfElement = stateHelpers.calculateNumberOfElements({
      spec: asyncapi.json(),
      showConfig: concatenatedConfig.show,
    });
    const initialExpandedElements = stateHelpers.calculateInitialExpandedElements(
      {
        spec: asyncapi.json(),
        showConfig: concatenatedConfig.show,
        expandConfig: concatenatedConfig.expand || {},
      },
    );

    return (
      <useSpec.Provider spec={asyncapi}>
        <useExpandedContext.Provider
          numberOfElements={numberOfElement}
          numberOfExpandedElement={initialExpandedElements}
        >
          <useChangeHashContext.Provider schemaName={bemClasses.getSchemaID()}>
            <main className={CSS_PREFIX} id={bemClasses.getSchemaID()}>
              {concatenatedConfig.showErrors && !!error && (
                <ErrorComponent error={error} />
              )}
              {concatenatedConfig.show.sidebar && (
                <Sidebar config={concatenatedConfig.sidebar} />
              )}
              {concatenatedConfig.show.info && <Info />}
              {concatenatedConfig.show.servers && <Servers />}
              {concatenatedConfig.show.operations && <Operations />}
              {concatenatedConfig.show.messages && <Messages />}
            </main>
          </useChangeHashContext.Provider>
        </useExpandedContext.Provider>
      </useSpec.Provider>
    );
  }

  private updateState(schema: PropsSchema) {
    if (
      schema &&
      schema.constructor &&
      schema.constructor.name === 'AsyncAPIDocument'
    ) {
      this.setState({ asyncapi: schema });
      return;
    }
    if (
      schema &&
      typeof schema === 'object' &&
      schema['x-parser-parsed'] === true
    ) {
      this.state = { asyncapi: new AsyncAPIDocumentClass(schema) };
    }
  }
}

export default AsyncApiComponent;
