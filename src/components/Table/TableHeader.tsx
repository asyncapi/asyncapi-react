import * as React from 'react';

import { TableColumnName } from './types';

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

export interface TableHeaderProps {
  title?: string;
  columns: TableColumnName[];
  nested?: boolean;
}

export class TableHeader extends React.Component<TableHeaderProps> {
  constructor(props: TableHeaderProps) {
    super(props);
  }

  public render() {
    const { title, columns, nested } = this.props;

    return (
      !nested ? (
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
      ) : (
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
    );
  }
}
