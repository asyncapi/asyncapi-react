import React, { Component } from 'react';
const OpenAPISampler = require('openapi-sampler');

import { Header, H2, H3, H4, Markdown, HeaderParagraph, TableColumn, Tag, DeprecatedBadge } from '../../components';

import { Map, Message, Schema } from '../../common';

import { 
  Message as MessageWrapper,
  MessageHeader,
  MessageHeaders,
  MessageHeadersHeader,
  MessagePayload,
  MessagePayloadHeader,
  MessageTags,
  MessageTagsHeader,
 } from './styled';

import SchemaComponent from '../Schemas/Schema';

export interface MessagesProps {
  title?: string,
  message: Message,
  hideTags?: boolean,
}

class MessageComponent extends Component<MessagesProps> {
  public render() {
    const { title, message, hideTags } = this.props;

    const headers = message.headers;
    const payload = message.payload;

    return (
      message ?
        <MessageWrapper>
          <MessageHeader>
            {title ? <H3>{title} {message.deprecated ? <DeprecatedBadge>Deprecated</DeprecatedBadge> : null}</H3> : null}
            {message.summary ? <Markdown>{message.summary}</Markdown> : null}
            {message.description ? <Markdown>{message.description}</Markdown> : null}
          </MessageHeader>
          {headers ?
            <MessageHeaders>
              <MessageHeadersHeader>
                <H4>Headers</H4>
              </MessageHeadersHeader>
              <SchemaComponent name="Message Headers" schema={headers} exampleTitle="Example of headers" hideTitle={true} />
            </MessageHeaders>
          : null}
          {payload ?
            <MessagePayload>
              <MessagePayloadHeader>
                <H4>Payload</H4>
              </MessagePayloadHeader>
              <SchemaComponent name="Message Payload" schema={payload} exampleTitle="Example of payload" hideTitle={true} />
            </MessagePayload>
          : null}
          {!hideTags && message.tags ?
            <MessageTags>
              <MessageTagsHeader>
                <H4>Tags</H4>
              </MessageTagsHeader>
              {message.tags.map(tag => <Tag key={tag.name}>{tag.name}</Tag>)}
            </MessageTags>
          : null}
        </MessageWrapper>
      : null
    );
  }
}

export default MessageComponent;
