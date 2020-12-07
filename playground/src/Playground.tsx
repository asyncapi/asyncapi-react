import React, { Component } from 'react';
import AsyncApi, { ConfigInterface } from '@asyncapi/react-component';

import {
  Navigation,
  CodeEditorComponent,
  FetchSchema,
  RefreshIcon,
  Tabs,
  Tab,
  PlaygroundWrapper,
  ContentWrapper,
  CodeEditorsWrapper,
  AsyncApiWrapper,
} from './components';

import { defaultConfig, parse, debounce } from './common';
import * as specs from './specs';

const defaultSchema = specs.streetlights;

interface State {
  schema: string;
  config: string;
  schemaFromEditor: string;
  schemaFromExternalResource: string;
  configFromEditor: string;
  refreshing: boolean;
}

class Playground extends Component<{}, State> {
  updateSchemaFn: (value: string) => void;
  updateConfigFn: (value: string) => void;

  state = {
    schema: defaultSchema,
    config: defaultConfig,
    schemaFromEditor: defaultSchema,
    schemaFromExternalResource: '',
    configFromEditor: defaultConfig,
    refreshing: false,
  };

  constructor(props: any) {
    super(props);
    this.updateSchemaFn = debounce(
      this.updateSchema,
      500,
      this.startRefreshing,
      this.stopRefreshing,
    );
    this.updateConfigFn = debounce(
      this.updateConfig,
      500,
      this.startRefreshing,
      this.stopRefreshing,
    );
  }

  render() {
    const {
      schema,
      config,
      schemaFromEditor,
      schemaFromExternalResource,
      configFromEditor,
    } = this.state;
    const parsedConfig = parse<ConfigInterface>(config || defaultConfig);

    return (
      <PlaygroundWrapper>
        <Navigation />
        <ContentWrapper>
          <CodeEditorsWrapper>
            <Tabs
              additionalHeaderContent={this.renderAdditionalHeaderContent()}
            >
              <Tab title="Schema" key="Schema">
                <>
                  <FetchSchema
                    parentCallback={this.updateSchemaFromExternalResource}
                  />
                  <CodeEditorComponent
                    key="Schema"
                    code={schemaFromEditor}
                    externalResource={schemaFromExternalResource}
                    parentCallback={this.updateSchemaFn}
                    mode="text/yaml"
                  />
                </>
              </Tab>
              <Tab title="Configuration" key="Configuration">
                <CodeEditorComponent
                  key="Configuration"
                  code={configFromEditor}
                  parentCallback={this.updateConfigFn}
                />
              </Tab>
            </Tabs>
          </CodeEditorsWrapper>
          <AsyncApiWrapper>
            <AsyncApi schema={schema} config={parsedConfig} />
          </AsyncApiWrapper>
        </ContentWrapper>
      </PlaygroundWrapper>
    );
  }

  private updateSchema = (schema: string) => {
    this.setState({ schema: schema });
  };

  private updateSchemaFromExternalResource = (schema: string) => {
    this.setState({ schemaFromExternalResource: schema });
  };

  private updateConfig = (config: string) => {
    this.setState({ config: config });
  };

  private startRefreshing = (): void => {
    this.setState({ refreshing: true });
  };

  private stopRefreshing = (): void => {
    this.setState({ refreshing: false });
  };

  private renderAdditionalHeaderContent = () => (
    <RefreshIcon show={this.state.refreshing}>{'\uE00A'}</RefreshIcon>
  );
}

export default Playground;
