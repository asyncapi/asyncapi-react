import React, { Component } from 'react';

import { CodeWrapper, CodeHeader, CodeHeaderH4, CodeBody } from './styled';

interface Props {
  title?: any;
  code: string;
}

export class CodeComponent extends Component<Props> {
  render() {
    const { title, code } = this.props;

    return (
      <CodeWrapper>
        {title && (
          <CodeHeader>
            <CodeHeaderH4>{title}</CodeHeaderH4>
          </CodeHeader>
        )}
        <CodeBody language="javascript">{code}</CodeBody>
      </CodeWrapper>
    );
  }
}
