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
    <ul className="aui-flex aui-flex-wrap aui-leading-normal">
      {tags.map(tag => (
        <li className="aui-inline-block aui-mt-2 aui-mr-2" key={tag.name()}>
          <Tag tag={tag} />
        </li>
      ))}
    </ul>
  );
};
