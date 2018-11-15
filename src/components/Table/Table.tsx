import * as React from 'react';

import { TableColumn } from './types';

import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';

import { TableWrapper } from './styled';

export interface TableProps {
  title?: string;
  columns: TableColumn[];
  data: any[];
}

class TableComponent extends React.Component<TableProps> {
  constructor(props: TableProps) {
    super(props);
  }

  public render() {
    const { title, columns, data } = this.props;

    return (
      <TableWrapper>
        <TableHeader title={title} columns={columns.map(column => column.name)} />
        <TableBody data={data} accessors={columns.map(column => column.accesor)} />
      </TableWrapper>
    );
  }
}

export { TableComponent as Table };
