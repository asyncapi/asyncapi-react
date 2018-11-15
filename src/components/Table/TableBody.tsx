import * as React from 'react';

import { TableAccessor } from './types';

import { TableRow } from './TableRow';

import { TableBodyWrapper } from './styled';

export interface TableBodyProps {
  data: any[];
  accessors: TableAccessor[];
}

export class TableBody extends React.Component<TableBodyProps> {
  constructor(props: TableBodyProps) {
    super(props);
  }

  public render() {
    const { data, accessors } = this.props;

    return (
      <TableBodyWrapper>
        {data.map((element, index) => (
          <TableRow key={index} accessors={accessors} element={element} />
        ))}
      </TableBodyWrapper>
    );
  }
}

