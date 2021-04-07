import React, { useState } from 'react';
import { Tag } from '@asyncapi/parser';

import { Chevron } from '../../components';
import { SideBarConfig } from '../../config/config';
import { useSpec } from '../../store';
import { SidebarHelpers } from '../../helpers';

interface Props {
  config?: SideBarConfig;
}

export const Sidebar: React.FunctionComponent<Props> = ({ config }) => {
  const showOperations = config?.showOperations || 'default';
  const asyncapi = useSpec();

  const info = asyncapi.info();
  const logo = info.ext('x-logo');
  const allMessages = asyncapi.allMessages();

  let Operations = OperationsList;
  if (showOperations === 'bySpecTags') {
    Operations = OperationsByRootTags;
  } else if (showOperations === 'byOperationsTags') {
    Operations = OperationsByOperationsTags;
  }

  return (
    <div className="sidebar-panel w-64 bg-gray-200 font-sans pt-8 pr-4 pb-4 pl-4">
      <div className="sidebar-panel__content">
        {logo ? (
          <img
            src={logo}
            alt={`${info.title()} logo, ${info.version()} version`}
          />
        ) : (
          <h1 className="text-2xl font-thin">
            {info.title()} {info.version()}
          </h1>
        )}
      </div>

      <ul className="text-sm mt-10 mt-2">
        <li className="mb-3">
          <a
            className="js-menu-item text-gray-700 no-underline"
            href="#introduction"
          >
            Introduction
          </a>
        </li>
        {asyncapi.hasServers() && (
          <li className="mb-3">
            <a
              className="js-menu-item text-gray-700 no-underline"
              href="#servers"
            >
              Servers
            </a>
          </li>
        )}
        {asyncapi.hasChannels() && (
          <>
            <li className="mb-3">
              <a
                className="js-menu-item text-gray-700 no-underline"
                href="#operations"
              >
                Operations
              </a>
              <Operations />
            </li>
            {allMessages.size > 0 && (
              <li className="mb-3">
                <a
                  className="js-menu-item text-gray-700 no-underline"
                  href="#messages"
                >
                  Messages
                </a>
                <ul className="text-sm mt-2">
                  {Array.from(allMessages.keys()).map(messageName => (
                    <li key={messageName}>
                      <a
                        className="js-menu-item flex break-words no-underline text-gray-700 mt-8 sm:mt-8 md:mt-3"
                        href={`#message-${messageName}`}
                      >
                        <div
                          className="string-chunk"
                          style={{ display: 'inline-block' }}
                        >
                          {messageName}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </>
        )}
      </ul>
    </div>
  );
};

export const OperationsList: React.FunctionComponent = () => {
  const asyncapi = useSpec();
  const channels = asyncapi.channels();

  const operationsList: React.ReactNodeArray = [];
  Object.entries(channels).forEach(([channelName, channel]) => {
    if (channel.hasPublish()) {
      operationsList.push(<OperationsPubItem channelName={channelName} />);
    }
    if (channel.hasSubscribe()) {
      operationsList.push(<OperationsSubItem channelName={channelName} />);
    }
  });

  return <ul className="text-sm mt-2">{operationsList}</ul>;
};

export const OperationsByRootTags: React.FunctionComponent = () => {
  const asyncapi = useSpec();
  const channels = asyncapi.channels();
  const tags = asyncapi.tags();

  const taggedOperations = (tag: Tag) => {
    const operationsList: React.ReactNodeArray = [];
    Object.entries(channels).forEach(([channelName, channel]) => {
      if (
        channel.hasPublish() &&
        SidebarHelpers.containTags(channel.publish(), tag)
      ) {
        operationsList.push(<OperationsPubItem channelName={channelName} />);
      }
      if (
        channel.hasSubscribe() &&
        SidebarHelpers.containTags(channel.subscribe(), tag)
      ) {
        operationsList.push(<OperationsSubItem channelName={channelName} />);
      }
    });
    return operationsList;
  };

  const untaggedOperations: React.ReactNodeArray = [];
  Object.entries(channels).forEach(([channelName, channel]) => {
    if (
      channel.hasPublish() &&
      (!channel.publish().hasTags() ||
        !SidebarHelpers.containTags(channel.publish(), tags))
    ) {
      untaggedOperations.push(<OperationsPubItem channelName={channelName} />);
    }
    if (
      channel.hasSubscribe() &&
      (!channel.subscribe().hasTags() ||
        !SidebarHelpers.containTags(channel.subscribe(), tags))
    ) {
      untaggedOperations.push(<OperationsSubItem channelName={channelName} />);
    }
  });

  return (
    <div>
      <ul>
        {tags &&
          tags.map(tag => (
            <li key={tag.name()}>
              <OperationsByTagItem tagName={tag.name()}>
                {taggedOperations(tag)}
              </OperationsByTagItem>
            </li>
          ))}
        {SidebarHelpers.containNoTags(channels, tags) && (
          <li>
            <OperationsByTagItem tagName="Untagged">
              {untaggedOperations}
            </OperationsByTagItem>
          </li>
        )}
      </ul>
    </div>
  );
};

export const OperationsByOperationsTags: React.FunctionComponent = () => {
  const asyncapi = useSpec();
  const channels = asyncapi.channels();
  const operationsTags = SidebarHelpers.operationsTags(asyncapi);

  const taggedOperations = (tag: Tag) => {
    const operationsList: React.ReactNodeArray = [];
    Object.entries(channels).forEach(([channelName, channel]) => {
      if (
        channel.hasPublish() &&
        SidebarHelpers.containTags(channel.publish(), tag)
      ) {
        operationsList.push(<OperationsPubItem channelName={channelName} />);
      }
      if (
        channel.hasSubscribe() &&
        SidebarHelpers.containTags(channel.subscribe(), tag)
      ) {
        operationsList.push(<OperationsSubItem channelName={channelName} />);
      }
    });
    return operationsList;
  };

  const untaggedOperations: React.ReactNodeArray = [];
  Object.entries(channels).forEach(([channelName, channel]) => {
    if (
      channel.hasPublish() &&
      (!channel.publish().hasTags() ||
        !SidebarHelpers.containTags(channel.publish(), operationsTags))
    ) {
      untaggedOperations.push(<OperationsPubItem channelName={channelName} />);
    }
    if (
      channel.hasSubscribe() &&
      (!channel.subscribe().hasTags() ||
        !SidebarHelpers.containTags(channel.subscribe(), operationsTags))
    ) {
      untaggedOperations.push(<OperationsSubItem channelName={channelName} />);
    }
  });

  return (
    <div>
      <ul>
        {operationsTags &&
          operationsTags.map(tag => (
            <li key={tag.name()}>
              <OperationsByTagItem tagName={tag.name()}>
                {taggedOperations(tag)}
              </OperationsByTagItem>
            </li>
          ))}
        {SidebarHelpers.containNoTags(channels, operationsTags) && (
          <li>
            <OperationsByTagItem tagName="Untagged">
              {untaggedOperations}
            </OperationsByTagItem>
          </li>
        )}
      </ul>
    </div>
  );
};

interface OperationsByTagItemProps {
  tagName: string;
}

const OperationsByTagItem: React.FunctionComponent<OperationsByTagItemProps> = ({
  tagName,
  children,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div onClick={() => setOpen(!open)}>
        <span>{tagName}</span>
        <Chevron />
      </div>
      {open && <ul className="text-sm mt-2">{children}</ul>}
    </div>
  );
};

interface OperationsPubItemProps {
  channelName: string;
}

const OperationsPubItem: React.FunctionComponent<OperationsPubItemProps> = ({
  channelName,
}) => (
  <li key={channelName}>
    <a
      className="js-menu-item flex break-words no-underline text-gray-700 mt-8 sm:mt-8 md:mt-3"
      href={`#operation-publish-${channelName}`}
    >
      <span
        className="bg-blue-600 font-bold h-6 no-underline text-white uppercase p-1 mr-2 rounded"
        title="Publish"
      >
        Pub
      </span>
      <span className="string-chunk">{channelName}</span>
    </a>
  </li>
);

const OperationsSubItem: React.FunctionComponent<OperationsPubItemProps> = ({
  channelName,
}) => (
  <li key={channelName}>
    <a
      className="js-menu-item flex break-words no-underline text-gray-700 mt-8 sm:mt-8 md:mt-3"
      href={`#operation-subscribe-${channelName}`}
    >
      <span
        className="bg-green-600 font-bold h-6 no-underline text-white uppercase p-1 mr-2 rounded"
        title="Subscribe"
      >
        SUB
      </span>
      <span className="string-chunk">{channelName}</span>
    </a>
  </li>
);
