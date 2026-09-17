'use client';
import '@asyncapi/react-component/styles/default.min.css';
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
  CodeEditorsWrapper,
  AsyncApiWrapper,
  SplitWrapper,
} from '@/components';
import { createWsPlugin } from 'asyncapi-ws-plugin';
import {
  defaultConfig,
  parse,
  debounce,
  getWebSocketServerFingerprint,
} from '@/utils';
import * as specs from '@/specs';

const defaultSchema = specs.streetlights;

interface State {
  schema: string;
  config: string;
  schemaFromExternalResource: string;
  refreshing: boolean;
}

class Playground extends Component<unknown, State> {
  updateSchemaFn: (value: string) => void;
  updateConfigFn: (value: string) => void;
  private websocketServerFingerprint?: string;
  private websocketPlugins?: ReturnType<typeof createWsPlugin>[];

  state = {
    schema: defaultSchema,
    config: defaultConfig,
    schemaFromExternalResource: '',
    refreshing: false,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super(props);
    this.updateSchemaFn = debounce(
      this.updateSchema,
      750,
      this.startRefreshing,
      this.stopRefreshing,
    );
    this.updateConfigFn = debounce(
      this.updateConfig,
      750,
      this.startRefreshing,
      this.stopRefreshing,
    );
  }

  componentDidMount() {
    // `?spec=websocket` seeds the editor with a WebSocket API, so the plugin has a real server
    // to attach to. Read here rather than at module scope: this page is prerendered at build time.
    const requested = new URLSearchParams(window.location.search).get('spec');
    if (requested === 'websocket') {
      this.setState({ schema: specs.websocketGemini });
    }
  }

  render() {
    const { schema, config, schemaFromExternalResource } = this.state;
    const parsedConfig = parse<ConfigInterface>(config || defaultConfig);
    const websocketPlugins = this.getWebSocketPlugins(schema);

    return (
      <PlaygroundWrapper>
        <Navigation />
        <SplitWrapper>
          <CodeEditorsWrapper>
            <Tabs
              additionalHeaderContent={
                <RefreshIcon $show={this.state.refreshing}>
                  {'\uE00A'}
                </RefreshIcon>
              }
            >
              <Tab title="Schema" key="Schema">
                <>
                  <FetchSchema
                    parentCallback={this.updateSchemaFromExternalResource}
                  />
                  <CodeEditorComponent
                    key="Schema"
                    code={schema}
                    externalResource={schemaFromExternalResource}
                    parentCallback={this.updateSchemaFn}
                  />
                </>
              </Tab>
              <Tab title="Configuration" key="Configuration">
                <CodeEditorComponent
                  key="Configuration"
                  code={config}
                  parentCallback={this.updateConfigFn}
                />
              </Tab>
            </Tabs>
          </CodeEditorsWrapper>
          <AsyncApiWrapper>
            <AsyncApi
              schema={schema}
              config={parsedConfig}
              plugins={websocketPlugins}
              // Without this, a plugin that fails to install does so silently.
              onPluginEvent={(eventName, data) =>
                // eslint-disable-next-line no-console
                console.info('[plugin]', eventName, data)
              }
            />
          </AsyncApiWrapper>
        </SplitWrapper>
      </PlaygroundWrapper>
    );
  }

  private updateSchema = (schema: string) => {
    this.setState({ schema });
  };

  private updateSchemaFromExternalResource = (schema: string) => {
    this.setState({ schemaFromExternalResource: schema });
  };

  private updateConfig = (config: string) => {
    this.setState({ config });
  };

  private getWebSocketPlugins(schema: string) {
    const fingerprint = getWebSocketServerFingerprint(schema);
    if (!fingerprint) {
      this.websocketServerFingerprint = undefined;
      this.websocketPlugins = undefined;
      return undefined;
    }

    if (fingerprint !== this.websocketServerFingerprint) {
      this.websocketServerFingerprint = fingerprint;
      this.websocketPlugins = [createWsPlugin()];
    }

    return this.websocketPlugins;
  }

  private startRefreshing = (): void => {
    setTimeout(() => {
      this.setState({ refreshing: true });
    }, 500);
  };

  private stopRefreshing = (): void => {
    this.setState({ refreshing: false });
  };
}

export default Playground;
