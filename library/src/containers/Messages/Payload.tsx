import React from 'react';

import { SchemaComponent } from '../Schemas/Schema';

import { bemClasses } from '../../helpers';
import { RawMessage, isOneOfPayload, isAnyOfPayload } from '../../types';
import { Toggle } from '../../components';
import {
  ONE_OF_PAYLOADS_TEXT,
  ANY_OF_PAYLOADS_TEXT,
  PAYLOAD_TEXT,
  MESSAGE_PAYLOAD_TEXT,
  PAYLOAD_EXAMPLE_TEXT,
} from '../../constants';

interface Props extends Required<Pick<RawMessage, 'payload'>> {
  oneOf?: boolean;
  anyOf?: boolean;
  identifier?: string;
  dataIdentifier?: string;
  id?: number;
  examples?: object[];
}

export const PayloadComponent: React.FunctionComponent<Props> = ({
  payload,
  oneOf = false,
  anyOf = false,
  identifier,
  dataIdentifier,
  id,
  examples,
}) => {
  const className = `message-payload`;
  const payloadsID = identifier ? `${identifier}s` : undefined;

  if (isOneOfPayload(payload)) {
    return (
      <div
        className={bemClasses.element(`${className}-oneOf`)}
        id={payloadsID}
        data-asyncapi-id={dataIdentifier}
      >
        <header className={bemClasses.element(`${className}-oneOf-header`)}>
          <h4>{ONE_OF_PAYLOADS_TEXT}</h4>
        </header>
        <ul className={bemClasses.element(`${className}-oneOf-list`)}>
          {payload.oneOf.map((elem, index: number) => (
            <li
              key={index}
              className={bemClasses.element(`${className}-oneOf-list-item`)}
            >
              <PayloadComponent
                payload={elem}
                key={index}
                oneOf={true}
                identifier={identifier}
                id={index}
                examples={examples}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (isAnyOfPayload(payload)) {
    return (
      <div
        className={bemClasses.element(`${className}-anyOf`)}
        id={payloadsID}
        data-asyncapi-id={dataIdentifier}
      >
        <header className={bemClasses.element(`${className}-anyOf-header`)}>
          <h4>{ANY_OF_PAYLOADS_TEXT}</h4>
        </header>
        <ul className={bemClasses.element(`${className}-anyOf-list`)}>
          {payload.anyOf.map((elem, index: number) => (
            <li
              key={index}
              className={bemClasses.element(`${className}-anyOf-list-item`)}
            >
              <PayloadComponent
                payload={elem}
                key={index}
                anyOf={true}
                identifier={identifier}
                id={index}
                examples={examples}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const header = (
    <header className={bemClasses.element(`${className}-header`)}>
      <h4>{id !== undefined ? id : PAYLOAD_TEXT}</h4>
    </header>
  );

  const content = (
    <div className={bemClasses.element(`${className}-schema`)}>
      <SchemaComponent
        name={MESSAGE_PAYLOAD_TEXT}
        schema={payload}
        exampleTitle={PAYLOAD_EXAMPLE_TEXT}
        hideTitle={true}
        examples={examples}
      />
    </div>
  );

  let payloadID;
  if (identifier) {
    payloadID =
      payload.title && payload.title.length
        ? `${identifier}-${payload.title}`
        : `${identifier}${id !== undefined ? `-${id}` : ''}`;
  }
  let payloadDataID;
  if (dataIdentifier) {
    payloadDataID =
      payload.title && payload.title.length
        ? `${dataIdentifier}-${payload.title}`
        : `${dataIdentifier}${id !== undefined ? `-${id}` : ''}`;
  }

  if (oneOf || anyOf) {
    return (
      <section
        className={bemClasses.element(className)}
        id={payloadID}
        data-asyncapi-id={payloadDataID}
      >
        <Toggle header={header} className={className}>
          {content}
        </Toggle>
      </section>
    );
  }

  return (
    <section
      className={bemClasses.element(className)}
      id={payloadID}
      data-asyncapi-id={payloadDataID}
    >
      {header}
      {content}
    </section>
  );
};
