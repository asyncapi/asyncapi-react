import React, { Component } from 'react';

export type TableAccessor = Function | string;
export type TableAccessorReturn = React.ReactNode | string;

import {
  TableRowWrapper,
  TableRowWrapperWithNested,
  TableCell,
  TableRowWrapperNested,
  TableCellNested,
} from './styled';

export interface Props {
  element: any;
  accessors?: TableAccessor[];
  nested?: boolean;
  openAccordion?: boolean;
}

export class TableRow extends Component<Props> {
  render() {
    const { accessors, element, nested, openAccordion } = this.props;

    if ((this.props as Object).hasOwnProperty('openAccordion')) {
      return (
        <TableRowWrapperWithNested open={openAccordion}>
          {accessors ? this.renderRowByAccessors() : element}
        </TableRowWrapperWithNested>
      );
    }

    return !nested ? (
      <TableRowWrapper>
        {accessors ? this.renderRowByAccessors() : element}
      </TableRowWrapper>
    ) : (
      <TableRowWrapperNested>
        {accessors ? this.renderRowByAccessors() : element}
      </TableRowWrapperNested>
    );
  }
  private renderRowByAccessors() {
    const { accessors, element, nested } = this.props;

    console.log('element', element);

    return accessors!.map((accessor, index) =>
      !nested ? (
        <TableCell key={index}>{this.getAccessor(accessor, element)}</TableCell>
      ) : (
        <TableCellNested key={index}>
          {this.getAccessor(accessor, element)}
        </TableCellNested>
      ),
    );
  }

  private getAccessor(
    accessor: TableAccessor,
    element: any,
  ): TableAccessorReturn {
    // console.group();
    // console.log(element);
    // console.groupEnd();

    if (accessor instanceof Function) {
      return accessor(element);
    }

    const value = element[accessor];
    if (typeof value === 'boolean' || typeof value === 'number') {
      return (value as boolean | number).toString();
    }
    return value;
  }
}
