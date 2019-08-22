import React, { Component } from 'react';

import { Message, isRawMessage } from '../../types';

import { H3, H4, Markdown, Tag, DeprecatedBadge } from '../../components';
import { SchemaComponent } from '../Schemas/Schema';
import { PayloadComponent } from './Payload';

import {
  Message as MessageWrapper,
  MessageHeader,
  MessageHeaders,
  MessageHeadersHeader,
  MessageTags,
  MessageTagsHeader,
} from './styled';

interface Props {
  title?: string;
  message: Message;
  hideTags?: boolean;
}

export class MessageComponent extends Component<Props> {
  render() {
    const { title, message, hideTags } = this.props;
    if (!message) {
      return null;
    }

    if (!isRawMessage(message)) {
      return (
        <>
          {message.oneOf.map((elem, index) => (
            <MessageComponent message={elem} key={index} />
          ))}
        </>
      );
    }

    const headers = message.headers;
    const payload = message.payload;

    return (
      <MessageWrapper>
        <MessageHeader>
          {title ? (
            <H3>
              {title}{' '}
              {message.deprecated && (
                <DeprecatedBadge>Deprecated</DeprecatedBadge>
              )}
            </H3>
          ) : null}
          {message.summary && <Markdown>{message.summary}</Markdown>}
          {message.description && <Markdown>{message.description}</Markdown>}
        </MessageHeader>
        {headers && (
          <MessageHeaders>
            <MessageHeadersHeader>
              <H4>Headers</H4>
            </MessageHeadersHeader>
            <SchemaComponent
              name="Message Headers"
              schema={headers}
              exampleTitle="Example of headers"
              hideTitle={true}
            />
          </MessageHeaders>
        )}
        {payload && <PayloadComponent payload={payload} />}
        {!hideTags && message.tags && (
          <MessageTags>
            <MessageTagsHeader>
              <H4>Tags</H4>
            </MessageTagsHeader>
            {message.tags.map(tag => (
              <Tag key={tag.name}>{tag.name}</Tag>
            ))}
          </MessageTags>
        )}
      </MessageWrapper>
    );
  }
}
