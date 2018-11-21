import * as React from 'react';

import { TableAccessor } from './TableRow';

export type TableColumnName = string;
export type TableColumn = {
  name: string;
  accessor: TableAccessor;
};

import {
  TableHeaderWrapper,
  TableHeaderTitle,
  TableHeaderColumnsWrapper,
  TableHeaderColumnName,
  TableHeaderWrapperNested,
  TableHeaderTitleNested,
  TableHeaderColumnsWrapperNested,
  TableHeaderColumnNameNested,
} from './styled';

interface Props {
  title?: string;
  columns: TableColumnName[];
  nested?: boolean;
}

export class TableHeader extends React.Component<Props> {
  render() {
    const { title, columns, nested } = this.props;

    if (nested) {
      return (
        <TableHeaderWrapperNested>
          {title && <TableHeaderTitleNested><td colSpan={columns.length}>{title}</td></TableHeaderTitleNested>}
          <TableHeaderColumnsWrapperNested>
            {columns &&
              columns.map((column, index) => (
                <TableHeaderColumnNameNested key={index}>
                  {column}
                </TableHeaderColumnNameNested>
              ))}
          </TableHeaderColumnsWrapperNested>
        </TableHeaderWrapperNested>
      )
    }

    return (
      <TableHeaderWrapper>
        {title && <TableHeaderTitle><td colSpan={columns.length}>{title}</td></TableHeaderTitle>}
        <TableHeaderColumnsWrapper>
          {columns &&
            columns.map((column, index) => (
              <TableHeaderColumnName key={index}>
                {column}
              </TableHeaderColumnName>
            ))}
        </TableHeaderColumnsWrapper>
      </TableHeaderWrapper>
    )
  }
}
