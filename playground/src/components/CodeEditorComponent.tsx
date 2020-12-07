import React, { Component } from 'react';
import * as codemirror from 'codemirror';
import { UnControlled as CodeMirror } from 'react-codemirror2';

import { CodeEditorWrapper } from './styled';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/javascript/javascript';

interface Props {
  code: string;
  externalResource?: string;
  mode?: string;
  parentCallback(value: string): void;
}

interface State {
  code: string;
}

class CodeEditorComponent extends Component<Props, State> {
  state = {
    code: this.props.code,
  };

  componentDidUpdate(nextProps: Props) {
    const { externalResource } = this.props;
    if (nextProps.externalResource !== externalResource) {
      this.setState({ code: externalResource! });
    }
  }

  render() {
    const {
      props: { mode = 'application/json' },
      state: { code },
    } = this;

    return (
      <CodeEditorWrapper>
        <CodeMirror
          value={code}
          options={{
            mode,
            lineNumbers: true,
            lineWrapping: true,
            theme: 'material',
            tabSize: 2,
            indentWithTabs: false,
          }}
          onChange={this.onChangeValue}
        />
      </CodeEditorWrapper>
    );
  }

  private onChangeValue = (
    editor: codemirror.Editor,
    data: codemirror.EditorChange,
    value: string,
  ): void => {
    this.props.parentCallback(value);
  };
}

export default CodeEditorComponent;
