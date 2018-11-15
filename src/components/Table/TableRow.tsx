import React, { Component } from 'react';

import { TableAccessor, TableAccessorReturn, TableColumn } from './types';

import { TableRowWrapper, TableRowWrapperWithNested, TableCell, TableRowWrapperNested, TableCellNested } from './styled';

export interface TableRowProps {
  element: any;
  accessors?: TableAccessor[];
  nested?: boolean;
  openAccordion?: boolean;
}

export class TableRow extends Component<TableRowProps> {
  constructor(props: TableRowProps) {
    super(props);
  }

  private renderRowByAccessors() {
    const { accessors, element, nested } = this.props;

    return accessors!.map((accessor, index) => (
      !nested ? (
        <TableCell key={index}>{this.getAccessor(accessor, element)}</TableCell>
      ) : (
        <TableCellNested key={index}>{this.getAccessor(accessor, element)}</TableCellNested>
      )
    ))
  }

  private getAccessor(accesor: TableAccessor, element: any): TableAccessorReturn {
    if (accesor instanceof Function) return accesor(element);

    const value = element[accesor];
    if (typeof value === 'boolean' || typeof value === 'number')
      return (value as boolean | number).toString();

    return value;
  }

  public render() {
    const { accessors, element, nested, openAccordion } = this.props;

    if ((this.props as Object).hasOwnProperty('openAccordion')) {
      return <TableRowWrapperWithNested open={openAccordion}>{accessors ? this.renderRowByAccessors() : element}</TableRowWrapperWithNested>
    }

    return (
      !nested ? (
        <TableRowWrapper>{accessors ? this.renderRowByAccessors() : element}</TableRowWrapper>
      ) : (
        <TableRowWrapperNested>{accessors ? this.renderRowByAccessors() : element}</TableRowWrapperNested>
      )
    )
  }
}
