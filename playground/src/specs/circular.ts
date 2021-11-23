export const circular = `
asyncapi: 2.2.0
info:
  title: My Circular API
  version: '1.0.0'
channels:
  recursive:
    subscribe:
      message:
        payload:
          $ref: '#/components/schemas/RecursiveSelf'
  nonRecursive:
    subscribe:
      message:
        payload:
          $ref: '#/components/schemas/NonRecursive'
  testChannel:
    subscribe:
      message:
        oneOf:
          - $ref: '#/components/messages/testMessage'
components:
  messages:
    testMessage:
      contentType: application/json
      payload:
        $ref: '#/components/schemas/NormalSchemaA'
  schemas:
    NonRecursive:
      type: object
      properties:
        child:
          $ref: '#/components/schemas/NonRecursiveChild'
    NonRecursiveChild:
      type: object
      properties:
        value:
          type: string
    RecursiveSelf:
      type: object
      properties:
        selfChildren:
          type: array
          items:
            $ref: '#/components/schemas/RecursiveSelf'
        selfObjectChildren:
          type: object
          properties:
            test:
              $ref: '#/components/schemas/RecursiveSelf'
            nonRecursive:
              type: string
        selfSomething:
          type: object
          properties:
            test: 
               $ref: '#/components/schemas/RecursiveAncestor'
    RecursiveAncestor:
      type: object
      properties:
        ancestorChildren:
          type: array
          items:
            $ref: '#/components/schemas/RecursiveSelf'
        ancestorSomething:
          type: string
    NormalSchemaA:
      type: object
      properties:
        schemaBReference:
          $ref: '#/components/schemas/NormalSchemaB'
        schemaCReference:
          $ref: '#/components/schemas/NormalSchemaC'
        commonEnumName:
          type: string
          enum:
            - ENUM_1
            - ENUM_2
    NormalSchemaB:
      type: string
      enum:
        - ENUM_A
        - ENUM_B
        - ENUM_C
        - ENUM_D
    NormalSchemaC:
      allOf:
        - $ref: '#/components/schemas/NormalSchemaB'
        - type: string
          enum:
            - ENUM_E
    NestedAllOfSchema:
      allOf:
        - $ref: '#/components/schemas/NormalSchemaA'
        - type: object
          properties:
            parent:
              allOf:
                - $ref: '#/components/schemas/NestedAllOfSchema'
                - $ref: '#/components/schemas/NormalSchemaA'
            name:
              type: string
          required:
            - name
    OneOf:
      type: object
      properties: 
        kind: 
          oneOf:
            - $ref: '#/components/schemas/OneOf'
            - type: string
            - enum:
              - boolean
              - string 
    AnyOf:
      anyOf:
        - type: integer
        - type: number
        - type: string
        - type: boolean
        - type: object
        - type: array
          items:
            $ref: "#/components/schemas/AnyOf"
    RecursiveComplex:
        type: [object, array]
        patternProperties:
          ^foo: 
            $ref: '#/components/schemas/RecursiveSelf'
          ^bar: 
            type: string
        contains:
          $ref: '#/components/schemas/RecursiveComplex'
        items:
          - type: string
          - $ref: '#/components/schemas/RecursiveComplex'
        if:
          $ref: '#/components/schemas/RecursiveAncestor'
        then:
          $ref: '#/components/schemas/RecursiveComplex'
`;
