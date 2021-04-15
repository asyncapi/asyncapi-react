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

  if (externalDocs) {
    return (
      <Href href={externalDocs.url()} title={description} className="underline">
        {name}
      </Href>
    );
  }
  return <span title={description}>{name}</span>;
};
