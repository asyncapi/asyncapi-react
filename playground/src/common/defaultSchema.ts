export const defaultSchema = `

asyncapi: '2.0.0-rc1'
info:
  title: Streetlights API
  version: '1.0.0'
  description: |
    The Smartylighting Streetlights API allows you to remotely manage the city lights.

    ### Check out its awesome features:

    * Turn a specific streetlight on/off 🌃
    * Dim a specific streetlight 😎
    * Receive real-time information about environmental lighting conditions 📈
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0

        
servers:
  production:
    url: api.streetlights.smartylighting.com:{port}
    protocol: mqtt
    description: Test broker
    variables:
      port:
        description: Secure connection (TLS) is available through port 8883.
        default: '1883'
        enum:
          - '1883'
          - '8883'
    security:
      - apiKey: []
      - supportedOauthFlows:
        - streetlights:on
        - streetlights:off
        - streetlights:dim
      - openIdConnectWellKnown: []
  stage:
    url: api.streetlights.smartylighting.com:{port}
    protocol: mqtt
    description: Test broker
    variables:
      port:
        description: Secure connection (TLS) is available through port 8883.
        default: '1883'
        enum:
          - '1883'
          - '8883'
    security:
      - apiKey: []
      - supportedOauthFlows:
        - streetlights:on
        - streetlights:off
        - streetlights:dim
      - openIdConnectWellKnown: []      

defaultContentType: application/json

channels:
  /rooms/{roomId}/{resource}:
    parameters:
      roomId:
        description: Id of the Gitter room.
        schema:
          type: string
          examples:
            - 53307860c3599d1de448e19d
      resource:
        description: The resource to consume.
        schema:
          type: string
          enum:
            - chatMessages
            - events
    subscribe:
      protocolInfo:
        http:
          response:
            headers:
              'Transfer-Encoding': 'chunked'
              Trailer: '\r\n'
      message:
        oneOf:
          - $ref: '#/components/messages/chatMessage'
          - $ref: '#/components/messages/heartbeat'

components:
  securitySchemes:
    httpBearerToken:
      type: http
      scheme: bearer
  messages:
    chatMessage:
      schemaFormat: 'application/schema+yaml;version=draft-07'
      summary: >-
        A message represents an individual chat message sent to a room.
        They are a sub-resource of a room.
      payload:
        type: object
        properties:
          id:
            type: string
            description: ID of the message.
          text:
            type: string
            description: Original message in plain-text/markdown.
          html:
            type: string
            description: HTML formatted message.
          sent:
            type: string
            format: date-time
            description: ISO formatted date of the message.
          fromUser:
            type: object
            description: User that sent the message.
            properties:
              id:
                type: string
                description: Gitter User ID.
              username:
                type: string
                description: Gitter/GitHub username.
              displayName:
                type: string
                description: Gitter/GitHub user real name.
              url:
                type: string
                description: Path to the user on Gitter.
              avatarUrl:
                type: string
                format: uri
                description: User avatar URI.
              avatarUrlSmall:
                type: string
                format: uri
                description: User avatar URI (small).
              avatarUrlMedium:
                type: string
                format: uri
                description: User avatar URI (medium).
              v:
                type: number
                description: Version.
              gv:
                type: string
                description: Stands for "Gravatar version" and is used for cache busting.
          unread:
            type: boolean
            description: Boolean that indicates if the current user has read the message.
          readBy:
            type: number
            description: Number of users that have read the message.
          urls:
            type: array
            description: List of URLs present in the message.
            items:
              type: string
              format: uri
          mentions:
            type: array
            description: List of @Mentions in the message.
            items:
              type: object
              properties:
                screenName:
                  type: string
                userId:
                  type: string
                userIds:
                  type: array
                  items:
                    type: string
          issues:
            type: array
            description: 'List of #Issues referenced in the message.'
            items:
              type: object
              properties:
                number:
                  type: string
          meta:
            type: array
            description: Metadata. This is currently not used for anything.
            items: {}
          v:
            type: number
            description: Version.
          gv:
            type: string
            description: Stands for "Gravatar version" and is used for cache busting.

    heartbeat:
      schemaFormat: 'application/schema+yaml;version=draft-07'
      summary: Its purpose is to keep the connection alive.
      payload:
        type: string
        enum: ["\r\n"]`;
