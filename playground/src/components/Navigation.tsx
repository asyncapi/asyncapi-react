import React, { Component } from 'react';

import { NavigationWrapper, NavigationHeader, NavigationHeaderH1, NavigationHeaderIcon, NavigationHeaderAsyncApiText, NavigationHeaderEditorText, NavigationLinks, NavigationLinksItem } from './styled';

class NavigationComponent extends Component {
  render() {
    return (
      <NavigationWrapper>
        <NavigationHeader>
          <NavigationHeaderH1>
            <NavigationHeaderIcon src="https://avatars0.githubusercontent.com/u/16401334?v=4&s=200" alt="AsyncAPI logo" />
            <NavigationHeaderAsyncApiText>AsyncAPI React</NavigationHeaderAsyncApiText>
            <NavigationHeaderEditorText>editor</NavigationHeaderEditorText>
          </NavigationHeaderH1>
        </NavigationHeader>
        <NavigationLinks>
          <NavigationLinksItem></NavigationLinksItem>
        </NavigationLinks>
      </NavigationWrapper>
    )
  }
}

export default NavigationComponent;
