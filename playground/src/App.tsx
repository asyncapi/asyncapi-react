import React, { Component } from 'react';
import AsyncApi, { ThemeInterface, ConfigInterface } from 'asyncapi-react';

import { Navigation, CodeEditor, FetchSchema, RefreshIcon, Tabs, Tab, PlaygroundWrapper, ContentWrapper, CodeEditorsWrapper, AsyncApiWrapper } from './components';

import { defaultSchema, defaultKymaTheme, defaultConfig, parse, stringify } from './common';

interface State {
  schema: string,
  theme: string,
  config: string,
  schemaFromEditor: string;
  schemaFromExternalResource: string;
  themeFromEditor: string;
  configFromEditor: string;
}

class Playground extends Component<{}, State> {
  state = {
    schema: defaultSchema,
    theme: stringify<ThemeInterface>(defaultKymaTheme),
    config: defaultConfig,
    schemaFromEditor: defaultSchema,
    schemaFromExternalResource: '',
    themeFromEditor: stringify<ThemeInterface>(defaultKymaTheme),
    configFromEditor: defaultConfig
  }

  private updateSchema = (schema: string) => {
    this.setState({ schemaFromEditor: schema });
  }

  private updateSchemaFromExternalResource = (schema: string) => {
    this.setState({ schemaFromExternalResource: schema });
  }

  private updateTheme = (theme: string) => {
    this.setState({ themeFromEditor: theme });
  }

  private updateConfig = (config: string) => {
    this.setState({ configFromEditor: config });
  }

  private refreshState = () => {
    const { schemaFromEditor, themeFromEditor, configFromEditor } = this.state;
    this.setState({
      schema: schemaFromEditor,
      theme: themeFromEditor,
      config: configFromEditor
    });
  }

  private renderAdditionalHeaderContent = () => {
    return (
      <RefreshIcon onClick={this.refreshState}>{"\uE00A"}</RefreshIcon>
    );
  }

  render() {
    const { schema, theme, config, schemaFromEditor, schemaFromExternalResource, themeFromEditor, configFromEditor } = this.state;

    const parsedTheme = parse<ThemeInterface>(theme);
    const parsedConfig = parse<ConfigInterface>(config);

    return (
      <PlaygroundWrapper>
        <Navigation />
        <ContentWrapper>
          <CodeEditorsWrapper>
            <Tabs additionalHeaderContent={this.renderAdditionalHeaderContent()}>
              <Tab title="Schema" key="Schema">
                <>
                  <FetchSchema parentCallback={this.updateSchemaFromExternalResource} />
                  <CodeEditor key="Schema" code={schemaFromEditor} externalResource={schemaFromExternalResource} parentCallback={this.updateSchema} mode="text/yaml" />
                </>
              </Tab>
              <Tab title="Theme" key="Theme">
                <CodeEditor key="Theme" code={themeFromEditor} parentCallback={this.updateTheme} />
              </Tab>
              <Tab title="Configuration" key="Configuration">
                <CodeEditor key="Configuration" code={configFromEditor} parentCallback={this.updateConfig} />
              </Tab>
            </Tabs>
          </CodeEditorsWrapper>
          <AsyncApiWrapper>
            <AsyncApi schema={schema} theme={parsedTheme} config={parsedConfig} />
          </AsyncApiWrapper>
        </ContentWrapper>
      </PlaygroundWrapper>
    )
  }
}

export default Playground;
