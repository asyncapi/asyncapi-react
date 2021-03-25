import React from 'react';

import { Href } from '../../components';

import { URL_SUPPORT_TEXT, EMAIL_SUPPORT_TEXT } from '../../constants';

interface Props {
  name?: string;
  url?: string;
  email?: string;
}

export const ContactComponent: React.FunctionComponent<Props> = ({
  url,
  email,
}) => (
  <>
    {url && <Href href={url}>{URL_SUPPORT_TEXT}</Href>}
    {email && <Href href={`mailto:${email}`}>{EMAIL_SUPPORT_TEXT}</Href>}
  </>
);
