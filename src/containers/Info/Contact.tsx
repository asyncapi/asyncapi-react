import React, { Component } from 'react';

import { H2, HrefHeader } from '../../components';

import { Contact } from '../../common';

import { Contact as ContactWrapper, ContactHeader, ContactList } from './styled';

export interface LicenseProps {
  contact: Contact;
}

class LicenseComponent extends Component<LicenseProps> {
  public render() {
    const { contact: { name, url, email } } = this.props;

    return (
      <ContactWrapper>
        <ContactHeader>
          <H2>Contact</H2>
        </ContactHeader>
        <ContactList>
          {name ? <li><strong>Name</strong>: {name}</li> : null}
          {url ? <li><strong>Url</strong>: <HrefHeader href={url} target="_blank">{url}</HrefHeader></li> : null}
          {email ? <li><strong>Email</strong>: <HrefHeader href={`mailto:${email}`}>{email}</HrefHeader></li> : null}
        </ContactList>
      </ContactWrapper>
    );
  }
}

export default LicenseComponent;
