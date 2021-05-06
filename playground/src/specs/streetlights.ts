export const streetlights = `
asyncapi: 2.0.0
id: 'https://api.apiture.com/apis/async-api-id/apiture-public-events'
info:
  title: Apiture Public Events
  description: Describes the event channels and event messages that the Apiture Open digital banking platform subscribees for client consumption.
  contact:
    name: Apiture
    email: api@apiture.com
    url: 'https://developer.apiture.com'
  license:
    name: Apiture Open API License Agreement
    url: 'https://developer.apiture.com/docs/Apiture-Open-API-License-Agreement.pdf'
  version: 0.2.0
servers:
  sandbox:
    url: 'https://api.sandbox.apiture.com/async-events'
    description: The sandbox environment (open/sandbox)
    protocol: sqs
tags:
  - name: Accounts
    description: Banking Accounts
channels:
  accounts:
    description: Account related events
    subscribe:
      operationId: accounts
      summary: Accounts
      description: Fired after activity on banking accounts
      tags:
        - name: Accounts
      message:
        oneOf:
          - name: accountCreated
            payload:
              $ref: '#/components/schemas/accountCreated'
            title: Account Created
            summary: User (Bank Customer) successfully created (opened) an account
            tags:
              - name: Accounts
components:
  schemas:
    accountCreated:
      title: Account Created
      description: A banking customer successfully opened a new account.
      properties:
        _id:
          description: The unique ID of this event. This is an opaque string.
          type: string
          maxLength: 48
        occurredAt:
          description: 'The [RFC 3339](https://tools.ietf.org/html/rfc3339) date-time (UTC) when the event occurred.'
          type: string
          format: date-time
      example:
        _id: event1234
        occurredAt: '2021-05-05T13:21:39.375Z'
`;
