import React from 'react';

import { Href } from '../../components';

interface Props {
  name: string;
  url?: string;
}

export const LicenseComponent: React.FunctionComponent<Props> = ({
  name,
  url,
}) => <div>{url ? <Href href={url}>{name}</Href> : name}</div>;
