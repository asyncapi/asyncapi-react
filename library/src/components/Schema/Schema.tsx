import React, { useState, useEffect, useContext } from 'react';
import { SchemaInterface } from '@asyncapi/parser';

import { Href, CollapseButton, Markdown, Extensions } from '../index';
import { SchemaHelpers } from '../../helpers';
import { SchemaItems } from './SchemaItems';
import { AdditionalItems } from './AdditionalItems';
import { SchemaProperties } from './SchemaProperties';
import { AdditionalProperties } from './AdditionalProperties';
import { Conditions } from './Conditions/Conditions';
import { Rules } from './Rules/Rules';
import { FieldStatusIndicator } from './FieldStatusIndicators';

export interface Props {
  schemaName?: React.ReactNode;
  schema?: SchemaInterface;
  showSchemaType?: boolean;
  required?: boolean;
  isPatternProperty?: boolean;
  isProperty?: boolean;
  isCircular?: boolean;
  dependentRequired?: string[];
  expanded?: boolean;
  onlyTitle?: boolean;
  isArray?: boolean;
  showConditionSidebar?: boolean;
}

const SchemaContext = React.createContext({
  reverse: false,
  deepExpanded: false,
});

export const Schema: React.FunctionComponent<Props> = ({
  schemaName,
  schema,
  // showSchemaType = true,
  required = false,
  isPatternProperty = false,
  isProperty = false,
  isCircular = false,
  // dependentRequired,
  expanded: propExpanded = false,
  // onlyTitle = false,
  isArray = false,
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const { reverse, deepExpanded } = useContext(SchemaContext);
  const [expanded, setExpanded] = useState(propExpanded || isArray);
  const [deepExpand, setDeepExpand] = useState(false);
  const [tabOpen, setTabOpen] = useState<'RULES' | 'CONDITIONS'>('RULES');

  const constraints = schema ? SchemaHelpers.humanizeConstraints(schema) : [];

  const rulesExist = schema
    ? SchemaHelpers.hasRules(schema, constraints)
    : false;

  const conditionsExist = schema ? SchemaHelpers.hasConditions(schema) : false;

  useEffect(() => {
    if (!rulesExist) setTabOpen('CONDITIONS');
  }, [rulesExist]);

  useEffect(() => {
    if (!isArray) {
      setDeepExpand(deepExpanded);
    }
  }, [isArray, deepExpanded, setDeepExpand]);

  useEffect(() => {
    if (!isArray) {
      setExpanded(deepExpand);
    }
  }, [isArray, deepExpand, setExpanded]);

  if (
    !schema ||
    (typeof schemaName === 'string' &&
      (schemaName?.startsWith('x-parser-') ||
        schemaName?.startsWith('x-schema-private-')))
  ) {
    return null;
  }

  const dependentSchemas = SchemaHelpers.getDependentSchemas(schema);

  const externalDocs = schema.externalDocs();

  const parameterLocationExt = schema
    .extensions()
    .get(SchemaHelpers.extParameterLocation);
  const parameterLocation = parameterLocationExt?.value() === true;

  const schemaType = SchemaHelpers.toSchemaType(schema);

  isCircular = isCircular || schema.isCircular() || false;

  const uid = schema.$id();

  const styledSchemaName = isProperty ? 'italic' : '';
  const renderedSchemaName =
    typeof schemaName === 'string' ? (
      <span className={`break-anywhere text-sm w-full ${styledSchemaName}`}>
        {schemaName}
      </span>
    ) : (
      schemaName
    );

  // we want the expanding dropdown to be present if schema has got other stuff, rules or conditions
  const isExpandable =
    SchemaHelpers.isExpandable(schema) || rulesExist || conditionsExist;

  return (
    <SchemaContext.Provider
      value={{
        reverse: !reverse,
        deepExpanded: deepExpand,
      }}
    >
      <div className="flex mb-4 gap-2">
        <div className={`border rounded overflow-visible w-full`}>
          {/* Header Section */}
          <div className="flex flex-col justify-center p-4 bg-gray-100 border-b">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 w-full">
                {isExpandable && !isCircular && !isArray ? (
                  // TODO: make this sticky
                  <div className="flex items-center gap-2">
                    <CollapseButton
                      onClick={() => setExpanded((prev) => !prev)}
                      expanded={expanded}
                    >
                      {renderedSchemaName}
                    </CollapseButton>
                  </div>
                ) : (
                  <span className={`text-sm ${isProperty ? 'italic' : ''}`}>
                    {schemaName}
                  </span>
                )}
                <span className="capitalize text-sm text-teal-500 font-bold">
                  {isCircular ? `${schemaType} [CIRCULAR]` : schemaType}
                </span>
                {schema.contentMediaType() !== undefined && (
                  <strong className="bg-yellow-600 no-underline text-white rounded lowercase mr-2 p-1 text-xs">
                    media type: {schema.contentMediaType()}
                  </strong>
                )}
                {uid && !uid.startsWith('<anonymous-') && (
                  <span className="border text-orange-600 rounded mr-2 p-1 text-xs">
                    uid: {uid}
                  </span>
                )}
                {/* TODO: find out if below is really needed ?? 
                  cuz schema.const() is already shown in a strict manner in Rules */}
                {/* 
                {SchemaHelpers.prettifyValue(schema.const(), false) && (
                  <span className="text-sm">
                    {SchemaHelpers.prettifyValue(schema.const(), false)}
                  </span>
                )} 
                 */}

                {/* Field Status Indicators */}
                <FieldStatusIndicator
                  schema={schema}
                  isPatternProperty={isPatternProperty}
                  required={required}
                />

                <div className="ml-auto flex gap-4">
                  {isExpandable && !isCircular && !isArray && (
                    <button
                      type="button"
                      onClick={() => setDeepExpand((prev) => !prev)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      {deepExpand ? 'Collapse all' : 'Expand all'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            {schema.description() && (
              <div className="mt-2 text-sm text-gray-600">
                <Markdown>{schema.description()}</Markdown>
              </div>
            )}
            {schema.examples() && (
              <ul className="text-xs">
                Examples values:{' '}
                {schema.examples()?.map((e, idx) => (
                  <li
                    key={idx}
                    className="inline-block bg-gray-600 text-white rounded ml-1 py-0 px-2 break-all"
                  >
                    <span>{SchemaHelpers.prettifyValue(e)}</span>
                  </li>
                ))}
              </ul>
            )}
            {parameterLocation && (
              <div className="text-xs">
                Parameter location:{' '}
                <span className="border text-orange-600 rounded mr-2 p-1 text-xs">
                  {parameterLocation}
                </span>
              </div>
            )}
            {externalDocs && (
              <strong className="w-min border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 no-underline text-xs uppercase rounded px-2 py-0 mt-2">
                <Href
                  href={externalDocs.url()}
                  title={externalDocs.description() ?? ''}
                >
                  Documentation
                </Href>
              </strong>
            )}
          </div>

          <div className="flex ">
            {/* Expandable Content */}
            {!isCircular && isExpandable && expanded && (
              <div className={`p-4 bg-white relative w-full`}>
                {/* Properties Section */}
                <SchemaProperties schema={schema} />

                {/* Array Items Section */}
                <SchemaItems schema={schema} />

                <div className="">
                  <div className="flex gap-1">
                    {rulesExist && (
                      <button
                        className={`text-sm font-semibold text-gray-900 ${tabOpen == 'RULES' ? 'bg-gray-400' : 'bg-gray-200'} p-2 rounded-t cursor-pointer`}
                        onClick={() => setTabOpen('RULES')}
                        role="tab"
                        aria-selected={tabOpen === 'RULES'}
                        aria-controls="rules-panel"
                      >
                        Rules
                      </button>
                    )}
                    {conditionsExist && (
                      <button
                        className={`text-sm font-semibold text-gray-900 ${tabOpen == 'CONDITIONS' ? 'bg-gray-400' : 'bg-gray-200'} p-2 rounded-t cursor-pointer`}
                        onClick={() => setTabOpen('CONDITIONS')}
                        role="tab"
                        aria-selected={tabOpen === 'CONDITIONS'}
                        aria-controls="conditions-panel"
                      >
                        Conditions
                      </button>
                    )}
                  </div>
                  {/* Conditions Section: has deep recursions */}
                  {conditionsExist && tabOpen == 'CONDITIONS' && (
                    <div className="mb-4 w-full">
                      <Conditions
                        schema={schema}
                        dependentSchemas={dependentSchemas}
                      />
                    </div>
                  )}

                  {/* Rules Section: typically does not involve recursion */}
                  {rulesExist && tabOpen == 'RULES' && (
                    <div className="z-10 w-full">
                      <Rules schema={schema} constraints={constraints} />
                    </div>
                  )}
                </div>

                {/* Additional Properties/Items Section */}
                <div className="mt-4">
                  <AdditionalProperties schema={schema} />
                  <AdditionalItems schema={schema} />
                </div>

                {/* Extensions Section */}
                <Extensions item={schema} />
              </div>
            )}
          </div>
        </div>
      </div>
    </SchemaContext.Provider>
  );
};
