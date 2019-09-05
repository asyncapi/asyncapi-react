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
  const className = `info`;
  const showInfoList =
    defaultContentType || termsOfService || license || contact;

  return (
    <div className={bemClasses.element(className)}>
      <header className={bemClasses.element(`${className}-header`)}>
        <h1>
          <span className={bemClasses.element(`${className}-header-title`)}>
            {title}
          </span>
          {version && (
            <span className={bemClasses.element(`${className}-header-version`)}>
              {version}
            </span>
          )}
        </h1>
        {showInfoList ? (
          <ul className={bemClasses.element(`${className}-list`)}>
            {defaultContentType && (
              <li
                className={bemClasses.element(
                  `${className}-default-content-type`,
                )}
              >
                <DefaultContentTypeComponent type={defaultContentType} />
              </li>
            )}
            {termsOfService && (
              <li
                className={bemClasses.element(`${className}-terms-of-service`)}
              >
                <TermsOfServiceComponent url={termsOfService} />
              </li>
            )}
            {license && (
              <li className={bemClasses.element(`${className}-license`)}>
                <LicenseComponent {...license} />
              </li>
            )}
            {contact && (contact.url || contact.email) ? (
              <ContactComponent {...contact} />
            ) : null}
          </ul>
        ) : null}
      </header>
      {description && (
        <div className={bemClasses.element(`${className}-description`)}>
          <Markdown>{description}</Markdown>
        </div>
      )}
    </div>
  );
};
