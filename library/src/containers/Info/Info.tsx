import React from 'react';

import { Href, Markdown, Tags } from '../../components';
import { useSpec } from '../../store';

import {
  TERMS_OF_SERVICE_TEXT,
  CONTENT_TYPES_SITE,
  URL_SUPPORT_TEXT,
  EXTERAL_DOCUMENTATION_TEXT,
} from '../../constants';

export const Info: React.FunctionComponent = () => {
  const asyncapi = useSpec();
  const info = asyncapi.info();
  const externalDocs = asyncapi.externalDocs();

  const license = info.license();
  const termsOfService = info.termsOfService();
  const defaultContentType = asyncapi.defaultContentType();
  const contact = info.contact();

  const showInfoList =
    license || termsOfService || defaultContentType || contact || externalDocs;

  return (
    <div className="ai-info" id="introduction">
      <div className="ai-info__title">
        {info.title()}&nbsp;{info.version()}
      </div>

      {showInfoList && (
        <ul className="ai-info__links">
          {license && (
            <li className="ai-info__links-item">
              {license.url() ? (
                <Href href={license.url()}>
                  <span>{license.name()}</span>
                </Href>
              ) : (
                <span>{license.name()}</span>
              )}
            </li>
          )}
          {termsOfService && (
            <li className="ai-info__links-item">
              <Href href={termsOfService}>
                <span>{TERMS_OF_SERVICE_TEXT}</span>
              </Href>
            </li>
          )}
          {defaultContentType && (
            <li className="ai-info__links-item">
              <Href href={`${CONTENT_TYPES_SITE}/${defaultContentType}`}>
                <span>{defaultContentType}</span>
              </Href>
            </li>
          )}
          {externalDocs && (
            <li className="ai-info__links-item">
              <Href href={externalDocs.url()}>
                <span>{EXTERAL_DOCUMENTATION_TEXT}</span>
              </Href>
            </li>
          )}
          {contact && (
            <>
              {contact.url() && (
                <li className="ai-info__links-item ai-info__links-item--reverse">
                  <Href href={contact.url()}>
                    <span>{contact.name() || URL_SUPPORT_TEXT}</span>
                  </Href>
                </li>
              )}
              {contact.email() && (
                <li className="ai-info__links-item ai-info__links-item--reverse">
                  <Href href={`mailto:${contact.email()}`}>
                    <span>{contact.email()}</span>
                  </Href>
                </li>
              )}
            </>
          )}
        </ul>
      )}

      {info.hasDescription() && (
        <div className="ai-info__description">
          <Markdown>{info.description()}</Markdown>
        </div>
      )}

      {asyncapi.hasTags() && (
        <div className="ai-info__tags">
          <Tags tags={asyncapi.tags()} />
        </div>
      )}
    </div>
  );
};
