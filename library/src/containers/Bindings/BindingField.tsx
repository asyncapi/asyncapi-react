import React from 'react';

import { bemClasses, bindingsHelper } from '../../helpers';
import { SchemaComponent } from '../Schemas/Schema';
import { BINDINGS_SCHEMA_OBJECT_TEXT } from '../../constants';

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
  if (value === null || value === undefined) {
    return null;
  }

  // three cases - simple value (need to render boolean correctly), nested object or SchemaObject
  const isObject: boolean = bindingsHelper.isObject(value);
  const isSchemaObject: boolean = bindingsHelper.isSchemaObject(
    context,
    bindingType,
  );

  if (isSchemaObject) {
    return (
      <>
        <div className="flex py-2">
          <div className="flex-1">
            <div className={bemClasses.element(`${className}-name`)}>
              {context}
            </div>
          </div>
          <div className="flex-1">{BINDINGS_SCHEMA_OBJECT_TEXT}</div>
        </div>
        <div className={bemClasses.element(`${className}-schema`)}>
          <SchemaComponent name={context} schema={value} hideTitle={true} />
        </div>
      </>
    );
  }

  if (isObject) {
    return (
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
    );
  }

  // simple value is the default return
  return (
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
  );
};
