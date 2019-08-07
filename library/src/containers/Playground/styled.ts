import styled from 'styled-components';

export const PlaygroundWrapper = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
`;

export const CodeMirrorWrapper = styled.div`
  width: 40%;
  height: 100vh;
  min-height: 100vh;
  overflow: auto;
  background: rgb(38, 50, 56);

  > .react-codemirror2 > .CodeMirror {
    height: 100%;
    min-height: 100%;
  }
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
