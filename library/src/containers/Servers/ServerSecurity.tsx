import React from 'react';
import { ServerSecurityRequirement, SecurityScheme } from '@asyncapi/parser';

import { Markdown } from '../../components';

import { ServerHelpers } from '../../helpers';
import { useSpec } from '../../store';

interface Props {
  serverRequirements: ServerSecurityRequirement[];
}

export const ServerSecurity: React.FunctionComponent<Props> = ({
  serverRequirements = [],
}) => {
  const asyncapi = useSpec();
  const securitySchemes =
    asyncapi.hasComponents() && asyncapi.components().securitySchemes();

  if (
    !serverRequirements.length ||
    !securitySchemes ||
    !Object.keys(securitySchemes).length
  ) {
    return null;
  }

  const serverSecurities: React.ReactNodeArray = serverRequirements
    .map(requirement => {
      const def: SecurityScheme =
        securitySchemes[Object.keys(requirement.json())[0]];

      if (!def) {
        return null;
      }
      return <ServerSecurityItem securitySchema={def} key={def.type()} />;
    })
    .filter(Boolean);

  if (!serverSecurities.length) {
    return null;
  }

  return (
    <div>
      <h5 className="text-sm text-gray-500 mt-1">Security:</h5>
      <ul>
        {serverSecurities.map((security, idx) => (
          <li key={idx}>{security}</li>
        ))}
      </ul>
    </div>
  );
};

interface ServerSecurityItemProps {
  securitySchema: SecurityScheme;
}

const ServerSecurityItem: React.FunctionComponent<ServerSecurityItemProps> = ({
  securitySchema,
}) => {
  const flows = securitySchema.flows();

  return (
    <div>
      <span className="font-bold no-underline text-gray-600 text-xs uppercase mr-1">
        {ServerHelpers.securityType(securitySchema.type())}
      </span>
      <Markdown>{securitySchema.description()}</Markdown>

      {securitySchema.name() && (
        <span className="font-bold no-underline bg-blue-400 text-white text-xs uppercase rounded">
          Name: {securitySchema.name()}
        </span>
      )}
      {securitySchema.in() && (
        <span className="font-bold no-underline bg-blue-400 text-white text-xs uppercase rounded">
          In: {securitySchema.in()}
        </span>
      )}
      {securitySchema.scheme() && (
        <span className="font-bold no-underline bg-blue-400 text-white text-xs uppercase rounded">
          Scheme: {securitySchema.scheme()}
        </span>
      )}
      {securitySchema.bearerFormat() && (
        <span className="font-bold no-underline bg-blue-400 text-white text-xs uppercase rounded">
          Bearer format: {securitySchema.bearerFormat()}
        </span>
      )}

      {securitySchema.openIdConnectUrl() && (
        <div className="px-4 py-2 ml-4 mb-3 border border-gray-400 bg-gray-100 rounded">
          <div>
            <span className="text-xs font-bold text-gray-600 mt-1 mr-1 uppercase">
              Connect URL:
            </span>
            <a
              href="{{def.openIdConnectUrl()}}"
              className="text-gray-600 text-xs font-normal"
              target="_blank"
            >
              {securitySchema.openIdConnectUrl()}
            </a>
          </div>
        </div>
      )}

      {flows &&
        Object.entries(flows).map(([flowName, flow]) => {
          const authorizationUrl = flow.authorizationUrl();
          const tokenUrl = flow.tokenUrl();
          const refreshUrl = flow.refreshUrl();
          const scopes = flow.scopes();

          return (
            <div
              className="px-4 py-2 ml-4 mb-3 border border-gray-400 bg-gray-100 rounded"
              key={flowName}
            >
              <div>
                <span className="text-xs font-bold text-gray-600 mt-1 mr-1 uppercase">
                  Flow:
                </span>
                <span className="text-gray-600 text-xs font-normal capitalize">
                  {ServerHelpers.flowName(flowName)}
                </span>
              </div>

              {authorizationUrl && (
                <div>
                  <span className="text-xs font-bold text-gray-600 mt-1 mr-1 uppercase">
                    Auth URL:
                  </span>
                  <a
                    className="text-gray-600 text-xs font-normal"
                    href={authorizationUrl}
                    target="_blank"
                  >
                    {authorizationUrl}
                  </a>
                </div>
              )}
              {tokenUrl && (
                <div>
                  <span className="text-xs font-bold text-gray-600 mt-1 mr-1 uppercase">
                    Token URL:
                  </span>
                  <a
                    className="text-gray-600 text-xs font-normal"
                    href={tokenUrl}
                    target="_blank"
                  >
                    {tokenUrl}
                  </a>
                </div>
              )}
              {refreshUrl && (
                <div>
                  <span className="text-xs font-bold text-gray-600 mt-1 mr-1 uppercase">
                    Refresh URL:
                  </span>
                  <a
                    className="text-gray-600 text-xs font-normal"
                    href={refreshUrl}
                    target="_blank"
                  >
                    {refreshUrl}
                  </a>
                </div>
              )}
              {scopes && (
                <div>
                  <span className="text-xs font-bold text-gray-600 mt-1 mr-1 uppercase">
                    Scopes:
                  </span>
                  <ul>
                    {scopes &&
                      Object.entries(scopes).map(([scopeName, scopeDesc]) => (
                        <li
                          className="font-bold no-underline bg-indigo-400 text-white text-xs rounded"
                          title={scopeDesc}
                          key={scopeName}
                        >
                          {scopeName}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};
