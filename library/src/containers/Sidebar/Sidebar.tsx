import React, { useState, useContext } from 'react';
import { CollapseButton } from '../../components';
import { useConfig, useSpec } from '../../contexts';
import { CommonHelpers } from '../../helpers';
import { PayloadType } from '../../types';
import { TagObject, filterObjectsByTags } from '../../helpers/sidebar';

const SidebarContext = React.createContext<{
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  setShowSidebar: (value: boolean | ((prevValue: boolean) => boolean)) => value,
});

export const Sidebar: React.FunctionComponent = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const asyncapi = useSpec();

  const info = asyncapi.info();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const logo = info.extensions().get('x-logo')?.value();
  const components = asyncapi.components();
  const messages = components?.messages().all();
  const schemas = components?.schemas().all();
  const hasOperations = asyncapi.operations().length > 0;

  const messagesList = messages?.length > 0 && (
    <li className="mb-3 mt-9">
      <a
        className="text-xs uppercase text-gray-700 mt-10 mb-4 font-thin hover:text-gray-900"
        href="#messages"
        onClick={() => setShowSidebar(false)}
      >
        Messages
      </a>
      <ul className="text-sm mt-2">
        {messages.map((message, index) => (
          <li key={`menu-message-list-${message.name() ?? index}`}>
            <a
              className="flex break-words no-underline text-gray-700 mt-2 hover:text-gray-900"
              href={`#message-${message.name()}`}
              onClick={() => setShowSidebar(false)}
            >
              <div className="break-all inline-block">{message.id()}</div>
            </a>
          </li>
        ))}
      </ul>
    </li>
  );

  const schemasList = schemas?.length > 0 && (
    <li className="mb-3 mt-9">
      <a
        className="text-xs uppercase text-gray-700 mt-10 mb-4 font-thin hover:text-gray-900"
        href="#schemas"
        onClick={() => setShowSidebar(false)}
      >
        Schemas
      </a>
      <ul className="text-sm mt-2">
        {schemas.map((schema, index) => (
          <li key={`menu-message-list-${schema.id() ?? index}`}>
            <a
              className="flex break-words no-underline text-gray-700 mt-2 hover:text-gray-900"
              href={`#schema-${schema.id()}`}
              onClick={() => setShowSidebar(false)}
            >
              <div className="break-all inline-block">{schema.id()}</div>
            </a>
          </li>
        ))}
      </ul>
    </li>
  );

  const operationList = hasOperations && (
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
  );

  return (
    <SidebarContext.Provider value={{ setShowSidebar }}>
      <div
        className="burger-menu rounded-full h-16 w-16 bg-white fixed bottom-16 right-8 flex items-center justify-center z-30 cursor-pointer shadow-md bg-teal-500"
        onClick={() => setShowSidebar((prev) => !prev)}
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
      >
        <div
          className={`${
            showSidebar ? 'w-full' : ''
          } block fixed max-h-screen h-full font-sans px-4 pt-8 pb-16 overflow-y-auto bg-gray-200`}
        >
          <div className="sidebar--content">
            <div>
              {logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
              {operationList}
            </ul>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

const ServersList: React.FunctionComponent = () => {
  const sidebarConfig = useConfig().sidebar;
  const asyncapi = useSpec();
  const servers = asyncapi.servers().all();
  const showServers = sidebarConfig?.showServers ?? 'byDefault';

  if (showServers === 'byDefault') {
    return (
      <ul className="text-sm mt-2">
        {servers.map((server) => (
          <ServerItem serverName={server.id()} key={server.id()} />
        ))}
      </ul>
    );
  }

  let specTagNames: string[];
  if (showServers === 'bySpecTags') {
    specTagNames = (asyncapi.info().tags().all() ?? []).map((tag) =>
      tag.name(),
    );
  } else {
    const serverTagNamesSet = new Set<string>();
    servers.forEach((server) => {
      server.tags().forEach((t) => serverTagNamesSet.add(t.name()));
    });
    specTagNames = Array.from(serverTagNamesSet);
  }

  const serializedServers: TagObject[] = servers.map((server) => ({
    name: server.id(),
    tags: server.tags(),
    data: {},
  }));
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

interface OperationItemProps {
  label: string;
  type: PayloadType;
  operationHrefId: string;
}
const OperationsList: React.FunctionComponent = () => {
  const config = useConfig();
  const sidebarConfig = config.sidebar;
  const asyncapi = useSpec();
  const operations = asyncapi.operations().all();
  const showOperations = sidebarConfig?.showOperations ?? 'byDefault';

  const processedOperations: TagObject<OperationItemProps>[] = operations.map(
    (operation) => {
      const operationChannel = operation.channels();
      const operationHrefId = CommonHelpers.getOperationIdentifier({
        operation,
        config,
      });
      const type = CommonHelpers.getOperationType(operation);

      const specV = asyncapi.version();
      const version = specV.localeCompare('2.6.0', undefined, {
        numeric: true,
      });
      let label = '';
      if (version === 0 || sidebarConfig?.useChannelAddressAsIdentifier) {
        // old version uses different labels for the operations
        const operationChannels = operationChannel.all();
        const channelAddress = operationChannels[0]?.address() ?? '';
        const operationSummary = operation.summary();
        label = operationSummary ?? channelAddress;
      } else {
        label = operation.id() ?? '';
      }
      return {
        name: `${type}-${operation.id()}`,
        tags: operation.tags(),
        data: {
          label,
          type,
          operationHrefId,
        },
      };
    },
  );

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
    operationTagNames = (asyncapi.info().tags().all() ?? []).map((tag) =>
      tag.name(),
    );
  } else {
    const operationTagNamesSet = new Set<string>();
    operations.forEach((operation) => {
      operation
        .tags()
        .all()
        .forEach((t) => operationTagNamesSet.add(t.name()));
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

const OperationItem: React.FunctionComponent<OperationItemProps> = ({
  type,
  operationHrefId,
  label,
}) => {
  const config = useConfig();
  const { setShowSidebar } = useContext(SidebarContext);
  const specV = useSpec().version();
  const version = specV.localeCompare('2.6.0', undefined, { numeric: true });
  const isAsyncAPIv2 = version === 0;
  const { typeLabel, backgroundColor } =
    CommonHelpers.getOperationDesignInformation({
      type,
      config,
      isAsyncAPIv2,
    });

  return (
    <li key={`menu-operation-list-${operationHrefId}`}>
      <a
        className="flex no-underline text-gray-700 mb-2 hover:text-gray-900"
        href={`#${operationHrefId}`}
        onClick={() => setShowSidebar(false)}
      >
        <span
          className={`${backgroundColor} font-bold h-6 no-underline text-white uppercase p-1 mr-2 rounded text-xs`}
          title={typeLabel}
        >
          {typeLabel}
        </span>
        <span className="break-all inline-block">{label}</span>
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
  children: React.ReactNode;
}

const ItemsByTagItem: React.FunctionComponent<ItemsByTagItemProps> = ({
  tagName,
  children,
}) => {
  const [expand, setExpand] = useState(false);

  return (
    <div>
      <CollapseButton
        onClick={() => setExpand((prev) => !prev)}
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
