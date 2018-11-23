import React, { Component } from 'react';
import AsyncApi, { ThemeInterface, ConfigInterface } from 'asyncapi-react';

import { Navigation, CodeEditor, FetchSchema, Tabs, Tab, PlaygroundWrapper, ContentWrapper, CodeEditorsWrapper, AsyncApiWrapper } from './components';

import { yamlMock3, mock, defaultTheme, defaultConfig, parse, stringify, jsonMock } from './common';

interface State {
  schema: string,
  theme: string,
  config: string,
}

class Playground extends Component<{}, State> {
  state = {
    schema: mock,
    theme: stringify<ThemeInterface>(defaultTheme),
    config: defaultConfig,
  }

  private updateSchema = (schema: string) => {
    this.setState({ schema });
  }

  private updateTheme = (theme: string) => {
    this.setState({ theme });
  }

  private updateConfig = (config: string) => {
    this.setState({ config });
  }

  render() {
    const { schema, theme, config } = this.state;

    const parsedTheme = parse<ThemeInterface>(theme);
    console.log(config)
    const parsedConfig = parse<ConfigInterface>(config);

    return (
      <PlaygroundWrapper>
        {/* <Navigation>
        </Navigation> */}
        <ContentWrapper>
          <CodeEditorsWrapper>
            <Tabs>
              <Tab title="Schema" key="Schema">
                <>
                  <FetchSchema link="" />
                  <CodeEditor key="Schema" code={schema} parentCallback={this.updateSchema} mode="text/yaml" />
                </>
              </Tab>
              <Tab title="Theme" key="Theme">
                <CodeEditor key="Theme" code={theme} parentCallback={this.updateTheme} />
              </Tab>
              <Tab title="Configuration" key="Configuration">
                <CodeEditor key="Configuration" code={config} parentCallback={this.updateConfig} />
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
