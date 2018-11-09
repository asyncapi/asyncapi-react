import React, { Component } from 'react';

import { Header, H2, H4, HeaderParagraph, Table, TableColumn } from '../../components';

import { Map, Topic, Message, Schema } from '../../common';

export interface TopicsProps {
  baseTopic?: string,
  topics?: Map<string, Topic>;
}

class TopicsComponent extends Component<TopicsProps> {
//   private headersColumns: TableColumn[] = [
//     {
//       name: "Name",
//       accesor: (el: Schema) => el.name
//     }, {
//       name: "Title",
//       accesor: (el: Schema) => el.title
//     }, {
//       name: "Type",
//       accesor: (el: Schema) => el.type
//     }, {
//       name: "Format",
//       accesor: (el: Schema) => el.name
//     }, {
//       name: "Default",
//       accesor: (el: Schema) => el.title
//     }, {
//       name: "Description",
//       accesor: (el: Schema) => el.type
//     }
//   ]

//   private payloadColumns: TableColumn[] = [
//     {
//       name: "Name",
//       accesor: (el: Schema) => el.name
//     }, {
//       name: "Title",
//       accesor: (el: Schema) => el.title
//     }, {
//       name: "Type",
//       accesor: (el: Schema) => el.type
//     }, {
//       name: "Format",
//       accesor: (el: Schema) => el.name
//     }, {
//       name: "Default",
//       accesor: (el: Schema) => el.title
//     }, {
//       name: "Description",
//       accesor: (el: Schema) => el.type
//     }
//   ]

  private getTypeOfTopic = (topic: Topic): string => {
    const obj = Object(topic);

    if (topic.subscribe) return 'subscribe';
    if (topic.publish) return 'publish';
    if (topic.parameters) return 'parameters';
    return ""
  }

  private renderTopic = (topic: Topic, key: string) => {
    const type = this.getTypeOfTopic(topic);
    const content: Message = (topic as any)[type];

    console.log(content)

    return (
      <div key={key}>
        <Header>
          <H4>Message</H4>
          <HeaderParagraph>{content.summary}</HeaderParagraph>
        </Header>
        <Header>
          <H4>Payload</H4>
        </Header>
      </div>
    )
  }

  public render() {
    const { baseTopic, topics } = this.props;
    const renderedTopics = Object.keys(topics!).map(key => this.renderTopic(topics![key], key))

    return (
      <>
        <Header>
          <H2>Topics</H2>
        </Header>
        {renderedTopics}
      </>
    );
  }
}

export default TopicsComponent;
