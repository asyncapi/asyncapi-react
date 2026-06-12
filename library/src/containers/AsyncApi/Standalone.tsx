import React, { Component } from 'react';
import { AsyncAPIDocumentInterface } from '@asyncapi/parser';

import { SpecificationHelpers } from '../../helpers';
import {
  AsyncApiPlugin,
  ErrorObject,
  EventListener,
  PropsSchema,
} from '../../types';
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
  /** Stable handler refs so `off()` removes the same listeners registered by `on()`. */
  private readonly pluginEventHandlers = new Map<string, EventListener>();
  private hasMounted = false;

  state: AsyncAPIState = {
    asyncapi: undefined,
    error: undefined,
    pm: new PluginManager({}),
  };

  constructor(props: AsyncApiProps) {
    super(props);

    const parsedSpec = SpecificationHelpers.retrieveParsedSpec(props.schema);
    if (parsedSpec) {
      this.state = { ...this.state, asyncapi: parsedSpec };
    }
  }

  componentDidMount() {
    this.hasMounted = true;

    if (!this.state.asyncapi) {
      this.updateState(this.props.schema);
    } else {
      this.state.pm?.updateContext({ schema: this.state.asyncapi });
    }

    if (this.props.onPluginManagerReady) {
      this.props.onPluginManagerReady(this.state.pm!);
    }
    this.setupEventListeners();
    void this.registerPlugins();
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
      void this.updatePlugins(prevProps.plugins, plugins);
    }
  }

  componentWillUnmount() {
    this.hasMounted = false;
    this.cleanupEventListeners();
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

  private getOrCreateHandler(eventName: string): EventListener {
    if (!this.pluginEventHandlers.has(eventName)) {
      this.pluginEventHandlers.set(eventName, (data: unknown) => {
        this.props.onPluginEvent?.(eventName, data);
      });
    }
    return this.pluginEventHandlers.get(eventName)!;
  }

  private setupEventListeners() {
    const { onPluginEvent } = this.props;
    const { pm } = this.state;

    if (!onPluginEvent) return;

    PLUGINEVENTS.forEach((event) => {
      pm?.on(event, this.getOrCreateHandler(event));
    });
  }

  private cleanupEventListeners() {
    const { pm } = this.state;
    PLUGINEVENTS.forEach((event) => {
      pm?.off(event, this.getOrCreateHandler(event));
    });
  }

  private async registerPlugins() {
    const { plugins } = this.props;
    const { pm } = this.state;

    for (const plugin of plugins ?? []) {
      const registered = await pm?.register(plugin);
      if (registered) {
        this.registeredPlugins.add(plugin.name);
        this.propsPlugins.add(plugin.name);
      }
    }

    // register() mutates PluginManager in place; re-render so slot components pick up new entries.
    if (this.hasMounted) {
      this.setState({});
    }
  }

  private async updatePlugins(
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

    const pluginsToAdd = Array.from(newPluginMap.entries()).filter(
      ([name]) => !prevPluginMap.has(name),
    );

    for (const [name, plugin] of pluginsToAdd) {
      const registered = await pm?.register(plugin);
      const stillRequested = (this.props.plugins ?? []).some(
        (p) => p.name === name,
      );
      if (registered && stillRequested) {
        this.registeredPlugins.add(name);
        this.propsPlugins.add(name);
      }
    }

    // Same as registerPlugins: pm was mutated in place, not via setState.
    if (this.hasMounted) {
      this.setState({});
    }
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
