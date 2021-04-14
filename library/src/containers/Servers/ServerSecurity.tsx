import React from 'react';
import { ServerSecurityRequirement, SecurityScheme } from '@asyncapi/parser';

import { Href, Markdown } from '../../components';

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
    <div className="text-sm mt-4">
      <h5 className="text-gray-700 text-base">Security:</h5>
      <ul>
        {serverSecurities.map((security, idx) => (
          <li className="mt-2" key={idx}>
            {security}
          </li>
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
  const schemas: React.ReactNodeArray = [];
  if (securitySchema.name()) {
    schemas.push(<span>Name: {securitySchema.name()}</span>);
  }
  if (securitySchema.in()) {
    schemas.push(<span>In: {securitySchema.in()}</span>);
  }
  if (securitySchema.scheme()) {
    schemas.push(<span>Scheme: {securitySchema.scheme()}</span>);
  }
  if (securitySchema.bearerFormat()) {
    schemas.push(<span>Bearer format: {securitySchema.bearerFormat()}</span>);
  }
  if (securitySchema.openIdConnectUrl()) {
    schemas.push(
      <Href href={securitySchema.openIdConnectUrl()} className="underline">
        Connect URL
      </Href>,
    );
  }

  const flows = securitySchema.flows();
  const renderedFlows =
    flows &&
    Object.entries(flows).map(([flowName, flow]) => {
      const authorizationUrl = flow.authorizationUrl();
      const tokenUrl = flow.tokenUrl();
      const refreshUrl = flow.refreshUrl();
      const scopes = flow.scopes();

      return (
        <div
          className="px-4 py-2 ml-2 mb-2 border border-gray-400 bg-gray-100 rounded"
          key={flowName}
        >
          <div>
            <span className="text-xs font-bold text-gray-600 mt-1 mr-1 uppercase">
              Flow:
            </span>
            <span className="text-xs font-bold text-gray-600 mt-1 mr-1 uppercase">
              {ServerHelpers.flowName(flowName)}
            </span>
          </div>

          {authorizationUrl && (
            <div className="mt-1">
              <span className="text-xs font-bold text-gray-600 mt-1 mr-1 uppercase">
                Auth URL:
              </span>
              <Href href={authorizationUrl} className="underline">
                {authorizationUrl}
              </Href>
            </div>
          )}
          {tokenUrl && (
            <div className="mt-1">
              <span className="text-xs font-bold text-gray-600 mt-1 mr-1 uppercase">
                Token URL:
              </span>
              <Href href={tokenUrl} className="underline">
                {tokenUrl}
              </Href>
            </div>
          )}
          {refreshUrl && (
            <div className="mt-1">
              <span className="text-xs font-bold text-gray-600 mt-1 mr-1 uppercase">
                Refresh URL:
              </span>
              <Href href={refreshUrl} className="underline">
                {refreshUrl}
              </Href>
            </div>
          )}
          {scopes && (
            <div className="mt-1">
              <span className="text-xs font-bold text-gray-600 mt-1 mr-1 uppercase">
                Scopes:
              </span>
              <ul className="inline-block">
                {scopes &&
                  Object.entries(scopes).map(([scopeName, scopeDesc]) => (
                    <li
                      className="inline-block font-bold no-underline bg-indigo-400 text-white text-xs rounded py-0 px-1 ml-1"
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
    });

  return (
    <div className="ai-security__security__security-schema">
      <div>
        <span>
          {ServerHelpers.securityType(securitySchema.type())}
          {schemas.length > 0 && (
            <ul className="inline-block ml-2">
              {schemas.map((schema, idx) => (
                <li
                  className="inline-block font-bold no-underline bg-blue-400 text-white text-xs uppercase rounded px-2 py-0 ml-1"
                  key={idx}
                >
                  {schema}
                </li>
              ))}
            </ul>
          )}
        </span>
      </div>

      {securitySchema.hasDescription() && (
        <div>
          <Markdown>{securitySchema.description()}</Markdown>
        </div>
      )}

      {renderedFlows && renderedFlows.length > 0 && (
        <ul className="my-2">
          <li>{renderedFlows}</li>
        </ul>
      )}
    </div>
  );
};
