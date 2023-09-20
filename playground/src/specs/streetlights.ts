export const streetlights = `
asyncapi: 3.0.0
info:
  title: Account Service
  version: 1.0.0
  description: This service is in charge of processing user signups
channels:
  user/signedup:
    address: user/signedup
    messages:
      subscribe.message:
        $ref: '#/components/messages/UserSignedUp'
operations:
  user/signedup.subscribe:
    action: receive
    channel:
      $ref: '#/channels/user~1signedup'
    reply:
      channel:
        $ref: '#/channels/user~1signedup'
      messages:
        - $ref: '#/components/messages/UserSignedUp'
        - $ref: '#/components/messages/UserSignedUp'
    messages:
      - $ref: '#/components/messages/UserSignedUp'
components:
  messages:
    UserSignedUp:
      payload:
        type: object
        properties:
          displayName:
            type: string
            description: Name of the user
          email:
            type: string
            format: email
            description: Email of the userx
`;
