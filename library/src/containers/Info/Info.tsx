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

  const specId = asyncapi.info().id();
  const externalDocs = asyncapi.info().externalDocs();
  const license = info.license();
  const termsOfService = info.termsOfService();
  const defaultContentType = asyncapi.defaultContentType();
  const contact = info.contact();

  const showInfoList =
    license || termsOfService || defaultContentType || contact || externalDocs;

  return (
    <div className="panel-item">
      <div className="panel-item--center px-8 text-left" id="introduction">
        <div className="text-4xl">
          {info.title()}&nbsp;{info.version()}
        </div>

        {showInfoList && (
          <ul className="flex flex-wrap mt-2 leading-normal">
            {license && (
              <li className="inline-block mt-2 mr-2">
                {license.url() ? (
                  <Href
                    className="border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1"
                    href={license.url() || ''}
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
              <li className="inline-block mt-2 mr-2">
                <Href
                  className="border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1"
                  href={termsOfService}
                >
                  <span>{TERMS_OF_SERVICE_TEXT}</span>
                </Href>
              </li>
            )}
            {defaultContentType && (
              <li className="inline-block mt-2 mr-2">
                <Href
                  className="border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1"
                  href={`${CONTENT_TYPES_SITE}/${defaultContentType}`}
                >
                  <span>{defaultContentType}</span>
                </Href>
              </li>
            )}
            {externalDocs && (
              <li className="inline-block mt-2 mr-2">
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
                  <li className="inline-block mt-2 mr-2">
                    <Href
                      className="border border-solid border-purple-300 hover:bg-purple-300 hover:text-purple-600 text-purple-500 font-bold no-underline text-xs uppercase rounded px-3 py-1"
                      href={contact.url() || ''}
                    >
                      <span>{contact.name() || URL_SUPPORT_TEXT}</span>
                    </Href>
                  </li>
                )}
                {contact.email() && (
                  <li className="inline-block mt-2 mr-2">
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
            {specId && (
              <li className="inline-block mt-2 mr-2">
                <span className="border border-solid border-blue-300 hover:bg-blue-300 hover:text-blue-600 text-blue-500 font-bold no-underline text-xs uppercase rounded px-3 py-1">
                  ID: {specId}
                </span>
              </li>
            )}
          </ul>
        )}

        {info.hasDescription() && (
          <div className="mt-4">
            <Markdown>{info.description()}</Markdown>
          </div>
        )}

        {asyncapi.info().tags().length > 0 && (
          <div className="mt-4">
            <Tags tags={asyncapi.info().tags()} />
          </div>
        )}
      </div>

      <div className="panel-item--right" />
    </div>
  );
};
