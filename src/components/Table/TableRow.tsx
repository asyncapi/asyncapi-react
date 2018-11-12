import React, { Component } from 'react';

import { TableAccesor, TableAccesorReturn, TableColumn } from './types';

import { TableRowWrapper, TableCell, TableRowWrapperNested, TableCellNested } from './styled';

export interface TableRowProps {
  element: any;
  accesors?: TableAccesor[];
  nested?: boolean;
}

export class TableRow extends Component<TableRowProps> {
  constructor(props: TableRowProps) {
    super(props);
  }

  private renderRowByAccesors() {
    const { accesors, element, nested } = this.props;

    return accesors!.map((accesor, index) => (
      !nested ? (
        <TableCell key={index}>{this.getAccesor(accesor, element)}</TableCell>
      ) : (
        <TableCellNested key={index}>{this.getAccesor(accesor, element)}</TableCellNested>
      )
    ))
  }

  private getAccesor(accesor: TableAccesor, element: any): TableAccesorReturn {
    if (accesor instanceof Function) return accesor(element);

    const value = element[accesor];
    if (typeof value === 'boolean' || typeof value === 'number')
      return (value as boolean | number).toString();

    return value;
  }

  public render() {
    const { accesors, element, nested } = this.props;

    return (
      !nested ? (
        <TableRowWrapper>{accesors ? this.renderRowByAccesors() : element}</TableRowWrapper>
      ) : (
        <TableRowWrapperNested>{accesors ? this.renderRowByAccesors() : element}</TableRowWrapperNested>
      )
    )
  }
}
