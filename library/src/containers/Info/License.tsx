import React from 'react';

import { Href } from '../../components';

import { License } from '../../types';

export const LicenseComponent: React.FunctionComponent<License> = ({
  name,
  url,
}) => {
  const nameWrapper = <span>{name}</span>;

  return <div>{url ? <Href href={url}>{nameWrapper}</Href> : nameWrapper}</div>;
};
