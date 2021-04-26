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
    <ul className="flex flex-wrap leading-normal">
      {tags.map(tag => (
        <li className="inline-block mt-2 mr-2" key={tag.name()}>
          <Tag tag={tag} />
        </li>
      ))}
    </ul>
  );
};
