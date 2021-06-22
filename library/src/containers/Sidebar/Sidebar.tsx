import React, { useState, useContext } from 'react';
import { Tag } from '@asyncapi/parser';

import { CollapseButton } from '../../components';
import { SideBarConfig } from '../../config/config';
import { useSpec } from '../../contexts';
import { SpecificationHelpers } from '../../helpers';

const SidebarContext = React.createContext<{
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  setShowSidebar: (value: boolean | ((prevValue: boolean) => boolean)) => value,
});

interface Props {
  config?: SideBarConfig;
}

export const Sidebar: React.FunctionComponent<Props> = ({ config }) => {
  const [showSidebar, setShowSidebar] = useState(false);

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
    <SidebarContext.Provider value={{ setShowSidebar }}>
      <div
        className="burger-menu aui-rounded-full aui-h-16 aui-w-16 aui-bg-white aui-fixed aui-bottom-16 aui-right-8 aui-flex aui-items-center aui-justify-center aui-z-30 aui-cursor-pointer aui-shadow-md aui-bg-teal-500"
        onClick={() => setShowSidebar(prev => !prev)}
        data-lol={showSidebar}
      >
        <svg
          viewBox="0 0 100 70"
          width="40"
          height="30"
          className="aui-fill-current aui-text-gray-200"
        >
          <rect width="100" height="10" />
          <rect y="30" width="100" height="10" />
          <rect y="60" width="100" height="10" />
        </svg>
      </div>
      <div
        className={`${
          showSidebar ? 'aui-block aui-fixed aui-w-full' : 'aui-hidden'
        } sidebar aui-relative aui-w-64 aui-max-h-screen aui-h-full aui-bg-gray-200 aui-shadow aui-z-20`}
      >
        <div
          className={`${
            showSidebar ? 'aui-w-full' : ''
          } aui-block aui-fixed aui-max-h-screen aui-h-full aui-font-sans aui-px-4 aui-pt-8 aui-pb-16 aui-overflow-y-auto aui-bg-gray-200`}
        >
          <div className="sidebar--content">
            <div>
              {logo ? (
                <img
                  src={logo}
                  alt={`${info.title()} logo, ${info.version()} version`}
                />
              ) : (
                <h1 className="aui-text-2xl aui-font-light">
                  {info.title()} {info.version()}
                </h1>
              )}
            </div>

            <ul className="aui-text-sm aui-mt-10 aui-relative">
              <li className="aui-mb-3">
                <a
                  className="aui-text-gray-700 aui-no-underline hover:aui-text-gray-900"
                  href="#introduction"
                  onClick={() => setShowSidebar(false)}
                >
                  Introduction
                </a>
              </li>
              {asyncapi.hasServers() && (
                <li className="aui-mb-3">
                  <a
                    className="aui-text-gray-700 aui-no-underline hover:aui-text-gray-900"
                    href="#servers"
                    onClick={() => setShowSidebar(false)}
                  >
                    Servers
                  </a>
                </li>
              )}
              {asyncapi.hasChannels() && (
                <>
                  <li className="aui-mb-3 aui-mt-9">
                    <a
                      className="aui-text-xs aui-uppercase aui-text-gray-700 aui-mt-10 aui-mb-4 aui-font-thin hover:aui-text-gray-900"
                      href="#operations"
                      onClick={() => setShowSidebar(false)}
                    >
                      Operations
                    </a>
                    <Operations />
                  </li>
                  {allMessages.size > 0 && (
                    <li className="aui-mb-3 aui-mt-9">
                      <a
                        className="aui-text-xs aui-uppercase aui-text-gray-700 aui-mt-10 aui-mb-4 aui-font-thin hover:aui-text-gray-900"
                        href="#messages"
                        onClick={() => setShowSidebar(false)}
                      >
                        Messages
                      </a>
                      <ul className="aui-text-sm aui-mt-2">
                        {Array.from(allMessages.keys()).map(messageName => (
                          <li key={messageName}>
                            <a
                              className="aui-flex aui-break-words aui-no-underline aui-text-gray-700 aui-mt-2 hover:aui-text-gray-900"
                              href={`#message-${messageName}`}
                              onClick={() => setShowSidebar(false)}
                            >
                              <div className="aui-break-all aui-inline-block">
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
      </div>
    </SidebarContext.Provider>
  );
};

export const OperationsList: React.FunctionComponent = () => {
  const asyncapi = useSpec();
  const channels = asyncapi.channels();

  const operationsList: React.ReactNodeArray = [];
  Object.entries(channels).forEach(([channelName, channel]) => {
    if (channel.hasPublish()) {
      operationsList.push(
        <OperationsPubItem
          channelName={channelName}
          key={`pub-${channelName}`}
        />,
      );
    }
    if (channel.hasSubscribe()) {
      operationsList.push(
        <OperationsSubItem
          channelName={channelName}
          key={`sub-${channelName}`}
        />,
      );
    }
  });

  return <ul className="aui-text-sm aui-mt-2">{operationsList}</ul>;
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
        SpecificationHelpers.containTags(channel.publish(), tag)
      ) {
        operationsList.push(
          <OperationsPubItem
            channelName={channelName}
            key={`pub-${channelName}`}
          />,
        );
      }
      if (
        channel.hasSubscribe() &&
        SpecificationHelpers.containTags(channel.subscribe(), tag)
      ) {
        operationsList.push(
          <OperationsSubItem
            channelName={channelName}
            key={`sub-${channelName}`}
          />,
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
        !SpecificationHelpers.containTags(channel.publish(), tags))
    ) {
      untaggedOperations.push(
        <OperationsPubItem
          channelName={channelName}
          key={`pub-${channelName}`}
        />,
      );
    }
    if (
      channel.hasSubscribe() &&
      (!channel.subscribe().hasTags() ||
        !SpecificationHelpers.containTags(channel.subscribe(), tags))
    ) {
      untaggedOperations.push(
        <OperationsSubItem
          channelName={channelName}
          key={`sub-${channelName}`}
        />,
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
  const operationsTags = SpecificationHelpers.operationsTags(asyncapi);

  const taggedOperations = (tag: Tag) => {
    const operationsList: React.ReactNodeArray = [];
    Object.entries(channels).forEach(([channelName, channel]) => {
      if (
        channel.hasPublish() &&
        SpecificationHelpers.containTags(channel.publish(), tag)
      ) {
        operationsList.push(
          <OperationsPubItem
            channelName={channelName}
            key={`pub-${channelName}`}
          />,
        );
      }
      if (
        channel.hasSubscribe() &&
        SpecificationHelpers.containTags(channel.subscribe(), tag)
      ) {
        operationsList.push(
          <OperationsSubItem
            channelName={channelName}
            key={`sub-${channelName}`}
          />,
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
        !SpecificationHelpers.containTags(channel.publish(), operationsTags))
    ) {
      untaggedOperations.push(
        <OperationsPubItem
          channelName={channelName}
          key={`pub-${channelName}`}
        />,
      );
    }
    if (
      channel.hasSubscribe() &&
      (!channel.subscribe().hasTags() ||
        !SpecificationHelpers.containTags(channel.subscribe(), operationsTags))
    ) {
      untaggedOperations.push(
        <OperationsSubItem
          channelName={channelName}
          key={`sub-${channelName}`}
        />,
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
      <CollapseButton
        onClick={() => setExpand(prev => !prev)}
        chevronProps={{
          className: expand ? 'aui--rotate-180' : 'aui--rotate-90',
        }}
      >
        <span className="aui-text-sm aui-inline-block aui-mt-1 aui-font-extralight">
          {tagName}
        </span>
      </CollapseButton>
      <ul
        className={`${
          expand ? 'aui-block' : 'aui-hidden'
        } aui-text-sm aui-mt-2 aui-font-light`}
      >
        {children}
      </ul>
    </div>
  );
};

interface OperationsPubItemProps {
  channelName: string;
}

const OperationsPubItem: React.FunctionComponent<OperationsPubItemProps> = ({
  channelName,
}) => {
  const { setShowSidebar } = useContext(SidebarContext);

  return (
    <li>
      <a
        className="aui-flex aui-no-underline aui-text-gray-700 aui-mb-2 hover:aui-text-gray-900"
        href={`#operation-publish-${channelName}`}
        onClick={() => setShowSidebar(false)}
      >
        <span
          className="aui-bg-blue-600 aui-font-bold aui-h-6 aui-no-underline aui-text-white aui-uppercase aui-p-1 mr-2 aui-rounded aui-text-xs"
          title="Publish"
        >
          Pub
        </span>
        <span className="aui-break-all aui-inline-block">{channelName}</span>
      </a>
    </li>
  );
};

const OperationsSubItem: React.FunctionComponent<OperationsPubItemProps> = ({
  channelName,
}) => {
  const { setShowSidebar } = useContext(SidebarContext);

  return (
    <li>
      <a
        className="aui-flex aui-no-underline aui-text-gray-700 aui-mb-2 hover:aui-text-gray-900"
        href={`#operation-subscribe-${channelName}`}
        onClick={() => setShowSidebar(false)}
      >
        <span
          className="aui-bg-green-600 aui-font-bold aui-h-6 aui-no-underline aui-text-white aui-uppercase aui-p-1 mr-2 aui-rounded aui-text-xs"
          title="Subscribe"
        >
          SUB
        </span>
        <span className="aui-break-all aui-inline-block">{channelName}</span>
      </a>
    </li>
  );
};
