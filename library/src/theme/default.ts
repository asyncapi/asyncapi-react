import { ThemeInterface } from './theme';
import { css } from './styled-components';

export const defaultTheme: ThemeInterface = {
  asyncApiWrapper: css`
    font-family: Helvetica Neue, Helvetica, Arial, Verdana, sans-serif;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
  `,
  header: css``,
  headerParagraph: css``,
  h1: css``,
  h2: css``,
  h3: css``,
  h4: css``,
  h5: css``,
  h6: css``,
  hrefHeader: css`
    color: #0b74de;
  `,
  markdown: css`
    > div {
      > p {
        margin: 0;
      }
    }
  `,
  table: css`
    margin: 0 0 40px 0;
    width: 100%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    border-spacing: 0;
  `,
  tableHeader: css`
    width: 100%;
    background-color: #fff;
  `,
  tableHeaderTitle: css`
    line-height: 30px;
  `,
  tableHeaderRow: css`
    font-weight: 900;
    color: #ffffff;
    background: #00796b;
  `,
  tableHeaderCell: css`
    padding: 6px 12px;
    text-align: left;
  `,
  tableBody: css``,
  tableBodyRow: css`
    background: #f6f6f6;

    &:nth-of-type(odd) {
      background: #e9e9e9;
    }
  `,
  tableBodyRowWithNested: css`
    > td > table {
      display: block;
      max-height: 0;
      overflow: hidden;
      transition: max-height 1s ease;
    }
  `,
  tableBodyCell: css`
    padding: 6px 12px;
    vertical-align: top;

    > p {
      margin-top: 0;
    }
  `,
  tableBodyCellWithNested: `
    padding: 0;
  `,
  tableNested: css`
    margin: 0;
    width: 100%;
    box-shadow: none;
    border-spacing: 0;
    font-size: 13px;
  `,
  tableHeaderNested: css`
    background-color: #37474f;
    color: #eee;
    font-weight: bold;
    text-align: center;
    padding: 5px 0;
  `,
  tableHeaderTitleNested: css`
    line-height: 30px;
  `,
  tableHeaderRowNested: css`
    background-color: #455a64;
    color: #eee;
  `,
  tableHeaderCellNested: css`
    width: 20%;
    padding: 6px 12px;
  `,
  tableBodyNested: css``,
  tableBodyRowNested: css`
    background: #78909c;
    color: #333;

    &:nth-of-type(odd) {
      background: #90a4ae;
    }
  `,
  tableBodyCellNested: css`
    padding: 6px 12px;
    vertical-align: top;
  `,
  treeSpace: css`
    display: inline-block;
    width: 15px;
  `,
  treeLeaf: css`
    display: inline-block;
    position: relative;
    width: 25px;

    &:before {
      content: ' ';
      position: absolute;
      top: -15px;
      width: 10px;
      height: 10px;
      border-left: #aaa 1px solid;
      border-bottom: #aaa 1px solid;
      border-radius: 0 0 0 3px;
    }
  `,
  badge: css`
    display: inline-block;
    font-size: 12px;
    border-radius: 5px;
    padding: 3px 10px;
    text-align: center;
    text-transform: uppercase;
  `,
  publishBadge: css`
    background: #d4e157;
    color: #333;
  `,
  subscribeBadge: css`
    background: #039be5;
    color: #fff;
  `,
  deprecatedBadge: css`
    background: #ffa726;
    color: white;
  `,
  requiredBadge: css`
    display: inline-block;
    font-weight: bold;
    font-size: 12px;
    background-color: #666;
    color: white;
    border-radius: 3px;
    padding: 0 5px;
    margin-left: 5px;
    float: right;
    text-transform: none;
  `,
  generatedBadge: css``,
  tag: css`
    display: inline-block;
    background-color: #607d8b;
    padding: 3px 7px;
    border-radius: 5px;
    margin: 0 5px 5px 0;
  `,
  codeWrapper: css`
    background-color: #eee;
    word-break: break-all;
    display: block;
  `,
  codeHeader: css`
    padding: 3px 5px;
    background-color: #fff;
    word-break: break-all;
    display: block;

    > h4 {
      margin: 0;
      color: #32363a;
      font-size: 13px;

      > span {
        font-style: italic;
      }
    }
  `,
  codeContentWrapper: css`
    padding: 3px 5px;
    background-color: #eee;
    word-break: break-all;
    display: block;
  `,
  codeContent: css`
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
    padding: 3px 5px;
    margin-top: 0px;
    background-color: #eee;
    word-break: break-all;
    display: block;
  `,
  info: css``,
  infoHeader: css``,
  contact: css`
    margin-top: 24px;
  `,
  contactHeader: css``,
  contactList: css`
    margin: 0;
    padding-left: 16px;
  `,
  license: css`
    margin-top: 24px;
  `,
  licenseHeader: css``,
  licenseList: css`
    margin: 0;
    padding-left: 16px;
  `,
  servers: css``,
  serverExpandIcon: css`
    display: inline-block;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 7px solid black;
    margin-right: 10px;
    transition: 0.5s ease;
    cursor: pointer;
  `,
  serversHeader: css``,
  serverVariablesEnumList: css`
    margin: 0 0 0 15px;
    padding: 0;
  `,
  serverVariablesEnumElement: css``,
  topics: css``,
  topicsHeader: css`
    border-bottom: #333 2px solid;
    margin: 40px 0;
  `,
  topic: css`
    margin-bottom: 60px;
  `,
  topicHeader: css`
    font-size: 20px;
  `,
  topicHeaderBadge: css`
    display: block;
    float: left;
    margin-top: -2px;
    margin-right: 10px;
  `,
  topicMessage: css`
    > div {
      padding-left: 0;

      &:before {
        border: none;
        border-radius: 0;
        left: 0;
        top: 0;
      }
    }
  `,
  topicHeaderMessage: css``,
  parameters: css``,
  parametersHeader: css``,
  parameter: css``,
  parameterHeader: css``,
  messages: css``,
  messagesHeader: css`
    border-bottom: #333 2px solid;
    margin: 40px 0;
  `,
  message: css`
    margin-bottom: 60px;
  `,
  messageIndented: css`
    padding-left: 15px;
    border-left: #263238 2px solid;
  `,
  messageHeader: css``,
  messageHeaders: css``,
  messageHeadersHeader: css``,
  messagePayload: css``,
  messagePayloadHeader: css``,
  messageTags: css``,
  messageTagsHeader: css``,
  schemas: css``,
  schemasHeader: css`
    border-bottom: #333 2px solid;
    margin: 40px 0;
  `,
  schema: css`
    margin-bottom: 30px;
  `,
  schemaHeader: css``,
  schemaExample: css``,
  security: css``,
  securityHeader: css`
    font-size: 20px;
  `,
};
