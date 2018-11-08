import * as React from 'react';

import { ITableFooterProps } from './propTypes';

import { TableFooterWrapper } from './styled';

class TableFooterComponent extends React.Component<ITableFooterProps> {
  constructor(props: ITableFooterProps) {
    super(props);
  }

  public render() {
    return <TableFooterWrapper />;
  }
}

export default TableFooterComponent;
