import { styled } from '../../common';

interface ServerExpandIconProps {
  open?: boolean
}

export const Servers = styled.div`
  ${props => props.theme.servers}
`;

export const ServerExpandIcon = styled.span`
  ${props => props.theme.serverExpandIcon}
  ${(props: ServerExpandIconProps) => props.open ? 'transform: rotate(90deg);' : ''}
`;

export const ServersHeader = styled.header`
  ${props => props.theme.serversHeader}
`;

export const ServerVariablesEnumList = styled.ul`
  ${props => props.theme.serverVariablesEnumList}
`;

export const ServerVariablesEnumElement = styled.li`
  ${props => props.theme.serverVariablesEnumElement}
`;
