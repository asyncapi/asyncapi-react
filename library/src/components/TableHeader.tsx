import React from 'react';

import { TableAccessor } from './TableRow';

import { createNestedClassName } from '../helpers';
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

  return (
    <thead className={createNestedClassName(`table-header`, nested)}>
      {title && (
        <tr className={createNestedClassName(`table-header-title`, nested)}>
          <td colSpan={columns.length}>{title}</td>
        </tr>
      )}
      <tr className={createNestedClassName(`table-header-columns`, nested)}>
        {columns.map((column, index) => (
          <th
            key={index}
            className={createNestedClassName(`table-header-column`, nested)}
          >
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};
