// import React, { Component } from 'react';
// import { UnControlled as CodeMirror, IInstance as CodeMirrorInstance } from 'react-codemirror2'

// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';

// require('codemirror/mode/yaml/yaml');

// interface Props {
//   schema: string,
//   parentCallback(value: string): void;
// }

// interface State {
//   schema: string,
// }  

// class CodeMirrorComponent extends Component<Props, State> {
//   state = {
//     schema: this.props.schema
//   }

//   private onChangeValue = (editor: CodeMirrorInstance, data: any, value: string) => {
//     this.props.parentCallback(value);
//   }

//   render() {
//     const { schema } = this.state;

//     return (
//       <CodeMirror
//         value={schema}
//         options={{
//           mode: "text/yaml",
//           lineNumbers: true,
//           lineWrapping: true,
//           theme: 'material',
//           tabSize: 2,
//           indentWithTabs: false,
//         }}
//         onChange={this.onChangeValue}
//       />
//     )
//   }
// }

// export default CodeMirrorComponent;
