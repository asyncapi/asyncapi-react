import React, { Component } from 'react';

import { TableAccesor, TableAccesorReturn, TableColumn } from './types';
import { ITableRowProps } from './propTypes';

import { TableRowWrapper, TableCell } from './styled';

class TableRowComponent extends Component<ITableRowProps> {
  constructor(props: ITableRowProps) {
    super(props);
  }

  private getAccesor(column: TableColumn, element: any): TableAccesorReturn {
    if (column.accesor instanceof Function) return column.accesor(element);

    const value = element[column.accesor];
    if (typeof value === 'boolean' || typeof value === 'number')
      return (value as boolean | number).toString();

    return value;
  }

  public render() {
    const { columns, element } = this.props;

    const renderRow: React.ReactNodeArray | null = element
      ? columns.map((column, index) => (
          <TableCell key={index}>{this.getAccesor(column, element)}</TableCell>
        ))
      : null;

    return <TableRowWrapper>{renderRow}</TableRowWrapper>;
  }
}

export default TableRowComponent;
