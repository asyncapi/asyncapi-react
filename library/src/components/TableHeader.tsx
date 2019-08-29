import React from 'react';

import { TableAccessor } from './TableRow';

import { bemClasses } from '../helpers';
import { TableColumnName } from '../types';

export interface TableColumn {
  name: string;
  accessor: TableAccessor;
}

export interface TableHeaderProps {
  title?: string;
  columns: TableColumnName[];
  nested?: boolean;
}

export const TableHeader: React.FunctionComponent<TableHeaderProps> = ({
  title = '',
  columns = [],
  nested = false,
}) => {
  if (!columns) {
    return null;
  }

  const createClassName = (className: string): string =>
    nested
      ? bemClasses.modifier(`nested`, className)
      : bemClasses.element(className);

  return (
    <thead className={createClassName(`table-header`)}>
      {title && (
        <tr className={createClassName(`table-header-title`)}>
          <td colSpan={columns.length}>{title}</td>
        </tr>
      )}
      <tr className={createClassName(`table-header-columns`)}>
        {columns.map((column, index) => (
          <th key={index} className={createClassName(`table-header-column`)}>
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};
