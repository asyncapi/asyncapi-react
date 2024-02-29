import React from 'react';
import { Operation } from './Operation';
import { useConfig, useSpec } from '../../contexts';
import { CommonHelpers } from '../../helpers';
import { OPERATIONS_TEXT } from '../../constants';

export const Operations: React.FunctionComponent = () => {
  const operations = useSpec()
    .operations()
    .all();
  const config = useConfig();

  if (!Object.keys(operations).length) {
    return null;
  }

  const operationsList: React.ReactNodeArray = operations.map(operation => {
    const channel = operation.channels().all()[0];
    const channelAddress = channel?.address() ?? '';
    const operationId = CommonHelpers.getOperationIdentifier({
      operation,
      config,
    });
    const type = CommonHelpers.getOperationType(operation);
    return (
      <li className="mb-12" key={`${type}-${operation.id()}`} id={operationId}>
        <Operation
          type={type}
          operation={operation}
          channelName={channelAddress}
          channel={channel}
        />
      </li>
    );
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
