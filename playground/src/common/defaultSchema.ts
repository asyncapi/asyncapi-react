export const defaultSchema = `
asyncapi: '2.0.0-rc2'
id: 'urn:com:smartylighting:streetlights:server'
info:
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
    url: "http://www.asyncapi.org/support"
    email: "support@asyncapi.org"
  license:
    name: Apache 2.0
    url: http://www.apache.org/licenses/LICENSE-2.0.html
    wrongField: foobar

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

defaultContentType: application/json

channels:
  smartylighting/streetlights/1/0/event/{streetlightId}/lighting/measured:
    description: The topic on which measured values may be produced and consumed.
    parameters:
      streetlightId:
        $ref: '#/components/parameters/streetlightId'
    subscribe:
      summary: Receive information about environmental lighting conditions of a particular streetlight.
      operationId: receiveLightMeasurement
      traits:
        - $ref: '#/components/operationTraits/kafka'
      message:
        $ref: '#/components/messages/lightMeasured'

  smartylighting/streetlights/1/0/action/{streetlightId}/turn/on:
    parameters:
      streetlightId:
        $ref: '#/components/parameters/streetlightId'
    publish:
      operationId: turnOn
      traits:
        - $ref: '#/components/operationTraits/kafka'
      message:
        $ref: '#/components/messages/turnOnOff'

  smartylighting/streetlights/1/0/action/{streetlightId}/turn/off:
    parameters:
      streetlightId:
        $ref: '#/components/parameters/streetlightId'
    publish:
      operationId: turnOff
      traits:
        - $ref: '#/components/operationTraits/kafka'
      message:
        $ref: '#/components/messages/turnOnOff'

  smartylighting/streetlights/1/0/action/{streetlightId}/dim:
    parameters:
      streetlightId:
        $ref: '#/components/parameters/streetlightId'
    publish:
      operationId: dimLight
      traits:
        - $ref: '#/components/operationTraits/kafka'
      message:
        $ref: '#/components/messages/dimLight'

components:
  messages:
    lightMeasured:
      name: lightMeasured
      title: Light measured
      summary: Inform about environmental lighting conditions for a particular streetlight.
      contentType: application/json
      traits:
        - $ref: '#/components/messageTraits/commonHeaders'
      payload:
        $ref: "#/components/schemas/lightMeasuredPayload"
    turnOnOff:
      name: turnOnOff
      title: Turn on/off
      summary: Command a particular streetlight to turn the lights on or off.
      traits:
        - $ref: '#/components/messageTraits/commonHeaders'
      payload:
        $ref: "#/components/schemas/turnOnOffPayload"
    dimLight:
      name: dimLight
      title: Dim light
      summary: Command a particular streetlight to dim the lights.
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
          minimum: 0
          description: Light intensity measured in lumens.
        sentAt:
          $ref: "#/components/schemas/sentAt"
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
    dimLightPayload:
      type: object
      properties:
        percentage:
          type: integer
          description: Percentage to which the light should be dimmed to.
          minimum: 0
          maximum: 100
        sentAt:
          $ref: "#/components/schemas/sentAt"
    sentAt:
      type: string
      format: date-time
      description: Date and time when the message was sent.

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

  messageTraits:
    commonHeaders:
      headers:
        type: object
        properties:
          my-app-header:
            type: integer
            minimum: 0
            maximum: 100
  
  operationTraits:
    kafka:
      bindings:
        kafka:
          clientId: my-app-id
`;

