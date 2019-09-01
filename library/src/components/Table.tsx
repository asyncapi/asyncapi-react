import React from 'react';

import { TableHeader, TableHeaderProps } from './TableHeader';
import { TableRow, TableRowProps, TableAccessor } from './TableRow';

import { bemClasses } from '../helpers';

interface Props {
  header: TableHeaderProps;
  rows?: TableRowProps[];
  accessors?: TableAccessor[];
  nested?: boolean;
}

export const Table: React.FunctionComponent<Props> = ({
  header,
  rows = [],
  accessors = [],
  nested,
  children,
}) => {
  if (!children && !rows.length) {
    return null;
  }

  const tableClassName = nested
    ? bemClasses.modifier(`nested`, `table`)
    : bemClasses.element(`table`);
  const tableBodyClassName = nested
    ? bemClasses.modifier(`nested`, `table-body`)
    : bemClasses.element(`table-body`);

  return (
    <table className={tableClassName}>
      <TableHeader {...header} nested={header.nested || nested} />
      <tbody className={tableBodyClassName}>
        {children
          ? children
          : rows.map((row, index) => (
              <TableRow
                {...row}
                key={index}
                accessors={row.accessors || accessors}
                nested={row.nested || nested}
              />
            ))}
      </tbody>
    </table>
  );
};
