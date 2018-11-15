import React, { Component } from 'react';

import { Header, H1, H2, HeaderParagraph, HrefHeader, Markdown } from '../../components';

import { Info, Server } from '../../common';

import ServersComponent from '../Servers/Servers';
import ContactComponent from './Contact';
import LicenseComponent from './License';

import { Info as InfoWrapper, InfoHeader } from './styled';

export interface InfoProps {
  info: Info;
  servers?: Server[];
  showServers: boolean;
}

class InfoComponent extends Component<InfoProps> {
  public render() {
    const { info: { title, version, description, termsOfService, contact, license }, servers, showServers } = this.props;

    return (
      <InfoWrapper>
        <InfoHeader>
          <H1>{title} {version}</H1>
          {description ? <Markdown>{description}</Markdown> : null}

          {termsOfService ?
            <HeaderParagraph>
              <H2>Terms of service</H2>
              <HrefHeader href={termsOfService} target="_blank">
                {termsOfService}
              </HrefHeader>
            </HeaderParagraph>
          : null}
        </InfoHeader>
        {contact ? <ContactComponent contact={contact} /> : null}
        {license ? <LicenseComponent license={license} /> : null}
        {showServers ? <ServersComponent servers={servers} /> : null}
      </InfoWrapper>
    );
  }
}

export default InfoComponent;
