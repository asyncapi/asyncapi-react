import React from 'react';

import { Tag } from './Tag';

interface TagsLike {
  length: number;
  all(): Array<{ name(): string; description(): string | undefined; externalDocs(): { url(): string } | undefined }>;
}

interface Props {
  tags?: TagsLike;
}

export const Tags: React.FunctionComponent<Props> = ({ tags }) => {
  if (!tags?.length) {
    return null;
  }

  return (
    <ul className="flex flex-wrap leading-normal">
      {tags.all().map((tag) => (
        <li className="inline-block mt-2 mr-2" key={tag.name()}>
          <Tag tag={tag} />
        </li>
      ))}
    </ul>
  );
};
