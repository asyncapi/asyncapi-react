import React from 'react';
import { ServerInterface } from '@asyncapi/parser';
import { CommonHelpers } from '../../helpers';
import { ConfigInterface } from '../../config';

interface ServersListProps {
  servers: ServerInterface[];
  config: ConfigInterface;
  relativePathname: string;
}

export const ServersList: React.FC<ServersListProps> = ({
  servers,
  config,
  relativePathname,
}) => {
  if (!servers || servers.length === 0) {
    return null;
  }

  return (
    <div className="mt-2 text-sm">
      <p>Available only on servers:</p>
      <ul className="flex flex-wrap leading-normal">
        {servers.map((server) => (
          <li className="inline-block mt-2 mr-2" key={server.id()}>
            <a
              href={`${relativePathname}#${CommonHelpers.getIdentifier(
                'server-' + server.id(),
                config,
              )}`}
              className="border border-solid border-blue-300 hover:bg-blue-300 hover:text-blue-600 text-blue-500 font-bold no-underline text-xs rounded px-3 py-1 cursor-pointer"
            >
              <span className="underline">{server.id()}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
