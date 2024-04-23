import React, { Component } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { yaml } from '@codemirror/lang-yaml';
import { material } from '@uiw/codemirror-theme-material';
import { CodeEditorWrapper } from './styled';

interface Props {
  code: string;
  externalResource?: string;
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
    if (externalResource && nextProps.externalResource !== externalResource) {
      this.setState({ code: externalResource });
    }
  }

  render() {
    const {
      state: { code },
    } = this;

    return (
      <CodeEditorWrapper>
        {/* @ts-expect-error remove when library and web-component is upgraded to React v18 */}
        <CodeMirror
          value={code}
          basicSetup={{
            lineNumbers: true,
            tabSize: 2,
          }}
          theme={material}
          extensions={[yaml()]}
          onChange={(value: string) => {
            this.props.parentCallback(value);
          }}
        />
      </CodeEditorWrapper>
    );
  }
}

export default CodeEditorComponent;
