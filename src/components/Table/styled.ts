import { styled } from '../../common';

export const TableWrapper = styled.table`
  ${props => props.theme.table}
`;

export const TableHeaderWrapper = styled.thead`
  ${props => props.theme.tableHeader}
`;

export const TableHeaderTitle = styled.tr`
  ${props => props.theme.tableHeaderTitle}
`;

export const TableHeaderColumnsWrapper = styled.tr`
  ${props => props.theme.tableHeaderRow}
`;

export const TableHeaderColumnName = styled.th`
  ${props => props.theme.tableHeaderCell}
`;

export const TableBodyWrapper = styled.tbody`
${props => props.theme.tableBody}
`;

export const TableRowWrapper = styled.tr`
  ${props => props.theme.tableBodyRow}
`;

export const TableCell = styled.td`
  ${props => props.theme.tableBodyCell}
`;

export const TableCellWithNested = styled.td`
  ${props => props.theme.tableBodyCellWithNested}
`;

export const TableWrapperNested = styled.table`
  ${props => props.theme.tableNested}
`;

export const TableHeaderWrapperNested = styled.thead`
  ${props => props.theme.tableHeaderNested}
`;

export const TableHeaderTitleNested = styled.tr`
  ${props => props.theme.tableHeaderTitleNested}
`;

export const TableHeaderColumnsWrapperNested = styled.tr`
  ${props => props.theme.tableHeaderRowNested}
`;

export const TableHeaderColumnNameNested = styled.th`
  ${props => props.theme.tableHeaderCellNested}
`;

export const TableBodyWrapperNested = styled.tbody`
${props => props.theme.tableBodyNested}
`;

export const TableRowWrapperNested = styled.tr`
  ${props => props.theme.tableBodyRowNested}
`;

export const TableCellNested = styled.td`
  ${props => props.theme.tableBodyCellNested}
`;

export const TableFooterWrapper = styled.tfoot`
`;

export const TreeSpace = styled.span`
  ${props => props.theme.treeSpace}
`;

export const TreeLeaf = styled.span`
  ${props => props.theme.treeLeaf}
`;
