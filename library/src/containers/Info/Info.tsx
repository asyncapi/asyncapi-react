import React from 'react';

import { ServersComponent } from '../Servers/Servers';
import { ContactComponent } from './Contact';
import { LicenseComponent } from './License';
import { Href } from '../../components';

import { bemClasses } from '../../helpers';
import { Info, Servers } from '../../types';
import { TERMS_OF_SERVICE } from '../../constants';

interface Props {
  info: Info;
  servers?: Servers;
  showServers: boolean;
}

export const InfoComponent: React.FunctionComponent<Props> = ({
  info: { title, version, description, termsOfService, contact, license },
  servers,
  showServers,
}) => (
  <div className={bemClasses.element(`info`)}>
    <header className={bemClasses.element(`info-header`)}>
      <h1>{`${title} ${version}`}</h1>
      {description && (
        <div className={bemClasses.element(`info-description`)}>
          {description}
        </div>
      )}
      {termsOfService && (
        <div className={bemClasses.element(`info-terms-of-service`)}>
          <h2>{TERMS_OF_SERVICE}</h2>
          <Href href={termsOfService}>{termsOfService}</Href>
        </div>
      )}
    </header>
    {contact && <ContactComponent {...contact} />}
    {license && <LicenseComponent {...license} />}
    {showServers && <ServersComponent servers={servers} />}
  </div>
);
