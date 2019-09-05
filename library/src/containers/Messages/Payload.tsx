import React from 'react';

import { SchemaComponent } from '../Schemas/Schema';

import { bemClasses } from '../../helpers';
import { RawMessage, isOneOfPayload, isAnyOfPayload } from '../../types';
import {
  ONE_OF_PAYLOADS_TEXT,
  ANY_OF_PAYLOADS_TEXT,
  PAYLOAD_TEXT,
  MESSAGE_PAYLOAD_TEXT,
  PAYLOAD_EXAMPLE_TEXT,
} from '../../constants';

type PayloadProps = Required<Pick<RawMessage, 'payload'>>;

export const PayloadComponent: React.FunctionComponent<PayloadProps> = ({
  payload,
}) => {
  if (isOneOfPayload(payload)) {
    return (
      <div className={bemClasses.element(`message-payload-oneOf`)}>
        <header className={bemClasses.element(`message-payload-oneOf-header`)}>
          <h4>{ONE_OF_PAYLOADS_TEXT}</h4>
        </header>
        <ul className={bemClasses.element(`message-payload-oneOf-list`)}>
          {payload.oneOf.map((elem, index: number) => (
            <li
              key={index}
              className={bemClasses.element(`message-payload-oneOf-list-item`)}
            >
              <PayloadComponent payload={elem} key={index} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (isAnyOfPayload(payload)) {
    return (
      <div className={bemClasses.element(`message-payload-anyOf`)}>
        <header className={bemClasses.element(`message-payload-anyOf-header`)}>
          <h4>{ANY_OF_PAYLOADS_TEXT}</h4>
        </header>
        <ul className={bemClasses.element(`message-payload-anyOf-list`)}>
          {payload.anyOf.map((elem, index: number) => (
            <li
              key={index}
              className={bemClasses.element(`message-payload-anyOf-list-item`)}
            >
              <PayloadComponent payload={elem} key={index} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className={bemClasses.element(`message-payload`)}>
      <header className={bemClasses.element(`message-payload-header`)}>
        <h4>{PAYLOAD_TEXT}</h4>
      </header>
      <div className={bemClasses.element(`message-payload-schema`)}>
        <SchemaComponent
          name={MESSAGE_PAYLOAD_TEXT}
          schema={payload}
          exampleTitle={PAYLOAD_EXAMPLE_TEXT}
          hideTitle={true}
        />
      </div>
    </div>
  );
};
