import { InterpolationValue } from "styled-components";
import { css } from "./styled-components"

type styledCss = string | InterpolationValue[]

export interface ThemeInterface {
  asyncApiWrapper: styledCss;
  header: styledCss;
  headerParagraph: styledCss,
  h1: styledCss;
  h2: styledCss;
  h3: styledCss;
  h4: styledCss;
  h5: styledCss;
  h6: styledCss;
  hrefHeader: styledCss;
  markdown: styledCss;
  table: styledCss;
  tableHeader: styledCss;
  tableHeaderTitle: styledCss;
  tableHeaderRow: styledCss;
  tableHeaderCell: styledCss;
  tableBody: styledCss;
  tableBodyRow: styledCss;
  tableBodyRowWithNested: styledCss;
  tableBodyCell: styledCss;
  tableBodyCellWithNested: styledCss;
  tableNested: styledCss;
  tableHeaderNested: styledCss;
  tableHeaderTitleNested: styledCss;
  tableHeaderRowNested: styledCss;
  tableHeaderCellNested: styledCss;
  tableBodyNested: styledCss;
  tableBodyRowNested: styledCss;
  tableBodyCellNested: styledCss;
  treeSpace: styledCss;
  treeLeaf: styledCss;
  badge: styledCss;
  subscribeBadge: styledCss;
  publishBadge: styledCss;
  deprecatedBadge: styledCss;
  requiredBadge: styledCss;
  generatedBadge: styledCss;
  tag: styledCss;
  codeWrapper: styledCss;
  codeHeader: styledCss;
  codeContentWrapper: styledCss;
  codeContent: styledCss;
  info: styledCss;
  infoHeader: styledCss;
  contact: styledCss;
  contactHeader: styledCss;
  contactList: styledCss;
  license: styledCss;
  licenseHeader: styledCss;
  licenseList: styledCss;
  servers: styledCss;
  serverExpandIcon: styledCss;
  serversHeader: styledCss;
  serverVariablesEnumList: styledCss;
  serverVariablesEnumElement: styledCss;
  topics: styledCss;
  topicsHeader: styledCss;
  topic: styledCss;
  topicHeader: styledCss;
  topicHeaderBadge: styledCss;
  topicMessage: styledCss;
  topicHeaderMessage: styledCss;
  parameters: styledCss;
  parametersHeader: styledCss;
  parameter: styledCss;
  parameterHeader: styledCss;
  messages: styledCss;
  messagesHeader: styledCss;
  message: styledCss;
  messageIndented: styledCss;
  messageHeader: styledCss;
  messageHeaders: styledCss;
  messageHeadersHeader: styledCss;
  messagePayload: styledCss;
  messagePayloadHeader: styledCss;
  messageTags: styledCss;
  messageTagsHeader: styledCss;
  schemas: styledCss;
  schemasHeader: styledCss;
  schema: styledCss;
  schemaHeader: styledCss;
  schemaExample: styledCss;
  security: styledCss;
  securityHeader: styledCss;
}
