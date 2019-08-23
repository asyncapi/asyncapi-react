import React, { Component } from 'react';

import { License } from '../../types';

import { H2, HrefHeader } from '../../components';
import {
  License as LicenseWrapper,
  LicenseHeader,
  LicenseList,
} from './styled';
import { LICENSE, TYPE, SPECIFICATION } from '../../constants';

interface Props {
  license: License;
}

export class LicenseComponent extends Component<Props> {
  render() {
    const {
      license: { name, url },
    } = this.props;

    return (
      <LicenseWrapper>
        <LicenseHeader>
          <H2>{LICENSE}</H2>
        </LicenseHeader>
        <LicenseList>
          {name && (
            <li>
              <strong>{TYPE}</strong>: {name}
            </li>
          )}
          {url && (
            <li>
              <strong>{SPECIFICATION}</strong>:{' '}
              <HrefHeader
                href={url}
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                {url}
              </HrefHeader>
            </li>
          )}
        </LicenseList>
      </LicenseWrapper>
    );
  }
}
