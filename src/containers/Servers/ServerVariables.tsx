import React, { Component } from 'react';

import { 
    Header,
    H4, 
    Markdown, 
    TableColumnName, 
    TableAccesor, 
    TableWrapper, 
    TableHeader, 
    TableBodyWrapper, 
    TableRow, 
    TableCell,
    TableCellWithNested,
    TableWrapperNested,
    TableHeaderWrapperNested,
    TableBodyWrapperNested,
} from '../../components';

import { ServerVariable, TypeWithKey } from '../../common';

import { ServerVariablesEnumList, ServerVariablesEnumElement } from './styled';

type ServerVariableWithKey = TypeWithKey<string, ServerVariable>;

const serverVariablesColumnsName: TableColumnName[] = [
  "Name",
  "Default value",
  "Possible values",
  "Description",
]

const serverVariablesAccesors: TableAccesor[] = [
  (el: ServerVariableWithKey) => el.key,
  (el: ServerVariableWithKey) => el.content.default ? el.content.default : <em>None</em>,
  (el: ServerVariableWithKey) => el.content.enum ? (
    <ServerVariablesEnumList>
      {el.content.enum.map(value => <ServerVariablesEnumElement key={value}>{value}</ServerVariablesEnumElement>)}
    </ServerVariablesEnumList>
  ) : "Any",
  (el: ServerVariableWithKey) => el.content.description ? <Markdown>{el.content.description}</Markdown> : null,
]

export interface SchemaServerProps {
  variables: ServerVariableWithKey[];
}

class ServerVariablesComponent extends Component<SchemaServerProps> {
  public render() {
    const { variables } = this.props;

    const vars = (
      <TableCellWithNested colSpan={3}>
        <TableWrapperNested>
          <TableHeader title="URL Variables" columns={serverVariablesColumnsName} nested />
          <TableBodyWrapperNested>
            {variables.map(variable => <TableRow key={variable.key} accesors={serverVariablesAccesors} element={variable} nested />)}
          </TableBodyWrapperNested>
        </TableWrapperNested>
      </TableCellWithNested>
    )
    return <TableRow element={vars} />
  }
}

export default ServerVariablesComponent;
