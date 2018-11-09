import React, { Component } from 'react';

import AsyncApi from '../AsyncApi/AsyncApi';

import { mock } from './mock';

class Playground extends Component {
  render() {
    return (
      <AsyncApi asyncApi={mock} />
    )
  }
}

export default Playground;
