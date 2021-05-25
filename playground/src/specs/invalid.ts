export const invalid = `
asyncapi: '2.0.0'
info:
  title: Recursive API
  version: '1.0.0'

channels:
  recursive-items:
    subscribe:
      message:
        $ref: '#/components/messages/RecursiveItem'

components:
  messages:
    RecursiveItem:
      payload:
        $ref: "#/components/schemas/RecursiveItem"

  schemas:
    RecursiveItem:
      type: object
      properties:
        name:
          type: string
          format: time
        subItems:
          type: array
          items:
            $ref: '#/components/schemas/RecursiveItem'
`;
