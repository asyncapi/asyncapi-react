import React from 'react';

import {
  SecurityScheme,
  Components as ComponentsType,
  Servers as ServersType,
  ExcludeNullable,
} from '../../types';
import { renderMd } from '../../helpers/renderMarkdown';
import { bemClasses } from '../../helpers';
import { Table, Markdown, TableAccessor, TableRow } from '../../components';
import { SECURITY_TEXT, SECURITY_COLUMNS_NAMES } from '../../constants';

const addStageToSecurity: (
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

interface SecuritySchemeWithStages extends SecurityScheme {
  stages: string[];
}

const securityAccesors: Array<TableAccessor<SecuritySchemeWithStages>> = [
  el => <span>{el.type}</span>,
  el => (el.stages ? <span>{el.stages.join(', ')}</span> : null),
  el => <span>{el.in}</span>,
  el => <span>{el.name}</span>,
  el => <span>{el.scheme}</span>,
  el => <span>{el.bearerFormat}</span>,
  el => el.description && <Markdown>{renderMd(el.description)}</Markdown>,
];

interface Props {
  securitySchemes: ExcludeNullable<ComponentsType['securitySchemes']>;
  servers: ServersType;
}

export const SecurityComponent: React.FunctionComponent<Props> = props => {
  const alteredSecuritySchemes = addStageToSecurity(props);

  return (
    <div className={bemClasses.element(`security`)}>
      <header className={bemClasses.element(`security-header`)}>
        <h2>{SECURITY_TEXT}</h2>
      </header>
      <div className={bemClasses.element(`security-table`)}>
        <Table
          header={{
            columns: SECURITY_COLUMNS_NAMES,
          }}
        >
          {Object.entries(alteredSecuritySchemes).map(([stage, sec]) =>
            !sec ? null : (
              <TableRow
                key={stage}
                accessors={securityAccesors}
                element={sec}
              />
            ),
          )}
        </Table>
      </div>
    </div>
  );
};