export const defaultSchema2 = `
asyncapi: '2.0.0-rc2'
id: 'urn:com:slack:rtm:api'
info:
  title: Slack Real Time Messaging API
  version: '1.0.0'

servers:
  production:
    url: https://slack.com/api/rtm.connect
    protocol: https
    protocolVersion: '1.1'
    security:
      - token: []

channels:
  /:
    subscribe:
      message:
        oneOf:
          - $ref: '#/components/messages/hello'
          - $ref: '#/components/messages/connectionError'
          - $ref: '#/components/messages/accountsChanged'
          - $ref: '#/components/messages/botAdded'
          - $ref: '#/components/messages/botChanged'
          - $ref: '#/components/messages/channelArchive'
          - $ref: '#/components/messages/channelCreated'
          - $ref: '#/components/messages/channelDeleted'
          - $ref: '#/components/messages/channelHistoryChanged'
          - $ref: '#/components/messages/channelJoined'
          - $ref: '#/components/messages/channelLeft'
          - $ref: '#/components/messages/channelMarked'
          - $ref: '#/components/messages/channelRename'
          - $ref: '#/components/messages/channelUnarchive'
          - $ref: '#/components/messages/commandsChanged'
          - $ref: '#/components/messages/dndUpdated'
          - $ref: '#/components/messages/dndUpdatedUser'
          - $ref: '#/components/messages/emailDomainChanged'
          - $ref: '#/components/messages/emojiRemoved'
          - $ref: '#/components/messages/emojiAdded'
          - $ref: '#/components/messages/fileChange'
          - $ref: '#/components/messages/fileCommentAdded'
          - $ref: '#/components/messages/fileCommentDeleted'
          - $ref: '#/components/messages/fileCommentEdited'
          - $ref: '#/components/messages/fileCreated'
          - $ref: '#/components/messages/fileDeleted'
          - $ref: '#/components/messages/filePublic'
          - $ref: '#/components/messages/fileShared'
          - $ref: '#/components/messages/fileUnshared'
          - $ref: '#/components/messages/goodbye'
          - $ref: '#/components/messages/groupArchive'
          - $ref: '#/components/messages/groupClose'
          - $ref: '#/components/messages/groupHistoryChanged'
          - $ref: '#/components/messages/groupJoined'
          - $ref: '#/components/messages/groupLeft'
          - $ref: '#/components/messages/groupMarked'
          - $ref: '#/components/messages/groupOpen'
          - $ref: '#/components/messages/groupRename'
          - $ref: '#/components/messages/groupUnarchive'
          - $ref: '#/components/messages/imClose'
          - $ref: '#/components/messages/imCreated'
          - $ref: '#/components/messages/imMarked'
          - $ref: '#/components/messages/imOpen'
          - $ref: '#/components/messages/manualPresenceChange'
          - $ref: '#/components/messages/memberJoinedChannel'
          - $ref: '#/components/messages/message'
    publish:
      message:
        $ref: '#/components/messages/outgoingMessage'

components:
  securitySchemes:
    token:
      type: httpApiKey
      name: token
      in: query

  schemas:
    attachment:
      type: object
      properties:
        fallback:
          type: string
        color:
          type: string
        pretext:
          type: string
        author_name:
          type: string
        author_link:
          type: string
          format: uri
        author_icon:
          type: string
          format: uri
        title:
          type: string
        title_link:
          type: string
          format: uri
        text:
          type: string
        fields:
          type: array
          items:
            type: object
            properties:
              title:
                type: string
              value:
                type: string
              short:
                type: boolean
        image_url:
          type: string
          format: uri
        thumb_url:
          type: string
          format: uri
        footer:
          type: string
        footer_icon:
          type: string
          format: uri
        ts:
          type: number

  messages:
    hello:
      summary: 'First event received upon connection.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - hello
    connectionError:
      summary: 'Event received when a connection error happens.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - error
          error:
            type: object
            properties:
              code:
                type: number
              msg:
                type: string
    accountsChanged:
      summary: 'The list of accounts a user is signed into has changed.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - accounts_changed
    botAdded:
      summary: 'A bot user was added.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - bot_added
          bot:
            type: object
            properties:
              id:
                type: string
              app_id:
                type: string
              name:
                type: string
              icons:
                type: object
                additionalProperties:
                  type: string
    botChanged:
      summary: 'A bot user was changed.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - bot_added
          bot:
            type: object
            properties:
              id:
                type: string
              app_id:
                type: string
              name:
                type: string
              icons:
                type: object
                additionalProperties:
                  type: string
    channelArchive:
      summary: 'A channel was archived.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - channel_archive
          channel:
            type: string
          user:
            type: string
    channelCreated:
      summary: 'A channel was created.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - channel_created
          channel:
            type: object
            properties:
              id:
                type: string
              name:
                type: string
              created:
                type: number
              creator:
                type: string
    channelDeleted:
      summary: 'A channel was deleted.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - channel_deleted
          channel:
            type: string
    channelHistoryChanged:
      summary: 'Bulk updates were made to a channel''s history.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - channel_history_changed
          latest:
            type: string
          ts:
            type: string
          event_ts:
            type: string
    channelJoined:
      summary: 'You joined a channel.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - channel_joined
          channel:
            type: object
            properties:
              id:
                type: string
              name:
                type: string
              created:
                type: number
              creator:
                type: string
    channelLeft:
      summary: 'You left a channel.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - channel_left
          channel:
            type: string
    channelMarked:
      summary: 'Your channel read marker was updated.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - channel_marked
          channel:
            type: string
          ts:
            type: string
    channelRename:
      summary: 'A channel was renamed.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - channel_rename
          channel:
            type: object
            properties:
              id:
                type: string
              name:
                type: string
              created:
                type: number
    channelUnarchive:
      summary: 'A channel was unarchived.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - channel_unarchive
          channel:
            type: string
          user:
            type: string
    commandsChanged:
      summary: 'A slash command has been added or changed.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - commands_changed
          event_ts:
            type: string
    dndUpdated:
      summary: 'Do not Disturb settings changed for the current user.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - dnd_updated
          user:
            type: string
          dnd_status:
            type: object
            properties:
              dnd_enabled:
                type: boolean
              next_dnd_start_ts:
                type: number
              next_dnd_end_ts:
                type: number
              snooze_enabled:
                type: boolean
              snooze_endtime:
                type: number
    dndUpdatedUser:
      summary: 'Do not Disturb settings changed for a member.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - dnd_updated_user
          user:
            type: string
          dnd_status:
            type: object
            properties:
              dnd_enabled:
                type: boolean
              next_dnd_start_ts:
                type: number
              next_dnd_end_ts:
                type: number
    emailDomainChanged:
      summary: 'The workspace email domain has changed.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - email_domain_changed
          email_domain:
            type: string
          event_ts:
            type: string
    emojiRemoved:
      summary: 'A custom emoji has been removed.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - emoji_changed
          subtype:
            type: string
            enum:
              - remove
          names:
            type: array
            items:
              type: string
          event_ts:
            type: string
    emojiAdded:
      summary: 'A custom emoji has been added.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - emoji_changed
          subtype:
            type: string
            enum:
              - add
          name:
            type: string
          value:
            type: string
            format: uri
          event_ts:
            type: string
    fileChange:
      summary: 'A file was changed.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - file_change
          file_id:
            type: string
          file:
            type: object
            properties:
              id:
                type: string
    fileCommentAdded:
      summary: 'A file comment was added.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - file_comment_added
          comment: {}
          file_id:
            type: string
          file:
            type: object
            properties:
              id:
                type: string
    fileCommentDeleted:
      summary: 'A file comment was deleted.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - file_comment_deleted
          comment:
            type: string
          file_id:
            type: string
          file:
            type: object
            properties:
              id:
                type: string
    fileCommentEdited:
      summary: 'A file comment was edited.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - file_comment_edited
          comment: {}
          file_id:
            type: string
          file:
            type: object
            properties:
              id:
                type: string
    fileCreated:
      summary: 'A file was created.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - file_created
          file_id:
            type: string
          file:
            type: object
            properties:
              id:
                type: string
    fileDeleted:
      summary: 'A file was deleted.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - file_deleted
          file_id:
            type: string
          event_ts:
            type: string
    filePublic:
      summary: 'A file was made public.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - file_public
          file_id:
            type: string
          file:
            type: object
            properties:
              id:
                type: string
    fileShared:
      summary: 'A file was shared.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - file_shared
          file_id:
            type: string
          file:
            type: object
            properties:
              id:
                type: string
    fileUnshared:
      summary: 'A file was unshared.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - file_unshared
          file_id:
            type: string
          file:
            type: object
            properties:
              id:
                type: string
    goodbye:
      summary: 'The server intends to close the connection soon.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - goodbye
    groupArchive:
      summary: 'A private channel was archived.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - group_archive
          channel:
            type: string
    groupClose:
      summary: 'You closed a private channel.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - group_close
          user:
            type: string
          channel:
            type: string
    groupHistoryChanged:
      summary: 'Bulk updates were made to a private channel''s history.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - group_history_changed
          latest:
            type: string
          ts:
            type: string
          event_ts:
            type: string
    groupJoined:
      summary: 'You joined a private channel.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - group_joined
          channel:
            type: object
            properties:
              id:
                type: string
              name:
                type: string
              created:
                type: number
              creator:
                type: string
    groupLeft:
      summary: 'You left a private channel.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - group_left
          channel:
            type: string
    groupMarked:
      summary: 'A private channel read marker was updated.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - group_marked
          channel:
            type: string
          ts:
            type: string
    groupOpen:
      summary: 'You opened a private channel.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - group_open
          user:
            type: string
          channel:
            type: string
    groupRename:
      summary: 'A private channel was renamed.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - group_rename
          channel:
            type: object
            properties:
              id:
                type: string
              name:
                type: string
              created:
                type: number
    groupUnarchive:
      summary: 'A private channel was unarchived.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - group_unarchive
          channel:
            type: string
          user:
            type: string
    imClose:
      summary: 'You closed a DM.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - im_close
          channel:
            type: string
          user:
            type: string
    imCreated:
      summary: 'A DM was created.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - im_created
          channel:
            type: object
            properties:
              id:
                type: string
              name:
                type: string
              created:
                type: number
              creator:
                type: string
          user:
            type: string
    imMarked:
      summary: 'A direct message read marker was updated.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - im_marked
          channel:
            type: string
          ts:
            type: string
    imOpen:
      summary: 'You opened a DM.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - im_open
          channel:
            type: string
          user:
            type: string
    manualPresenceChange:
      summary: 'You manually updated your presence.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - manual_presence_change
          presence:
            type: string
    memberJoinedChannel:
      summary: 'A user joined a public or private channel.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - member_joined_channel
          user:
            type: string
          channel:
            type: string
          channel_type:
            type: string
            enum:
              - C
              - G
          team:
            type: string
          inviter:
            type: string
    memberLeftChannel:
      summary: 'A user left a public or private channel.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - member_left_channel
          user:
            type: string
          channel:
            type: string
          channel_type:
            type: string
            enum:
              - C
              - G
          team:
            type: string
    message:
      summary: 'A message was sent to a channel.'
      payload:
        type: object
        properties:
          type:
            type: string
            enum:
              - message
          user:
            type: string
          channel:
            type: string
          text:
            type: string
          ts:
            type: string
          attachments:
            type: array
            items:
              $ref: '#/components/schemas/attachment'
          edited:
            type: object
            properties:
              user:
                type: string
              ts:
                type: string
    outgoingMessage:
      summary: 'A message was sent to a channel.'
      payload:
        type: object
        properties:
          id:
            type: number
          type:
            type: string
            enum:
              - message
          channel:
            type: string
          text:
            type: string
`;
