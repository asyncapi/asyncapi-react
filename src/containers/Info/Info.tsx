import React, { Component } from 'react';

import { Header, H1, H2, HeaderParagraph, HrefHeader } from '../../components';

import { Info as InfoProps } from '../../common';

class InfoComponent extends Component<InfoProps> {
  public render() {
    const { title, description, termsOfService } = this.props;

    return (
      <Header>
        <H1>{title}</H1>
        <HeaderParagraph>{description}</HeaderParagraph>

        <H2>Connection details</H2>
        <HeaderParagraph>
          <HrefHeader href={termsOfService} target="_blank">
            {termsOfService}
          </HrefHeader>
        </HeaderParagraph>
      </Header>
    );
  }
}

export default InfoComponent;
