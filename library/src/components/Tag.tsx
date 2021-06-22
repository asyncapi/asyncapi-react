import React from 'react';
import { Tag as TagType } from '@asyncapi/parser';

import { Href } from './Href';

interface Props {
  tag: TagType;
}

export const Tag: React.FunctionComponent<Props> = ({ tag }) => {
  const name = `#${tag.name()}`;
  const description = tag.description() || '';
  const externalDocs = tag.externalDocs();

  const element = (
    <div
      title={description}
      className="aui-border aui-border-solid aui-border-blue-300 hover:aui-bg-blue-300 hover:aui-text-blue-600 aui-text-blue-500 aui-font-bold aui-no-underline aui-text-xs aui-rounded aui-px-3 aui-py-1"
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
