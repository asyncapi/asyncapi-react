import React, { Component } from 'react';

import { Header, H2, Markdown, TableColumnName, TableAccessor, TableWrapper, TableHeader, TableBodyWrapper, TableRow } from '../../components';

import { SecurityScheme } from '../../common';

import { Security as SecurityWrapper, SecurityHeader } from './styled'

const securityColumnsName: TableColumnName[] = [
  "Type",
  "In",
  "Name",
  "Scheme",
  "Format",
  "Description",
]

const securityAccesors: TableAccessor[] = [
  (el: SecurityScheme) => el.type,
  (el: SecurityScheme) => el.in,
  (el: SecurityScheme) => el.name,
  (el: SecurityScheme) => el.scheme,
  (el: SecurityScheme) => el.bearerFormat,
  (el: SecurityScheme) => el.description ? <Markdown>{el.description}</Markdown> : null,
]

export interface SecurityProps {
  security?: SecurityScheme[];
}

class SecurityComponent extends Component<SecurityProps> {
  render() {
    const { security } = this.props;

    return (
      security ?
        <SecurityWrapper>
          <SecurityHeader>
            <H2>Security</H2>
          </SecurityHeader>
          <TableWrapper>
            <TableHeader columns={securityColumnsName} />
            <TableBodyWrapper>
              {security.map(sec => <TableRow key={`${sec.type}${sec.name}`} accessors={securityAccesors} element={sec} />)}
            </TableBodyWrapper>
          </TableWrapper>
        </SecurityWrapper>
      : null
    );
  }
}

export default SecurityComponent;
