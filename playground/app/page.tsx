'use client';
import '@asyncapi/react-component/styles/default.min.css';
import React, { Component } from 'react';
import AsyncApi, {
  AsyncApiPlugin,
  ConfigInterface,
  PLUGIN_EVENT_ERROR,
  PluginAPI,
  PluginErrorPayload,
  PluginSlot,
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

const PlaygroundTestPluginInfo = () => (
  <div className="mt-4 rounded border-2 border-dashed border-orange-500 bg-orange-50 p-4 text-sm text-gray-800">
    <strong>Playground test plugin</strong> — INFO slot
  </div>
);

const PlaygroundTestPluginOperation = () => (
  <div className="mt-2 rounded bg-orange-100 px-2 py-1 text-xs text-orange-900">
    Playground test plugin — OPERATION slot
  </div>
);

const playgroundTestPlugin: AsyncApiPlugin = {
  name: 'playground-test-plugin',
  version: '0.0.1',
  description: 'Sample plugin to verify the plugin system in the playground',
  install(api: PluginAPI) {
    api.registerComponent(PluginSlot.INFO, PlaygroundTestPluginInfo);
    api.registerComponent(PluginSlot.OPERATION, PlaygroundTestPluginOperation);
    api.onSpecLoaded((spec) => {
      console.log('[playground-test-plugin] spec loaded', spec);
    });
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
              plugins={[playgroundTestPlugin]}
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
