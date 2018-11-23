import styled from 'styled-components';

export const PlaygroundWrapper = styled.div`
`;

export const NavigationWrapper = styled.nav`
  width: 100%;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  display: flex; 
  justify-content: space-between;
`;

export const CodeEditorsWrapper =  styled.div`
  width: 40%;
  height: 100vh;
  min-height: 100vh;
  overflow: auto;
  background: rgb(38, 50, 56);
`;

export const AsyncApiWrapper = styled.div`
  width: 60%;
  height: 100vh;
  min-height: 100vh;
  overflow: auto;

  > div {
    padding: 20px;
  }
`;

export const TabsWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
  font-family: '72';
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
  margin: 0 5px;
  display: flex;
  justify-items: flex-start;
  flex-flow: row nowrap;
`;

export const TabsContent = styled.div`
  margin: ${props => (props.margin ? props.margin : '20px')};
  font-size: 14px;
  color: #515559;
  line-height: 1.57;
`;

export const TabWrapper = styled.li``;

export const TabLink = styled.div`
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
    cursor: pointer;

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
  cursor: pointer;

  &:hover {
    color: #c3e88d;
    border-color: #c3e88d;
  }
`;