import React from 'react';
import { Tag as TagType } from '@asyncapi/parser';

interface Props {
  tag: TagType;
}

export const Tag: React.FunctionComponent<Props> = ({ tag }) => {
  const name = `#${tag.name()}`;
  const description = tag.description() || '';
  const externalDocs = tag.externalDocs();

  if (externalDocs) {
    return (
      <a href={externalDocs.url()} target="_blank" title={description}>
        {name}
      </a>
    );
  }
  return <span title={description}>{name}</span>;
};
