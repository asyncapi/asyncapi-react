import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconPrefix,
  IconName,
  IconProp,
} from '@fortawesome/fontawesome-svg-core';

import IconProps from '../common/icons';

import { NavigationLinksItem, NavigationLink } from './styled';

const Icon: React.StatelessComponent<IconProps> = ({
  iconName,
  url,
  iconPrefix = 'fab',
}) => {
  const iconProp: IconProp = [iconPrefix as IconPrefix, iconName as IconName];

  return (
    <NavigationLinksItem>
      <NavigationLink href={url} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={iconProp} />
      </NavigationLink>
    </NavigationLinksItem>
  );
};

export default Icon;
