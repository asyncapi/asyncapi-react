import { styled } from '../../common';

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

export const Tag = styled.span`
  ${props => props.theme.tag}
`;