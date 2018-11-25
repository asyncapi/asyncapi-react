import React, { Component } from 'react';
import AsyncApi, { ThemeInterface, ConfigInterface } from 'asyncapi-react';

import { Navigation, CodeEditor, FetchSchema, RefreshIcon, Tabs, Tab, PlaygroundWrapper, ContentWrapper, CodeEditorsWrapper, AsyncApiWrapper } from './components';

import { mock, defaultTheme, defaultConfig, parse, stringify } from './common';

interface State {
  schema: string,
  theme: string,
  config: string,
  schemaFromEditor: string;
  themeFromEditor: string;
  configFromEditor: string;
}

class Playground extends Component<{}, State> {
  state = {
    schema: mock,
    theme: stringify<ThemeInterface>(defaultTheme),
    config: defaultConfig,
    schemaFromEditor: mock,
    themeFromEditor: stringify<ThemeInterface>(defaultTheme),
    configFromEditor: defaultConfig
  }

  private updateSchema = (schema: string) => {
    this.setState({ schemaFromEditor: schema });
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
    const { schema, theme, config, schemaFromEditor, themeFromEditor, configFromEditor } = this.state;

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
                  <FetchSchema parentCallback={this.updateSchema} />
                  <CodeEditor key="Schema" code={schemaFromEditor} parentCallback={this.updateSchema} mode="text/yaml" />
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
