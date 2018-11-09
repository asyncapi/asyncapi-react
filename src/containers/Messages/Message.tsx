import React, { Component } from 'react';
const OpenAPISampler = require('openapi-sampler');

import { Header, H2, H3, H4, HeaderParagraph, TableColumn } from '../../components';

import { Map, Message, Schema } from '../../common';

export interface MessagesProps {
  title: string,
  message: Message,
}

type SchemaWithKey = {
  key: string,
  schema: Schema,
}

const headersColumns: TableColumn[] = [
  {
    name: "Name",
    accesor: (el: SchemaWithKey) => el.key
  }, {
    name: "Title",
    accesor: (el: SchemaWithKey) => el.schema.title
  }, {
    name: "Type",
    accesor: (el: SchemaWithKey) => el.schema.type
  }, {
    name: "Format",
    accesor: (el: SchemaWithKey) => el.schema.format
  }, {
    name: "Default",
    accesor: (el: SchemaWithKey) => el.schema.default
  }, {
    name: "Description",
    accesor: (el: SchemaWithKey) => el.schema.description
  }, 
]

const payloadColumns: TableColumn[] = [
  {
    name: "Name",
    accesor: (el: SchemaWithKey) => el
  }, {
    name: "Title",
    accesor: (el: SchemaWithKey) => el.schema.title
  }, {
    name: "Type",
    accesor: (el: SchemaWithKey) => el.schema.type
  }, {
    name: "Format",
    accesor: (el: SchemaWithKey) => el.schema.format
  }, {
    name: "Default",
    accesor: (el: SchemaWithKey) => el.schema.default
  }, {
    name: "Description",
    accesor: (el: SchemaWithKey) => el.schema.description
  }, 
]

class MessageComponent extends Component<MessagesProps> {
  private renderHeaders = (headers: Schema) => {
    console.log(headers)

  }

  private renderExampleOfHeaders = (headers: Schema) => {
  }

  private renderPayload = (payload: Schema) => {
    console.log(payload)

  }

  private renderExampleOfPayload = (payload: Schema) => {
    const sample = OpenAPISampler.sample(payload)
    console.log(sample)
  }

  public render() {
    const { title, message } = this.props;

    const headers: Schema = message.headers as Message;
    const payload: Schema = message.payload as Message;

    return (
      message ?
        <>
          <Header>
            <H3>{title}</H3>
            <HeaderParagraph>{message.summary}</HeaderParagraph>
            <HeaderParagraph>{message.description}</HeaderParagraph>
          </Header>
          <section>
            <Header>
              <H4>Headers</H4>
            </Header>
            {this.renderHeaders(headers)}
            {this.renderExampleOfHeaders(headers)}
          </section>
          <section>
            <Header>
              <H4>Payload</H4>
            </Header>
            {this.renderPayload(payload)}
            {this.renderExampleOfPayload(payload)}
          </section>
        </>
      : null
    );
  }
}

export default MessageComponent;
