import React, { Component } from 'react';

import { H2, HrefHeader } from '../../components';

import { License } from '../../common';

import { License as LicenseWrapper, LicenseHeader, LicenseList } from './styled';

export interface LicenseProps {
  license: License;
}

class LicenseComponent extends Component<LicenseProps> {
  public render() {
    const { license: { name, url } } = this.props;

    return (
      <LicenseWrapper>
        <LicenseHeader>
          <H2>License</H2>
        </LicenseHeader>
        <LicenseList>
          {name ? <li><strong>Type</strong>: {name}</li> : null}
          {url ? <li><strong>Specification</strong>: <HrefHeader href={url} target="_blank">{url}</HrefHeader></li> : null}
        </LicenseList>
      </LicenseWrapper>
    );
  }
}

export default LicenseComponent;
