import React from 'react';
import { TagsInterface } from '@asyncapi/parser';

import { Tag } from './Tag';

interface Props {
  tags?: TagsInterface;
}

export const Tags: React.FunctionComponent<Props> = ({ tags }) => {
  if (!tags || !tags.length) {
    return null;
  }

  return (
    <ul className="flex flex-wrap leading-normal">
      {tags.all().map(tag => (
        <li className="inline-block mt-2 mr-2" key={tag.name()}>
          <Tag tag={tag} />
        </li>
      ))}
    </ul>
  );
};
