import { ShowConfig, CollapseConfig, CollapseNestedConfig } from '../config';
import { AsyncAPI } from '../types';

class StateHelpers {
  constructor(
    private readonly spec: AsyncAPI,
    private readonly showConfig: ShowConfig,
    private readonly collapseConfig: CollapseConfig,
  ) {}

  calculateNumberOfElements = (): number => {
    const showConfigKeys = Object.keys(this.showConfig);

    const fn = (obj: object): number => {
      let numberOfElements: number = 0;

      Object.entries(obj).map(([key, value]) => {
        const condition = Boolean(
          key !== 'info' &&
            showConfigKeys.includes(key) &&
            this.showConfig[key],
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

    return fn(this.spec) + fn(this.spec.components || {});
  };

  calculateInitialExpandedElements = (): number => {
    const showConfigKeys = Object.keys(this.showConfig);
    const collapseConfigKeys = Object.keys(this.showConfig);

    const fn = (obj: object): number => {
      let numberOfElements: number = 0;

      Object.entries(obj).map(([key, value]) => {
        const condition = Boolean(
          key !== 'info' &&
            showConfigKeys.includes(key) &&
            this.showConfig[key] &&
            collapseConfigKeys.includes(key) &&
            this.collapseConfig[key],
        );

        if (condition) {
          const field: CollapseNestedConfig = this.collapseConfig[key];
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

    return fn(this.spec) + fn(this.spec.components || {});
  };
}
