import React from 'react';
import { ServerSecurityRequirement, SecurityScheme } from '@asyncapi/parser';

import { Href, Markdown } from '../../components';

import { useSpec } from '../../contexts';
import { ServerHelpers } from '../../helpers';

interface Props {
  serverRequirements: ServerSecurityRequirement[];
  protocol: string;
}

export const ServerSecurity: React.FunctionComponent<Props> = ({
  serverRequirements = [],
  protocol = '',
}) => {
  const asyncapi = useSpec();
  const securitySchemes =
    asyncapi.hasComponents() && asyncapi.components().securitySchemes();

  let renderedServerSecurities;
  if (
    !serverRequirements ||
    !serverRequirements.length ||
    !securitySchemes ||
    !Object.keys(securitySchemes).length
  ) {
    if (protocol === 'kafka' || protocol === 'kafka-secure') {
      renderedServerSecurities = (
        <ServerSecurityItem protocol={protocol} securitySchema={null} />
      );
    }
  } else {
    const serverSecurities: React.ReactNodeArray = serverRequirements
      .map(requirement => {
        const def: SecurityScheme =
          securitySchemes[Object.keys(requirement.json())[0]];

        if (!def) {
          return null;
        }
        return (
          <ServerSecurityItem
            protocol={protocol}
            securitySchema={def}
            key={def.type()}
          />
        );
      })
      .filter(Boolean);
    renderedServerSecurities = (
      <ul>
        {serverSecurities.map((security, idx) => (
          <li className="mt-2" key={idx}>
            {security}
          </li>
        ))}
      </ul>
    );
  }

  if (!renderedServerSecurities) {
    return null;
  }

  return (
    <div className="text-sm mt-4">
      <h5 className="text-gray-700 text-base">Security:</h5>
      {renderedServerSecurities}
    </div>
  );
};

interface ServerSecurityItemProps {
  securitySchema: SecurityScheme | null;
  protocol: string;
}

const ServerSecurityItem: React.FunctionComponent<ServerSecurityItemProps> = ({
  // NOSONAR
  securitySchema,
  protocol,
}) => {
  const schemas: React.ReactNodeArray = [];
  if (securitySchema) {
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
  }

  let renderedKafkaSecurity;
  if (protocol === 'kafka' || protocol === 'kafka-secure') {
    const { securityProtocol, saslMechanism } = ServerHelpers.getKafkaSecurity(
      protocol,
      securitySchema,
    );

    renderedKafkaSecurity = (
      <div className="px-4 py-2 ml-2 mb-2 border border-gray-400 bg-gray-100 rounded">
        {securityProtocol && (
          <div className="mt-1">
            <span className="text-xs font-bold text-gray-600 mt-1 mr-1 uppercase">
              security.protocol:
            </span>
            <span className="inline-block font-bold no-underline bg-indigo-400 text-white text-xs rounded py-0 px-1 ml-1">
              {securityProtocol}
            </span>
          </div>
        )}
        {saslMechanism && (
          <div className="mt-1">
            <span className="text-xs font-bold text-gray-600 mt-1 mr-1 uppercase">
              sasl.mechanism:
            </span>
            <span className="inline-block font-bold no-underline bg-indigo-400 text-white text-xs rounded py-0 px-1 ml-1">
              {saslMechanism}
            </span>
          </div>
        )}
      </div>
    );
  }

  const flows = securitySchema && securitySchema.flows();
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
      {securitySchema && schemas && (
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
      )}

      {securitySchema && securitySchema.hasDescription() && (
        <div>
          <Markdown>{securitySchema.description()}</Markdown>
        </div>
      )}

      {renderedFlows && renderedFlows.length > 0 && (
        <ul className="my-2">
          <li>{renderedFlows}</li>
        </ul>
      )}

      {renderedKafkaSecurity && <div>{renderedKafkaSecurity}</div>}
    </div>
  );
};
