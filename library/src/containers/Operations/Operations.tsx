import React from 'react';

import { Operation } from './Operation';
import { useConfig, useSpec } from '../../contexts';
import { CommonHelpers } from '../../helpers';
import { OPERATIONS_TEXT } from '../../constants';
import { PayloadType } from '../../types';

export const Operations: React.FunctionComponent = () => {
  const operations = useSpec().operations();
  const config = useConfig();

  if (!Object.keys(operations).length) {
    return null;
  }

  const operationsList: React.ReactNodeArray = [];
  Object.entries(operations).forEach(([operationName, operation]) => {
    if (operation.isSend()) {
      operationsList.push(
        <li
          className="mb-12"
          key={`pub-${operationName}`}
          id={CommonHelpers.getIdentifier(
            `operation-${PayloadType.PUBLISH}-${operationName}`,
            config,
          )}
        >
          <Operation
            type={PayloadType.PUBLISH}
            operation={operation}
            channelName={operationName}
            channel={operation.channels()[0]}
          />
        </li>,
      );
    }
    if (operation.isReceive()) {
      operationsList.push(
        <li
          className="mb-12"
          key={`sub-${operationName}`}
          id={CommonHelpers.getIdentifier(
            `operation-${PayloadType.SUBSCRIBE}-${operationName}`,
            config,
          )}
        >
          <Operation
            type={PayloadType.SUBSCRIBE}
            operation={operation}
            channelName={operationName}
            channel={operation.channels()[0]}
          />
        </li>,
      );
    }
  });

  return (
    <section
      id={`${CommonHelpers.getIdentifier('operations', config)}`}
      className="mt-16"
    >
      <h2 className="2xl:w-7/12 text-3xl font-light mb-4 px-8">
        {OPERATIONS_TEXT}
      </h2>
      <ul>{operationsList}</ul>
    </section>
  );
};
