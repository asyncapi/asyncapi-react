import { styled } from '../../theme';

//just so that it looks nice while I develop

export const StyledChannels = styled.div`
  ${props => props.theme.messages}
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

export const Topics = styled.div`
  ${props => props.theme.topics}
`;

export const TopicsHeader = styled.header`
  ${props => props.theme.topicsHeader}
`;

export const Topic = styled.div`
  ${props => props.theme.topic}
`;

export const TopicHeader = styled.header`
  ${props => props.theme.topicHeader}
`;

export const TopicHeaderBadge = styled.div`
  ${props => props.theme.topicHeaderBadge}
`;

export const TopicMessage = styled.section`
  ${props => props.theme.topicMessage}
`;

export const TopicHeaderMessage = styled.header`
  ${props => props.theme.topicHeaderMessage}
`;

export const Parameters = styled.div`
  ${props => props.theme.parameters}
`;

export const ParametersHeader = styled.header`
  ${props => props.theme.parametersHeader}
`;

export const Parameter = styled.div`
  ${props => props.theme.parameter}
`;

export const ParameterHeader = styled.header`
  ${props => props.theme.parameterHeader}
`;
