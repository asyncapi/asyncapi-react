import React, { Component } from 'react';

import { CodeWrapper, CodeHeader, CodeHeaderH4, PreCode, CodeBody } from './styled';

interface CodeProps {
  title?: any;
  code: string;
}

export class CodeComponent extends Component<CodeProps> {
  constructor(props: CodeProps) {
    super(props);
  }

  public render() {
    const { title, code } = this.props;

    return (
      <CodeWrapper>
        {title ? <CodeHeader><CodeHeaderH4>{title}</CodeHeaderH4></CodeHeader> : null}
        <PreCode><CodeBody>{code}</CodeBody></PreCode>
      </CodeWrapper>
    );
  }
}
