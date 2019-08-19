import React, { FunctionComponent } from 'react';

import { RawMessage, isOneOfPayload, isAnyOfPayload } from '../../types';

import { H4 } from '../../components';
import { SchemaComponent } from '../Schemas/Schema';

import { MessagePayload, MessagePayloadHeader } from './styled';

type PayloadProps = Required<Pick<RawMessage, 'payload'>>;

export const PayloadComponent: FunctionComponent<PayloadProps> = ({
  payload,
}) => {
  if (isOneOfPayload(payload)) {
    return (
      <>
        {/* todo: that text needs to be discussed */}
        <H4>One of those payloads:</H4>
        {payload.oneOf.map((elem, index: number) => (
          <PayloadComponent payload={elem} key={index} />
        ))}
      </>
    );
  }

  if (isAnyOfPayload(payload)) {
    return (
      <>
        {/* todo: that text needs to be discussed */}
        <H4>Any of those payloads:</H4>
        {payload.anyOf.map((elem, index: number) => (
          <PayloadComponent payload={elem} key={index} />
        ))}
      </>
    );
  }

  return (
    <MessagePayload>
      <MessagePayloadHeader>
        <H4>Payload</H4>
      </MessagePayloadHeader>
      <SchemaComponent
        name="Message Payload"
        schema={payload}
        exampleTitle="Example of payload"
        hideTitle={true}
      />
    </MessagePayload>
  );
};
