import React from 'react';

import { Href } from '../../components';

import { License } from '../../types';
import { bemClasses } from '../../helpers';
import { LICENSE, TYPE, SPECIFICATION } from '../../constants';

export const LicenseComponent: React.FunctionComponent<License> = ({
  name,
  url,
}) => (
  <div className={bemClasses.element(`license`)}>
    <header className={bemClasses.element(`license-header`)}>
      <h2>{LICENSE}</h2>
    </header>
    <ul className={bemClasses.element(`license-list`)}>
      {name && (
        <li className={bemClasses.element(`license-list-item`)}>
          <strong>{TYPE}</strong>: {name}
        </li>
      )}
      {url && (
        <li className={bemClasses.element(`license-list-item`)}>
          <strong>{SPECIFICATION}</strong>: <Href href={url}>{url}</Href>
        </li>
      )}
    </ul>
  </div>
);
