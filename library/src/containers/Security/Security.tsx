import React, { Component } from 'react';

import {
  SecurityScheme,
  Components as ComponentsType,
  Servers as ServersType,
  ExcludeNullable,
} from '../../types';
import { renderMd } from '../../helpers/renderMarkdown';
import {
  H2,
  Markdown,
  TableAccessor,
  TableWrapper,
  TableHeader,
  TableBodyWrapper,
  TableRow,
} from '../../components';
import { Security as SecurityWrapper, SecurityHeader } from './styled';
import { SECURITY_TEXT, SECURITY_COLUMNS_NAMES } from '../../constants';

interface SecuritySchemeWithStages extends SecurityScheme {
  stages: string[];
}

const securityAccesors: TableAccessor[] = [
  (el: SecuritySchemeWithStages) => el.type,
  (el: SecuritySchemeWithStages) => el.stages && el.stages.join(', '),
  (el: SecuritySchemeWithStages) => el.in,
  (el: SecuritySchemeWithStages) => el.name,
  (el: SecuritySchemeWithStages) => el.scheme,
  (el: SecuritySchemeWithStages) => el.bearerFormat,
  (el: SecuritySchemeWithStages) =>
    el.description && <Markdown>{renderMd(el.description)}</Markdown>,
];

interface Props {
  securitySchemes: ExcludeNullable<ComponentsType['securitySchemes']>;
  servers: ServersType;
}

export class SecurityComponent extends Component<Props> {
  render() {
    const alteredSecuritySchemes = addStageToSecurity(this.props);

    return (
      <SecurityWrapper>
        <SecurityHeader>
          <H2>{SECURITY_TEXT}</H2>
        </SecurityHeader>
        <TableWrapper>
          <TableHeader columns={SECURITY_COLUMNS_NAMES} />
          <TableBodyWrapper>
            {Object.entries(alteredSecuritySchemes).map(([stage, sec]) =>
              !sec ? null : (
                <TableRow
                  key={stage}
                  accessors={securityAccesors}
                  element={sec}
                />
              ),
            )}
          </TableBodyWrapper>
        </TableWrapper>
      </SecurityWrapper>
    );
  }
}

export const addStageToSecurity: (
  arg: Props,
) => Record<string, SecuritySchemeWithStages> = ({
  servers,
  securitySchemes,
}) => {
  const copiedSecSchemes = JSON.parse(JSON.stringify(securitySchemes));

  Object.keys(copiedSecSchemes).map(securitySchemesKey => {
    Object.entries(servers)
      .filter(([_, serv]) => !!serv.security)
      .forEach(([stage, server]) => {
        server.security &&
          server.security.forEach(element => {
            if (element[securitySchemesKey]) {
              if (!Array.isArray(copiedSecSchemes[securitySchemesKey].stages)) {
                copiedSecSchemes[securitySchemesKey].stages = [];
              }
              copiedSecSchemes[securitySchemesKey].stages.push(stage);
            }
          });
      });
  });

  return copiedSecSchemes;
};
