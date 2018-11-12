import React, { Component } from 'react';
import { UnControlled as CodeMirror, IInstance } from 'react-codemirror2'

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

require('codemirror/mode/yaml/yaml');

interface CodeMirrorProps {
  schema: string,
  parentCallback(value: string): void;
}

interface CodeMirrorState {
  schema: string,
}  

class CodeMirrorComponent extends Component<CodeMirrorProps, CodeMirrorState> {
  constructor(props: CodeMirrorProps) {
    super(props);
    this.state = {
      schema: props.schema
    }
  }

  private onChangeValue = (editor: IInstance, data: any, value: string) => {
    this.props.parentCallback(value);
  }

  public render() {
    const { schema } = this.state;

    return (
      <CodeMirror
        value={schema}
        options={{
          mode: "text/yaml",
          lineNumbers: true,
          lineWrapping: true,
          theme: 'material',
          tabSize: 2,
          indentWithTabs: false,
        }}
        onChange={this.onChangeValue}
      />
    )
  }
}

export default CodeMirrorComponent;
