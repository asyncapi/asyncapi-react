import React from 'react';
import { OAuthFlow } from '@asyncapi/parser';

import { ServerSecurityFlowScopes } from './Scopes';

import { bemClasses } from '../../helpers';
import { Href } from '../../components';
import { OAuthFlowsType } from '../../types';
import { FLOWS_TEXTS } from '../../constants';

interface Props {
  name: string;
  flow: OAuthFlow;
}

export const ServerSecurityFlow: React.FunctionComponent<Props> = ({
  name,
  flow,
}) => {
  const authorizationUrl = flow.authorizationUrl();
  const tokenUrl = flow.tokenUrl();
  const refreshUrl = flow.refreshUrl();
  const scopes = flow.scopes();

  return (
    <div className={bemClasses.element(`server-security-flow`)}>
      <ul className={bemClasses.element(`server-security-flow-list`)}>
        <li className={bemClasses.element(`server-security-flow-list-item`)}>
          <strong>{FLOWS_TEXTS.FLOW}</strong>:
          <span>{OAuthFlowsType[name]}</span>
        </li>
        {authorizationUrl && (
          <li className={bemClasses.element(`server-security-flow-list-item`)}>
            <strong>{FLOWS_TEXTS.AUTHORIZATION_URL}:</strong>
            <Href href={authorizationUrl}>{authorizationUrl}</Href>
          </li>
        )}
        {tokenUrl && (
          <li className={bemClasses.element(`server-security-flow-list-item`)}>
            <strong>{FLOWS_TEXTS.TOKEN_URL}</strong>:
            <Href href={tokenUrl}>{tokenUrl}</Href>
          </li>
        )}
        {refreshUrl && (
          <li className={bemClasses.element(`server-security-flow-list-item`)}>
            <strong>{FLOWS_TEXTS.REFRESH_URL}</strong>:
            <Href href={refreshUrl}>{refreshUrl}</Href>
          </li>
        )}
        {scopes && (
          <li className={bemClasses.element(`server-security-flow-list-item`)}>
            <strong>{FLOWS_TEXTS.SCOPES}</strong>:
            <ServerSecurityFlowScopes scopes={scopes} />
          </li>
        )}
      </ul>
    </div>
  );
};
