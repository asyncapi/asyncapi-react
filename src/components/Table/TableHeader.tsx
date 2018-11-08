import * as React from 'react';

import { ITableHeaderProps } from './propTypes';

import {
  TableHeaderWrapper,
  TableHeaderTitle,
  TableHeaderColumnsWrapper,
  TableHeaderColumnName,
} from './styled';

class TableHeaderComponent extends React.Component<ITableHeaderProps> {
  constructor(props: ITableHeaderProps) {
    super(props);
  }

  public render() {
    const { title, columns } = this.props;

    return (
      <TableHeaderWrapper>
        {title && <TableHeaderTitle>{title}</TableHeaderTitle>}
        <TableHeaderColumnsWrapper>
          {columns &&
            columns.map((column, index) => (
              <TableHeaderColumnName key={index}>
                {column.name}
              </TableHeaderColumnName>
            ))}
        </TableHeaderColumnsWrapper>
      </TableHeaderWrapper>
    );
  }
}

export default TableHeaderComponent;
