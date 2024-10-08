import React from 'react';
import {
  OAuthFlowInterface,
  SecurityRequirementsInterface,
  SecuritySchemeInterface,
} from '@asyncapi/parser';

import { Href, Markdown } from '../../components';
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
  let renderedSecurities;
  if (!security?.length) {
    if (protocol === 'kafka' || protocol === 'kafka-secure') {
      renderedSecurities = (
        <SecurityItem protocol={protocol} securitySchema={null} />
      );
    }
  } else {
    const securities: React.ReactNode[] = Object.values(security)
      .map((requirements) => requirements.all())
      .flat()
      .map((requirement) => {
        const def = requirement.scheme();
        const requiredScopes = requirement.scopes();

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
): React.ReactNode[] {
  const schemas: React.ReactNode[] = [];
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
        <Href href={securitySchema.openIdConnectUrl()!} className="underline">
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
  const schemas: React.ReactNode[] = collectSecuritySchemas(
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
            <strong className="text-xs text-gray-600 mt-1 mr-1 uppercase">
              security.protocol:
            </strong>
            <strong className="inline-block no-underline bg-indigo-400 text-white text-xs rounded py-0 px-1 ml-1">
              {securityProtocol}
            </strong>
          </div>
        )}
        {saslMechanism && (
          <div className="mt-1">
            <strong className="text-xs text-gray-600 mt-1 mr-1 uppercase">
              sasl.mechanism:
            </strong>
            <strong className="inline-block no-underline bg-indigo-400 text-white text-xs rounded py-0 px-1 ml-1">
              {saslMechanism}
            </strong>
          </div>
        )}
      </div>
    );
  }

  const flows = securitySchema?.flows();
  const unwrappedFlows: Record<string, OAuthFlowInterface> = {};
  if (flows?.hasImplicit()) {
    unwrappedFlows.implicit = flows.implicit()!;
  }
  if (flows?.hasAuthorizationCode()) {
    unwrappedFlows.authorizationCode = flows.authorizationCode()!;
  }
  if (flows?.hasClientCredentials()) {
    unwrappedFlows.clientCredentials = flows.clientCredentials()!;
  }
  if (flows?.hasPassword()) {
    unwrappedFlows.password = flows.password()!;
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
            <strong className="text-xs text-gray-600 mt-1 mr-1 uppercase">
              Flow:
            </strong>
            <strong className="text-xs text-gray-600 mt-1 mr-1 uppercase">
              {ServerHelpers.flowName(flowName)}
            </strong>
          </div>

          {authorizationUrl && (
            <div className="mt-1">
              <strong className="text-xs text-gray-600 mt-1 mr-1 uppercase">
                Auth URL:
              </strong>
              <Href href={authorizationUrl} className="underline">
                {authorizationUrl}
              </Href>
            </div>
          )}
          {tokenUrl && (
            <div className="mt-1">
              <strong className="text-xs text-gray-600 mt-1 mr-1 uppercase">
                Token URL:
              </strong>
              <Href href={tokenUrl} className="underline">
                {tokenUrl}
              </Href>
            </div>
          )}
          {refreshUrl && (
            <div className="mt-1">
              <strong className="text-xs text-gray-600 mt-1 mr-1 uppercase">
                Refresh URL:
              </strong>
              <Href href={refreshUrl} className="underline">
                {refreshUrl}
              </Href>
            </div>
          )}
          {scopes && (
            <div className="mt-1">
              <strong className="text-xs text-gray-600 mt-1 mr-1 uppercase">
                Scopes:
              </strong>
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
