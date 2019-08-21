import React, { Component } from 'react';

import { ServerVariable, TypeWithKey } from '../../types';

import {
  Markdown,
  TableColumnName,
  TableAccessor,
  TableHeader,
  TableRow,
  TableCellWithNested,
  TableWrapperNested,
  TableBodyWrapperNested,
} from '../../components';
import { ServerVariablesEnumList, ServerVariablesEnumElement } from './styled';

type ServerVariableWithKey = TypeWithKey<string, ServerVariable>;

const serverVariablesColumnsName: TableColumnName[] = [
  'Name',
  'Default value',
  'Possible values',
  'Description',
];

const serverVariablesAccessors: TableAccessor[] = [
  (el: ServerVariableWithKey) => el.key,
  (el: ServerVariableWithKey) =>
    el.content.default ? el.content.default : <em>None</em>,
  (el: ServerVariableWithKey) =>
    el.content.enum ? (
      <ServerVariablesEnumList>
        {el.content.enum.map(value => (
          <ServerVariablesEnumElement key={value}>
            {value}
          </ServerVariablesEnumElement>
        ))}
      </ServerVariablesEnumList>
    ) : (
      'Any'
    ),
  (el: ServerVariableWithKey) =>
    el.content.description && <Markdown>{el.content.description}</Markdown>,
];

interface Props {
  variables: ServerVariableWithKey[];
  openAccordion: boolean;
}

class ServerVariablesComponent extends Component<Props> {
  render() {
    const { variables, openAccordion } = this.props;

    const vars = (
      <TableCellWithNested colSpan={4}>
        <div>
          <TableWrapperNested>
            <TableHeader
              title="URL Variables"
              columns={serverVariablesColumnsName}
              nested={true}
            />
            <TableBodyWrapperNested>
              {variables.map(variable => (
                <TableRow
                  key={variable.key}
                  accessors={serverVariablesAccessors}
                  element={variable}
                  nested={true}
                />
              ))}
            </TableBodyWrapperNested>
          </TableWrapperNested>
        </div>
      </TableCellWithNested>
    );
    return <TableRow openAccordion={openAccordion} element={vars} />;
  }
}

export default ServerVariablesComponent;
