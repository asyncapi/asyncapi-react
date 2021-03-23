import styled from 'styled-components';

export const PlaygroundWrapper = styled.div``;

export const NavigationWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  line-height: 48px;
  padding: 0;
  background-color: #263238;
  border-bottom: #607d8b 2px solid;
`;

export const NavigationHeader = styled.header`
  margin-left: 16px;
  display: inline-block;
`;

export const NavigationHeaderH1 = styled.h1`
  color: #fff;
  margin: 0;
  font-weight: bold;
  font-size: 20px;
  line-height: 48px;
`;

export const NavigationHeaderIcon = styled.img`
  height: 34px;
  max-height: 34px;
  margin-top: 7px;
  float: left;
`;

export const NavigationHeaderAsyncApiText = styled.span`
  font-weight: bold;
  margin-left: 12px;
`;

export const NavigationHeaderEditorText = styled.span`
  font-style: italic;
  margin-left: 6px;
`;

export const NavigationLinks = styled.ul`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  margin: 0 16px 0 0;
  padding: 0;
  position: relative;
  list-style-type: none;
`;

export const NavigationLinksItem = styled.li`
  display: inline-block;
  margin-left: 12px;

  > a {
    font-family: sans-serif;
    font-weight: 700;
    color: #f77669;
    transition: 0.2s color linear;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #c3e88d;
    }
  }
`;

export const NavigationLink = styled.a``;

export const ContentWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  min-height: calc(100vh - 50px);
  display: flex;
  justify-content: space-between;
  background: #f3f4f5;
`;

export const CodeEditorsWrapper = styled.div`
  background: rgb(38, 50, 56);
`;

export const AsyncApiWrapper = styled.div`
  height: calc(100vh - 50px);
  min-height: calc(100vh - 50px);
  overflow: auto;

  > .asyncapi {
    padding: 24px;
  }
  > .asyncapi__error {
    margin: 24px;
  }
`;

export const TabsWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
  font-family: sans-serif;
  font-weight: normal;
`;

export const CodeEditorWrapper = styled.div`
  > .react-codemirror2 > .CodeMirror {
    height: 100%;
    min-height: 100%;
  }
`;

export const TabsHeader = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 5px 15px;
  display: flex;
  justify-items: flex-start;
  flex-flow: row nowrap;
`;

export const TabsAdditionalHeaderContent = styled.li`
  margin: 0 0 0 auto;
  position: relative;
  display: inline-block;
  padding: 19px 15px;
`;

interface RefreshIconProps {
  show?: boolean;
}

export const RefreshIcon = styled.div<RefreshIconProps>`
  font-family: sans-serif;
  font-weight: 700;
  color: #f77669;
  transition: 0.2s all linear;
  opacity: ${props => (props.show ? '1' : '0')};
  animation-name: spin;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const TabsContent = styled.div`
  margin: 0;
  padding: 0 20px;
  font-size: 14px;
  color: #515559;
  line-height: 1.57;
  overflow: auto;
  height: calc(100vh - 117px);
  min-height: calc(100vh - 117px);
`;

export const TabWrapper = styled.li``;

interface TabLinkProps {
  active?: boolean;
}

export const TabLink = styled.div<TabLinkProps>`
  display: flex;
  align-items: center;
  margin: 0 15px;
  padding: 19px 0 15px;
  border: none;
  position: relative;
  color: ${props => (props.active ? '#c3e88d' : '#f77669')};
  font-size: 14px;
  outline: none;
  transition: 0.2s color linear;
  text-transform: uppercase;
  cursor: pointer;

  &:first-letter {
    text-transform: uppercase;
  }

  &:after {
    content: '';
    bottom: 0;
    display: block;
    position: absolute;
    height: ${props => (props.active ? '3px' : '0px')};
    width: 100%;
    border-radius: 2px;
    background-color: #c3e88d;
  }

  &:hover {
    color: #c3e88d;

    &:after {
      content: '';
      bottom: 0;
      display: block;
      position: absolute;
      height: 3px;
      width: 100%;
      border-radius: 2px;
      background-color: #c3e88d;
    }
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 20px;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  outline: none;
  background: inherit;
  border: 3px solid #f77669;
  color: #f77669;
  border-radius: 6px;
  transition: 0.2s border, color linear;
  font-size: 14px;

  &:hover {
    color: #c3e88d;
    border-color: #c3e88d;
  }
`;

export const Button = styled.button`
  width: auto;
  padding: 6px 12px;
  display: inline-block;
  background: inherit;
  border: 3px solid #f77669;
  color: #f77669;
  border-radius: 6px;
  font-size: 14px;
  margin-left: 12px;
  white-space: nowrap;
  transition: 0.2s border, color linear;
  cursor: pointer;

  &:hover {
    color: #c3e88d;
    border-color: #c3e88d;
  }
`;
