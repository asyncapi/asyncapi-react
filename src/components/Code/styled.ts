import { styled } from '../../common'

export const CodeWrapper = styled.div`
  ${props => props.theme.codeWrapper}
`;

export const CodeHeader = styled.header`
  ${props => props.theme.codeHeader}
`;

export const CodeHeaderH4 = styled.h4``;

export const PreCode = styled.pre`
  ${props => props.theme.codeContentWrapper}
`;

export const CodeBody = styled.code`
  ${props => props.theme.codeContent}
`;
