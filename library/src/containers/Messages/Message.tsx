import React, { Component } from 'react';

import { Message } from '../../types';

import { H3, H4, Markdown, Tag, DeprecatedBadge } from '../../components';
import SchemaComponent from '../Schemas/Schema';

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

interface Props {
  title?: string,
  message: Message,
  hideTags?: boolean,
}

class MessageComponent extends Component<Props> {
  render() {
    const { title, message, hideTags } = this.props;

    const headers = message.headers;
    const payload = message.payload;

    if (!message) return null;

    return (
      <MessageWrapper>
        <MessageHeader>
          {title && <H3>{title} {message.deprecated && <DeprecatedBadge>Deprecated</DeprecatedBadge>}</H3>}
          {message.summary && <Markdown>{message.summary}</Markdown>}
          {message.description && <Markdown>{message.description}</Markdown>}
        </MessageHeader>
        {headers &&
          <MessageHeaders>
            <MessageHeadersHeader>
              <H4>Headers</H4>
            </MessageHeadersHeader>
            <SchemaComponent name="Message Headers" schema={headers} exampleTitle="Example of headers" hideTitle={true} />
          </MessageHeaders>
        }
        {payload &&
          <MessagePayload>
            <MessagePayloadHeader>
              <H4>Payload</H4>
            </MessagePayloadHeader>
            <SchemaComponent name="Message Payload" schema={payload} exampleTitle="Example of payload" hideTitle={true} />
          </MessagePayload>
        }
        {!hideTags && message.tags &&
          <MessageTags>
            <MessageTagsHeader>
              <H4>Tags</H4>
            </MessageTagsHeader>
            {message.tags.map(tag => <Tag key={tag.name}>{tag.name}</Tag>)}
          </MessageTags>
        }
      </MessageWrapper>
    );
  }
}

export default MessageComponent;
