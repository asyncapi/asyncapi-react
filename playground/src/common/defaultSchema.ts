export const defaultSchema = `
asyncapi: '2.0.0-rc1'
info:
  title: Not example
  version: '1.0.0'

channels:
  test:
    publish:
      message:
        $ref: '#/components/messages/testMessages'

components:
  messages:
    testMessages:
      payload:
        $ref: "#/components/schemas/testSchema"

  schemas:
    testSchema:
      type: object
      properties:
        key:
          not:
            type: integer`;
