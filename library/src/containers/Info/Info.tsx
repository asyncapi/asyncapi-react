import React, { Component } from 'react';

import { Info, Servers } from '../../types';

import { ServersComponent } from '../Servers/Servers';
import { ContactComponent } from './Contact';
import { LicenseComponent } from './License';
import { TERMS_OF_SERVICE } from '../../constants';
import {
  H1,
  H2,
  HeaderParagraph,
  HrefHeader,
  Markdown,
} from '../../components';
import { Info as InfoWrapper, InfoHeader } from './styled';

interface Props {
  info: Info;
  servers?: Servers;
  showServers: boolean;
}
export class InfoComponent extends Component<Props> {
  render() {
    const {
      info: { title, version, description, termsOfService, contact, license },
      servers,
      showServers,
    } = this.props;

    return (
      <InfoWrapper>
        <InfoHeader>
          <H1>
            {title} {version}
          </H1>
          {description && <Markdown>{description}</Markdown>}
          {termsOfService && (
            <HeaderParagraph>
              <H2>{TERMS_OF_SERVICE}</H2>
              <HrefHeader
                href={termsOfService}
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                {termsOfService}
              </HrefHeader>
            </HeaderParagraph>
          )}
        </InfoHeader>
        {contact && <ContactComponent contact={contact} />}
        {license && <LicenseComponent license={license} />}
        {showServers && <ServersComponent servers={servers} />}
      </InfoWrapper>
    );
  }
}
