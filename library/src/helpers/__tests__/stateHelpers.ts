import { stateHelpers } from '../stateHelpers';
import { ShowConfig, CollapseConfig } from '../../config';
import { AsyncAPI } from '../../types';

describe('stateHelpers', () => {
  const spec: AsyncAPI = {
    asyncapi: '',
    info: {
      title: '',
      version: '',
    },
    channels: {
      a: {},
      b: {},
      c: {},
      d: {},
    },
    servers: {
      production: {
        url: '',
        protocol: '',
      },
      stage: {
        url: '',
        protocol: '',
      },
    },
    components: {
      messages: {
        a: {},
        b: {},
        c: {},
      },
      schemas: {
        a: {},
        b: {},
        c: {},
      },
    },
  };
  const showConfig: ShowConfig = {
    info: true,
    channels: true,
    servers: true,
    messages: true,
    schemas: true,
  };
  const collapseConfig: CollapseConfig = {
    channels: {
      root: true,
      elements: false,
    },
    servers: {
      root: true,
      elements: true,
    },
    messages: {
      root: false,
      elements: false,
    },
    schemas: {
      root: false,
      elements: false,
    },
  };

  test('should return correctly number of elements', () => {
    const result = stateHelpers.calculateNumberOfElements({
      spec,
      showConfig,
    });

    expect(result).toEqual(16);
  });

  test('should return correctly number of initial expanded elements', () => {
    const result = stateHelpers.calculateInitialExpandedElements({
      spec,
      showConfig,
      collapseConfig,
    });

    expect(result).toEqual(4);
  });
});
