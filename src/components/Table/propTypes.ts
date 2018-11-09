import { TableAccesor, TableColumn } from './types';

export interface ITableProps {
  title?: string;
  columns: TableColumn[];
  data: any[];
}

export interface ITableHeaderProps {
  title?: string;
  columns: TableColumn[];
}

export interface ITableBodyProps {
  data: any[];
  columns: TableColumn[];
}

export interface ITableRowProps {
  element: any;
  columns: TableColumn[];
}

export interface ITableFooterProps {}
