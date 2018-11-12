import * as React from 'react';

import { CodeWrapper, CodeHeader, CodeBody } from './styled';

export interface CollapseProps {
  code: string;
  language?: string;
}

class CollapseComponent extends React.Component<CollapseProps> {
  constructor(props: CollapseProps) {
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

export default CollapseComponent;
