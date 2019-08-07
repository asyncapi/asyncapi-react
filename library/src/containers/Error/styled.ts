import { styled } from '../../theme';
export const ErrorWrapper = styled.div`
  ${props => props.theme.errorWrapper}
`;
export const ErrorHeader = styled.div`
  ${props => props.theme.errorHeader}
`;
export const ErrorContent = styled.div`
  ${props => props.theme.errorContent}
`;

export const ErrorCode = styled.code`
  ${props => props.theme.errorCode}
`;

export const ErrorPre = styled.pre`
  ${props => props.theme.errorPre}
`;
