import React, { Component } from 'react';

import AsyncApi from '../AsyncApi/AsyncApi';
import CodeMirror from './CodeMirror';

import { jsonMock, yamlMock, yamlMock2, yamlMock3, yamlMock4 } from './mock';

import { PlaygroundWrapper, CodeMirrorWrapper, AsyncApiWrapper } from './styled';

interface PlaygroundState {
  schema: string,
}

class Playground extends Component<{}, PlaygroundState> {
  constructor(props: any) {
    super(props);
    this.state = {
      schema: yamlMock4 //JSON.stringify(jsonMock)
    }
  }

  private getNewSchema = (schema: string) => {
    this.setState({ schema });
  }

  public render() {
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
