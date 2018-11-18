import React, { Component } from 'react';

import AsyncApi from '../AsyncApi/AsyncApi';
import CodeMirror from './CodeMirror';

import { jsonMock, yamlMock, yamlMock2, yamlMock3, yamlMock4 } from './mock';

import { PlaygroundWrapper, CodeMirrorWrapper, AsyncApiWrapper } from './styled';

interface State {
  schema: string,
}

class Playground extends Component<{}, State> {
  state = {
    schema: yamlMock3 //JSON.stringify(jsonMock)
  }

  private getNewSchema = (schema: string) => {
    this.setState({ schema });
  }

  render() {
    const { schema } = this.state

    return (
      <PlaygroundWrapper>
        <CodeMirrorWrapper>
          <CodeMirror schema={schema} parentCallback={this.getNewSchema} />
        </CodeMirrorWrapper>
        <AsyncApiWrapper>
          <AsyncApi schema={schema} />
        </AsyncApiWrapper>
      </PlaygroundWrapper>
    )
  }
}

export default Playground;
