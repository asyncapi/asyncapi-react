import * as React from 'react';

import { TableFooterWrapper } from './styled';

export interface TableFooterProps {}

export class TableFooterComponent extends React.Component<TableFooterProps> {
  constructor(props: TableFooterProps) {
    super(props);
  }

  public render() {
    return <TableFooterWrapper />;
  }
}
