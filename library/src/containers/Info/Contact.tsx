import React from 'react';

import { Href } from '../../components';

import { Contact } from '../../types';
import { bemClasses } from '../../helpers';
import { CONTACT, NAME, URL, EMAIL } from '../../constants';

export const ContactComponent: React.FunctionComponent<Contact> = ({
  name,
  url,
  email,
}) => (
  <div className={bemClasses.element(`contact`)}>
    <header className={bemClasses.element(`contact-header`)}>
      <h2>{CONTACT}</h2>
    </header>
    <ul className={bemClasses.element(`contact-list`)}>
      {name && (
        <li className={bemClasses.element(`contact-list-item`)}>
          <strong>{NAME}</strong>: {name}
        </li>
      )}
      {url && (
        <li className={bemClasses.element(`contact-list-item`)}>
          <strong>{URL}</strong>: <Href href={url}>{url}</Href>
        </li>
      )}
      {email && (
        <li className={bemClasses.element(`contact-list-item`)}>
          <strong>{EMAIL}</strong>:{' '}
          <Href href={`mailto:${email}`}>{email}</Href>
        </li>
      )}
    </ul>
  </div>
);
