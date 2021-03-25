import React from 'react';

import { TermsOfServiceComponent } from './TermsOfService';
import { LicenseComponent } from './License';
import { ContactComponent } from './Contact';

import { Markdown } from '../../components';
import { useSpec } from '../../store';

export const InfoComponent: React.FunctionComponent = () => {
  const asyncapi = useSpec();
  const info = asyncapi.info();

  const termsOfService = info.termsOfService();
  const contact = info.contact();
  const license = info.license();
  const defaultContentType = asyncapi.defaultContentType();

  const showInfoList =
    defaultContentType || termsOfService || license || contact;

  return (
    <div className="center-block text-left p-8">
      <span className="text-3xl">
        {info.title()}&nbsp;{info.version()}
      </span>
      {showInfoList && (
        <span className="leading-normal mb-4">
          {termsOfService && <TermsOfServiceComponent url={termsOfService} />}
          {license && (
            <LicenseComponent name={license.name()} url={license.url()} />
          )}
          {contact && (
            <ContactComponent url={contact.url()} email={contact.email()} />
          )}
        </span>
      )}
      {info.hasDescription() && (
        <span className="prose">
          <Markdown>{info.description()}</Markdown>
        </span>
      )}
    </div>
  );
};
