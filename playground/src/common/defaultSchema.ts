export const defaultSchema = `asyncapi: '2.0.0-rc1'
info:
  title: AnyOf example
  version: '1.0.0'

id: "asd"

channels:
  test:
    publish:
      message:
        $ref: '#/components/messages/testMessages'

components:
  messages:
    testMessages:
      payload:
        anyOf: # anyOf in payload schema
          - $ref: "#/components/schemas/objectWithKey"
          - $ref: "#/components/schemas/objectWithKey2"

  schemas:
    objectWithKey:
      type: object
      properties:
        key:
          type: string
    objectWithKey2:
      type: object
      properties:
        key2:
          type: string
`;
