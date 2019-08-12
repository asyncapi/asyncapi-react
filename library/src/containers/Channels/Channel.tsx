import React, { FunctionComponent } from 'react';
import { StyledChannel, ChannelHeader } from './styled';
import { H4 } from '../../components';
import { ChannelItem } from '../../types';
import { Parameters } from './Parameters';

interface Props {
  name: string;
  data: ChannelItem;
}

export const Channel: FunctionComponent<Props> = ({ name, data }) => {
  // console.log(data);
  return (
    <StyledChannel>
      <ChannelHeader>
        <H4>{name}</H4>
      </ChannelHeader>
      {data.description ? <p>{data.description}</p> : null}
      {data.deprecated ? <p>Deprecated</p> : null}
      {data.parameters && <Parameters params={data.parameters} />}
    </StyledChannel>
  );
};
