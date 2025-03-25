export const complexSchema = `
asyncapi: 3.0.0
info:
  title: Complex Schema Demo API
  version: 1.0.0
  description: Demonstrates various schema combinations and corner cases
  contact:
    name: API Support
    email: support@example.com
    url: 'https://example.com/support'
  license:
    name: Apache 2.0
    url: 'https://www.apache.org/licenses/LICENSE-2.0'
servers:
  production:
    host: broker.example.com
    protocol: mqtt
    description: Production MQTT Broker
    security:
      - $ref: '#/components/securitySchemes/userPassword'
    bindings:
      mqtt:
        clientId: demo-client
        cleanSession: true
        keepAlive: 60
        bindingVersion: 0.2.0
channels:
  user/events:
    address: user/events
    messages:
      publishUserEvent.message:
        name: UserEvent
        title: User Event Message
        contentType: application/json
        correlationId:
          location: $message.header#/correlationId
        headers:
          type: object
          properties:
            correlationId:
              type: string
              format: uuid
        payload:
          $ref: '#/components/schemas/ComplexUserPayload'
        traits:
          - $ref: '#/components/messageTraits/CommonHeaders'
      receiveUserEvent.message:
        $ref: '#/components/messages/UserEventMessage'
operations:
  publishUserEvent:
    action: receive
    channel:
      $ref: '#/channels/user~1events'
    summary: User-related events
    messages:
      - $ref: '#/channels/user~1events/messages/publishUserEvent.message'
  receiveUserEvent:
    action: send
    channel:
      $ref: '#/channels/user~1events'
    summary: Receive user events
    messages:
      - $ref: '#/channels/user~1events/messages/receiveUserEvent.message'
components:
  schemas:
    ComplexUserPayload:
      type: object
      properties:
        id:
          type: string
          format: uuid
        basicTypes:
          type: object
          properties:
            stringField:
              type: string
              minLength: 1
              maxLength: 100
              pattern: '^[A-Za-z0-9]+$'
            integerField:
              type: integer
              minimum: 0
              maximum: 1000
              multipleOf: 5
            numberField:
              type: number
              format: float
              exclusiveMinimum: 0
              exclusiveMaximum: 100
            booleanField:
              type: boolean
            nullableField:
              type:
                - string
                - 'null'
            enumField:
              type: string
              enum:
                - PENDING
                - ACTIVE
                - SUSPENDED
        arrays:
          type: object
          properties:
            simpleArray:
              type: array
              items:
                type: string
              minItems: 1
              maxItems: 10
              uniqueItems: true
            tupleArray:
              type: array
              items:
                - type: string
                - type: integer
                - type: boolean
              additionalItems: false
            complexArray:
              type: array
              items:
                type: object
                properties:
                  name:
                    type: string
                  value:
                    type: integer
        conditionalLogic:
          type: object
          if:
            properties:
              userType:
                const: premium
          then:
            properties:
              features:
                type: array
                items:
                  type: string
                minItems: 3
          else:
            properties:
              features:
                type: array
                items:
                  type: string
                maxItems: 2
        oneOfExample:
          oneOf:
            - type: object
              properties:
                type:
                  const: personal
                personalEmail:
                  type: string
                  format: email
            - type: object
              properties:
                type:
                  const: business
                companyEmail:
                  type: string
                  format: email
                department:
                  type: string
        anyOfExample:
          anyOf:
            - type: object
              properties:
                phone:
                  type: string
                  pattern: '^+[1-9]d{1,14}$'
            - type: object
              properties:
                email:
                  type: string
                  format: email
        allOfExample:
          allOf:
            - type: object
              properties:
                baseField:
                  type: string
            - type: object
              properties:
                extendedField:
                  type: integer
        notExample:
          not:
            type: object
            properties:
              restricted:
                const: true
        dateTimeFields:
          type: object
          properties:
            created:
              type: string
              format: date-time
            date:
              type: string
              format: date
            time:
              type: string
              format: time
        additionalProperties:
          type: object
          additionalProperties:
            type: string
        patternProperties:
          type: object
          patternProperties:
            '^[A-Z][a-z]+$':
              type: string
        dependencies:
          type: object
          dependencies:
            creditCard:
              required:
                - billingAddress
      required:
        - id
        - basicTypes
        - arrays
  messageTraits:
    CommonHeaders:
      headers:
        type: object
        properties:
          messageId:
            type: string
            format: uuid
          timestamp:
            type: string
            format: date-time
          version:
            type: string
        required:
          - messageId
          - timestamp
  messages:
    UserEventMessage:
      name: UserEvent
      title: User Event Message
      summary: A message containing user event information
      contentType: application/json
      payload:
        $ref: '#/components/schemas/ComplexUserPayload'
  securitySchemes:
    userPassword:
      type: userPassword
      description: Basic user/password authentication
`;
