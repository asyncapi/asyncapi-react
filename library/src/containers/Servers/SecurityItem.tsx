import React from 'react';

import { ServerSecurityFlows } from './Flows';

import { SecurityScheme } from '../../types';
import { Markdown, TableAccessor, TableRow } from '../../components';
import { bemClasses } from '../../helpers';

const securitySchemeAccessors: Array<TableAccessor<SecurityScheme>> = [
  el => el.type,
  el => el.bearerFormat,
  el => el.in,
  el => el.scheme,
  el => el.name,
  el => el.description && <Markdown>{el.description}</Markdown>,
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
      nested={true}
      className={bemClasses.element(`server-security-${securityScheme.type}`)}
    />
    {securityScheme.flows && (
      <ServerSecurityFlows flows={securityScheme.flows} />
    )}
  </>
);
