import React, { FunctionComponent } from 'react';
import MessageComponent from '../Messages/Message';
import { Operation as OperationType } from '../../types';

import { TopicMessage } from './styled';

interface Props {
  operation?: OperationType;
}

export const Operation: FunctionComponent<Props> = ({ operation }) => {
  if (!operation || !operation.message) {
    return null;
  }

  return (
    <TopicMessage>
      <MessageComponent message={operation.message} />
    </TopicMessage>
  );
};
