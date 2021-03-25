import React from 'react';
import { Tag as TagType } from '@asyncapi/parser';

import { Tag } from './Tag';

interface Props {
  tags?: TagType[];
}

export const Tags: React.FunctionComponent<Props> = ({ tags }) => {
  if (!tags || !tags.length) {
    return null;
  }

  return (
    <div className="mt-4">
      {tags.map(tag => (
        <Tag tag={tag} key={tag.name()} />
      ))}
    </div>
  );
};
