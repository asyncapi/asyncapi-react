export const jsonMock = {
	"asyncapi": "1.2.0",
	"info": {
		"title": "AsyncAPI Sample",
		"version": "1.0.0",
		"x-logo": "https://avatars0.githubusercontent.com/u/16401334?v=4&s=200",
		"description": "This is a simple example of an _AsyncAPI_ document.\n",
		"termsOfService": "https://api.company.com/terms"
	},
	"baseTopic": "hitch",
	"servers": [
		{
			"url": "api.company.com:{port}/{app-id}",
			"description": "Allows you to connect using the MQTT protocol.",
			"scheme": "mqtt",
			"variables": {
				"app-id": {
					"default": "demo",
					"description": "You can find your `app-id` in our control panel, under the auth tab."
				},
				"port": {
					"enum": [
						"5676",
						"5677"
					],
					"default": "5676"
				}
			}
		},
		{
			"url": "api.company.com:{port}/{app-id}",
			"description": "Allows you to connect using the AMQP protocol.",
			"scheme": "amqp",
			"variables": {
				"app-id": {
					"default": "demo",
					"description": "You can find your `app-id` in our control panel, under the auth tab."
				},
				"port": {
					"enum": [
						"5676",
						"5677"
					],
					"default": "5676"
				}
			}
		}
	],
	"topics": {
		"accounts.1.0.action.user.signup": {
			"publish": {
				"$ref": "#/components/messages/userSignUp"
			}
		},
		"accounts.1.0.event.user.signup": {
			"subscribe": {
				"oneOf": [
					{
						"$ref": "#/components/messages/userSignUp"
					},
					{
						"$ref": "#/components/messages/userSignedUp"
					}
				]
			}
		}
	},
	"components": {
		"messages": {
			"userSignUp": {
				"deprecated": true,
				"summary": "Action to sign a user up.",
				"description": "Multiline description of what this action does. **It allows Markdown.**\n",
				"tags": [
					{
						"name": "user"
					},
					{
						"name": "signup"
					}
				],
				"headers": {
					"type": "object",
					"properties": {
						"qos": {
							"$ref": "#/components/schemas/MQTTQoSHeader"
						},
						"retainFlag": {
							"$ref": "#/components/schemas/MQTTRetainHeader"
						}
					}
				},
				"payload": {
					"type": "object",
					"properties": {
						"user": {
							"$ref": "#/components/schemas/userCreate"
						},
						"signup": {
							"$ref": "#/components/schemas/signup"
						}
					}
				}
			},
			"userSignedUp": {
				"payload": {
					"type": "object",
					"properties": {
						"test": {
							"type": "array",
							"items": {
								"type": "object",
								"properties": {
									"key1": {
										"type": "string"
									},
									"key2": {
										"type": "integer"
									}
								}
							}
						},
						"user": {
							"$ref": "#/components/schemas/user"
						},
						"signup": {
							"$ref": "#/components/schemas/signup"
						}
					}
				}
			}
		},
		"schemas": {
			"id": {
				"title": "id",
				"description": "Resource identifier",
				"type": "string"
			},
			"username": {
				"title": "username",
				"description": "User handle",
				"type": "string"
			},
			"datetime": {
				"title": "datetime",
				"description": "Date and Time of the message",
				"type": "string",
				"format": "date-time"
			},
			"MQTTQoSHeader": {
				"title": "qos",
				"description": "Quality of Service",
				"type": "integer",
				"format": "int32",
				"default": 1,
				"enum": [
					0,
					2
				]
			},
			"MQTTRetainHeader": {
				"title": "retainFlag",
				"description": "This flag determines if the message will be saved by the broker for the specified\ntopic as last known good value. New clients that subscribe to that topic will receive\nthe last retained message on that topic instantly after subscribing. More on retained messages\nand best practices in one of the next posts.\n",
				"type": "boolean",
				"default": false
			},
			"user": {
				"type": "object",
				"required": [
					"id",
					"username"
				],
				"properties": {
					"id": {
						"description": "User Id",
						"$ref": "#/components/schemas/id"
					},
					"full_name": {
						"description": "User full name",
						"type": "string"
					},
					"username": {
						"$ref": "#/components/schemas/username"
					}
				}
			},
			"userCreate": {
				"type": "object",
				"required": [
					"username"
				],
				"properties": {
					"full_name": {
						"description": "User full name",
						"type": "string"
					},
					"username": {
						"$ref": "#/components/schemas/username"
					}
				}
			},
			"signup": {
				"type": "object",
				"required": [
					"method",
					"datetime"
				],
				"properties": {
					"method": {
						"description": "Signup method",
						"type": "string",
						"enum": [
							"email",
							"facebook",
							"twitter",
							"github",
							"google"
						]
					},
					"datetime": {
						"$ref": "#/components/schemas/datetime"
					}
				}
			}
		}
	}
}

