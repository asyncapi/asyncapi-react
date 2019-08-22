export const defaultSchema = `
asyncapi: '2.0.0-rc1'
id: 'urn:rpc:example:server'
defaultContentType: application/json

info:
  title: RPC Server Example
  description: This example demonstrates how to define an RPC server.
  version: '1.0.0'

servers:
  - url: rabbitmq.example.org
    protocol: amqp

channels:
  '{queue}':
    parameters:
      - name: queue
        schema:
          type: string
          pattern: '^amq\\.gen\\-.+$'
    protocolInfo:
      amqp-0-9-1:
        channelIsQueue: true
        queue:
          randomName: true
          exclusive: true
    publish:
      operationId: sendSumResult
      protocolInfo:
        amqp-0-9-1:
          ack: true
      message:
        correlationId:
          location: $message.header#/correlation_id
        payload:
          type: object
          properties:
            result:
              type: number
              examples:
                - 7

  rpc_queue:
    protocolInfo:
      amqp-0-9-1:
        channelIsQueue: true
        queue:
          durable: false
    subscribe:
      operationId: sum
      message:
        protocolInfo:
          amqp-0-9-1:
            properties:
              reply_to:
                type: string
        correlationId:
          location: $message.header#/correlation_id
        payload:
          type: object
          properties:
            numbers:
              type: array
              items:
                type: number
              examples:
                - [4,3]

`;
