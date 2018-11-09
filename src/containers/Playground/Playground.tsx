import React, { Component } from 'react';

import AsyncApi from '../AsyncApi/AsyncApi';

import { jsonMock, yamlMock } from './mock';

class Playground extends Component {
  render() {
    return (
      <AsyncApi schema={yamlMock} />
    )
  }
}

export default Playground;
