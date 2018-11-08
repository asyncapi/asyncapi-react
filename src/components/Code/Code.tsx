import * as React from 'react';

interface ICodeProps {
  code: string;
  language?: string;
}

import { CodeWrapper, CodeHeader, CodeBody } from './styled';

class CodeComponent extends React.Component<ICodeProps> {
  constructor(props: ICodeProps) {
    super(props);
  }

  public render() {
    const { code, language } = this.props;

    return (
      <CodeWrapper>
        <CodeHeader>Code</CodeHeader>
        <CodeBody>{code}</CodeBody>
      </CodeWrapper>
    );
  }
}

export default CodeComponent;
