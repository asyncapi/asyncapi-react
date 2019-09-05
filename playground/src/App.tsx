import React, { Component } from 'react';
import AsyncApi, { ConfigInterface } from '@kyma-project/asyncapi-react';

import {
  Navigation,
  CodeEditor,
  FetchSchema,
  RefreshIcon,
  Tabs,
  Tab,
  PlaygroundWrapper,
  ContentWrapper,
  CodeEditorsWrapper,
  AsyncApiWrapper,
} from './components';

import { defaultSchema2, defaultConfig, parse } from './common';

interface State {
  schema: string;
  config: string;
  schemaFromEditor: string;
  schemaFromExternalResource: string;
  configFromEditor: string;
}

class Playground extends Component<{}, State> {
  state = {
    schema: defaultSchema2,
    config: defaultConfig,
    schemaFromEditor: defaultSchema2,
    schemaFromExternalResource: '',
    configFromEditor: defaultConfig,
  };

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
                  <CodeEditor
                    key="Schema"
                    code={schemaFromEditor}
                    externalResource={schemaFromExternalResource}
                    parentCallback={this.updateSchema}
                    mode="text/yaml"
                  />
                </>
              </Tab>
              <Tab title="Configuration" key="Configuration">
                <CodeEditor
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
