export type TableAccessor = Function| string;
export type TableAccessorReturn = React.ReactNode | string;
export type TableColumnName = string;
export type TableColumn = {
  name: string;
  accesor: TableAccessor;
};
