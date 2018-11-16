import { styled } from '../../common'
import SyntaxHighlighter from 'react-syntax-highlighter';

export const CodeWrapper = styled.div`
  ${props => props.theme.codeWrapper}
`;

export const CodeHeader = styled.header`
  ${props => props.theme.codeHeader}
`;

export const CodeHeaderH4 = styled.h4``;

export const CodeBody = styled(SyntaxHighlighter)`
  ${props => props.theme.codeContent}
`;
