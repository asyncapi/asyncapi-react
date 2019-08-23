import React, { FunctionComponent } from 'react';

import { RawMessage, isOneOfPayload, isAnyOfPayload } from '../../types';

import { H4 } from '../../components';
import { SchemaComponent } from '../Schemas/Schema';

import { MessagePayload, MessagePayloadHeader } from './styled';
import {
  ONE_OF_PAYLOADS_TEXT,
  ANY_OF_PAYLOADS_TEXT,
  PAYLOAD_TEXT,
  MESSAGE_PAYLOAD_TEXT,
  PAYLOAD_EXAMPLE_TEXT,
} from '../../constants';

type PayloadProps = Required<Pick<RawMessage, 'payload'>>;

export const PayloadComponent: FunctionComponent<PayloadProps> = ({
  payload,
}) => {
  if (isOneOfPayload(payload)) {
    return (
      <>
        <H4>{ONE_OF_PAYLOADS_TEXT}</H4>
        {payload.oneOf.map((elem, index: number) => (
          <PayloadComponent payload={elem} key={index} />
        ))}
      </>
    );
  }

  if (isAnyOfPayload(payload)) {
    return (
      <>
        <H4>{ANY_OF_PAYLOADS_TEXT}</H4>
        {payload.anyOf.map((elem, index: number) => (
          <PayloadComponent payload={elem} key={index} />
        ))}
      </>
    );
  }

  return (
    <MessagePayload>
      <MessagePayloadHeader>
        <H4>{PAYLOAD_TEXT}</H4>
      </MessagePayloadHeader>
      <SchemaComponent
        name={MESSAGE_PAYLOAD_TEXT}
        schema={payload}
        exampleTitle={PAYLOAD_EXAMPLE_TEXT}
        hideTitle={true}
      />
    </MessagePayload>
  );
};
