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
    <ul className="ai-tags">
      {tags.map(tag => (
        <li className="ai-tags-item" key={tag.name()}>
          <Tag tag={tag} />
        </li>
      ))}
    </ul>
  );
};
