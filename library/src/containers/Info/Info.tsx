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
    <div className="text-left p-4" id="introduction">
      <div className="text-3xl">
        {info.title()}&nbsp;{info.version()}
      </div>

      {showInfoList && (
        <ul className="leading-normal mt-2 space-x-2 space-y-2">
          {license && (
            <li className="inline-block">
              {license.url() ? (
                <Href
                  className="border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1"
                  href={license.url()}
                >
                  <span>{license.name()}</span>
                </Href>
              ) : (
                <span className="border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1">
                  {license.name()}
                </span>
              )}
            </li>
          )}
          {termsOfService && (
            <li className="inline-block">
              <Href
                className="border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1"
                href={termsOfService}
              >
                <span>{TERMS_OF_SERVICE_TEXT}</span>
              </Href>
            </li>
          )}
          {defaultContentType && (
            <li className="inline-block">
              <Href
                className="border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1"
                href={`${CONTENT_TYPES_SITE}/${defaultContentType}`}
              >
                <span>{defaultContentType}</span>
              </Href>
            </li>
          )}
          {externalDocs && (
            <li className="inline-block">
              <Href
                className="border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1"
                href={externalDocs.url()}
              >
                <span>{EXTERAL_DOCUMENTATION_TEXT}</span>
              </Href>
            </li>
          )}
          {contact && (
            <>
              {contact.url() && (
                <li className="inline-block">
                  <Href
                    className="border border-solid border-purple-300 hover:bg-purple-300 hover:text-purple-600 text-purple-500 font-bold no-underline text-xs uppercase rounded px-3 py-1"
                    href={contact.url()}
                  >
                    <span>{contact.name() || URL_SUPPORT_TEXT}</span>
                  </Href>
                </li>
              )}
              {contact.email() && (
                <li className="inline-block">
                  <Href
                    className="border border-solid border-purple-300 hover:bg-purple-300 hover:text-purple-600 text-purple-500 font-bold no-underline text-xs uppercase rounded px-3 py-1"
                    href={`mailto:${contact.email()}`}
                  >
                    <span>{contact.email()}</span>
                  </Href>
                </li>
              )}
            </>
          )}
        </ul>
      )}

      {info.hasDescription() && (
        <div className="mt-4">
          <Markdown>{info.description()}</Markdown>
        </div>
      )}

      {asyncapi.hasTags() && (
        <div className="mt-4">
          <Tags tags={asyncapi.tags()} />
        </div>
      )}
    </div>
  );
};
