import { styled } from '../theme';

// Code Component
export const CodeWrapper = styled.div`
  ${props => props.theme.codeWrapper}
`;

export const CodeHeader = styled.header`
  ${props => props.theme.codeHeader}
`;

export const CodeHeaderH4 = styled.h4``;

export const CodeBody = styled.pre`
  ${props => props.theme.codeContent}
`;

// Markdown Component
export const Markdown = styled.div`
  ${props => props.theme.markdown}
`;

// Headers Components
export const Header = styled.header`
  ${props => props.theme.header}
`;

export const H1 = styled.h1`
  ${props => props.theme.h1}
`;

export const H2 = styled.h2`
  ${props => props.theme.h2}
`;

export const H3 = styled.h3`
  ${props => props.theme.h3}
`;

export const H4 = styled.h4`
  ${props => props.theme.h4}
`;
H4.displayName = 'StyledH4';
export const H5 = styled.h5`
  ${props => props.theme.h5}
`;

export const H6 = styled.h6`
  ${props => props.theme.h6}
`;

export const HeaderParagraph = styled.div`
  ${props => props.theme.headerParagraph}
`;

export const HrefHeader = styled.a`
  ${props => props.theme.hrefHeader}
`;

// Tale Components
interface TableRowWithNestedProps {
  open?: boolean;
}

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

export const TableRowWrapperWithNested = styled.tr`
  ${props => props.theme.tableBodyRowWithNested}
  > td > div {
    ${(props: TableRowWithNestedProps) =>
      props.open ? 'max-height: 250px;' : ''}
  }
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

export const TableFooterWrapper = styled.tfoot``;

export const TreeSpace = styled.span`
  ${props => props.theme.treeSpace}
`;

export const TreeLeaf = styled.span`
  ${props => props.theme.treeLeaf}
`;

// Tags and Badges components
export const Badge = styled.span`
  ${props => props.theme.badge}
`;

export const PublishBadge = styled(Badge)`
  ${props => props.theme.publishBadge}
`;

export const SubscribeBadge = styled(Badge)`
  ${props => props.theme.subscribeBadge}
`;

export const DeprecatedBadge = styled(Badge)`
  ${props => props.theme.deprecatedBadge}
`;

export const RequiredBadge = styled(Badge)`
  ${props => props.theme.requiredBadge}
`;

export const GeneratedBadge = styled(Badge)`
  ${props => props.theme.generatedBadge}
`;

export const Tag = styled.span`
  ${props => props.theme.tag}
`;
