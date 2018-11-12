import React, { Component } from 'react';

import { Header, H1, H2, HeaderParagraph, HrefHeader } from '../../components';

import { Info } from '../../common';

export interface InfoProps {
  info: Info;
}

class InfoComponent extends Component<InfoProps> {
  public render() {
    const { info: { title, description, termsOfService } } = this.props;

    return (
      <Header>
        <H1>{title}</H1>
        {description ? <HeaderParagraph>{description}</HeaderParagraph> : null}

        {termsOfService ?
          <HeaderParagraph>
            <H2>Terms of service</H2>
            <HrefHeader href={termsOfService} target="_blank">
              {termsOfService}
            </HrefHeader>
          </HeaderParagraph>
        : null}
      </Header>
    );
  }
}

export default InfoComponent;
