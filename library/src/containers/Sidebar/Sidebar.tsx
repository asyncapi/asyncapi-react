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
  const components = asyncapi.hasComponents() && asyncapi.components();
  const messages = components && components.messages();
  const schemas = components && components.schemas();

  let Operations = OperationsList;
  if (showOperations === 'bySpecTags') {
    Operations = OperationsByRootTags;
  } else if (showOperations === 'byOperationsTags') {
    Operations = OperationsByOperationsTags;
  }

  const messagesList = messages && Object.keys(messages).length > 0 && (
    <li className="mb-3 mt-9">
      <a
        className="text-xs uppercase text-gray-700 mt-10 mb-4 font-thin hover:text-gray-900"
        href="#messages"
        onClick={() => setShowSidebar(false)}
      >
        Messages
      </a>
      <ul className="text-sm mt-2">
        {Object.entries(messages).map(([messageName, message]) => (
          <li key={messageName}>
            <a
              className="flex break-words no-underline text-gray-700 mt-2 hover:text-gray-900"
              href={`#message-${messageName}`}
              onClick={() => setShowSidebar(false)}
            >
              <div className="break-all inline-block">{message.uid()}</div>
            </a>
          </li>
        ))}
      </ul>
    </li>
  );

  const schemasList = schemas && Object.keys(schemas).length > 0 && (
    <li className="mb-3 mt-9">
      <a
        className="text-xs uppercase text-gray-700 mt-10 mb-4 font-thin hover:text-gray-900"
        href="#schemas"
        onClick={() => setShowSidebar(false)}
      >
        Schemas
      </a>
      <ul className="text-sm mt-2">
        {Object.keys(schemas).map(schemaName => (
          <li key={schemaName}>
            <a
              className="flex break-words no-underline text-gray-700 mt-2 hover:text-gray-900"
              href={`#schema-${schemaName}`}
              onClick={() => setShowSidebar(false)}
            >
              <div className="break-all inline-block">{schemaName}</div>
            </a>
          </li>
        ))}
      </ul>
    </li>
  );

  return (
    <SidebarContext.Provider value={{ setShowSidebar }}>
      <div
        className="burger-menu rounded-full h-16 w-16 bg-white fixed bottom-16 right-8 flex items-center justify-center z-30 cursor-pointer shadow-md bg-teal-500"
        onClick={() => setShowSidebar(prev => !prev)}
        data-lol={showSidebar}
      >
        <svg
          viewBox="0 0 100 70"
          width="40"
          height="30"
          className="fill-current text-gray-200"
        >
          <rect width="100" height="10" />
          <rect y="30" width="100" height="10" />
          <rect y="60" width="100" height="10" />
        </svg>
      </div>
      <div
        className={`${
          showSidebar ? 'block fixed w-full' : 'hidden'
        } sidebar relative w-64 max-h-screen h-full bg-gray-200 shadow z-20`}
        // className={`${
        //   showSidebar ? 'block fixed w-full' : 'hidden'
        // } sidebar bg-gray-200 font-sans font-light px-4 py-8 z-20 shadow overflow-auto`}
      >
        <div
          className={`${
            showSidebar ? 'w-full' : ''
          } block fixed max-h-screen h-full font-sans px-4 pt-8 pb-16 overflow-y-auto bg-gray-200`}
        >
          <div className="sidebar--content">
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

            <ul className="text-sm mt-10 relative">
              <li className="mb-3">
                <a
                  className="text-gray-700 no-underline hover:text-gray-900"
                  href="#introduction"
                  onClick={() => setShowSidebar(false)}
                >
                  Introduction
                </a>
              </li>
              {asyncapi.hasServers() && (
                <li className="mb-3">
                  <a
                    className="text-gray-700 no-underline hover:text-gray-900"
                    href="#servers"
                    onClick={() => setShowSidebar(false)}
                  >
                    Servers
                  </a>
                </li>
              )}
              {asyncapi.hasChannels() && (
                <>
                  <li className="mb-3 mt-9">
                    <a
                      className="text-xs uppercase text-gray-700 mt-10 mb-4 font-thin hover:text-gray-900"
                      href="#operations"
                      onClick={() => setShowSidebar(false)}
                    >
                      Operations
                    </a>
                    <Operations />
                  </li>
                  {messagesList}
                  {schemasList}
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
          displayName={channel.publish().summary() || channelName}
          key={`pub-${channelName}`}
        />,
      );
    }
    if (channel.hasSubscribe()) {
      operationsList.push(
        <OperationsSubItem
          channelName={channelName}
          displayName={channel.subscribe().summary() || channelName}
          key={`sub-${channelName}`}
        />,
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
        SpecificationHelpers.containTags(channel.publish(), tag)
      ) {
        operationsList.push(
          <OperationsPubItem
            channelName={channelName}
            displayName={channel.publish().summary() || channelName}
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
            displayName={channel.subscribe().summary() || channelName}
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
          displayName={channel.publish().summary() || channelName}
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
          displayName={channel.subscribe().summary() || channelName}
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
            displayName={channel.publish().summary() || channelName}
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
            displayName={channel.subscribe().summary() || channelName}
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
          displayName={channel.publish().summary() || channelName}
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
          displayName={channel.subscribe().summary() || channelName}
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
          className: expand ? '-rotate-180' : '-rotate-90',
        }}
      >
        <span className="text-sm inline-block mt-1 font-extralight">
          {tagName}
        </span>
      </CollapseButton>
      <ul className={`${expand ? 'block' : 'hidden'} text-sm mt-2 font-light`}>
        {children}
      </ul>
    </div>
  );
};

interface OperationsPubItemProps {
  channelName: string;
  displayName: string;
}

const OperationsPubItem: React.FunctionComponent<OperationsPubItemProps> = ({
  channelName,
  displayName,
}) => {
  const { setShowSidebar } = useContext(SidebarContext);

  return (
    <li>
      <a
        className="flex no-underline text-gray-700 mb-2 hover:text-gray-900"
        href={`#operation-publish-${channelName}`}
        onClick={() => setShowSidebar(false)}
      >
        <span
          className="bg-blue-600 font-bold h-6 no-underline text-white uppercase p-1 mr-2 rounded text-xs"
          title="Publish"
        >
          Pub
        </span>
        <span className="break-all inline-block">{displayName}</span>
      </a>
    </li>
  );
};

const OperationsSubItem: React.FunctionComponent<OperationsPubItemProps> = ({
  channelName,
  displayName,
}) => {
  const { setShowSidebar } = useContext(SidebarContext);

  return (
    <li>
      <a
        className="flex no-underline text-gray-700 mb-2 hover:text-gray-900"
        href={`#operation-subscribe-${channelName}`}
        onClick={() => setShowSidebar(false)}
      >
        <span
          className="bg-green-600 font-bold h-6 no-underline text-white uppercase p-1 mr-2 rounded text-xs"
          title="Subscribe"
        >
          SUB
        </span>
        <span className="break-all inline-block">{displayName}</span>
      </a>
    </li>
  );
};
