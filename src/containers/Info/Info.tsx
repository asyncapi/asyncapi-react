import React, { Component } from 'react';

import { Header, H1, H2, HeaderParagraph, HrefHeader } from '../../components';

import { IInfoProps } from '../../common';

class InfoComponent extends Component<IInfoProps> {
  public render() {
    const { info } = this.props;

    return (
      <Header>
        <H1>{info.title}</H1>
        <HeaderParagraph>{info.description}</HeaderParagraph>

        <H2>Connection details</H2>
        <HeaderParagraph>
          <HrefHeader href={info.termsOfService} target="_blank">
            {info.termsOfService}
          </HrefHeader>
        </HeaderParagraph>
      </Header>
    );
  }
}

export default InfoComponent;
