import React from 'react';
import { SecurityScheme } from '@asyncapi/parser';

import { ServerSecurityFlows } from './Flows';

import { Markdown, TableAccessor, TableRow } from '../../components';
import { bemClasses } from '../../helpers';

const securitySchemeAccessors: Array<TableAccessor<SecurityScheme>> = [
  el => <span>{el.type()}</span>,
  el => <span>{el.bearerFormat()}</span>,
  el => <span>{el.in()}</span>,
  el => <span>{el.scheme()}</span>,
  el => <span>{el.name()}</span>,
  el => el.hasDescription() && <Markdown>{el.description()}</Markdown>,
];

interface Props {
  securityScheme: SecurityScheme;
}

export const ServerSecurityItemComponent: React.FunctionComponent<Props> = ({
  securityScheme,
}) => (
  <>
    <TableRow
      element={securityScheme}
      accessors={securitySchemeAccessors}
      className={bemClasses.element(`server-security-${securityScheme.type()}`)}
    />
    {securityScheme.flows && (
      <ServerSecurityFlows flows={securityScheme.flows()} />
    )}
  </>
);
