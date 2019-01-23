import styled from 'styled-components';

export const Error = styled.div`
  background-color: #ffffff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15), 0 12px 20px 0 rgba(0, 0, 0, 0.1);
  border-left: 6px solid #f44336;
  border-radius: 4px;
  color: #32363a;
  font-family: 72;
  font-size: 13px;
`;
export const ErrorHeader = styled.div`
  padding: 12px 20px;
  box-shadow: inset 0 -1px 0 0 rgba(115, 121, 128, 0.15);
  font-weight: bold;
  position: relative;
  :after {
    content: '\uE0B1';
    color: #f44336;
    position: absolute;
    display: block;
    top: 12px;
    right: 14px;
    box-sizing: border-box;
    font-family: SAP-Icons;
  }
`;
export const ErrorContent = styled.div`
  padding: 12px 20px;
  font-weight: normal;
`;

export const ErrorCode = styled.code`
  white-space: pre-wrap;
  word-break: break-word;
  font-family: monospace;
  display: block;
`;

export const ErrorPre = styled.pre`
  margin: 0;
`;
