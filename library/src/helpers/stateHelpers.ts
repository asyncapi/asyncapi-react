import { ShowConfig } from '../config';
import { AsyncAPI, Servers, Server } from '../types';

class StateHelpers {
  calculateNumberOfElements = ({
    spec,
    showConfig,
  }: {
    spec: AsyncAPI;
    showConfig: ShowConfig;
  }): number => {
    const showConfigKeys = Object.keys(showConfig);

    const fn = (obj: object): number => {
      let numberOfElements: number = 0;

      Object.entries(obj).map(([key, value]) => {
        const condition = Boolean(
          key !== 'info' && showConfigKeys.includes(key) && showConfig[key],
        );

        if (condition) {
          numberOfElements += 1;

          if (Array.isArray(value)) {
            numberOfElements += value.length;
          }
          if (typeof value === 'object') {
            if (this.isServers(value)) {
              numberOfElements += this.calculateServers(value);
            } else {
              numberOfElements += Object.keys(value).length;
            }
          }
        }
      });

      return numberOfElements;
    };

    return fn(spec) + fn(spec.components || {});
  };

  calculateInitialExpandedElements = ({
    spec,
    showConfig,
    expandConfig,
  }: {
    spec: AsyncAPI;
    showConfig: ShowConfig;
    expandConfig: any;
  }): number => {
    const showConfigKeys = Object.keys(showConfig);
    const collapseConfigKeys = Object.keys(showConfig);

    const fn = (obj: object): number => {
      let numberOfElements: number = 0;

      Object.entries(obj).map(([key, value]) => {
        const condition = Boolean(
          key !== 'info' &&
            showConfigKeys.includes(key) &&
            showConfig[key] &&
            collapseConfigKeys.includes(key) &&
            expandConfig[key],
        );

        if (condition) {
          const field: any = expandConfig[key];
          if (field.root) {
            numberOfElements += 1;
          }

          if (!field.elements) {
            return;
          }

          if (Array.isArray(value)) {
            numberOfElements += value.length;
          }
          if (typeof value === 'object') {
            if (this.isServers(value)) {
              numberOfElements += this.calculateServers(value);
            } else {
              numberOfElements += Object.keys(value).length;
            }
          }
        }
      });

      return numberOfElements;
    };

    return fn(spec) + fn(spec.components || {});
  };

  private calculateServers(servers?: Servers): number {
    if (!servers || !Object.keys(servers).length) {
      return 0;
    }

    let elements: number = 0;
    Object.entries(servers).map(([_, server]) => {
      elements += Number(
        Boolean(server.description && server.security && server.variables),
      );
    });
    return elements;
  }

  private isServers(v: any): v is Servers {
    if (!v || !Object.keys(v).length) {
      return false;
    }
    return !!(v[Object.keys(v)[0]] as Server).protocol;
  }
}

export const stateHelpers = new StateHelpers();
