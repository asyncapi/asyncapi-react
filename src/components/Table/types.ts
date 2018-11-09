export type TableAccesor = Function| string;
export type TableAccesorReturn = React.ReactNode | string;
export type TableColumn = {
  name: string;
  accesor: TableAccesor;
};
