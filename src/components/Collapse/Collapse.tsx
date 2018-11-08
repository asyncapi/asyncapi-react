import * as React from 'react';

import { ICollapseProps } from './propTypes';

import { CodeWrapper, CodeHeader, CodeBody } from './styled';

class CollapseComponent extends React.Component<ICollapseProps> {
  constructor(props: ICollapseProps) {
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
