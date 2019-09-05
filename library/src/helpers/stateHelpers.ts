import { ShowConfig, CollapseConfig, CollapseNestedConfig } from '../config';
import { AsyncAPI } from '../types';

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
            numberOfElements += Object.keys(value).length;
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
    collapseConfig,
  }: {
    spec: AsyncAPI;
    showConfig: ShowConfig;
    collapseConfig: CollapseConfig;
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
            collapseConfig[key],
        );

        if (condition) {
          const field: CollapseNestedConfig = collapseConfig[key];
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
            numberOfElements += Object.keys(value).length;
          }
        }
      });

      return numberOfElements;
    };

    return fn(spec) + fn(spec.components || {});
  };
}

export const stateHelpers = new StateHelpers();
