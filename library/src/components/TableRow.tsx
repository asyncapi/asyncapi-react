import React, { Component } from 'react';

export type TableAccessor = ((arg: any) => any) | string;
export type TableAccessorReturn = React.ReactNode;

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

    if (this.props.hasOwnProperty('openAccordion')) {
      return (
        <TableRowWrapperWithNested open={openAccordion}>
          {accessors
            ? this.renderRowByAccessors(accessors, element, !!nested)
            : element}
        </TableRowWrapperWithNested>
      );
    }

    return !nested ? (
      <TableRowWrapper>
        {accessors
          ? this.renderRowByAccessors(accessors, element, !!nested)
          : element}
      </TableRowWrapper>
    ) : (
      <TableRowWrapperNested>
        {accessors
          ? this.renderRowByAccessors(accessors, element, !!nested)
          : element}
      </TableRowWrapperNested>
    );
  }

  private renderRowByAccessors(
    accessors: TableAccessor[],
    element: any,
    nested: boolean,
  ) {
    return accessors.map((accessor, index) =>
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
