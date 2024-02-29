import React, { Component } from 'react';

import {
  TabsWrapper,
  TabsHeader,
  TabsAdditionalHeaderContent,
  TabsContent,
} from './styled';

import { TabProps } from './Tab';

interface Props {
  additionalHeaderContent?: React.ReactNode;
  defaultActiveTabIndex?: number;
}

interface State {
  activeTabIndex: number;
}

class Tabs extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeTabIndex: this.props.defaultActiveTabIndex
        ? this.props.defaultActiveTabIndex
        : 0,
    };
  }

  handleTabClick = (tabIndex: number) => {
    this.setState({
      activeTabIndex: tabIndex,
    });
  };

  renderHeader = (children: Array<React.ReactElement<TabProps>>) =>
    React.Children.map(children, (child, index) => {
      const c = child as React.ReactElement<TabProps>;
      return React.cloneElement(c, {
        title: c.props.title,
        parentCallback: this.handleTabClick,
        tabIndex: index,
        isActive: index === this.state.activeTabIndex,
      });
    });

  renderActiveTab = (children: Array<React.ReactElement<TabProps>>) => {
    if (children[this.state.activeTabIndex]) {
      return children[this.state.activeTabIndex].props.children;
    }
    return null;
  };

  render() {
    const { additionalHeaderContent } = this.props;
    const children = []
      .concat(...(this.props.children as any))
      .filter(child => child !== null && child !== undefined);

    return (
      <TabsWrapper>
        <TabsHeader>
          {this.renderHeader(children)}
          <TabsAdditionalHeaderContent>
            {additionalHeaderContent}
          </TabsAdditionalHeaderContent>
        </TabsHeader>
        <TabsContent>{this.renderActiveTab(children)}</TabsContent>
      </TabsWrapper>
    );
  }
}

export default Tabs;
