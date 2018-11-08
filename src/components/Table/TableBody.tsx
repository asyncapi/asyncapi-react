import * as React from 'react';

import { ITableBodyProps } from './propTypes';

import TableRow from './TableRow';

import { TableBodyWrapper } from './styled';

class TableBodyComponent extends React.Component<ITableBodyProps> {
  constructor(props: ITableBodyProps) {
    super(props);
  }

  public render() {
    const { data, columns } = this.props;

    return (
      <TableBodyWrapper>
        {data.map((element, index) => (
          <TableRow key={index} columns={columns} element={element} />
        ))}
      </TableBodyWrapper>
    );
  }
}

export default TableBodyComponent;
