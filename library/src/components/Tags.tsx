import React from 'react';
import { Tag } from '@asyncapi/parser';

interface Props {
  tags?: Tag[];
}

export const Tags: React.FunctionComponent<Props> = ({ tags }) => {
  if (!tags || !tags.length) {
    return null;
  }

  return (
    <div className="mt-4">
      {tags.map(tag => (
        <TagComponent tag={tag} />
      ))}
    </div>
  );
};

interface TagProps {
  tag: Tag;
}

const TagComponent: React.FunctionComponent<TagProps> = ({ tag }) => {
  const externalDocs = tag.externalDocs();

  if (externalDocs) {
    return (
      <a
        href={externalDocs.url()}
        target="_blank"
        className="border text-blue-400 font-normal text-sm rounded lowercase mr-2 px-2 py-1"
        title={tag.description() || ''}
      >
        {tag.name()}
      </a>
    );
  }
  return (
    <span
      className="border font-normal text-sm no-underline text-blue-400 rounded lowercase mr-2 px-2 py-1"
      title={tag.description() || ''}
    >
      {tag.name()}
    </span>
  );
};
