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
  const showOperations = config?.showOperations || 'byDefault';
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
    <div className="w-64 bg-gray-200 font-sans pt-8 pr-4 pb-4 pl-4">
      <div className="fixed">
        <div>
          {logo ? (
            <img
              src={logo}
              alt={`${info.title()} logo, ${info.version()} version`}
            />
          ) : (
            <h1 className="text-2xl font-light">
              {info.title()} {info.version()}
            </h1>
          )}
        </div>

        <ul className="text-sm mt-10 relative w-56">
          <li className="mb-3">
            <a className="text-gray-700 no-underline" href="#introduction">
              Introduction
            </a>
          </li>
          {asyncapi.hasServers() && (
            <li className="mb-3">
              <a className="text-gray-700 no-underline" href="#servers">
                Servers
              </a>
            </li>
          )}
          {asyncapi.hasChannels() && (
            <>
              <li className="mb-3 mt-9">
                <a
                  className="text-xs uppercase text-gray-700 mt-10 mb-4 font-thin"
                  href="#operations"
                >
                  Operations
                </a>
                <Operations />
              </li>
              {allMessages.size > 0 && (
                <li className="mb-3 mt-9">
                  <a
                    className="text-xs uppercase text-gray-700 mt-10 mb-4 font-thin"
                    href="#messages"
                  >
                    Messages
                  </a>
                  <ul className="text-sm mt-2">
                    {Array.from(allMessages.keys()).map(messageName => (
                      <li key={messageName}>
                        <a
                          className="flex break-words no-underline text-gray-700 mt-8 sm:mt-8 md:mt-3"
                          href={`#message-${messageName}`}
                        >
                          <div className="break-all inline-block">
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
    </div>
  );
};

export const OperationsList: React.FunctionComponent = () => {
  const asyncapi = useSpec();
  const channels = asyncapi.channels();

  const operationsList: React.ReactNodeArray = [];
  Object.entries(channels).forEach(([channelName, channel]) => {
    if (channel.hasPublish()) {
      operationsList.push(
        <OperationsPubItem channelName={channelName} key={channelName} />,
      );
    }
    if (channel.hasSubscribe()) {
      operationsList.push(
        <OperationsSubItem channelName={channelName} key={channelName} />,
      );
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
        operationsList.push(
          <OperationsPubItem channelName={channelName} key={channelName} />,
        );
      }
      if (
        channel.hasSubscribe() &&
        SidebarHelpers.containTags(channel.subscribe(), tag)
      ) {
        operationsList.push(
          <OperationsSubItem channelName={channelName} key={channelName} />,
        );
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
      untaggedOperations.push(
        <OperationsPubItem channelName={channelName} key={channelName} />,
      );
    }
    if (
      channel.hasSubscribe() &&
      (!channel.subscribe().hasTags() ||
        !SidebarHelpers.containTags(channel.subscribe(), tags))
    ) {
      untaggedOperations.push(
        <OperationsSubItem channelName={channelName} key={channelName} />,
      );
    }
  });

  return (
    <div>
      <ul>
        {tags &&
          tags.map(tag => {
            const ops = taggedOperations(tag);
            return (
              ops.length > 0 && (
                <li key={tag.name()}>
                  <OperationsByTagItem tagName={tag.name()}>
                    {taggedOperations(tag)}
                  </OperationsByTagItem>
                </li>
              )
            );
          })}
        {untaggedOperations.length > 0 && (
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
        operationsList.push(
          <OperationsPubItem channelName={channelName} key={channelName} />,
        );
      }
      if (
        channel.hasSubscribe() &&
        SidebarHelpers.containTags(channel.subscribe(), tag)
      ) {
        operationsList.push(
          <OperationsSubItem channelName={channelName} key={channelName} />,
        );
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
      untaggedOperations.push(
        <OperationsPubItem channelName={channelName} key={channelName} />,
      );
    }
    if (
      channel.hasSubscribe() &&
      (!channel.subscribe().hasTags() ||
        !SidebarHelpers.containTags(channel.subscribe(), operationsTags))
    ) {
      untaggedOperations.push(
        <OperationsSubItem channelName={channelName} key={channelName} />,
      );
    }
  });

  return (
    <div>
      <ul>
        {operationsTags &&
          operationsTags.map(tag => {
            const ops = taggedOperations(tag);
            return (
              ops.length > 0 && (
                <li key={tag.name()}>
                  <OperationsByTagItem tagName={tag.name()}>
                    {taggedOperations(tag)}
                  </OperationsByTagItem>
                </li>
              )
            );
          })}
        {untaggedOperations.length > 0 && (
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
  const [expand, setExpand] = useState(false);

  return (
    <div>
      <div>
        <span className="text-sm inline-block mt-1 font-extralight">
          {tagName}
        </span>
        <Chevron
          onClick={() => setExpand(prev => !prev)}
          className={expand ? '-rotate-180' : '-rotate-90'}
        />
      </div>
      {expand && <ul className="text-sm mt-2 font-light">{children}</ul>}
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
      className="flex no-underline text-gray-700 mt-8 sm:mt-8 md:mt-3"
      href={`#operation-publish-${channelName}`}
    >
      <span
        className="bg-blue-600 font-bold h-6 no-underline text-white uppercase p-1 mr-2 rounded text-xs"
        title="Publish"
      >
        Pub
      </span>
      <span className="break-all inline-block">{channelName}</span>
    </a>
  </li>
);

const OperationsSubItem: React.FunctionComponent<OperationsPubItemProps> = ({
  channelName,
}) => (
  <li key={channelName}>
    <a
      className="flex no-underline text-gray-700 mt-8 sm:mt-8 md:mt-3"
      href={`#operation-subscribe-${channelName}`}
    >
      <span
        className="bg-green-600 font-bold h-6 no-underline text-white uppercase p-1 mr-2 rounded text-xs"
        title="Subscribe"
      >
        SUB
      </span>
      <span className="break-all inline-block">{channelName}</span>
    </a>
  </li>
);
