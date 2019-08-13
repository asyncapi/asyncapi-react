import React, { Component } from 'react';

import { Topic, Channel, Message } from '../../types';

import ParametersComponent from './Parameters';
import MessageComponent from '../Messages/Message';

// import { H3, H4, HeaderParagraph, PublishBadge, SubscribeBadge, DeprecatedBadge } from '../../components';
import { H3, H4, HeaderParagraph, PublishBadge, SubscribeBadge } from '../../components';
import { Topic as TopicWrapper, TopicHeader, TopicHeaderBadge, TopicMessage, TopicHeaderMessage } from './styled';
import { MessageIndented } from '../Messages/styled';

interface Props {
  title: string,
  topic?: Topic,
  channel: Channel
}

export class ChannelComponent extends Component<Props> {
  private renderPublish() {
    const { channel } = this.props;
    if (!channel.publish) return null;

    const publish: any = channel.publish;
    if (!(publish as any).oneOf) {
      const message: Message = publish.message;
      return <TopicMessage><MessageComponent message={message} /></TopicMessage>
    } else {
      const publishes: Message[] = (publish as any).oneOf;
      
      return publishes.map((pub, index) => (
        <TopicMessage key={index}>
          <TopicHeaderMessage>
            <H4>Message #{index + 1}</H4>
          </TopicHeaderMessage>
          <MessageIndented>
            <MessageComponent message={pub} />
          </MessageIndented>
        </TopicMessage>
      ))
    }
  }

  private renderSubscribe() {
    const { channel } = this.props

    if (!channel.subscribe) return null;

    const subscribe: any = channel.subscribe
    if (!(subscribe as any).oneOf) {
      const message: Message = subscribe.message;
      return <TopicMessage><MessageComponent message={message} /></TopicMessage>
    } else {
      const subscribes: Message[] = (subscribe as any).oneOf;

      return subscribes.map((sub, index) => (
        <TopicMessage key={index}>
          <TopicHeaderMessage>
            <H4>Message #{index + 1}</H4>
          </TopicHeaderMessage>
          <MessageIndented>
            <MessageComponent message={sub} />
          </MessageIndented>
        </TopicMessage>
      ))
    }
  }

  render() {
    const { title, channel } = this.props;

    const oneOf: boolean =  (channel.publish && (channel.publish as any).oneOf) || (channel.subscribe && (channel.subscribe as any).oneOf) as boolean;

    return (
      <TopicWrapper>
        <TopicHeader>
          <H3>
            <TopicHeaderBadge>
              {/* {channel.deprecated && <DeprecatedBadge>Deprecated</DeprecatedBadge>} */}
              {channel.publish && <PublishBadge>Publish</PublishBadge>}
              {channel.subscribe && <SubscribeBadge>Subscribe</SubscribeBadge>}
            </TopicHeaderBadge>
            {title}
          </H3>
        </TopicHeader>
        <ParametersComponent parameters={channel.parameters} />
        <TopicHeaderMessage>
          <H4>{oneOf ? "Messages" : "Message"}</H4>
          {oneOf && <HeaderParagraph>You can send one of the following messages:</HeaderParagraph>}
        </TopicHeaderMessage>
        {this.renderPublish()}
        {this.renderSubscribe()}
      </TopicWrapper>
    );
  }
}


// class TopicComponent extends Component<Props> {
//   private renderPublish() {
//     const { topic } = this.props

//     if (!topic.publish) return null;

//     const publish = topic.publish
//     if (!(publish as any).oneOf) {
//       return <TopicMessage><MessageComponent message={publish as Message} /></TopicMessage>
//     } else {
//       const publishes: Message[] = (publish as any).oneOf;

//       return publishes.map((pub, index) => (
//         <TopicMessage key={index}>
//           <TopicHeaderMessage>
//             <H4>Message #{index + 1}</H4>
//           </TopicHeaderMessage>
//           <MessageIndented>
//             <MessageComponent message={pub} />
//           </MessageIndented>
//         </TopicMessage>
//       ))
//     }
//   }

//   private renderSubscribe() {
//     const { topic } = this.props

//     if (!topic.subscribe) return null;

//     const subscribe = topic.subscribe
//     if (!(subscribe as any).oneOf) {
//       return <TopicMessage><MessageComponent message={subscribe as Message} /></TopicMessage>
//     } else {
//       const subscribes: Message[] = (subscribe as any).oneOf;

//       return subscribes.map((sub, index) => (
//         <TopicMessage key={index}>
//           <TopicHeaderMessage>
//             <H4>Message #{index + 1}</H4>
//           </TopicHeaderMessage>
//           <MessageIndented>
//             <MessageComponent message={sub} />
//           </MessageIndented>
//         </TopicMessage>
//       ))
//     }
//   }

//   render() {
//     const { title, topic } = this.props;

//     const oneOf: boolean =  (topic.publish && (topic.publish as any).oneOf) || (topic.subscribe && (topic.subscribe as any).oneOf) as boolean;

//     return (
//       <TopicWrapper>
//         <TopicHeader>
//           <H3>
//             <TopicHeaderBadge>
//               {topic.deprecated && <DeprecatedBadge>Deprecated</DeprecatedBadge>}
//               {topic.publish && <PublishBadge>Publish</PublishBadge>}
//               {topic.subscribe && <SubscribeBadge>Subscribe</SubscribeBadge>}
//             </TopicHeaderBadge>
//             {title}
//           </H3>
//         </TopicHeader>
//         <ParametersComponent parameters={topic.parameters} />
//         <TopicHeaderMessage>
//           <H4>{oneOf ? "Messages" : "Message"}</H4>
//           {oneOf && <HeaderParagraph>You can send one of the following messages:</HeaderParagraph>}
//         </TopicHeaderMessage>
//         {this.renderPublish()}
//         {this.renderSubscribe()}
//       </TopicWrapper>
//     );
//   }
// }

// export default TopicComponent;
