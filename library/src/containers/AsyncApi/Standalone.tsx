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
  /** `destroy()` is terminal, so a remount has to build a new manager rather than reuse it. */
  private pluginManagerDestroyed = false;
  /** Teardown from earlier manager generations that must finish before activating a replacement. */
  private pluginManagerTeardown?: Promise<void>;
  /** Invalidates deferred mount work when StrictMode unmounts and remounts this instance. */
  private mountGeneration = 0;

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
    const mountGeneration = ++this.mountGeneration;

    // React StrictMode can remount this component instance in development, so the manager
    // destroyed during its simulated unmount must be replaced before registering again.
    let pm = this.state.pm;
    if (!pm || this.pluginManagerDestroyed) {
      pm = new PluginManager({});
      this.pluginManagerDestroyed = false;
      this.registeredPlugins.clear();
      this.propsPlugins.clear();
      this.setState({ pm });
    }

    if (!this.state.asyncapi) {
      this.updateState(this.props.schema, pm);
    } else {
      pm.updateContext({ schema: this.state.asyncapi });
    }

    const activatePluginManager = () => {
      if (!this.hasMounted || mountGeneration !== this.mountGeneration) return;

      this.props.onPluginManagerReady?.(pm);
      // setState above may not have applied yet, so pass the manager these need explicitly.
      this.setupEventListeners(pm);
      void this.registerPlugins(pm);
    };

    if (this.pluginManagerTeardown) {
      void this.pluginManagerTeardown.then(activatePluginManager);
    } else {
      activatePluginManager();
    }
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
    this.mountGeneration += 1;
    this.cleanupEventListeners();
    // Let plugins release what they hold (open connections, timers) instead of orphaning it.
    // Flag it first: destroy() is terminal, so a remount must start from a new manager.
    this.pluginManagerDestroyed = true;
    const teardown = this.state.pm?.destroy() ?? Promise.resolve();
    const previousTeardown = this.pluginManagerTeardown;
    this.pluginManagerTeardown = previousTeardown
      ? Promise.all([previousTeardown, teardown]).then(() => undefined)
      : teardown;
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

  private setupEventListeners(pm: PluginManager | undefined = this.state.pm) {
    const { onPluginEvent } = this.props;

    if (!onPluginEvent) return;

    PLUGINEVENTS.forEach((event) => {
      pm?.on(event, this.getOrCreateHandler(event));
    });
  }

  private cleanupEventListeners(pm: PluginManager | undefined = this.state.pm) {
    PLUGINEVENTS.forEach((event) => {
      pm?.off(event, this.getOrCreateHandler(event));
    });
  }

  private async registerPlugins(pm: PluginManager | undefined = this.state.pm) {
    const { plugins } = this.props;

    for (const plugin of plugins ?? []) {
      const registered = await pm?.register(plugin);
      const stillRequested = (this.props.plugins ?? []).some(
        (candidate) => candidate.name === plugin.name,
      );
      if (registered && stillRequested && this.hasMounted) {
        this.registeredPlugins.add(plugin.name);
        this.propsPlugins.add(plugin.name);
      } else if (registered) {
        await pm?.unregister(plugin.name);
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

    const pluginsToRemove = Array.from(prevPluginMap.keys()).filter(
      (name) => !newPluginMap.has(name) && this.propsPlugins.has(name),
    );
    for (const name of pluginsToRemove) {
      try {
        await pm?.unregister(name);
        this.registeredPlugins.delete(name);
        this.propsPlugins.delete(name);
      } catch (error) {
        console.error(`Failed to unregister plugin ${name}:`, error);
      }
    }

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
      } else if (registered) {
        await pm?.unregister(name);
      }
    }

    // Same as registerPlugins: pm was mutated in place, not via setState.
    if (this.hasMounted) {
      this.setState({});
    }
  }

  private updateState(
    schema: PropsSchema,
    pm: PluginManager | undefined = this.state.pm,
  ) {
    const parsedSpec = SpecificationHelpers.retrieveParsedSpec(schema);
    if (!parsedSpec) {
      this.setState({ asyncapi: undefined });
      return;
    }
    this.setState({ asyncapi: parsedSpec });
    pm?.updateContext({ schema: parsedSpec });
  }
}

export default AsyncApiComponent;
