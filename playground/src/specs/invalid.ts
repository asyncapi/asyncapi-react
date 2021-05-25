export const invalid = `
components:
  messages:
    RideUpdated:
      payload:
        type: object
      schemaFormat: application/vnd.aai.asyncapi+json;version=2.0.0
      contentType: application/json
    PaymentCharged:
      payload:
        type: object
      schemaFormat: application/vnd.aai.asyncapi+json;version=2.0.0
      contentType: application/json
channels:
  'taxinyc/backoffice/payment/charged/v1/{payment_status}/{driver_id}/{passenger_id}':
    publish:
      x-scs-function-name: processPayment
      message:
        $ref: '#/components/messages/PaymentCharged'
    parameters:
      driver_id:
        schema:
          type: string
      payment_status:
        schema:
          type: string
  'taxinyc/ops/ride/updated/v1/{ride_status}/{driver_id}/{passenger_id}/{current_latitude}/{current_longitude}/{long_property}':
    subscribe:
      x-scs-function-name: processPayment
      x-scs-destination: test/taxinyc/PaymentProcessorQueue
      message:
        $ref: '#/components/messages/RideUpdated'
asyncapi: 2.0.0
info:
  title: ProcessPayment
  version: 0.0.1
`;
