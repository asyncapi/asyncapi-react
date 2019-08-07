import React, { Component } from 'react';

import { Contact } from '../../types';

import { H2, HrefHeader } from '../../components';
import {
  Contact as ContactWrapper,
  ContactHeader,
  ContactList,
} from './styled';

interface Props {
  contact: Contact;
}

class ContactComponent extends Component<Props> {
  render() {
    const {
      contact: { name, url, email },
    } = this.props;

    return (
      <ContactWrapper>
        <ContactHeader>
          <H2>Contact</H2>
        </ContactHeader>
        <ContactList>
          {name && (
            <li>
              <strong>Name</strong>: {name}
            </li>
          )}
          {url && (
            <li>
              <strong>Url</strong>:{' '}
              <HrefHeader href={url} target="_blank">
                {url}
              </HrefHeader>
            </li>
          )}
          {email && (
            <li>
              <strong>Email</strong>:{' '}
              <HrefHeader href={`mailto:${email}`}>{email}</HrefHeader>
            </li>
          )}
        </ContactList>
      </ContactWrapper>
    );
  }
}

export default ContactComponent;
