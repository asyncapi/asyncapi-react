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
    <ul className="leading-normal space-x-2 space-y-2">
      {tags.map(tag => (
        <li
          className="inline-block border border-solid border-blue-300 hover:bg-blue-300 hover:text-blue-600 text-blue-500 font-bold no-underline text-xs rounded px-3 py-1"
          key={tag.name()}
        >
          <Tag tag={tag} />
        </li>
      ))}
    </ul>
  );
};
