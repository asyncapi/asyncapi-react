import { ThemeInterface } from "./theme";

export const defaultTheme: ThemeInterface = {
  asyncApiWrapper: `
    font-family: Helvetica Neue, Helvetica, Arial, Verdana, sans-serif;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
  `,
  header: `
  `,
  headerParagraph: `
  `,
  h1: `
  `,
  h2: `
  `,
  h3: `
  `,
  h4: `
  `,
  h5: `
  `,
  h6: `
  `,
  markdown: `
    > div {
      > p {
        margin: 0;
      }
    }
  `,
  table: `
    margin: 0 0 40px 0;
    width: 100%;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    border-spacing: 0;
  `,
  tableHeader: `
    width: 100%;
    background-color: #fff;
  `,
  tableHeaderTitle: `
    line-height: 30px;
  `,
  tableHeaderRow: `
    font-weight: 900;
    color: #ffffff;
    background: #00796b;
  `,
  tableHeaderCell: `
    padding: 6px 12px;
    text-align: left;
  `,
  tableBody: `
  `,
  tableBodyRow: `
    background: #f6f6f6;

    &:nth-of-type(odd) {
      background: #e9e9e9;
    }
  `,
  tableBodyCell: `
    padding: 6px 12px;
    vertical-align: top;

    > p {
      margin-top: 0;
    }
  `,
  tableBodyCellWithNested: `
    padding: 0;
  `,
  tableNested: `
    margin: 0;
    width: 100%;
    box-shadow: none;
    border-spacing: 0;
    font-size: 13px;
  `,
  tableHeaderNested: `
    background-color: #37474f;
    color: #eee;
    font-weight: bold;
    text-align: center;
    padding: 5px 0;
  `,
  tableHeaderTitleNested: `
    line-height: 30px;
  `,
  tableHeaderRowNested: `
    background-color: #455a64;
    color: #eee;
  `,
  tableHeaderCellNested: `
    width: 20%;
    padding: 6px 12px;
  `,
  tableBodyNested: `
  `,
  tableBodyRowNested: `
    background: #78909c;
    color: #333;

    &:nth-of-type(odd) {
      background: #90a4ae;
    }
  `,
  tableBodyCellNested: `
    padding: 6px 12px;
    vertical-align: top;
  `,
  treeSpace: `
    display: inline-block;
    width: 15px;
  `,
  treeLeaf: `
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
  badge: `
    display: inline-block;
    font-size: 12px;
    border-radius: 5px;
    padding: 3px 10px;
    text-align: center;
    text-transform: uppercase;
  `,
  publishBadge: `
    background: #d4e157;
    color: #333;
  `,
  subscribeBadge: `
    background: #039be5;
    color: #fff;
  `,
  deprecatedBadge: `
    background: #ffa726;
    color: white;
  `,
  requiredBadge: `
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
  tag: `
    display: inline-block;
    background-color: #607d8b;
    padding: 3px 7px;
    border-radius: 5px;
    margin: 0 5px 5px 0;
  `,
  code: `
    padding: 3px 5px;
    background-color: #eee;
    word-break: break-all;
    display: block;
  `,
  info: `
  `,
  servers: `
  `,
  serversHeader: `
  `,
  serverVariablesEnumList: `
    margin: 0 0 0 15px;
    padding: 0;
  `,
  serverVariablesEnumElement: `
  `,
  topics: `
  `,
  topicsHeader: `
    border-bottom: #333 2px solid;
    margin: 40px 0;
  `,
  topic: `
    margin-bottom: 60px;
  `,
  topicHeader: `
    font-size: 20px;
  `,
  topicHeaderBadge: `
    display: block;
    float: left;
    margin-top: -2px;
    margin-right: 10px;
  `,
  topicHeaderMessage: `
    
  `,
  parameters: `
  `,
  parametersHeader: `
  `,
  parameter: `
  `,
  parameterHeader: `
  `,
  messages: `
  `,
  messagesHeader: `
    border-bottom: #333 2px solid;
    margin: 40px 0;
  `,
  message: `
    margin-bottom: 60px;
  `,
  messageIndented: `
    padding-left: 15px;
    border-left: #263238 2px solid;
  `,
  messageHeader: `
  `,
  messageHeaders: `
  `,
  messageHeadersHeader: `
  `,
  messagePayload: `
  `,
  messagePayloadHeader: `
  `,
  messageTags: `
  `,
  messageTagsHeader: `
  `,
  schemas: `
  `,
  schemasHeader: `
    border-bottom: #333 2px solid;
    margin: 40px 0;
  `,
  schema: `
    margin-bottom: 30px;
  `,
  schemaHeader: `
  `,
  schemaExample: `
  `,
  security: `
  `,
  securityHeader: `
    font-size: 20px;
  `,
}