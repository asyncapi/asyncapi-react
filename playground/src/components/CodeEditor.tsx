import React, { Component } from 'react';
import { UnControlled as CodeMirror, IInstance as CodeMirrorInstance } from 'react-codemirror2'

import { CodeEditorWrapper } from './styled';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/javascript/javascript';


interface Props {
  code: string,
  mode?: string,
  parentCallback(value: string): void;
}

interface State {
  code: string,
}  

class CodeEditorComponent extends Component<Props, State> {
  state = {
    code: this.props.code
  }

  private onChangeValue = (editor: CodeMirrorInstance, data: any, value: string) => {
    this.props.parentCallback(value);
  }

  render() {
    const { props: { mode = "application/json" }, state: { code } } = this;

    return (
      <CodeEditorWrapper>
        <CodeMirror
            value={code}
            options={{
              mode: mode,
              lineNumbers: true,
              lineWrapping: true,
              theme: 'material',
              tabSize: 2,
              indentWithTabs: false,
            }}
            onChange={this.onChangeValue}
        />
      </CodeEditorWrapper>
    )
  }
}

export default CodeEditorComponent;
