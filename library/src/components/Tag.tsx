import React from 'react';
import { TagInterface } from '@asyncapi/parser';

import { Href } from './Href';

interface Props {
  tag: TagInterface;
}

export const Tag: React.FunctionComponent<Props> = ({ tag }) => {
  const name = `#${tag.name()}`;
  const description = tag.description() || '';
  const externalDocs = tag.externalDocs();

  const element = (
    <div
      title={description}
      className="border border-solid border-blue-300 hover:bg-blue-300 hover:text-blue-600 text-blue-500 font-bold no-underline text-xs rounded px-3 py-1"
    >
      <span className={externalDocs ? 'underline' : ''}>{name}</span>
    </div>
  );

  if (externalDocs) {
    return (
      <Href href={externalDocs.url()} title={description}>
        {element}
      </Href>
    );
  }
  return element;
};
