import React from 'react';
import { ServerSecurityRequirement, SecurityScheme } from '@asyncapi/parser';

import { Href, Markdown } from '../../components';

import { useSpec } from '../../contexts';
import { ServerHelpers } from '../../helpers';

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
    <div className="aui-text-sm aui-mt-4">
      <h5 className="aui-text-gray-700 aui-text-base">Security:</h5>
      <ul>
        {serverSecurities.map((security, idx) => (
          <li className="aui-mt-2" key={idx}>
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
      <Href href={securitySchema.openIdConnectUrl()} className="aui-underline">
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
          className="aui-px-4 aui-py-2 aui-ml-2 aui-mb-2 aui-border aui-border-gray-400 aui-bg-gray-100 aui-rounded"
          key={flowName}
        >
          <div>
            <span className="aui-text-xs aui-font-bold aui-text-gray-600 aui-mt-1 aui-mr-1 aui-uppercase">
              Flow:
            </span>
            <span className="aui-text-xs aui-font-bold aui-text-gray-600 aui-mt-1 aui-mr-1 aui-uppercase">
              {ServerHelpers.flowName(flowName)}
            </span>
          </div>

          {authorizationUrl && (
            <div className="aui-mt-1">
              <span className="aui-text-xs aui-font-bold aui-text-gray-600 aui-mt-1 aui-mr-1 aui-uppercase">
                Auth URL:
              </span>
              <Href href={authorizationUrl} className="aui-underline">
                {authorizationUrl}
              </Href>
            </div>
          )}
          {tokenUrl && (
            <div className="aui-mt-1">
              <span className="aui-text-xs aui-font-bold aui-text-gray-600 aui-mt-1 aui-mr-1 aui-uppercase">
                Token URL:
              </span>
              <Href href={tokenUrl} className="aui-underline">
                {tokenUrl}
              </Href>
            </div>
          )}
          {refreshUrl && (
            <div className="aui-mt-1">
              <span className="aui-text-xs aui-font-bold aui-text-gray-600 aui-mt-1 aui-mr-1 aui-uppercase">
                Refresh URL:
              </span>
              <Href href={refreshUrl} className="aui-underline">
                {refreshUrl}
              </Href>
            </div>
          )}
          {scopes && (
            <div className="aui-mt-1">
              <span className="aui-text-xs aui-font-bold aui-text-gray-600 aui-mt-1 aui-mr-1 aui-uppercase">
                Scopes:
              </span>
              <ul className="aui-inline-block">
                {scopes &&
                  Object.entries(scopes).map(([scopeName, scopeDesc]) => (
                    <li
                      className="aui-inline-block aui-font-bold aui-no-underline aui-bg-indigo-400 aui-text-white aui-text-xs aui-rounded aui-py-0 aui-px-1 aui-ml-1"
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
            <ul className="aui-inline-block aui-ml-2">
              {schemas.map((schema, idx) => (
                <li
                  className="aui-inline-block aui-font-bold aui-no-underline aui-bg-blue-400 aui-text-white aui-text-xs aui-uppercase aui-rounded aui-px-2 aui-py-0 aui-ml-1"
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
        <ul className="aui-my-2">
          <li>{renderedFlows}</li>
        </ul>
      )}
    </div>
  );
};
