import React, { Component } from 'react';

export type TableAccessorReturn = React.ReactNode;
export type TableAccessor =
  | ((arg: Record<string, any>) => TableAccessorReturn)
  | string;

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

    const content = accessors
      ? this.renderRowByAccessors(accessors, element, !!nested)
      : element;

    if (this.props.hasOwnProperty('openAccordion')) {
      return (
        <TableRowWrapperWithNested open={openAccordion}>
          {content}
        </TableRowWrapperWithNested>
      );
    }

    return !nested ? (
      <TableRowWrapper>{content}</TableRowWrapper>
    ) : (
      <TableRowWrapperNested>{content}</TableRowWrapperNested>
    );
  }

  private renderRowByAccessors(
    accessors: TableAccessor[],
    element: Record<string, any>,
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
    element: Record<string, any>,
  ): TableAccessorReturn {
    if (accessor instanceof Function) {
      return accessor(element);
    }

    const value = element[accessor];
    if (typeof value === 'boolean' || typeof value === 'number') {
      return value.toString();
    }
    return value;
  }
}
