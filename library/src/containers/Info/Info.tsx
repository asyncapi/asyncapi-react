import React from 'react';

import { TermsOfServiceComponent } from './TermsOfService';
import { LicenseComponent } from './License';
import { ContactComponent } from './Contact';
import { DefaultContentTypeComponent } from './DefaultContentType';
import { Markdown } from '../../components';

import { bemClasses } from '../../helpers';
import { Info, DefaultContentType } from '../../types';

interface Props {
  info: Info;
  defaultContentType?: DefaultContentType;
}

export const InfoComponent: React.FunctionComponent<Props> = ({
  info: { title, version, description, termsOfService, contact, license },
  defaultContentType,
}) => {
  return (
    <div className={bemClasses.element(`info`)}>
      <header className={bemClasses.element(`info-header`)}>
        <h1>{`${title} ${version}`}</h1>
        <ul className={bemClasses.element(`info-list`)}>
          {defaultContentType && (
            <li className={bemClasses.element(`info-default-content-type`)}>
              <DefaultContentTypeComponent type={defaultContentType} />
            </li>
          )}
          {termsOfService && (
            <li className={bemClasses.element(`info-terms-of-service`)}>
              <TermsOfServiceComponent url={termsOfService} />
            </li>
          )}
          {license && (
            <li className={bemClasses.element(`info-license`)}>
              <LicenseComponent {...license} />
            </li>
          )}
          {contact && (contact.url || contact.email) ? (
            <ContactComponent {...contact} />
          ) : null}
        </ul>
      </header>
      {description && (
        <div className={bemClasses.element(`info-description`)}>
          <Markdown>{description}</Markdown>
        </div>
      )}
    </div>
  );
};
