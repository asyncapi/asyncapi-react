import * as React from 'react';

import { ITableProps } from './propTypes';

import TableHeader from './TableHeader';
import TableBody from './TableBody';

import { TableWrapper } from './styled';

class TableComponent extends React.Component<ITableProps> {
  constructor(props: ITableProps) {
    super(props);
  }

  public render() {
    const { title, columns, data } = this.props;

    return (
      <TableWrapper>
        <TableHeader title={title} columns={columns} />
        <TableBody data={data} columns={columns} />
      </TableWrapper>
    );
  }
}

export { TableComponent as Table };
