import React from 'react';
import {
  OAuthFlowInterface,
  SecurityRequirementsInterface,
  SecuritySchemeInterface,
} from '@asyncapi/parser';

import { Href, Markdown } from '../../components';
import { useSpec } from '../../contexts';
import { ServerHelpers } from '../../helpers';

interface Props {
  security: SecurityRequirementsInterface[];
  protocol?: string;
  header?: string;
}

export const Security: React.FunctionComponent<Props> = ({
  security = [],
  protocol = '',
  header = 'Security',
}) => {
  const asyncapi = useSpec();
  const securitySchemes =
    !asyncapi.components().isEmpty() && asyncapi.components().securitySchemes();

  let renderedSecurities;
  if (
    !security?.length ||
    !securitySchemes ||
    !Object.keys(securitySchemes).length
  ) {
    if (protocol === 'kafka' || protocol === 'kafka-secure') {
      renderedSecurities = (
        <SecurityItem protocol={protocol} securitySchema={null} />
      );
    }
  } else {
    const securities: React.ReactNodeArray = Object.values(security)
      .map(requirement => {
        const requirements = requirement.all();
        const key = Object.keys(requirements)[0];
        const def = securitySchemes[String(key)];
        const requiredScopes: string[] = requirements[String(key)];

        if (!def) {
          return null;
        }
        return (
          <SecurityItem
            protocol={protocol}
            securitySchema={def}
            requiredScopes={requiredScopes}
            key={def.type()}
          />
        );
      })
      .filter(Boolean);

    renderedSecurities = (
      <ul>
        {securities.map((s, idx) => (
          <li className="mt-2" key={idx}>
            {s}
          </li>
        ))}
      </ul>
    );
  }

  if (!renderedSecurities) {
    return null;
  }

  return (
    <div className="text-sm mt-4">
      <h5 className="text-gray-800">{header}:</h5>
      {renderedSecurities}
    </div>
  );
};

function collectSecuritySchemas(
  securitySchema: SecuritySchemeInterface | null,
  requiredScopes: string[] = [],
): React.ReactNodeArray {
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
        <Href
          href={securitySchema.openIdConnectUrl() as string}
          className="underline"
        >
          Connect URL
        </Href>,
      );
    }
    if (requiredScopes.length) {
      schemas.push(<span>Required scopes: {requiredScopes.join(', ')}</span>);
    }
  }
  return schemas;
}

interface SecurityItemProps {
  securitySchema: SecuritySchemeInterface | null;
  protocol: string;
  requiredScopes?: string[];
}

const SecurityItem: React.FunctionComponent<SecurityItemProps> = ({
  securitySchema,
  protocol,
  requiredScopes,
}) => {
  const schemas: React.ReactNodeArray = collectSecuritySchemas(
    securitySchema,
    requiredScopes,
  );

  let renderedKafkaSecurity;
  if (['kafka', 'kafka-secure'].includes(protocol)) {
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

  const flows = securitySchema?.flows();
  const unwrappedFlows: Record<string, OAuthFlowInterface> = {};
  if (flows?.hasImplicit()) {
    unwrappedFlows.implicit = flows.implicit() as OAuthFlowInterface;
  }
  if (flows?.hasAuthorizationCode()) {
    unwrappedFlows.authorizationCode = flows.authorizationCode() as OAuthFlowInterface;
  }
  if (flows?.hasClientCredentials()) {
    unwrappedFlows.clientCredentials = flows.clientCredentials() as OAuthFlowInterface;
  }
  if (flows?.hasPassword()) {
    unwrappedFlows.password = flows.implicit() as OAuthFlowInterface;
  }
  const renderedFlows = Object.entries(unwrappedFlows).map(
    ([flowName, flow]) => {
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
    },
  );

  return (
    <div>
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

      {securitySchema?.hasDescription() && (
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
