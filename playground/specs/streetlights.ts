export const streetlights = `asyncapi: '2.6.0'
id: 'urn:com:smartylighting:streetlights:server'
info:
  x-x: AsyncAPISpec
  title: Streetlights API
  version: '1.0.0'
  description: |
    The Smartylighting Streetlights API allows you to remotely manage the city lights.

    ### Check out its awesome features:

    * Turn a specific streetlight on/off 🌃
    * Dim a specific streetlight 😎
    * Receive real-time information about environmental lighting conditions 📈

  termsOfService: http://asyncapi.org/terms/
  contact:
    name: API Support
    url: http://www.asyncapi.org/support
    email: support@asyncapi.org
  license:
    name: Apache 2.0
    url: http://www.apache.org/licenses/LICENSE-2.0.html
tags:
  - name: root-tag1
    externalDocs:
      description: External docs description 1
      url: https://www.asyncapi.com/
  - name: root-tag2
    description: Description 2
    externalDocs:
      url: "https://www.asyncapi.com/"
  - name: root-tag3
  - name: root-tag4
    description: Description 4
  - name: root-tag5
    externalDocs:
      url: "https://www.asyncapi.com/"
externalDocs:
  description: Find more info here
  url: https://example.com
defaultContentType: application/json

servers:
  production:
    url: api.streetlights.smartylighting.com:{port}
    protocol: mqtt
    description: |
      Private server that requires authorization.
      Once the socket is open you can subscribe to private-data channels by sending an authenticated subscribe request message.

      The API client must request an authentication "token" via the following REST API endpoint "GetWebSocketsToken" to connect to WebSockets Private endpoints. For more details read https://support.kraken.com/hc/en-us/articles/360034437672-How-to-retrieve-a-WebSocket-authentication-token-Example-code-in-Python-3

      The resulting token must be provided in the "token" field of any new private WebSocket feed subscription: 
      \`\`\`json
      {
        "event": "subscribe",
        "subscription":
        {
          "name": "ownTrades",
          "token": "WW91ciBhdXRoZW50aWNhdGlvbiB0b2tlbiBnb2VzIGhlcmUu"
        }
      }
      \`\`\`

      \`\`\`elixir
      defmodule Hello do
        def world do
          IO.puts("hello")
        end
      end
      \`\`\`
    variables:
      port:
        description: Secure connection (TLS) is available through port 8883.
        default: '1883'
        enum:
          - '1883'
          - '8883'
    tags:
      - name: 'env:production'
    security:
      - apiKey: []
      - supportedOauthFlows:
        - streetlights:on
        - streetlights:off
        - streetlights:dim
      - openIdConnectWellKnown: []
  dummy-mqtt:
    url: mqtt://localhost
    protocol: mqtt
    description: |
      Private server

      \`\`\`csharp
      using System;

      namespace HelloWorld
      {
        class Program
        {
          static void Main(string[] args)
          {
            Console.WriteLine("Hello World!");    
          }
        }
      }
      \`\`\`
    bindings:
      mqtt:
        clientId: guest        
        cleanSession: false
        keepAlive: 60
        bindingVersion: 0.1.0
        lastWill:
          topic: smartylighting/streetlights/1/0/lastwill
          qos: 1
          message: so long and thanks for all the fish
          retain: false
  dummy-amqp:
    url: amqp://localhost:{port}
    protocol: amqp
    description: dummy AMQP broker
    protocolVersion: "0.9.1"
    variables:
      port:
        enum:
          - '15672'
          - '5672'
  dommy-kafka:
    url: http://localhost:{port}
    protocol: kafka
    description: dummy Kafka broker
    variables:
      port:
        default: '9092'

channels:
  smartylighting/streetlights/1/0/event/{streetlightId}/lighting/measured:
    x-security:
      $ref: '#/components/securitySchemes/supportedOauthFlows/flows/clientCredentials'
    description: The topic on which measured values may be produced and consumed.
    parameters:
      streetlightId:
        $ref: '#/components/parameters/streetlightId'
    servers:
      - production
      - dommy-kafka
    subscribe:
      summary: Receive information about environmental lighting conditions of a particular streetlight.
      operationId: receiveLightMeasurement
      externalDocs:
        description: Find more info here
        url: https://example.com
      traits:
        - $ref: '#/components/operationTraits/kafka'
      message:
        $ref: '#/components/messages/lightMeasured'
      bindings:
        mqtt:
          qos: 1
          bindingVersion: 0.1.0
        http:
          type: request
          method: GET
          query:
            type: object
            required:
            - companyId
            properties:
              companyId:
                type: number
                minimum: 1
                description: The Id of the company.
            additionalProperties: false

  smartylighting/streetlights/1/0/action/{streetlightId}/turn/on:
    parameters:
      streetlightId:
        $ref: '#/components/parameters/streetlightId'
    servers:
      - production
      - dummy-amqp
    publish:
      operationId: turnOn
      security:
        - supportedOauthFlows:
          - streetlights:on
      externalDocs:
        description: Find more info here
        url: https://example.com
      traits:
        - $ref: '#/components/operationTraits/kafka'
      message:
        $ref: '#/components/messages/turnOnOff'

  smartylighting/streetlights/1/0/action/{streetlightId}/turn/off:
    parameters:
      streetlightId:
        $ref: '#/components/parameters/streetlightId'
    publish:
      traits:
        - $ref: '#/components/operationTraits/kafka'
      message:
        $ref: '#/components/messages/turnOnOff'

  smartylighting/streetlights/1/0/action/{streetlightId}/dim:
    parameters:
      streetlightId:
        $ref: '#/components/parameters/streetlightId'
    servers:
      - production
      - dummy-amqp
    publish:
      operationId: dimLight
      traits:
        - $ref: '#/components/operationTraits/kafka'
      message:
        $ref: '#/components/messages/dimLight'

components:
  messages:
    lightMeasured:
      messageId: lightMeasured Message ID
      name: lightMeasured
      title: Light measured
      summary: Inform about environmental lighting conditions for a particular streetlight.
      contentType: application/json
      correlationId:
        $ref: "#/components/correlationIds/sentAtCorrelator"
      externalDocs:
        url: "https://www.asyncapi.com/"
      traits:
        - $ref: '#/components/messageTraits/commonHeaders'
      payload:
        $ref: "#/components/schemas/lightMeasuredPayload"
      bindings:
        mqtt:
          bindingVersion: 0.1.0
      examples:
        - headers:
            my-app-header: 12
          payload:
            lumens: 1
            sentAt: "2020-01-31T13:24:53Z"
        - headers:
            my-app-header: 13
        - payload:
            lumens: 3
            sentAt: "2020-10-31T13:24:53Z"
      x-schema-extensions-as-object:
        type: object
        properties:
          prop1:
            type: string
          prop2:
            type: integer
            minimum: 0
      x-schema-extensions-as-primitive: dummy
      x-schema-extensions-as-array: 
        - "item1"
        - "item2"
    LwM2mOjbects:
      payload:
        type: object
        properties:
          objectLinks:
            type: string
        example:
          objectLinks: "lwm2m=1.1, </0/0>, </1/1>;ssid=1, </2>, </3/0>"
    turnOnOff:
      name: turnOnOff
      title: Turn on/off
      summary: Command a particular streetlight to turn the lights on or off.
      payload:
        $ref: "#/components/schemas/turnOnOffPayload"
      headers: 
        type: object
        properties:
          $ref: '#/components/schemas/streamHeaders'
    dimLight:
      name: dimLight
      title: Dim light
      summary: Command a particular streetlight to dim the lights.
      correlationId:
        $ref: "#/components/correlationIds/sentAtCorrelator"
      externalDocs:
        url: "https://www.asyncapi.com/"
      tags:
        - name: operation-tag1
          externalDocs:
            description: External docs description 1
            url: https://www.asyncapi.com/
        - name: operation-tag2
          description: Description 2
          externalDocs:
            url: "https://www.asyncapi.com/"
        - name: operation-tag3
        - name: operation-tag4
          description: Description 4
        - name: operation-tag5
          externalDocs:
            url: "https://www.asyncapi.com/"
      traits:
        - $ref: '#/components/messageTraits/commonHeaders'
      payload:
        $ref: "#/components/schemas/dimLightPayload"

  schemas:
    lightMeasuredPayload:
      type: object
      properties:
        lumens:
          type: integer
          description: Light intensity measured in lumens.
          writeOnly: true
          oneOf: 
            - minimum: 0
              maximum: 5
            - minimum: 10
              maximum: 20
          externalDocs:
            url: "https://www.asyncapi.com/"
        sentAt:
          $ref: "#/components/schemas/sentAt"
        ifElseThen:
          type: integer
          minimum: 1
          maximum: 1000
          if:
            minimum: 100
          then: 
            multipleOf: 100
          else:
            if: 
              minimum: 10
            then: 
              multipleOf: 10
        dependencies:
          $ref: "#/components/schemas/dependenciesObject"
        anySchema: true
        cannotBeDefined: false
        restrictedAny: 
          minimum: 1
          maximum: 1000
      required:
        - lumens
      x-schema-extensions-as-object:
        type: object
        properties:
          prop1:
            type: string
          prop2:
            type: integer
            minimum: 0
      x-schema-extensions-as-primitive: dummy
      x-schema-extensions-as-array: 
        - "item1"
        - "item2"
    turnOnOffPayload:
      type: object
      properties:
        command:
          type: string
          enum:
            - on
            - off
          description: Whether to turn on or off the light.
        sentAt:
          $ref: "#/components/schemas/sentAt"
        arrayRank:
          $ref: '#/components/schemas/arrayRank'
      additionalProperties:
        type: string

    dimLightPayload:
      type: object
      properties:
        percentage:
          type: integer
          description: Percentage to which the light should be dimmed to.
          minimum: 0
          maximum: 100
          readOnly: true
        sentAt:
          $ref: "#/components/schemas/sentAt"
        key:
          type: integer
          not:
            minimum: 3
      patternProperties:
        ^S_:
          type: string
        ^I_:
          type: integer
      additionalProperties: false
    sentAt:
      type: string
      format: date-time
      description: Date and time when the message was sent.
    union:
      type: [string, number]
    objectWithKey:
      title: objectWithKey
      type: object
      propertyNames:
        format: email
      properties:
        key:
          type: string
    objectWithKey2:
      type: object
      properties:
        key2:
          type: string
          format: time
    oneOfSchema:
      oneOf:
        - $ref: "#/components/schemas/objectWithKey"
        - $ref: "#/components/schemas/objectWithKey2"
    anyOfSchema:
      anyOf:
        - $ref: "#/components/schemas/objectWithKey"
        - $ref: "#/components/schemas/objectWithKey2"
    allOfSchema:
      allOf:
        - $ref: "#/components/schemas/objectWithKey"
        - $ref: "#/components/schemas/objectWithKey2"
    arrayContains: 
      type: array
      contains:
        type: integer
    dependenciesObject:
      type: object
      properties:
        name:
          type: string
        credit_card:
          type: integer
        billing_address:
          type: string
        schema_dependency:
          type: string
      required:
        - name
      dependencies:
        credit_card:
          properties:
            billing_address:
              type: string
            billing_address2:
              type: string
          required:
          - billing_address
          dependencies:
            billing_address2:
              properties:
                billing_address3:
                  type: string
              required:
              - billing_address3    

    subscriptionStatus:
      type: object
      oneOf:
        - properties:
            channelID:
              type: integer
              description: ChannelID on successful subscription, applicable to public messages only.
            channelName:
              type: string
              description: Channel Name on successful subscription. For payloads 'ohlc' and 'book', respective interval or depth will be added as suffix.
        - properties:
            errorMessage:
              type: string
      properties:
        event:
          type: string
          const: subscriptionStatus
        subscription:
          type: object
          properties:
            depth:
              type: string
            interval:
              type: string
          required:
            - name
      required:
        - event

    arrayRank:
      type: object
      properties:
        valueRank: 
          $ref: '#/components/schemas/arrayValueRank'
        arrayDimensions: 
          $ref: '#/components/schemas/arrayArrayDimensions'

    arrayValueRank:
      description: >
        This Attribute indicates whether the val Attribute of the datapoint is an
        array and how many dimensions the array has.
      type: integer
      default: -1
      examples:
        - 2
      oneOf:
        - const: -1
          description: 'Scalar: The value is not an array.'
        - const: 0
          description: 'OneOrMoreDimensions: The value is an array with one or more dimensions.'
        - const: 1
          description: 'OneDimension: The value is an array with one dimension.'
        - const: 2
          description: 'The value is an array with two dimensions.'

    arrayArrayDimensions:
      type: array
      items:
        type: integer
        minimum: 0
      examples:
        - [3, 5]

    streamHeaders:
      Etag:
        type: string
        description: |
          The RFC7232 ETag header field in a response provides the current entity-
          tag for the selected resource. An entity-tag is an opaque identifier for
          different versions of a resource over time, regardless whether multiple
          versions are valid at the same time. An entity-tag consists of an opaque
          quoted string, possibly prefixed by a weakness indicator.
        example: 411a
      Cache-Control:
        description: The Cache-Control HTTP header holds directives (instructions) for caching in request.
        type: string
        example: no-cache, no-store, must-revalidate

  securitySchemes:
    apiKey:
      type: apiKey
      in: user
      description: Provide your API key as the user and leave the password empty.
    supportedOauthFlows:
      type: oauth2
      description: Flows to support OAuth 2.0
      flows:
        implicit:
          authorizationUrl: 'https://authserver.example/auth'
          scopes:
            'streetlights:on': Ability to switch lights on
            'streetlights:off': Ability to switch lights off
            'streetlights:dim': Ability to dim the lights
        password:
          tokenUrl: 'https://authserver.example/token'
          scopes:
            'streetlights:on': Ability to switch lights on
            'streetlights:off': Ability to switch lights off
            'streetlights:dim': Ability to dim the lights
        clientCredentials:
          tokenUrl: 'https://authserver.example/token'
          scopes:
            'streetlights:on': Ability to switch lights on
            'streetlights:off': Ability to switch lights off
            'streetlights:dim': Ability to dim the lights
        authorizationCode:
          authorizationUrl: 'https://authserver.example/auth'
          tokenUrl: 'https://authserver.example/token'
          refreshUrl: 'https://authserver.example/refresh'
          scopes:
            'streetlights:on': Ability to switch lights on
            'streetlights:off': Ability to switch lights off
            'streetlights:dim': Ability to dim the lights
    openIdConnectWellKnown:
      type: openIdConnect
      openIdConnectUrl: 'https://authserver.example/.well-known'

  parameters:
    streetlightId:
      description: The ID of the streetlight.
      schema:
        type: string
      location: "$message.payload#/user/id"

  correlationIds:
    sentAtCorrelator:
      description: Data from message payload used as correlation ID
      location: $message.payload#/sentAt

  messageTraits:
    commonHeaders:
      headers:
        type: object
        properties:
          my-app-header:
            type: integer
            minimum: 0
            maximum: 100
        required:
          - my-app-header
  
  operationTraits:
    kafka:
      bindings:
        kafka:
          clientId: my-app-id
`;
