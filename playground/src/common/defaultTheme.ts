import { ThemeInterface } from '@kyma-project/asyncapi-react';
import { css } from 'styled-components';

export const sampleTheme: ThemeInterface = {
  hrefHeader: css`
    color: #f77669;
  `,
  tableHeader: css`
    width: 100%;
    color: #222222;
    background: #f9fafa;
    text-transform: uppercase;
  `,
  topicHeader: css`
    > h3 {
      color: #f77669;
      font-size: 15px;
    }
  `,
  messageHeader: css`
    > h3 {
      color: #f77669;
      font-size: 15px;
    }
  `,
  message: css`
    margin-bottom: 24px;
    padding-left: 18px;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      border: 3px solid #f77669;
      border-radius: 100%;
      left: 0;
      top: 6px;
    }

    &:last-child {
      margin-bottom: 0;
    }

    > div > div {
      padding-left: 0;

      &:before {
        border: none;
        border-radius: 0;
        left: 0;
        top: 0;
      }
    }
  `,
  schemaHeader: css`
    > h4 {
      color: #f77669;
      font-size: 15px;
      margin: 0 0 8px 0;
    }
  `,
};

export const defaultTheme: ThemeInterface = {
  asyncApiWrapper: css`
    font-family: '72';
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
    background: #f3f4f5;
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
      > ul {
        margin: 0;
        padding-left: 16px;
      }
      > p {
        margin: 0;
        > code {
          display: inline-block;
          font-weight: bold;
          font-size: 10px;
          line-height: 14px;
          border-radius: 3px;
          padding: 0px 5px;
          text-align: center;
          background: #e2eaf2;
          color: #18873d;
        }
      }
    }
  `,
  table: css`
    margin: 0 0 20px 0;
    width: 100%;
    border-spacing: 0;
    font-size: 13px;
  `,
  tableHeader: css`
    width: 100%;
    color: #939698;
    background: #f9fafa;
    text-transform: uppercase;
  `,
  tableHeaderTitle: css`
    line-height: 30px;
  `,
  tableHeaderRow: css`
    font-weight: lighter;
    font-size: 11px;
  `,
  tableHeaderCell: css`
    padding: 12px 20px;
    text-align: left;
  `,
  tableBody: css`
    color: #000;
  `,
  tableBodyRow: css`
    background: #fff;
  `,
  tableBodyRowWithNested: css`
    > td > div {
      display: block;
      padding: 0px;
      max-height: 0;
      overflow: hidden;
      transition: all 1s ease;
    }
  `,
  tableBodyCell: css`
    padding: 12px 20px;
    vertical-align: top;
    border-bottom: 1px solid #efeff0;

    > p {
      margin-top: 0;
    }
  `,
  tableBodyCellWithNested: css``,
  tableNested: css`
    margin: 10px 10px 10px auto;
    width: calc(100% - 45px);
    border-spacing: 0;
    font-size: 13px;
    border-radius: 5px;
    border: solid 1px #d4d4d4;
    background-color: #f9fafa;
  `,
  tableHeaderNested: css`
    color: #939698;
    border-bottom: solid 1px #d4d4d4;
    font-weight: bold;
    text-align: left;
    padding: 6px 0;
    font-size: 12px;
  `,
  tableHeaderTitleNested: css`
    color: #939698;

    > td {
      border-bottom: solid 1px #d4d4d4;
      padding: 8px 20px;
      font-size: 12px;
      color: #818487;
    }
  `,
  tableHeaderRowNested: css`
    color: #939698;
  `,
  tableHeaderCellNested: css`
    width: 20%;
    padding: 8px 20px;
    font-size: 12px;
    border-bottom: solid 1px #d4d4d4;
  `,
  tableBodyNested: css`
    color: #000;
  `,
  tableBodyRowNested: css`
    color: #333;
    border-bottom: solid 1px #d4d4d4;

    &:last-child {
      > td {
        border-bottom: none;
      }
    }
  `,
  tableBodyCellNested: css`
    padding: 8px 20px;
    vertical-align: top;
    font-size: 13px;
    border-bottom: solid 1px #d4d4d4;
  `,
  treeSpace: css`
    display: inline-block;
    width: 20px;
  `,
  treeLeaf: css`
    display: inline-block;
    position: relative;
    width: 25px;

    &:before {
      content: '';
      position: absolute;
      top: -15px;
      width: 13px;
      height: 10px;
      border-left: #aaa 2px solid;
      border-bottom: #aaa 2px solid;
      border-radius: 0 0 0 70%;
    }
  `,
  badge: css`
    display: inline-block;
    font-weight: bold;
    font-size: 11px;
    line-height: 18px;
    border-radius: 3px;
    padding: 0px 5px;
    text-align: center;
    text-transform: uppercase;
    background: #e2eaf2;
  `,
  publishBadge: css`
    color: #18873d;
  `,
  subscribeBadge: css`
    color: #107ee3;
  `,
  deprecatedBadge: css`
    margin-left: 10px;
    color: #f59702;
  `,
  requiredBadge: css`
    font-size: 9px;
    line-height: 14px;
    color: #f59702;
    border-radius: 3px;
    margin-left: 10px;
  `,
  generatedBadge: css`
    font-size: 9px;
    line-height: 14px;
    color: #18873d;
    border-radius: 3px;
    margin-left: 10px;
  `,
  tag: css`
    display: inline-block;
    mix-blend-mode: multiply;
    border-radius: 4px;
    background-color: #e2eaf2;
    font-size: 11px;
    font-family: 72;
    font-weight: 300;
    text-transform: uppercase;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #73787d;
    padding: 3px 8px;
    margin: 0 5px 0 0;
  `,
  codeWrapper: css`
    border: 1px solid #e4e4e4;
    border-radius: 5px;
    background: #fff;
  `,
  codeHeader: css`
    padding: 12px 20px;
    border-bottom: 1px solid #e4e4e4;

    > h4 {
      margin: 0;
      color: #32363a;
      font-size: 13px;
    }
  `,
  codeContentWrapper: css`
    margin: 0;
    font-size: 13px;
  `,
  codeContent: css`
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace !important;
    margin: 0 !important;
    padding: 12px 20px !important;
    background: #fff !important;
    font-size: 12px !important;
  `,
  info: css`
    margin-top: 24px;
    background: #fff;
    border-radius: 5px;
    padding: 16px;
  `,
  infoHeader: css`
    > h1 {
      margin-top: 0;
    }
  `,
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
  servers: css`
    margin-top: 24px;
    > table {
      margin-bottom: 0;
    }
  `,
  serverExpandIcon: css`
    display: inline-block;
    position: relative;
    width: 10px;
    height: 10px;
    margin-right: 10px;
    transform-origin: 50% 50%;
    transition: 0.5s ease;
    cursor: pointer;

    &:before {
      content: '\uE066';
      font-family: SAP-icons;
      position: absolute;
      color: #0071d4;
      font-size: 12px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `,
  serversHeader: css``,
  serverVariablesEnumList: css`
    margin: 0 0 0 15px;
    padding: 0;
  `,
  serverVariablesEnumElement: css``,
  topics: css`
    margin-top: 24px;
    background: #fff;
    border-radius: 5px;
    padding: 16px;
  `,
  topicsHeader: css`
    > h2 {
      margin: 0 0 24px 0;
    }
  `,
  topic: css`
    margin-bottom: 24px;
    padding-left: 18px;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      border: 3px solid #0071d4;
      border-radius: 100%;
      left: 0;
      top: 6px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  `,
  topicHeader: css`
    > h3 {
      color: #0b74de;
      font-size: 15px;
    }
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
  topicHeaderMessage: css`
    color: #32363a;

    > h4 {
      margin: 16px 0 16px 0;
    }
  `,
  parameters: css`
    margin-bottom: 24px;
  `,
  parametersHeader: css`
    color: #32363a;

    > h4 {
      margin: 0 0 16px 0;
    }
  `,
  parameter: css`
    margin-bottom: 24px;
    padding-left: 18px;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      border: 3px solid #0071d4;
      border-radius: 100%;
      left: 0;
      top: 6px;
    }

    &:last-child {
      margin-bottom: 0;
    }

    > div {
      padding-left: 0;

      > table {
        margin-top: 20px;
      }

      &:before {
        border: none;
        border-radius: 0;
        left: 0;
        top: 0;
      }
    }
  `,
  parameterHeader: css`
    > h4 {
      margin: 0 0 12px 0;
    }
  `,
  messages: css`
    margin-top: 24px;
    background: #fff;
    border-radius: 5px;
    padding: 16px;
  `,
  messagesHeader: css`
    > h2 {
      margin: 0 0 24px 0;
    }
  `,
  message: css`
    margin-bottom: 24px;
    padding-left: 18px;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      border: 3px solid #0071d4;
      border-radius: 100%;
      left: 0;
      top: 6px;
    }

    &:last-child {
      margin-bottom: 0;
    }

    > div > div {
      padding-left: 0;

      &:before {
        border: none;
        border-radius: 0;
        left: 0;
        top: 0;
      }
    }
  `,
  messageIndented: css``,
  messageHeader: css`
    > h3 {
      color: #0b74de;
      font-size: 15px;
    }
  `,
  messageHeaders: css`
    margin: 20px 0;
  `,
  messageHeadersHeader: css`
    color: #32363a;

    > h4 {
      margin: 0 0 8px 0;
    }
  `,
  messagePayload: css`
    margin: 20px 0;
  `,
  messagePayloadHeader: css`
    color: #32363a;

    > h4 {
      margin: 0 0 8px 0;
    }
  `,
  messageTags: css`
    margin: 20px 0;
  `,
  messageTagsHeader: css`
    color: #32363a;

    > h4 {
      margin: 0 0 8px 0;
    }
  `,
  schemas: css`
    margin-top: 24px;
    background: #fff;
    border-radius: 5px;
    padding: 16px;
  `,
  schemasHeader: css`
    > h2 {
      margin: 0 0 24px 0;
    }
  `,
  schema: css`
    margin-bottom: 24px;
    padding-left: 18px;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      border: 3px solid #0071d4;
      border-radius: 100%;
      left: 0;
      top: 6px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  `,
  schemaHeader: css`
    > h4 {
      color: #0b74de;
      font-size: 15px;
      margin: 0 0 8px 0;
    }
  `,
  schemaExample: css``,
  security: css`
    margin-top: 24px;
    background: #fff;
    border-radius: 5px;
    padding: 16px;

    > table {
      margin: 0;
    }
  `,
  securityHeader: css`
    > h2 {
      margin: 0 0 24px 0;
    }
  `,
  errorWrapper: css`
    background-color: #ffffff;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15), 0 12px 20px 0 rgba(0, 0, 0, 0.1);
    border-left: 6px solid #f44336;
    border-radius: 4px;
    color: #32363a;
    font-family: 72;
    font-size: 13px;
  `,
  errorHeader: css`
    padding: 12px 20px;
    box-shadow: inset 0 -1px 0 0 rgba(115, 121, 128, 0.15);
    font-weight: bold;
    position: relative;
    :after {
      content: '\uE0B1';
      color: #f44336;
      position: absolute;
      display: block;
      top: 12px;
      right: 14px;
      box-sizing: border-box;
      font-family: SAP-Icons;
    }
  `,
  errorContent: css`
    padding: 12px 20px;
    font-weight: normal;
  `,
  errorCode: css`
    white-space: pre-wrap;
    word-break: break-word;
    font-family: monospace;
    display: block;
  `,
  errorPre: css`
    margin: 0;
  `,
};

export const oldTheme: ThemeInterface = {
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
  errorWrapper: css`
    background-color: #ffffff;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15), 0 12px 20px 0 rgba(0, 0, 0, 0.1);
    border-left: 6px solid #f44336;
    border-radius: 4px;
    color: #32363a;
    font-family: 72;
    font-size: 13px;
  `,
  errorHeader: css`
    padding: 12px 20px;
    box-shadow: inset 0 -1px 0 0 rgba(115, 121, 128, 0.15);
    font-weight: bold;
    position: relative;
    :after {
      content: '\uE0B1';
      color: #f44336;
      position: absolute;
      display: block;
      top: 12px;
      right: 14px;
      box-sizing: border-box;
      font-family: SAP-Icons;
    }
  `,
  errorContent: css`
    padding: 12px 20px;
    font-weight: normal;
  `,
  errorCode: css`
    white-space: pre-wrap;
    word-break: break-word;
    font-family: monospace;
    display: block;
  `,
  errorPre: css`
    margin: 0;
  `,
};
