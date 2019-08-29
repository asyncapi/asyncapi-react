import React from 'react';

import { MessageComponent } from '../Messages/Message';

import { bemClasses } from '../../helpers';
import { Operation as OperationType } from '../../types';

interface Props {
  operation?: OperationType;
}

export const Operation: React.FunctionComponent<Props> = ({ operation }) => {
  if (!operation || !operation.message) {
    return null;
  }

  return (
    <section className={bemClasses.element(`operation`)}>
      <MessageComponent message={operation.message} />
    </section>
  );
};
