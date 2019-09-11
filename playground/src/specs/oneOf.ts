export const oneOf = `
asyncapi: '2.0.0'
info:
  title: OneOf example
  version: '1.0.0'

channels:
  test:
    publish:
      message:
        $ref: '#/components/messages/testMessages'

  test2:
    subscribe:
      message:
        # Use oneOf here if different messages are published on test2 topic.
        oneOf:
          - payload:
              $ref: "#/components/schemas/objectWithKey"
          - payload:
              $ref: "#/components/schemas/objectWithKey2"

components:
  messages:
    testMessages:
      payload:
        oneOf: # oneOf in payload schema
          - $ref: "#/components/schemas/objectWithKey"
          - $ref: "#/components/schemas/objectWithKey2"
    testMessage1:
      payload:
        $ref: "#/components/schemas/objectWithKey"
    testMessage2:
      payload:
        $ref: "#/components/schemas/objectWithKey2"

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
