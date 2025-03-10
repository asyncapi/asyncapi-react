import React, { useState } from "react";
import { useConfig, useSpec } from "../contexts";
import { SchemaHelpers } from "../helpers";
import { CollapseButton } from "./CollapseButton";
import { Schema } from "./Schema";






interface Props {
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
}

export const Extensions: React.FunctionComponent<Props> = ({
  name = 'Extensions',
  item,
}) => {
  const [expanded, setExpanded] = useState(false);

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
              onClick={() => setExpanded((prev) => !prev)}
              expanded={expanded}
            >
              <span className={`break-anywhere text-sm ${name}`}>{name}</span>
            </CollapseButton>
          </>
        </div>
      </div>
      <div
        className={`rounded p-4 py-2 border bg-gray-100 ${expanded ? 'block' : 'hidden'}`}
      >
        {Object.keys(extensions)
          .sort((extension1, extension2) =>
            extension1.localeCompare(extension2),
          )
          .map((extensionKey) => {
            if (config.extensions?.[extensionKey]) {
              const CustomExtensionComponent = config.extensions[extensionKey];
              return (
                <CustomExtensionComponent
                  key={extensionKey}
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
                <div key={extensionKey} className="mt-2">
                  <Schema schemaName={extensionKey} schema={extensionSchema} />
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};
