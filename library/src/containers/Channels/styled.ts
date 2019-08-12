import { styled } from '../../theme';

//just so that it looks nice while I develop

export const StyledChannels = styled.div`
  ${props => props.theme.schemas}
`;

export const StyledChannel = styled.div`
  ${props => props.theme.schema}
`;

export const ChannelsHeader = styled.header`
  ${props => props.theme.schemasHeader}
`;

export const ChannelHeader = styled.header`
  ${props => props.theme.schemaHeader}
`;
