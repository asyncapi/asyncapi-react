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

  const className = `table`;
  return (
    <table
      className={
        nested
          ? bemClasses.modifier(`nested`, className)
          : bemClasses.element(className)
      }
    >
      <TableHeader {...header} nested={header.nested || nested} />
      <tbody className={bemClasses.element(`table-body`)}>
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
