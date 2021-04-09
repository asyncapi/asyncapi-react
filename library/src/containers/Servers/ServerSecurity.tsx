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
    <div className="ai-server__security">
      <h5>Security:</h5>
      <ul className="ai-server__security__list">
        {serverSecurities.map((security, idx) => (
          <li className="ai-server__security__list-item" key={idx}>
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
      <Href href={securitySchema.openIdConnectUrl()}>Connect URL</Href>,
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
          className="ai-security__security__security-schema__flow"
          key={flowName}
        >
          <div>
            <span>Flow:</span>
            <span>{ServerHelpers.flowName(flowName)}</span>
          </div>

          {authorizationUrl && (
            <div>
              <span>Auth URL:</span>
              <Href href={authorizationUrl}>{authorizationUrl}</Href>
            </div>
          )}
          {tokenUrl && (
            <div>
              <span>Token URL:</span>
              <Href href={tokenUrl}>{tokenUrl}</Href>
            </div>
          )}
          {refreshUrl && (
            <div>
              <span>Refresh URL:</span>
              <Href href={refreshUrl}>{refreshUrl}</Href>
            </div>
          )}
          {scopes && (
            <div>
              <span>Scopes:</span>
              <ul className="ai-security__security__security-schema__flow__scopes">
                {scopes &&
                  Object.entries(scopes).map(([scopeName, scopeDesc]) => (
                    <li title={scopeDesc} key={scopeName}>
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
            <ul className="ai-security__security__security-schema__schemas-list">
              {schemas.map(schema => (
                <li className="ai-security__security__security-schema__schemas-list-item">
                  {schema}
                </li>
              ))}
            </ul>
          )}
        </span>
      </div>

      {securitySchema.hasDescription() && (
        <div className="ai-security__security__security-schema__description">
          <Markdown>{securitySchema.description()}</Markdown>
        </div>
      )}

      {renderedFlows && renderedFlows.length > 0 && (
        <ul className="ai-security__security__security-schema__flows-list">
          <li className="ai-security__security__security-schema__flows-list-item">
            {renderedFlows}
          </li>
        </ul>
      )}
    </div>
  );
};
