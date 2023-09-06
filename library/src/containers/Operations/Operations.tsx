import React from 'react';

import { Operation } from './Operation';
import { useConfig, useSpec } from '../../contexts';
import { CommonHelpers } from '../../helpers';
import { OPERATIONS_TEXT } from '../../constants';
import { PayloadType } from '../../types';

export const Operations: React.FunctionComponent = () => {
  const operations = useSpec()
    .operations()
    .all();
  const config = useConfig();

  if (!Object.keys(operations).length) {
    return null;
  }

  const operationsList: React.ReactNodeArray = [];
  operations.forEach(operation => {
    const channel = operation.channels().all()[0];
    const channelAddress = channel?.address() ?? '';
    if (operation.isSend()) {
      if (operation.reply() !== undefined) {
        operationsList.push(
          <li
            className="mb-12"
            key={`req-${operation.id()}`}
            id={CommonHelpers.getIdentifier(
              `operation-${PayloadType.REQUEST}-${operation.id()}`,
              config,
            )}
          >
            <Operation
              type={PayloadType.REQUEST}
              operation={operation}
              channelName={channelAddress}
              channel={channel}
            />
          </li>,
        );
      } else {
        operationsList.push(
          <li
            className="mb-12"
            key={`pub-${operation.id()}`}
            id={CommonHelpers.getIdentifier(
              `operation-${PayloadType.PUBLISH}-${operation.id()}`,
              config,
            )}
          >
            <Operation
              type={PayloadType.PUBLISH}
              operation={operation}
              channelName={channelAddress}
              channel={channel}
            />
          </li>,
        );
      }
    }
    if (operation.isReceive()) {
      if (operation.reply() !== undefined) {
        operationsList.push(
          <li
            className="mb-12"
            key={`replier-${operation.id()}`}
            id={CommonHelpers.getIdentifier(
              `operation-${PayloadType.REPLY}-${operation.id()}`,
              config,
            )}
          >
            <Operation
              type={PayloadType.REPLY}
              operation={operation}
              channelName={channelAddress}
              channel={channel}
            />
          </li>,
        );
      } else {
        operationsList.push(
          <li
            className="mb-12"
            key={`sub-${operation.id()}`}
            id={CommonHelpers.getIdentifier(
              `operation-${PayloadType.SUBSCRIBE}-${operation.id()}`,
              config,
            )}
          >
            <Operation
              type={PayloadType.SUBSCRIBE}
              operation={operation}
              channelName={channelAddress}
              channel={channel}
            />
          </li>,
        );
      }
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
