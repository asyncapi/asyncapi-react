import React, { Component } from 'react';
import { AsyncAPIDocumentInterface } from '@asyncapi/parser';

import { SpecificationHelpers } from '../../helpers';
import { AsyncApiPlugin, ErrorObject, PropsSchema } from '../../types';
import { ConfigInterface, defaultConfig } from '../../config';

import AsyncApiLayout from './Layout';
import { Error } from '../Error/Error';
import { PluginManager } from '../../helpers/pluginManager';
import { PLUGINEVENTS } from '../../constants';

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
  private readonly registeredPlugins = new Set<string>();
  private readonly propsPlugins = new Set<string>();

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
      this.updatePlugins(prevProps.plugins, plugins);
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

    PLUGINEVENTS.forEach((event) => {
      pm?.on(event, this.handler(event));
    });
  }

  private cleanupEventListeners() {
    const { pm } = this.state;
    PLUGINEVENTS.forEach((event) => {
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
        this.propsPlugins.add(plugin.name); // Track as props-managed
      } catch (error) {
        console.error(`Failed to register plugin ${plugin.name}:`, error);
        pm?.emit(PLUGINEVENTS[1], {
          pluginName: plugin.name,
        });
      }
    });
  }

  private updatePlugins(
    prevPlugins: AsyncApiPlugin[] | undefined,
    newPlugins: AsyncApiPlugin[] | undefined,
  ) {
    const { pm } = this.state;

    const prevPluginMap = new Map((prevPlugins ?? []).map((p) => [p.name, p]));
    const newPluginMap = new Map((newPlugins ?? []).map((p) => [p.name, p]));

    prevPluginMap.forEach((_plugin, name) => {
      if (!newPluginMap.has(name) && this.propsPlugins.has(name)) {
        try {
          pm?.unregister(name);
          this.registeredPlugins.delete(name);
          this.propsPlugins.delete(name);
        } catch (error) {
          console.error(`Failed to unregister plugin ${name}:`, error);
        }
      }
    });

    newPluginMap.forEach((plugin, name) => {
      if (!prevPluginMap.has(name)) {
        try {
          pm?.register(plugin);
          this.registeredPlugins.add(name);
          this.propsPlugins.add(name);
        } catch (error) {
          console.error(`Failed to register plugin ${name}:`, error);
          pm?.emit(PLUGINEVENTS[1], {
            pluginName: name,
          });
        }
      }
    });
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
