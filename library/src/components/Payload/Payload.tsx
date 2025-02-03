import React, { useState, useEffect, useContext } from 'react';
import { SchemaInterface } from '@asyncapi/parser';

import {
  Href,
  CollapseButton,
  Markdown,
  Extensions,
  HiChevronRight,
} from '../index';
import { SchemaHelpers } from '../../helpers';
import { useElementSize } from '../../hooks/useElementSize';
import { SchemaItems } from './SchemaItems';
import { AdditionalItems } from './AdditionalItems';
import { SchemaProperties } from './SchemaProperties';
import { AdditionalProperties } from './AdditionalProperties';
import { Conditions } from './Conditions/Conditions';
import { Rules } from './Rules/Rules';
import { FeildStatusIndicator } from './FeildStatusIndicators';

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
  recursionCounter?: number;
}

const PayloadSchemaContext = React.createContext({
  reverse: false,
  deepExpanded: false,
});

export const Payload: React.FunctionComponent<Props> = ({
  schemaName,
  schema,
  showSchemaType = true,
  required = false,
  isPatternProperty = false,
  isProperty = false,
  isCircular = false,
  dependentRequired,
  expanded: propExpanded = false,
  onlyTitle = false,
  isArray = false,
  recursionCounter = 0,
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const { reverse, deepExpanded } = useContext(PayloadSchemaContext);
  const [expanded, setExpanded] = useState(propExpanded || isArray);
  const [deepExpand, setDeepExpand] = useState(false);
  // rulesSidebarOpen state is usefull only when recursionCounter is 0, else it is redundant
  const [rulesSidebarOpen, setRulesSidebarOpen] = useState(false);
  const [setConditionsRef, conditionsSize] = useElementSize();
  const [setRulesRef, rulesSize] = useElementSize();

  const floatConditionsToRight =
    isProperty && recursionCounter >= 2 && rulesSidebarOpen;

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

  const constraints = SchemaHelpers.humanizeConstraints(schema);
  const externalDocs = schema.externalDocs();

  // const rawValueExt = schema.extensions().get(SchemaHelpers.extRawValue);
  // const rawValue = rawValueExt?.value() === true;

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

  // comes in Rules section
  const rulesExist = SchemaHelpers.hasRules(schema, constraints);
  // comes in Conditions section
  const conditionsExist = SchemaHelpers.hasConditions(schema);

  // we want the expanding dropdown to be present if schema has got other stuff, rules or conditions
  const isExpandable =
    SchemaHelpers.isExpandable(schema) || rulesExist || conditionsExist;

  const childrenHaveConditions = SchemaHelpers.childrenHaveConditions(schema);

  // this is the ammount of shift it needs to be moved to the right in px
  // by absolute when the components gets nested a lot
  const conditionsRightShift = 30 + 10 * (recursionCounter - 1);

  return (
    <PayloadSchemaContext.Provider
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
                <FeildStatusIndicator
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
                  {childrenHaveConditions && recursionCounter == 0 && (
                    <button
                      type="button"
                      onClick={() => setRulesSidebarOpen((prev) => !prev)}
                      className="flex items-center text-sm  p-1 rounded"
                    >
                      <span className="">Rules</span>
                      <HiChevronRight
                        className={`inline-block align-baseline cursor-pointer w-5 h-6 transform transition-transform duration-150 ease-linear ${
                          rulesSidebarOpen ? `-rotate-${0}` : `-rotate-${180}`
                        }`}
                      />
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
              <div
                className={`p-4 bg-white relative ${expanded && rulesSidebarOpen && recursionCounter == 0 ? ' w-1/2' : 'w-full'}`}
              >
                {/* Properties Section */}
                <SchemaProperties
                  schema={schema}
                  recursionCounter={recursionCounter + 1}
                />

                {/* Array Items Section */}
                <SchemaItems
                  schema={schema}
                  recursionCounter={recursionCounter + 1}
                />

                <div
                  className=""
                  style={{
                    minHeight: Math.max(
                      conditionsSize.height,
                      rulesSize.height,
                    ),
                  }}
                >
                  {/* Conditions Section: has hella recursion in it*/}
                  {conditionsExist && (
                    <div className="mb-4 w-full" ref={setConditionsRef}>
                      <Conditions
                        schema={schema}
                        recursionCounter={recursionCounter}
                        dependentSchemas={dependentSchemas}
                      />
                    </div>
                  )}

                  {/* Rules Section: it generally doesnt have any recursion in it */}
                  {rulesExist && (
                    <div
                      className="z-10 w-full"
                      style={
                        floatConditionsToRight && conditionsExist
                          ? {
                              position: 'absolute',
                              left: `calc(100% + ${conditionsRightShift}px)`,
                              top: '1rem',
                            }
                          : {}
                      }
                      ref={setRulesRef}
                    >
                      <Rules schema={schema} constraints={constraints} />
                    </div>
                  )}
                </div>

                {/* Additional Properties/Items Section */}
                <div className="mt-4">
                  <AdditionalProperties
                    schema={schema}
                    recursionCounter={recursionCounter + 1}
                  />
                  <AdditionalItems
                    schema={schema}
                    recursionCounter={recursionCounter + 1}
                  />
                </div>

                {/* Extensions Section */}
                <Extensions
                  item={schema}
                  recursionCounter={recursionCounter + 1}
                />
              </div>
            )}
            {/* right side conditions sidebar */}
            {expanded && rulesSidebarOpen && recursionCounter == 0 && (
              <div className="w-1/2 mt-16" />
            )}
          </div>
        </div>
      </div>
    </PayloadSchemaContext.Provider>
  );
};
