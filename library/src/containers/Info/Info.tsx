import React from 'react';

import { TermsOfServiceComponent } from './TermsOfService';
import { LicenseComponent } from './License';
import { ContactComponent } from './Contact';
import { DefaultContentTypeComponent } from './DefaultContentType';

import { Markdown, CollapseButton } from '../../components';
import { bemClasses } from '../../helpers';
import { useSpec } from '../../store';

export const InfoComponent: React.FunctionComponent = () => {
  const asyncapi = useSpec();
  const info = asyncapi.info();

  const termsOfService = info.termsOfService();
  const contact = info.contact();
  const license = info.license();
  const defaultContentType = asyncapi.defaultContentType();

  const className = `info`;
  const showInfoList =
    defaultContentType || termsOfService || license || contact;

  return (
    <section
      className={bemClasses.element(className)}
      id={bemClasses.identifier([className])}
    >
      <header className={bemClasses.element(`${className}-header`)}>
        <div className={bemClasses.element(`${className}-header-main`)}>
          <h1>
            <span className={bemClasses.element(`${className}-header-title`)}>
              {info.title()}
            </span>
            <span className={bemClasses.element(`${className}-header-version`)}>
              {info.version()}
            </span>
          </h1>
          <CollapseButton />
        </div>
        {showInfoList && (
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
                <LicenseComponent name={license.name()} url={license.url()} />
              </li>
            )}
            {contact && (
              <ContactComponent url={contact.url()} email={contact.email()} />
            )}
          </ul>
        )}
      </header>
      {info.hasDescription() && (
        <div className={bemClasses.element(`${className}-description`)}>
          <Markdown>{info.description()}</Markdown>
        </div>
      )}
    </section>
  );
};
