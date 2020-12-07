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
  timeout: number | undefined;
}

class Playground extends Component<{}, State> {
  refreshFn: Function;

  state = {
    schema: defaultSchema,
    config: defaultConfig,
    schemaFromEditor: defaultSchema,
    schemaFromExternalResource: '',
    configFromEditor: defaultConfig,
    timeout: undefined,
  };

  constructor(props: any) {
    super(props);
    this.refreshFn = debounce(this.refreshState, this, 1000);
  }

  componentDidUpdate() {
    this.refreshFn();
  }

  render() {
    const {
      schema,
      config = defaultConfig,
      schemaFromEditor,
      schemaFromExternalResource,
      configFromEditor,
    } = this.state;

    const parsedConfig = config
      ? parse<ConfigInterface>(config)
      : parse<ConfigInterface>(defaultConfig);

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
                    parentCallback={this.updateSchema}
                    mode="text/yaml"
                  />
                </>
              </Tab>
              <Tab title="Configuration" key="Configuration">
                <CodeEditorComponent
                  key="Configuration"
                  code={configFromEditor}
                  parentCallback={this.updateConfig}
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
    this.setState({ schemaFromEditor: schema });
  };

  private updateSchemaFromExternalResource = (schema: string) => {
    this.setState({ schemaFromExternalResource: schema });
  };

  private updateConfig = (config: string) => {
    this.setState({ configFromEditor: config });
  };

  private refreshState = () => {
    const { schemaFromEditor, configFromEditor } = this.state;
    this.setState({
      schema: schemaFromEditor,
      config: configFromEditor,
    });
  };

  private renderAdditionalHeaderContent = () => (
    <RefreshIcon onClick={this.refreshState}>{'\uE00A'}</RefreshIcon>
  );
}

export default Playground;
