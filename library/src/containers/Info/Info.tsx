import React from 'react';

import { Href, Markdown, Tags } from '../../components';
import { useSpec } from '../../contexts';

import {
  TERMS_OF_SERVICE_TEXT,
  CONTENT_TYPES_SITE,
  URL_SUPPORT_TEXT,
  EXTERAL_DOCUMENTATION_TEXT,
} from '../../constants';

export const Info: React.FunctionComponent = () => {
  const asyncapi = useSpec();

  const info = asyncapi.info();
  if (!info) {
    return null;
  }

  const specId = asyncapi.id();
  const externalDocs = asyncapi.externalDocs();
  const license = info.license();
  const termsOfService = info.termsOfService();
  const defaultContentType = asyncapi.defaultContentType();
  const contact = info.contact();

  const showInfoList =
    license || termsOfService || defaultContentType || contact || externalDocs;

  return (
    <div className="panel-item">
      <div
        className="panel-item--center aui-px-8 aui-text-left"
        id="introduction"
      >
        <div className="aui-text-4xl">
          {info.title()}&nbsp;{info.version()}
        </div>

        {showInfoList && (
          <ul className="aui-flex aui-flex-wrap aui-mt-2 aui-leading-normal">
            {license && (
              <li className="aui-inline-block aui-mt-2 aui-mr-2">
                {license.url() ? (
                  <Href
                    className="aui-border aui-border-solid aui-border-orange-300 hover:aui-bg-orange-300 hover:aui-text-orange-600 aui-text-orange-500 aui-font-bold aui-no-underline aui-text-xs aui-uppercase aui-rounded aui-px-3 aui-py-1"
                    href={license.url()}
                  >
                    <span>{license.name()}</span>
                  </Href>
                ) : (
                  <span className="aui-border aui-border-solid aui-border-orange-300 hover:aui-bg-orange-300 hover:aui-text-orange-600 aui-text-orange-500 aui-font-bold aui-no-underline aui-text-xs aui-uppercase aui-rounded aui-px-3 aui-py-1">
                    {license.name()}
                  </span>
                )}
              </li>
            )}
            {termsOfService && (
              <li className="aui-inline-block aui-mt-2 aui-mr-2">
                <Href
                  className="aui-border aui-border-solid aui-border-orange-300 hover:aui-bg-orange-300 hover:aui-text-orange-600 aui-text-orange-500 aui-font-bold aui-no-underline aui-text-xs aui-uppercase aui-rounded aui-px-3 aui-py-1"
                  href={termsOfService}
                >
                  <span>{TERMS_OF_SERVICE_TEXT}</span>
                </Href>
              </li>
            )}
            {defaultContentType && (
              <li className="aui-inline-block aui-mt-2 aui-mr-2">
                <Href
                  className="aui-border aui-border-solid aui-border-orange-300 hover:aui-bg-orange-300 hover:aui-text-orange-600 aui-text-orange-500 aui-font-bold aui-no-underline aui-text-xs aui-uppercase aui-rounded aui-px-3 aui-py-1"
                  href={`${CONTENT_TYPES_SITE}/${defaultContentType}`}
                >
                  <span>{defaultContentType}</span>
                </Href>
              </li>
            )}
            {externalDocs && (
              <li className="aui-inline-block aui-mt-2 aui-mr-2">
                <Href
                  className="aui-border aui-border-solid aui-border-orange-300 hover:aui-bg-orange-300 hover:aui-text-orange-600 aui-text-orange-500 aui-font-bold aui-no-underline aui-text-xs aui-uppercase aui-rounded aui-px-3 aui-py-1"
                  href={externalDocs.url()}
                >
                  <span>{EXTERAL_DOCUMENTATION_TEXT}</span>
                </Href>
              </li>
            )}
            {contact && (
              <>
                {contact.url() && (
                  <li className="aui-inline-block aui-mt-2 aui-mr-2">
                    <Href
                      className="aui-border aui-border-solid aui-border-purple-300 hover:aui-bg-purple-300 hover:aui-text-purple-600 aui-text-purple-500 aui-font-bold aui-no-underline aui-text-xs aui-uppercase aui-rounded aui-px-3 aui-py-1"
                      href={contact.url()}
                    >
                      <span>{contact.name() || URL_SUPPORT_TEXT}</span>
                    </Href>
                  </li>
                )}
                {contact.email() && (
                  <li className="aui-inline-block aui-mt-2 aui-mr-2">
                    <Href
                      className="aui-border aui-border-solid aui-border-purple-300 hover:aui-bg-purple-300 hover:aui-text-purple-600 aui-text-purple-500 aui-font-bold aui-no-underline aui-text-xs aui-uppercase aui-rounded aui-px-3 aui-py-1"
                      href={`mailto:${contact.email()}`}
                    >
                      <span>{contact.email()}</span>
                    </Href>
                  </li>
                )}
              </>
            )}
            {specId && (
              <li className="aui-inline-block aui-mt-2 aui-mr-2">
                <span className="aui-border aui-border-solid aui-border-blue-300 hover:aui-bg-blue-300 hover:aui-text-blue-600 aui-text-blue-500 aui-font-bold aui-no-underline aui-text-xs aui-uppercase aui-rounded aui-px-3 aui-py-1">
                  ID: {specId}
                </span>
              </li>
            )}
          </ul>
        )}

        {info.hasDescription() && (
          <div className="aui-mt-4">
            <Markdown>{info.description()}</Markdown>
          </div>
        )}

        {asyncapi.hasTags() && (
          <div className="aui-mt-4">
            <Tags tags={asyncapi.tags()} />
          </div>
        )}
      </div>

      <div className="panel-item--right" />
    </div>
  );
};
