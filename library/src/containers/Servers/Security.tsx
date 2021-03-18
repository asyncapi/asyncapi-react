import React from 'react';
import { SecurityScheme, ServerSecurityRequirement } from '@asyncapi/parser';

import { ServerSecurityItemComponent } from './SecurityItem';

import { Table } from '../../components';
import { bemClasses } from '../../helpers';
import { useSpec } from '../../store';
import { SECURITY_TEXT, SERVER_SECURITY_COLUMN_NAMES } from '../../constants';

interface Props {
  requirements: ServerSecurityRequirement[];
  identifier: string;
  dataIdentifier: string;
}

export const ServerSecurityComponent: React.FunctionComponent<Props> = ({
  requirements,
  identifier: id,
  dataIdentifier: dataId,
}) => {
  const asyncapi = useSpec();
  const securitySchemes =
    asyncapi.hasComponents() && asyncapi.components().securitySchemes();

  const identifier = bemClasses.identifier([
    { id, toKebabCase: false },
    'security',
  ]);
  const dataIdentifier = bemClasses.identifier([
    { id: dataId, toKebabCase: false },
    'security',
  ]);
  const className = `server-security`;

  const rows: React.ReactNodeArray = requirements
    .map(requirement => {
      const def: SecurityScheme =
        securitySchemes[Object.keys(requirement.json())[0]];

      if (!def) {
        return null;
      }
      return (
        <ServerSecurityItemComponent securityScheme={def} key={def.type()} />
      );
    })
    .filter(Boolean);

  if (!rows.length) {
    return null;
  }

  return (
    <section
      className={bemClasses.element(className)}
      data-asyncapi-id={dataIdentifier}
      id={identifier}
    >
      <header className={bemClasses.element(`${className}-header`)}>
        <h4>{SECURITY_TEXT}</h4>
      </header>
      <div className={bemClasses.element(`${className}-table`)}>
        <Table
          header={{
            columns: SERVER_SECURITY_COLUMN_NAMES,
          }}
        >
          {rows}
        </Table>
      </div>
    </section>
  );
};
