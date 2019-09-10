import React from 'react';

import { ServerSecurityFlowScopes } from './Scopes';

import { bemClasses } from '../../helpers';
import { Href } from '../../components';
import { OAuthFlow, OAuthFlowsType } from '../../types';
import { FLOWS_TEXTS } from '../../constants';

interface Props {
  name: string;
  flow: OAuthFlow;
}

export const ServerSecurityFlow: React.FunctionComponent<Props> = ({
  name,
  flow,
}) => (
  <div className={bemClasses.element(`server-security-flow`)}>
    <ul className={bemClasses.element(`server-security-flow-list`)}>
      <li className={bemClasses.element(`server-security-flow-list-item`)}>
        <strong>{FLOWS_TEXTS.FLOW}</strong>:<span>{OAuthFlowsType[name]}</span>
      </li>
      {flow.authorizationUrl && (
        <li className={bemClasses.element(`server-security-flow-list-item`)}>
          <strong>{FLOWS_TEXTS.AUTHORIZATION_URL}:</strong>
          <Href href={flow.authorizationUrl}>{flow.authorizationUrl}</Href>
        </li>
      )}
      {flow.tokenUrl && (
        <li className={bemClasses.element(`server-security-flow-list-item`)}>
          <strong>{FLOWS_TEXTS.TOKEN_URL}</strong>:
          <Href href={flow.tokenUrl}>{flow.tokenUrl}</Href>
        </li>
      )}
      {flow.refreshUrl && (
        <li className={bemClasses.element(`server-security-flow-list-item`)}>
          <strong>{FLOWS_TEXTS.REFRESH_URL}</strong>:
          <Href href={flow.refreshUrl}>{flow.refreshUrl}</Href>
        </li>
      )}
      {flow.scopes && (
        <li className={bemClasses.element(`server-security-flow-list-item`)}>
          <strong>{FLOWS_TEXTS.SCOPES}</strong>:
          <ServerSecurityFlowScopes scopes={flow.scopes} />
        </li>
      )}
    </ul>
  </div>
);
