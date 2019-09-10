import React from 'react';

import { Href } from '../../components';

import { Contact } from '../../types';
import { bemClasses } from '../../helpers';
import { URL_SUPPORT_TEXT, EMAIL_SUPPORT_TEXT } from '../../constants';

export const ContactComponent: React.FunctionComponent<Contact> = ({
  url,
  email,
}) => (
  <>
    {url && (
      <li className={bemClasses.element(`info-contact-support-url`)}>
        <Href href={url}>
          <span>{URL_SUPPORT_TEXT}</span>
        </Href>
      </li>
    )}
    {email && (
      <li className={bemClasses.element(`info-contact-support-email`)}>
        <Href href={`mailto:${email}`}>
          <span>{EMAIL_SUPPORT_TEXT}</span>
        </Href>
      </li>
    )}
  </>
);
