export const mock = {
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
	}
}