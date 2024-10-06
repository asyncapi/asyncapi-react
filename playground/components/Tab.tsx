import React, { Component } from 'react';

import { TabLink, TabWrapper } from './styled';

export interface TabProps {
  children: React.ReactNode; // NOSONAR
  title: string;
  tabIndex?: number;
  isActive?: boolean;
  parentCallback?: (value: number) => void;
}

class Tab extends Component<TabProps> {
  render() {
    const { title, tabIndex, isActive, parentCallback } = this.props;

    return (
      <TabWrapper key={tabIndex}>
        <TabLink
          onClick={(event) => {
            event.preventDefault();
            if (parentCallback && typeof tabIndex === 'number') {
              parentCallback(tabIndex);
            }
          }}
          $active={isActive}
        >
          {title}
        </TabLink>
      </TabWrapper>
    );
  }
}

export default Tab;