export const yamlMock = `
asyncapi: "1.0.0"
info:
  title: PetStore Events
  version: "1.0.0"
  description: |
    Description of all the EC events
baseTopic: 'stage.com.sap.hybris.commerce'

topics:
  petCreated.v1:
    subscribe:
      $ref: "#/components/messages/petCreated"
  petCreated.v2:
    subscribe:
      $ref: "#/components/messages/petCreatedV2"
  petUpdated.v1:
    subscribe:
      $ref: "#/components/messages/petUpdated"
  petDeleted.v1:
    subscribe:
      $ref: "#/components/messages/petDeleted"

components:
  messages:
    petCreated: 
      summary: Event containing information about new pet added to the Pet Store.
      payload:
        type: object
        properties:
          pet:
            $ref: "#/components/schemas/pet"
    petCreatedV2: 
      summary: Event containing information about new pet added to the Pet Store.
      payload:
        type: object
        properties:
          pet:
            $ref: "#/components/schemas/newPet"
    petUpdated:
      summary: Event containing information about updated pet.
      payload:
        type: object
        properties:
          pet:
            $ref: "#/components/schemas/pet"
    petDeleted:
      summary: Event containing information about deleted pet.
      payload:
        type: object
        required:
          - id
        properties:
          id:
            $ref: "#/components/schemas/id"


  schemas:
    id:
      title: Id
      description: Resource identifier
      type: string
    name:
      title: Name
      description: Pet name
      type: string
    category:
      title: Category
      description: Animal category
      type: string
    categoryRestricted:
      title: Category Restricted
      description: Category with fixed list of available animal classes
      type: string
      enum:
        - mammal
        - bird
        - fish
    pet:
      type: object
      required:
        - id
        - name
      example:
        id: 4caad296-e0c5-491e-98ac-0ed118f9474e
        category: mamal
        name: doggie
      properties:
        id:
          $ref: "#/components/schemas/id"
        name:
          $ref: "#/components/schemas/name"
        category:
          $ref: "#/components/schemas/category"
    newPet:
      type: object
      required:
        - id
        - name
      example:
        id: 4caad296-e0c5-491e-98ac-0ed118f9474e
        category: mammal
        name: doggie
      properties:
        id:
          $ref: "#/components/schemas/id"
        name:
          $ref: "#/components/schemas/name"
        category:
          $ref: "#/components/schemas/categoryRestricted"

    
`

export const yamlMock2 = `
asyncapi: '1.2.0'
info:
  title: AllOf example (nested allOf)
  version: '1.0.0'
topics:
  test:
    publish:
      $ref: '#/components/messages/testMessages'
components:
  messages:
    testMessages:
      payload:
        $ref: "#/components/schemas/FooBarBaz"
  schemas:
    Foo:
      type: object
      required:
      - foo
      properties:
        foo:
          type: string
    Bar:
      type: object
      required:
      - bar
      properties:
        bar:
          type: string
    Baz:
      type: object
      required:
      - baz
      properties:
        baz:
          type: string
    FooBar:
      oneOf:
      - $ref: "#/components/schemas/Foo"
      - $ref: "#/components/schemas/Bar"
    FooBarBaz:
      allOf:
      - $ref: "#/components/schemas/FooBar"
      - $ref: "#/components/schemas/Baz"
    Ourou:
      type: object
      properties:
        ourouValue:
          type: string
        boros:
          $ref: "#/components/schemas/Boros"
    Boros:
      type: object
      properties:
        borosValue:
          type: string
        ourou:
          $ref: "#/components/schemas/Ourou"
    OurouBoros:
      allOf:
      - $ref: "#/components/schemas/Ourou"
      - $ref: "#/components/schemas/Boros"
`

export const yamlMock3 = `
asyncapi: '1.1.0'
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
baseTopic: smartylighting.streetlights.1.0

servers:
  - url: api.streetlights.smartylighting.com:{port}
    scheme: mqtt
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

topics:
  event.{streetlightId}.lighting.measured:
    parameters:
      - name: streetlightId
        description: The ID of the streetlight.
        schema:
          type: string
    publish:
      $ref: '#/components/messages/lightMeasured'

  action.{streetlightId}.turn.on:
    subscribe:
      $ref: '#/components/messages/turnOnOff'

  action.{streetlightId}.turn.off:
    subscribe:
      $ref: '#/components/messages/turnOnOff'

  action.{streetlightId}.dim:
    subscribe:
      $ref: '#/components/messages/dimLight'

components:
  messages:
    lightMeasured:
      summary: Inform about environmental lighting conditions for a particular streetlight.
      payload:
        $ref: "#/components/schemas/lightMeasuredPayload"
    turnOnOff:
      summary: Command a particular streetlight to turn the lights on or off.
      payload:
        $ref: "#/components/schemas/turnOnOffPayload"
    dimLight:
      summary: Command a particular streetlight to dim the lights.
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
`

export const yamlMock4 = `
asyncapi: '1.1.0'
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
baseTopic: smartylighting.streetlights.1.0

servers:
  - url: api.streetlights.smartylighting.com:{port}
    scheme: mqtt
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

topics:
  event.{streetlightId}.lighting.measured:
    parameters:
      - name: streetlightId
        description: The ID of the streetlight.
        schema:
          type: string
    publish:
      $ref: '#/components/messages/lightMeasured'

  action.{streetlightId}.turn.on:
    subscribe:
      $ref: '#/components/messages/turnOnOff'

  action.{streetlightId}.turn.off:
    subscribe:
      $ref: '#/components/messages/turnOnOff'

  action.{streetlightId}.dim:
    subscribe:
      $ref: '#/components/messages/dimLight'

components:
  messages:
    lightMeasured:
      summary: Inform about environmental lighting conditions for a particular streetlight.
      payload:
        $ref: "#/components/schemas/lightMeasuredPayload"
    turnOnOff:
      summary: Command a particular streetlight to turn the lights on or off.
      payload:
        $ref: "#/components/schemas/turnOnOffPayload"
    dimLight:
      summary: Command a particular streetlight to dim the lights.
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
`;