import React from 'react';

import { bemClasses, bindingsHelper } from '../../helpers';
import { SchemaComponent } from '../Schemas/Schema';

const className = `binding-field`;
interface Props {
  value: any;
  context: string;
  bindingType: string;
}

export const BindingFieldComponent: React.FunctionComponent<Props> = ({
  value,
  context,
  bindingType,
}) => {
  if (!value) {
    return null;
  }

  // three cases - simplevalue (need to render boolean correctly), nested object or SchemObject
  const isObject: boolean = bindingsHelper.isObject(value);
  const isSchemaObject: boolean = bindingsHelper.isSchemaObject(
    context,
    bindingType,
  );

  return (
    <>
      {!isObject && (
        <div>
          <div className="flex py-2">
            <div className="flex-1">
              <div className={bemClasses.element(`${className}-name`)}>
                {context}
              </div>
            </div>
            <div className="flex-1">
              {typeof value === 'boolean' ? JSON.stringify(value) : value}
            </div>
          </div>
        </div>
      )}
      {isObject && !isSchemaObject && (
        <>
          {Object.entries(value).map(([key, val]) => (
            <BindingFieldComponent
              value={val}
              context={`${context}.${key}`}
              bindingType={bindingType}
              key={key}
            />
          ))}
        </>
      )}
      {isSchemaObject && <SchemaComponent name={context} schema={value} />}
    </>
  );
};
