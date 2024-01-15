import React from 'react';
import { Schema } from './Schema'
import { SchemaHelpers } from '../helpers';
import type { AsyncAPIDocumentInterface, BaseModel } from "@asyncapi/parser"
import type { ConfigInterface } from "../config"



export interface ExtensionComponentProps<V = any> {
  key: string; 
  value: V; 
  document: AsyncAPIDocumentInterface 
  config: ConfigInterface 
  parent: BaseModel 
}
interface Props {
  name?: string;
  extensions: ExtensionsInterface;
}

export const Extensions: React.FunctionComponent<Props> = ({
  name = 'Extensions Specific Information',
  extensions,
}) => {
  const extensions = SchemaHelpers.getCustomExtensions(extensions);
  if (!extensions || !Object.keys(extensions).length) {
    return null;
  }

  const schema = SchemaHelpers.jsonToSchema(extensions);
  return (
    schema && (
      <div className="mt-2">
        <Schema schemaName={name} schema={schema} onlyTitle={true} />
      </div>
    )
  );
};
