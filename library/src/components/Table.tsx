import React from 'react';

import { TableHeader, TableHeaderProps } from './TableHeader';
import { TableRow, TableRowProps, TableAccessor } from './TableRow';

import { createNestedClassName } from '../helpers';

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
  nested = false,
  children,
}) => {
  if (!children && !rows.length) {
    return null;
  }

  const tableClassName = createNestedClassName(`table`, nested);
  const tableBodyClassName = createNestedClassName(`table-body`, nested);

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
