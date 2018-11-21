import React, { Component } from 'react';

import { License } from '../../types';

import { H2, HrefHeader } from '../../components';
import { License as LicenseWrapper, LicenseHeader, LicenseList } from './styled';

interface Props {
  license: License;
}

class LicenseComponent extends Component<Props> {
  render() {
    const { license: { name, url } } = this.props;

    return (
      <LicenseWrapper>
        <LicenseHeader>
          <H2>License</H2>
        </LicenseHeader>
        <LicenseList>
          {name && <li><strong>Type</strong>: {name}</li>}
          {url && <li><strong>Specification</strong>: <HrefHeader href={url} target="_blank">{url}</HrefHeader></li>}
        </LicenseList>
      </LicenseWrapper>
    );
  }
}

export default LicenseComponent;
