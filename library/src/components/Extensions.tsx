/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, { useContext, useState } from 'react';

import { Schema } from './Schema';

import { SchemaHelpers } from '../helpers';
import { AsyncAPIDocumentInterface, BaseModel } from '@asyncapi/parser';
import { useConfig, useSpec } from '../contexts';
import { CollapseButton } from './CollapseButton';

interface Props {
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
}

export interface ExtensionComponentProps<V = any> {
  propertyName: string;
  propertyValue: V;
  document: AsyncAPIDocumentInterface;
  parent: BaseModel;
}

const SchemaContext = React.createContext({
  reverse: false,
});

export const Extensions: React.FunctionComponent<Props> = ({
  name = 'Extensions',
  item,
}) => {
  const { reverse } = useContext(SchemaContext);
  const [expanded, setExpanded] = useState(false);
  const [deepExpand, setDeepExpand] = useState(false);

  const config = useConfig();
  const document = useSpec();

  const extensions = SchemaHelpers.getCustomExtensions(item);
  if (!extensions || !Object.keys(extensions).length) {
    return null;
  }

  if (!config.extensions || !Object.keys(config.extensions).length) {
    const schema = SchemaHelpers.jsonToSchema(extensions);
    return (
      schema && (
        <div className="mt-2">
          <Schema schemaName={name} schema={schema} onlyTitle={true} />
        </div>
      )
    );
  }

  return (
    <div>
      <div className="flex py-2">
        <div className="min-w-1/4">
          <>
            <CollapseButton
              onClick={() => setExpanded(prev => !prev)}
              expanded={expanded}
            >
              <span className={`break-anywhere text-sm ${name}`}>{name}</span>
            </CollapseButton>
            <button
              type="button"
              onClick={() => setDeepExpand(prev => !prev)}
              className="ml-1 text-sm text-gray-500"
            >
              {deepExpand ? 'Collapse all' : 'Expand all'}
            </button>
          </>
        </div>
      </div>
      <div
        className={`rounded p-4 py-2 border bg-gray-100 ${
          reverse ? 'bg-gray-200' : ''
        } ${expanded ? 'block' : 'hidden'}`}
      >
        {Object.keys(extensions)
          .sort((extension1, extension2) =>
            extension1.localeCompare(extension2),
          )
          .map(extensionKey => {
            if (config.extensions && config.extensions[extensionKey]) {
              const CustomExtensionComponent = config.extensions[extensionKey];
              return (
                <CustomExtensionComponent
                  propertyName={extensionKey}
                  propertyValue={extensions[extensionKey]}
                  document={document}
                  parent={item}
                />
              );
            } else {
              const extensionSchema = SchemaHelpers.jsonToSchema(
                extensions[extensionKey],
              );
              return (
                <div className="mt-2">
                  <Schema schemaName={extensionKey} schema={extensionSchema} />
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};
