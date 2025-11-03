import React, { Component } from 'react';
import { AsyncAPIDocumentInterface } from '@asyncapi/parser';

import { SpecificationHelpers } from '../../helpers';
import { AsyncApiPlugin, ErrorObject, PropsSchema } from '../../types';
import { ConfigInterface, defaultConfig } from '../../config';

import AsyncApiLayout from './Layout';
import { Error } from '../Error/Error';
import { PluginManager } from '../../helpers/pluginManager';

export interface AsyncApiProps {
  schema: PropsSchema;
  config?: Partial<ConfigInterface>;
  plugins?: AsyncApiPlugin[];
  onPluginEvent?: (eventName: string, data: unknown) => void;
  onPluginManagerReady?: (pluginManager: PluginManager) => void;
  error?: ErrorObject;
}

interface AsyncAPIState {
  asyncapi?: AsyncAPIDocumentInterface;
  error?: ErrorObject;
  pm?: PluginManager;
}

class AsyncApiComponent extends Component<AsyncApiProps, AsyncAPIState> {
  private registeredPlugins = new Set<string>();
  state: AsyncAPIState = {
    asyncapi: undefined,
    error: undefined,
    pm: new PluginManager({
      schema: {},
    }),
  };

  constructor(props: AsyncApiProps) {
    super(props);

    const parsedSpec = SpecificationHelpers.retrieveParsedSpec(props.schema);
    if (parsedSpec) {
      this.state = { asyncapi: parsedSpec };
    }
  }

  componentDidMount() {
    if (!this.state.asyncapi) {
      this.updateState(this.props.schema);
    }
    if (this.props.onPluginManagerReady) {
      this.props.onPluginManagerReady(this.state.pm!);
    }

    this.setupEventListeners();

    this.registerPlugins();
  }

  componentDidUpdate(prevProps: AsyncApiProps) {
    const { schema, plugins, onPluginEvent } = this.props;
    const oldSchema = prevProps.schema;
    const newSchema = schema;

    if (oldSchema !== newSchema) {
      this.updateState(newSchema);
    }

    if (onPluginEvent !== prevProps.onPluginEvent) {
      this.cleanupEventListeners();
      this.setupEventListeners();
    }

    if (plugins !== prevProps.plugins) {
      this.unregisterPlugins();
      this.registerPlugins();
    }
  }

  render() {
    const { config, error: propError } = this.props;
    const { asyncapi, error: stateError, pm } = this.state;

    const error = propError ?? stateError;
    const concatenatedConfig: ConfigInterface = {
      ...defaultConfig,
      ...config,
      show: {
        ...defaultConfig.show,
        ...(!!config && config.show),
      },
      expand: {
        ...defaultConfig.expand,
        ...(!!config && config.expand),
      },
      sidebar: {
        ...defaultConfig.sidebar,
        ...(!!config && config.sidebar),
      },
      extensions: {
        ...defaultConfig.extensions,
        ...(!!config && config.extensions),
      },
    };

    if (!asyncapi) {
      if (!error) {
        return null;
      }
      return (
        concatenatedConfig.show?.errors && (
          <section className="aui-root">
            <Error error={error} />
          </section>
        )
      );
    }

    return (
      <AsyncApiLayout
        asyncapi={asyncapi}
        config={concatenatedConfig}
        pluginManager={pm}
      />
    );
  }

  private handler(eventName: string) {
    return (data: unknown) => {
      this.props.onPluginEvent!(eventName, data);
    };
  }
  private setupEventListeners() {
    const { onPluginEvent } = this.props;
    const { pm } = this.state;

    if (!onPluginEvent) return;

    // eslint-disable-next-line sonarjs/no-duplicate-string
    const events = ['plugin:ready', 'plugin:error', 'NOTIFICATION'];
    events.forEach((event) => {
      console.log('event appears here');
      console.log(event);
      pm?.on(event, this.handler(event));
    });
  }

  private cleanupEventListeners() {
    const { pm } = this.state;
    const events = ['plugin:ready', 'plugin:error'];
    events.forEach((event) => {
      pm?.off(event, this.handler(event));
    });
  }

  private registerPlugins() {
    const { plugins } = this.props;
    const { pm } = this.state;

    plugins?.forEach((plugin) => {
      try {
        pm?.register(plugin);
        this.registeredPlugins.add(plugin.name);
      } catch (error) {
        console.error(`Failed to register plugin ${plugin.name}:`, error);
        pm?.emit('plugin:error', {
          pluginName: plugin.name,
          // error: error instanceof Error ? error.message : String(error as any),
        });
      }
    });
  }

  private unregisterPlugins() {
    const { pm } = this.state;

    this.registeredPlugins.forEach((pluginName) => {
      try {
        pm?.unregister(pluginName);
      } catch (error) {
        console.error(`Failed to unregister plugin ${pluginName}:`, error);
      }
    });
    this.registeredPlugins.clear();
  }

  private updateState(schema: PropsSchema) {
    const parsedSpec = SpecificationHelpers.retrieveParsedSpec(schema);
    if (!parsedSpec) {
      this.setState({ asyncapi: undefined });
      return;
    }
    this.setState({ asyncapi: parsedSpec });
    this.state.pm?.updateContext({ schema: parsedSpec });
  }
}

export default AsyncApiComponent;
