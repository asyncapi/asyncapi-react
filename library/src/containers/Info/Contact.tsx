import React, { Component } from 'react';

import { Contact } from '../../types';

import { H2, HrefHeader } from '../../components';
import {
  Contact as ContactWrapper,
  ContactHeader,
  ContactList,
} from './styled';
import { CONTACT, NAME, URL, EMAIL } from '../../constants';

interface Props {
  contact: Contact;
}

export class ContactComponent extends Component<Props> {
  render() {
    const {
      contact: { name, url, email },
    } = this.props;

    return (
      <ContactWrapper>
        <ContactHeader>
          <H2>{CONTACT}</H2>
        </ContactHeader>
        <ContactList>
          {name && (
            <li>
              <strong>{NAME}</strong>: {name}
            </li>
          )}
          {url && (
            <li>
              <strong>{URL}</strong>:{' '}
              <HrefHeader href={url} target="_blank">
                {url}
              </HrefHeader>
            </li>
          )}
          {email && (
            <li>
              <strong>{EMAIL}</strong>:{' '}
              <HrefHeader href={`mailto:${email}`}>{email}</HrefHeader>
            </li>
          )}
        </ContactList>
      </ContactWrapper>
    );
  }
}
