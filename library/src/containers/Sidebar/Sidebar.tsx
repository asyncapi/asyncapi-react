import React, { useState, useContext } from 'react';

import { CollapseButton } from '../../components';
import { useConfig, useSpec } from '../../contexts';
import {
  PUBLISH_LABEL_DEFAULT_TEXT,
  SUBSCRIBE_LABEL_DEFAULT_TEXT,
} from '../../constants';

const SidebarContext = React.createContext<{
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  setShowSidebar: (value: boolean | ((prevValue: boolean) => boolean)) => value,
});

export const Sidebar: React.FunctionComponent = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const asyncapi = useSpec();

  const info = asyncapi.info();
  const logo = info.extensions().get('x-logo')?.value();
  const components = asyncapi.components();
  const messages = components && components.messages();
  const schemas = components && components.schemas();
  const hasOperations =
    asyncapi.channels().length > 0 &&
    Object.values(asyncapi.channels()).some(
      channel => channel.operations().length > 0,
    );

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
              <div className="break-all inline-block">{message.id()}</div>
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
              {asyncapi.servers().length > 0 && (
                <li className="mb-3 mt-9">
                  <a
                    className="text-xs uppercase text-gray-700 mt-10 mb-4 font-thin hover:text-gray-900"
                    href="#servers"
                    onClick={() => setShowSidebar(false)}
                  >
                    Servers
                  </a>
                  <ServersList />
                </li>
              )}
              {hasOperations && (
                <>
                  <li className="mb-3 mt-9">
                    <a
                      className="text-xs uppercase text-gray-700 mt-10 mb-4 font-thin hover:text-gray-900"
                      href="#operations"
                      onClick={() => setShowSidebar(false)}
                    >
                      Operations
                    </a>
                    <OperationsList />
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

interface TagObject<T = any> {
  name: string;
  object: { tags?: () => Array<{ name: () => string }> };
  data: T;
}

function filterObjectsByTags<T = any>(
  tags: string[],
  objects: Array<TagObject<T>>,
): { tagged: Map<string, TagObject[]>; untagged: TagObject[] } {
  const taggedObjects = new Set<TagObject>();
  const tagged = new Map<string, TagObject[]>();

  tags.forEach(tag => {
    const taggedForTag: TagObject[] = [];
    objects.forEach(obj => {
      const object = obj.object;
      if (typeof object.tags !== 'function') {
        return;
      }

      const objectTags = (object.tags() || []).map(t => t.name());
      const hasTag = objectTags.includes(tag);
      if (hasTag) {
        taggedForTag.push(obj);
        taggedObjects.add(obj);
      }
    });
    tagged.set(tag, taggedForTag);
  });

  const untagged: TagObject[] = [];
  objects.forEach(obj => {
    if (!taggedObjects.has(obj)) {
      untagged.push(obj);
    }
  });

  return { tagged, untagged };
}

const ServersList: React.FunctionComponent = () => {
  const sidebarConfig = useConfig().sidebar;
  const asyncapi = useSpec();
  const servers = asyncapi.servers();
  const showServers = sidebarConfig?.showServers || 'byDefault';

  if (showServers === 'byDefault') {
    return (
      <ul className="text-sm mt-2">
        {Object.keys(servers).map(serverName => (
          <ServerItem serverName={serverName} key={serverName} />
        ))}
      </ul>
    );
  }

  let specTagNames: string[];
  if (showServers === 'bySpecTags') {
    specTagNames = (asyncapi.info().tags() || []).map(tag => tag.name());
  } else {
    const serverTagNamesSet = new Set<string>();
    Object.values(servers).forEach(server => {
      if (typeof server.tags !== 'function') {
        return;
      }
      server.tags().forEach(t => serverTagNamesSet.add(t.name()));
    });
    specTagNames = Array.from(serverTagNamesSet);
  }

  const serializedServers: TagObject[] = Object.entries(servers).map(
    ([serverName, server]) => ({
      name: serverName,
      object: server,
      data: {},
    }),
  );
  const { tagged, untagged } = filterObjectsByTags(
    specTagNames,
    serializedServers,
  );
  return (
    <ul className="text-sm mt-2">
      {Array.from(tagged.entries()).map(([tag, taggedServers]) => (
        <li key={tag}>
          <ItemsByTagItem tagName={tag}>
            {taggedServers.map(({ name: serverName }) => (
              <ServerItem serverName={serverName} key={serverName} />
            ))}
          </ItemsByTagItem>
        </li>
      ))}
      {untagged.length > 0 ? (
        <li>
          <ItemsByTagItem tagName="Untagged">
            {untagged.map(({ name: serverName }) => (
              <ServerItem serverName={serverName} key={serverName} />
            ))}
          </ItemsByTagItem>
        </li>
      ) : null}
    </ul>
  );
};

const OperationsList: React.FunctionComponent = () => {
  const sidebarConfig = useConfig().sidebar;
  const asyncapi = useSpec();
  const operations = asyncapi.operations();
  const showOperations = sidebarConfig?.showOperations || 'byDefault';

  const processedOperations: Array<TagObject<{
    channelName: string;
    summary: string;
    kind: 'publish' | 'subscribe';
  }>> = [];
  Object.entries(operations).forEach(([operationId, operation]) => {
    if (operation.isSend()) {
      processedOperations.push({
        name: `publish-${operationId}`,
        object: operation,
        data: { channelName: operation.channels().all()[0].address() || '', kind: 'publish', summary: operation.summary() || ''  },
      });
    }
    if (operation.isReceive()) {
      processedOperations.push({
        name: `subscribe-${operationId}`,
        object: operation,
        data: { channelName: operation.channels().all()[0].address() || '', kind: 'subscribe', summary: operation.summary() || '' },
      });
    }
  });

  if (showOperations === 'byDefault') {
    return (
      <ul className="text-sm mt-2">
        {processedOperations.map(({ name, data }) => (
          <OperationItem key={name} {...data} />
        ))}
      </ul>
    );
  }

  let operationTagNames: string[];
  if (showOperations === 'bySpecTags') {
    operationTagNames = (asyncapi.info().tags() || []).map(tag => tag.name());
  } else {
    const operationTagNamesSet = new Set<string>();
    Object.values(operations).map((operation) => {
      operation.tags().forEach(t => operationTagNamesSet.add(t.name()));
    });
    operationTagNames = Array.from(operationTagNamesSet);
  }

  const { tagged, untagged } = filterObjectsByTags(
    operationTagNames,
    processedOperations,
  );
  return (
    <ul className="text-sm mt-2">
      {Array.from(tagged.entries()).map(([tag, taggedOperations]) => (
        <li key={tag}>
          <ItemsByTagItem tagName={tag}>
            {taggedOperations.map(({ name, data }) => (
              <OperationItem key={name} {...data} />
            ))}
          </ItemsByTagItem>
        </li>
      ))}
      {untagged.length > 0 ? (
        <li>
          <ItemsByTagItem tagName="Untagged">
            {untagged.map(({ name, data }) => (
              <OperationItem key={name} {...data} />
            ))}
          </ItemsByTagItem>
        </li>
      ) : null}
    </ul>
  );
};

interface OperationItemProps {
  channelName: string;
  summary: string;
  kind: 'publish' | 'subscribe';
}

const OperationItem: React.FunctionComponent<OperationItemProps> = ({
  channelName,
  summary,
  kind,
}) => {
  const config = useConfig();
  const { setShowSidebar } = useContext(SidebarContext);

  const isPublish = kind === 'publish';
  let label: string = '';
  if (isPublish) {
    label = config.publishLabel || PUBLISH_LABEL_DEFAULT_TEXT;
  } else {
    label = config.subscribeLabel || SUBSCRIBE_LABEL_DEFAULT_TEXT;
  }

  return (
    <li>
      <a
        className="flex no-underline text-gray-700 mb-2 hover:text-gray-900"
        href={`#operation-${kind}-${channelName}`}
        onClick={() => setShowSidebar(false)}
      >
        <span
          className={`${
            isPublish ? 'bg-blue-600' : 'bg-green-600'
          } font-bold h-6 no-underline text-white uppercase p-1 mr-2 rounded text-xs`}
          title={isPublish ? 'Publish' : 'Subscribe'}
        >
          {label}
        </span>
        <span className="break-all inline-block">{summary || channelName}</span>
      </a>
    </li>
  );
};

interface ServerItemProps {
  serverName: string;
}

const ServerItem: React.FunctionComponent<ServerItemProps> = ({
  serverName,
}) => {
  const { setShowSidebar } = useContext(SidebarContext);

  return (
    <li>
      <a
        className="flex no-underline text-gray-700 mb-2 hover:text-gray-900"
        href={`#server-${serverName}`}
        onClick={() => setShowSidebar(false)}
      >
        <span className="break-all inline-block">{serverName}</span>
      </a>
    </li>
  );
};

interface ItemsByTagItemProps {
  tagName: string;
}

const ItemsByTagItem: React.FunctionComponent<ItemsByTagItemProps> = ({
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
