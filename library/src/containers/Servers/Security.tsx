import React from 'react';

import { ServerSecurityItemComponent } from './SecurityItem';

import { Table, TableRow } from '../../components';
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
}

export const ServerSecurityComponent: React.FunctionComponent<Props> = ({
  requirements,
  schemes,
  openAccordion = false,
}) => {
  const rows: React.ReactNodeArray = requirements.map(requirement => {
    const def: SecurityScheme = schemes[Object.keys(requirement)[0]];

    return <ServerSecurityItemComponent securityScheme={def} key={def.type} />;
  });

  const nestedTableCellClassName = bemClasses.modifier(`nested`, `table-cell`);
  const securityTableCellClassName = bemClasses.element(
    `server-security-table-cell`,
  );
  const className = bemClasses.concatenate([
    nestedTableCellClassName,
    securityTableCellClassName,
  ]);

  const element = (
    <td className={className} colSpan={4}>
      <div className={bemClasses.element(`server-security`)}>
        <Table
          header={{
            title: SECURITY_TEXT,
            columns: SERVER_SECURITY_COLUMN_NAMES,
          }}
          nested={true}
        >
          {rows}
        </Table>
      </div>
    </td>
  );

  return (
    <TableRow
      openAccordion={openAccordion}
      accordion={true}
      element={element}
      nested={true}
    />
  );
};
