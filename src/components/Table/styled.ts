import styled from 'styled-components';

export const TableWrapper = styled.div`
  border-radius: 4px;
  background-color: #ffffff;
`;

export const TableHeaderWrapper = styled.thead`
  width: 100%;
  background-color: #fff;
  font-family: '72';
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const TableHeaderTitle = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #32363a;
  padding: 14px 20px;
`;

export const TableHeaderColumnsWrapper = styled.tr`
  background-color: rgba(243, 244, 245, 0.45);
  border-top: 1px solid #efeff0;
`;

export const TableHeaderColumnName = styled.th`
  padding: 13px 20px;
  height: 13px;
  opacity: 0.6;
  font-size: 11px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #32363a;
  text-transform: uppercase;
`;

export const TableBodyWrapper = styled.tbody`
  width: 100%;
  background-color: #fff;
  font-family: '72';
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  min-height: 40px;
  text-align: center;
  font-size: 14px;
  line-height: 40px;

  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

export const TableRowWrapper = styled.tr``;

export const TableCell = styled.td`
  font-size: 14px;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: left;
  padding: 15px 20px;
  color: #32363b;
  color: ${props => props.color};
`;

export const TableFooterWrapper = styled.tfoot``;

// margin: ${props => props.margin};

// cursor: ${props => (props.pointer ? 'pointer' : 'auto')};
// font-weight: ${props => (props.fontWeight ? props.fontWeight : 'normal')};
