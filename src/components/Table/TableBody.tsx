import * as React from 'react';

import { TableAccesor } from './types';

import { TableRow } from './TableRow';

import { TableBodyWrapper } from './styled';

export interface TableBodyProps {
  data: any[];
  accesors: TableAccesor[];
}

export class TableBody extends React.Component<TableBodyProps> {
  constructor(props: TableBodyProps) {
    super(props);
  }

  public render() {
    const { data, accesors } = this.props;

    return (
      <TableBodyWrapper>
        {data.map((element, index) => (
          <TableRow key={index} accesors={accesors} element={element} />
        ))}
      </TableBodyWrapper>
    );
  }
}

