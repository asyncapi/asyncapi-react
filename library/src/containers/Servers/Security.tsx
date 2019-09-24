import React from 'react';

import { ServerSecurityItemComponent } from './SecurityItem';

import { Table } from '../../components';
import { bemClasses } from '../../helpers';
import {
  Components,
  SecurityRequirement,
  ExcludeNullable,
  SecurityScheme,
} from '../../types';
import { SECURITY_TEXT, SERVER_SECURITY_COLUMN_NAMES } from '../../constants';

interface Props {
  requirements: SecurityRequirement[];
  schemes: ExcludeNullable<Components['securitySchemes']>;
  openAccordion?: boolean;
  identifier: string;
}

export const ServerSecurityComponent: React.FunctionComponent<Props> = ({
  requirements,
  schemes,
  identifier: id,
}) => {
  const identifier = bemClasses.identifier([
    { id, toKebabCase: false },
    'security',
  ]);
  const className = `server-security`;

  const rows: React.ReactNodeArray = requirements
    .map(requirement => {
      const def: SecurityScheme | undefined =
        schemes[Object.keys(requirement)[0]];

      if (!def) {
        return null;
      }
      return (
        <ServerSecurityItemComponent securityScheme={def} key={def.type} />
      );
    })
    .filter(Boolean);

  if (!rows || !rows.length) {
    return null;
  }

  return (
    <section className={bemClasses.element(className)} id={identifier}>
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
