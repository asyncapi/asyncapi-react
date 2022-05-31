import React from 'react';

import { Operation } from './Operation';
import { AnchorWrapper } from '../../components';

import { useConfig, useSpec } from '../../contexts';
import { CommonHelpers } from '../../helpers';
import { OPERATIONS_TEXT } from '../../constants';
import { PayloadType } from '../../types';

export const Operations: React.FunctionComponent = () => {
  const channels = useSpec().channels();
  const config = useConfig();

  if (!Object.keys(channels).length) {
    return null;
  }

  const operationsList: React.ReactNodeArray = [];
  Object.entries(channels).forEach(([channelName, channel]) => {
    if (channel.hasPublish()) {
      operationsList.push(
        <li
          className="mb-12"
          key={`pub-${channelName}`}
          id={CommonHelpers.getIdentifier(
            `operation-${PayloadType.PUBLISH}-${channelName}`,
            config,
          )}
        >
          <AnchorWrapper
            anchor={CommonHelpers.getIdentifier(
              `operation-${PayloadType.PUBLISH}-${channelName}`,
              config,
            )}
            iconProps={{
              className: 'top-0.5',
            }}
          >
            <Operation
              type={PayloadType.PUBLISH}
              operation={channel.publish()}
              channelName={channelName}
              channel={channel}
            />
          </AnchorWrapper>
        </li>,
      );
    }
    if (channel.hasSubscribe()) {
      operationsList.push(
        <li
          className="mb-12"
          key={`sub-${channelName}`}
          id={CommonHelpers.getIdentifier(
            `operation-${PayloadType.SUBSCRIBE}-${channelName}`,
            config,
          )}
        >
          <AnchorWrapper
            anchor={CommonHelpers.getIdentifier(
              `operation-${PayloadType.SUBSCRIBE}-${channelName}`,
              config,
            )}
            iconProps={{
              className: 'top-0.5',
            }}
          >
            <Operation
              type={PayloadType.SUBSCRIBE}
              operation={channel.subscribe()}
              channelName={channelName}
              channel={channel}
            />
          </AnchorWrapper>
        </li>,
      );
    }
  });

  return (
    <section
      id={`${CommonHelpers.getIdentifier('operations', config)}`}
      className="mt-16"
    >
      <AnchorWrapper
        anchor={CommonHelpers.getIdentifier('operations', config)}
        iconProps={{
          className: 'top-3.5',
        }}
      >
        <h2 className="2xl:w-7/12 text-3xl font-light mb-4 px-8">
          {OPERATIONS_TEXT}
        </h2>
      </AnchorWrapper>
      <ul>{operationsList}</ul>
    </section>
  );
};
