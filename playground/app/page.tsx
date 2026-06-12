'use client';
import '@asyncapi/react-component/styles/default.min.css';
import React, { Component } from 'react';
import AsyncApi, {
  AsyncApiPlugin,
  ConfigInterface,
  PLUGIN_EVENT_ERROR,
  PluginAPI,
  PluginErrorPayload,
} from '@asyncapi/react-component';
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
import { defaultConfig, parse, debounce } from '@/utils';
import * as specs from '@/specs';

const defaultSchema = specs.streetlights;

const ASYNC_INSTALL_DELAY_MS = 1500;

const playgroundTestPlugin: AsyncApiPlugin = {
  name: 'playground-test-plugin',
  version: '0.0.1',
  description: 'Sample plugin to verify the plugin system in the playground',
  install(api: PluginAPI) {
    throw new Error('playground-test-plugin: sync install failed');
  },
};

const asyncPlaygroundTestPlugin: AsyncApiPlugin = {
  name: 'async-playground-test-plugin',
  version: '0.0.1',
  description:
    'Async install plugin to verify delayed registration in the playground',
  async install(api: PluginAPI) {
    console.log(
      `[async-playground-test-plugin] install started (waiting ${ASYNC_INSTALL_DELAY_MS}ms)`,
    );

    await new Promise<void>((resolve) => {
      setTimeout(resolve, ASYNC_INSTALL_DELAY_MS);
    });

    throw new Error('async-playground-test-plugin: async install failed');
  },
};

interface State {
  schema: string;
  config: string;
  schemaFromExternalResource: string;
  refreshing: boolean;
}

class Playground extends Component<unknown, State> {
  updateSchemaFn: (value: string) => void;
  updateConfigFn: (value: string) => void;

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

  render() {
    const { schema, config, schemaFromExternalResource } = this.state;
    const parsedConfig = parse<ConfigInterface>(config || defaultConfig);

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
              plugins={[playgroundTestPlugin, asyncPlaygroundTestPlugin]}
              onPluginEvent={this.handlePluginEvent}
            />
          </AsyncApiWrapper>
        </SplitWrapper>
      </PlaygroundWrapper>
    );
  }

  private handlePluginEvent = (eventName: string, data: unknown): void => {
    if (eventName === PLUGIN_EVENT_ERROR) {
      const error = data as PluginErrorPayload;
      console.error('[playground] plugin:error', error);
      return;
    }

    console.log('[playground] plugin event', eventName, data);
  };

  private updateSchema = (schema: string) => {
    this.setState({ schema });
  };

  private updateSchemaFromExternalResource = (schema: string) => {
    this.setState({ schemaFromExternalResource: schema });
  };

  private updateConfig = (config: string) => {
    this.setState({ config });
  };

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
