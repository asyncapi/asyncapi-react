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
  PlaygroundSkeleton, // Add this import
} from '@/components';
import { defaultConfig, parse, debounce } from '@/utils';
import * as specs from '@/specs';

const defaultSchema = specs.streetlights;

interface State {
  schema: string;
  config: string;
  schemaFromExternalResource: string;
  refreshing: boolean;
  isLoading: boolean;
  stylesLoaded: boolean;
}

class Playground extends Component<unknown, State> {
  updateSchemaFn: (value: string) => void;
  updateConfigFn: (value: string) => void;
  private loadingTimer?: NodeJS.Timeout;
  private styleCheckInterval?: NodeJS.Timeout;
  private maxTimer?: NodeJS.Timeout;

  state = {
    schema: defaultSchema,
    config: defaultConfig,
    schemaFromExternalResource: '',
    refreshing: false,
    isLoading: true,
    stylesLoaded: false,
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
    this.initializeLoader();
  }

  componentWillUnmount() {
    this.cleanupTimers();
  }

  private cleanupTimers = () => {
    if (this.loadingTimer) clearTimeout(this.loadingTimer);
    if (this.styleCheckInterval) clearInterval(this.styleCheckInterval);
    if (this.maxTimer) clearTimeout(this.maxTimer);
  };

  private initializeLoader = () => {
    const checkStylesLoaded = () => {
      const asyncApiStyles = document.querySelector('link[href*="default.min.css"]');
      const computedStyle = window.getComputedStyle(document.body);
      
      if (asyncApiStyles && computedStyle && !this.state.stylesLoaded) {
        this.setState({ stylesLoaded: true });
      }
    };

    // Initial check
    checkStylesLoaded();

    // Set minimum loading time (600ms)
    this.loadingTimer = setTimeout(() => {
      if (this.state.stylesLoaded) {
        this.setState({ isLoading: false });
      }
    }, 600);

    // Check for styles periodically
    this.styleCheckInterval = setInterval(checkStylesLoaded, 100);

    // Fallback - hide loader after 2 seconds max
    this.maxTimer = setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
  };

  componentDidUpdate(prevProps: unknown, prevState: State) {
    if (prevState.stylesLoaded !== this.state.stylesLoaded && this.state.stylesLoaded) {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 100);
    }
  }

  render() {
    const { schema, config, schemaFromExternalResource, isLoading } = this.state;
    
    if (isLoading) {
      return <PlaygroundSkeleton />;
    }

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
            <AsyncApi schema={schema} config={parsedConfig} />
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