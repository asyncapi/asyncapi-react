export const amqp = `
asyncapi: 2.0.0
id: urn:zbos-mqtt-api
defaultContentType: application/json
info:
  title: ZBOS MQTT API
  version: 2.4.2
  description: API for communication with ZBOS by Zora Robotics.
  contact:
    email: info@zorarobotics.be
servers:
  local:
    url: 127.0.0.1
    protocol: mqtt
    description: This is the local robot broker.
    variables:
      port:
        enum:
        - '1883'
        - '9001'
        default: '1883'
  cloud:
    url: zbos-mqtt.zoracloud.com
    protocol: mqtt
    description: This is the cloud broker.
    variables:
      port:
        enum:
        - '1883'
        - '1884'
        - '9001'
        - '9002'
channels:
  zbos/applications/categories/get:
    publish:
      summary: Get application categories
      description: 'Get all application categories.

        '
      tags:
      - name: Applications
        description: All applications related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/applications/categories/get/response/{key}:
    subscribe:
      summary: 'Response: Get application categories'
      description: ''
      tags:
      - name: Applications
        description: All applications related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
              name:
                type: string
                description: Use name for a static name, or name_key for a translatable
                  name
              name_key:
                type: string
                description: Use name for a static name, or name_key for a translatable
                  name
              weight:
                type: integer
        name: Array<ApplicationCategory>
        examples:
        - payload:
          - id: category_1
            name: Category 1
            weight: 10
          - id: category_2
            weight: 20
            name_key: category_2_key
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/applications/apps/get:
    publish:
      summary: Get applications
      description: 'Get all applications with optional filters.

        '
      tags:
      - name: Applications
        description: All applications related topics.
      message:
        payload:
          type: object
          properties:
            key:
              type: string
            limit:
              type: integer
            offset:
              type: integer
            filters:
              type: array
              items:
                type: object
                properties:
                  field:
                    type: string
                    description: Field to check on. Note that the field should be
                      camelCase, not snake_case
                  value:
                    type: string
                    description: Value to check on. For numbers you should use 'min'
                      and 'max'.
                  min:
                    type: number
                    description: Minimum value, only usable for number fields
                  max:
                    type: number
                    description: Maximum value, only usable for number fields
                  direction:
                    type: object
                    description: |-
                      Direction to sort on.
                      Can be 'asc' or 'desc'.
                      The default direction is 'asc'
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - ASC
                    - DESC
                  operator:
                    type: object
                    description: |-
                      Operator for either the child filters, or this filter object itself.
                      Can be 'and', 'or' or 'not'.
                      Default is 'and'.
                      The root operator is always 'and'
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - AND
                    - OR
                    - NOT
                  match_type:
                    type: object
                    description: |-
                      Match type for string values.
                      Can be 'exact', 'contains', 'starts_with', 'ends_with'.
                      The default match_type is 'contains'
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - EXACT
                    - CONTAINS
                    - STARTS_WITH
                    - ENDS_WITH
                  filters:
                    type: array
                    description: |-
                      Filters on which the operator will be applied.
                      If there are no child filters, the operator will be applied to the filter object itself.
                    items:
                      type: object
                  field_filters:
                    type: array
                    description: |-
                      Filters to apply on the child fields of the field.
                      Will only work if the field is an object, array/list or map.
                    items:
                      type: object
            language:
              type: string
              description: |-
                Optional. Set the language to have all translations filled in.
                The language format is ISO 639-1 language code, Eg: 'en' or 'en-US'
        name: GetApplicationsRequest
        examples:
        - payload:
            key: abc
            limit: 20
            offset: 20
            filters:
            - field: category_id
              value: category_1
              operator: and
              filters:
              - field: category_id
                value: category_1
                operator: and
                match_type: exact
              match_type: exact
  zbos/applications/apps/get/response/{key}:
    subscribe:
      summary: 'Response: Get applications'
      description: ''
      tags:
      - name: Applications
        description: All applications related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
                description: This could be a package name, or some other defined unique
                  ID
              name:
                type: string
                description: Use name for a static name, or name_key for a translatable
                  name
              name_key:
                type: string
                description: Use name for a static name, or name_key for a translatable
                  name
              category_id:
                type: string
              weight:
                type: integer
              actions:
                type: array
                items:
                  type: object
                  properties:
                    application_id:
                      type: string
                    name:
                      type: string
                      description: Use name for a static name, or name_key for a translatable
                        name
                    name_key:
                      type: string
                      description: Use name for a static name, or name_key for a translatable
                        name
                    type:
                      type: object
                      description: |-
                        List of available actions:
                        open: Opens an application handled by the RAILopen_control: Opens an application handled by the control
                        settings: Opens the settings, handled by the control
                        datasource: Edit the datasource, handled by the control
                        other: Should be handled by the app itself
                      properties:
                        name:
                          type: string
                        ordinal:
                          type: integer
                      enum:
                      - OPEN
                      - OPEN_CONTROL
                      - SETTINGS
                      - DATASOURCES
                      - OTHER
                    data:
                      type: object
                      description: Optional data that an action might need.
        name: Array<Application>
        examples:
        - payload:
          - id: com.zorabots.application.one
            name: Application 1
            weight: 10
            actions:
            - name: Open
              type: open
              data:
                key1: value1
              valid: true
              application_id: com.zorabots.application.one
            - name: Settings
              type: settings
              valid: true
              application_id: com.zorabots.application.one
            - name: Datasource
              type: datasources
              valid: true
              application_id: com.zorabots.application.one
            category_id: category_1
          - id: com.zorabots.application.two
            weight: 20
            actions:
            - type: open
              data:
                key1: value1
              valid: true
              application_id: com.zorabots.application.two
              name_key: Open
            - name: Some other action
              type: other
              data:
                key1: value1
              valid: true
              application_id: com.zorabots.application.two
            name_key: application_2_key
            category_id: category_1
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/applications/apps/changed/event/{app}:
    publish:
      summary: Application changed
      description: 'Fired when an app was added or changed.

        '
      tags:
      - name: Applications
        description: All applications related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
              description: This could be a package name, or some other defined unique
                ID
            name:
              type: string
              description: Use name for a static name, or name_key for a translatable
                name
            name_key:
              type: string
              description: Use name for a static name, or name_key for a translatable
                name
            category_id:
              type: string
            weight:
              type: integer
            actions:
              type: array
              items:
                type: object
                properties:
                  application_id:
                    type: string
                  name:
                    type: string
                    description: Use name for a static name, or name_key for a translatable
                      name
                  name_key:
                    type: string
                    description: Use name for a static name, or name_key for a translatable
                      name
                  type:
                    type: object
                    description: |-
                      List of available actions:
                      open: Opens an application handled by the RAILopen_control: Opens an application handled by the control
                      settings: Opens the settings, handled by the control
                      datasource: Edit the datasource, handled by the control
                      other: Should be handled by the app itself
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - OPEN
                    - OPEN_CONTROL
                    - SETTINGS
                    - DATASOURCES
                    - OTHER
                  data:
                    type: object
                    description: Optional data that an action might need.
        name: Application
        examples:
        - payload:
            id: com.zorabots.application.one
            name: Application 1
            weight: 10
            actions:
            - name: Open
              type: open
              data:
                key1: value1
              valid: true
              application_id: com.zorabots.application.one
            - name: Settings
              type: settings
              valid: true
              application_id: com.zorabots.application.one
            - name: Datasource
              type: datasources
              valid: true
              application_id: com.zorabots.application.one
            category_id: category_1
    parameters:
      app:
        description: ID of the app that was changed
        schema:
          type: string
  zbos/applications/icons/get:
    publish:
      summary: Get application icon
      description: 'Get the application icons for the passed application ID.

        '
      tags:
      - name: Applications
        description: All applications related topics.
      message:
        payload:
          type: object
          properties:
            key:
              type: string
            max_width:
              type: integer
              description: Optional, can be used to decrease payload size
            max_height:
              type: integer
              description: Optional, can be used to decrease payload size
            application_id:
              type: string
        name: GetApplicationIconRequest
        examples:
        - payload:
            key: abc
            valid: true
            max_width: 100
            max_height: 100
            application_id: com.zorabots.application.one
  zbos/applications/icons/get/response/{key}:
    subscribe:
      summary: 'Response: Get application icon'
      description: ''
      tags:
      - name: Applications
        description: All applications related topics.
      message:
        payload:
          type: object
          properties:
            application_id:
              type: string
            icon:
              type: string
              description: Base 64 encoded PNG
        name: ApplicationIcon
        examples:
        - payload:
            icon: "{base64 encoded png}"
            application_id: com.zorabots.application.one
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/applications/actions/start:
    publish:
      summary: Start application action
      description: 'Start an application action.

        '
      tags:
      - name: Applications
        description: All applications related topics.
      message:
        payload:
          type: object
          properties:
            application_id:
              type: string
            name:
              type: string
              description: Use name for a static name, or name_key for a translatable
                name
            name_key:
              type: string
              description: Use name for a static name, or name_key for a translatable
                name
            type:
              type: object
              description: |-
                List of available actions:
                open: Opens an application handled by the RAILopen_control: Opens an application handled by the control
                settings: Opens the settings, handled by the control
                datasource: Edit the datasource, handled by the control
                other: Should be handled by the app itself
              properties:
                name:
                  type: string
                ordinal:
                  type: integer
              enum:
              - OPEN
              - OPEN_CONTROL
              - SETTINGS
              - DATASOURCES
              - OTHER
            data:
              type: object
              description: Optional data that an action might need.
        name: ApplicationAction
        examples:
        - payload:
            name: Open
            type: open
            data:
              key1: value1
            valid: true
            application_id: com.zorabots.application.one
        - payload:
            name: Settings
            type: settings
            valid: true
            application_id: com.zorabots.application.one
        - payload:
            name: Datasource
            type: datasources
            valid: true
            application_id: com.zorabots.application.one
        - payload:
            name: Some other action
            type: other
            data:
              key1: value1
            valid: true
            application_id: com.zorabots.application.one
  zbos/applications/actions/start/response/{key}:
    subscribe:
      summary: 'Response: Start application action'
      description: ''
      tags:
      - name: Applications
        description: All applications related topics.
      message:
        "$ref": "#/components/messages/successMessage"
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/applications/registration/request:
    publish:
      summary: Request application registrations
      description: 'Request all apps to register themselves using the topics below.

        '
      tags:
      - name: Applications
        description: All applications related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/applications/registration/add:
    publish:
      summary: Add application registration
      description: 'Registers an application to the applications list. Should be executed
        every time the application is started.

        '
      tags:
      - name: Applications
        description: All applications related topics.
      message:
        payload:
          type: object
          properties:
            key:
              type: string
            application:
              type: object
              properties:
                id:
                  type: string
                  description: This could be a package name, or some other defined
                    unique ID
                name:
                  type: string
                  description: Use name for a static name, or name_key for a translatable
                    name
                name_key:
                  type: string
                  description: Use name for a static name, or name_key for a translatable
                    name
                category_id:
                  type: string
                weight:
                  type: integer
                actions:
                  type: array
                  items:
                    type: object
                    properties:
                      application_id:
                        type: string
                      name:
                        type: string
                        description: Use name for a static name, or name_key for a
                          translatable name
                      name_key:
                        type: string
                        description: Use name for a static name, or name_key for a
                          translatable name
                      type:
                        type: object
                        description: |-
                          List of available actions:
                          open: Opens an application handled by the RAILopen_control: Opens an application handled by the control
                          settings: Opens the settings, handled by the control
                          datasource: Edit the datasource, handled by the control
                          other: Should be handled by the app itself
                        properties:
                          name:
                            type: string
                          ordinal:
                            type: integer
                        enum:
                        - OPEN
                        - OPEN_CONTROL
                        - SETTINGS
                        - DATASOURCES
                        - OTHER
                      data:
                        type: object
                        description: Optional data that an action might need.
        name: RegisterApplicationRequest
        examples:
        - payload:
            key: abc
            application:
              id: com.zorabots.application.one
              name: Application 1
              weight: 10
              actions:
              - name: Open
                type: open
                data:
                  key1: value1
                valid: true
                application_id: com.zorabots.application.one
              - name: Settings
                type: settings
                valid: true
                application_id: com.zorabots.application.one
              category_id: category_1
            valid: false
  zbos/applications/registration/add/response/{key}:
    publish:
      summary: 'Response: Add application registration'
      description: ''
      tags:
      - name: Applications
        description: All applications related topics.
      message:
        "$ref": "#/components/messages/successMessage"
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/applications/registration/remove:
    publish:
      summary: Remove application registration
      description: 'Unregister an application from the applications list.

        '
      tags:
      - name: Applications
        description: All applications related topics.
      message:
        payload:
          type: object
          properties:
            key:
              type: string
            id:
              type: string
        name: UnregisterApplicationRequest
        examples:
        - payload:
            key: abc
            id: com.zorabots.application.one
            valid: true
  zbos/applications/registration/remove/response/{key}:
    publish:
      summary: 'Response: Remove application registration'
      description: ''
      tags:
      - name: Applications
        description: All applications related topics.
      message:
        "$ref": "#/components/messages/successMessage"
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/applications/datasources/get:
    publish:
      summary: Get the content of a specific application datasource file
      description: |
        Publish on this topic to get the content of a datasource
        Payload is json with a key for the response topic {"key":aKey}
      tags:
      - name: Applications
        description: All applications related topics.
      message:
        payload:
          type: object
          properties:
            applicationName:
              type: string
            datasourceId:
              type: string
        name: DatasourceGetRequest
        examples:
        - payload:
            applicationName: string
            datasourceId: string
            valid: true
  zbos/applications/datasources/get/response/{key}:
    subscribe:
      summary: 'Response: Get datasource'
      description: 'Will return a JSON string with the content of the datasource data
        file

        '
      tags:
      - name: Applications
        description: All applications related topics.
      message:
        payload:
          type: string
        name: String
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/applications/datasources/set:
    publish:
      summary: Save the datasource
      description: |
        Publish on this topic to save the datasource data (changes)
        Payload is json with a key for the response topic {"key":aKey}
        The Payload is a JSON string of an object with following keys: application name, datasource id and datasource data
      tags:
      - name: Applications
        description: All applications related topics.
      message:
        payload:
          type: object
          properties:
            applicationName:
              type: string
            datasourceId:
              type: string
            datasourceData:
              type: string
        name: DatasourceSetRequest
        examples:
        - payload:
            applicationName: string
            datasourceId: string
            datasourceData: string
            valid: true
  zbos/applications/datasources/set/response/{key}:
    subscribe:
      summary: 'Response: Datasource saved'
      description: 'A message object (with key ''success'') is publish on this topic
        when the datasource has been saved

        '
      tags:
      - name: Applications
        description: All applications related topics.
      message:
        "$ref": "#/components/messages/successMessage"
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/audio/player/start:
    publish:
      summary: Play media
      description: 'Play specific media file from path

        '
      tags:
      - name: Audio
        description: All audio related topics.
      message:
        payload:
          type: string
        name: String
        examples:
        - payload:
            requestId: '1'
            url: Url
  zbos/audio/player/stop:
    publish:
      summary: Stop media
      description: ''
      tags:
      - name: Audio
        description: All audio related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/audio/player/ended:
    subscribe:
      summary: Media ended
      description: ''
      tags:
      - name: Audio
        description: All audio related topics.
      message:
        payload:
          type: string
        name: String
        examples:
        - payload:
            requestId: '1'
            url: Url
  zbos/audio/player/pause:
    publish:
      summary: Pause media
      description: ''
      tags:
      - name: Audio
        description: All audio related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/audio/player/resume:
    publish:
      summary: Resume media
      description: ''
      tags:
      - name: Audio
        description: All audio related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/audio/volume/set:
    publish:
      summary: Set volume
      description: ''
      tags:
      - name: Audio
        description: All audio related topics.
      message:
        payload:
          type: integer
          maximum: 100
          minimum: 0
        name: Int
  zbos/audio/volume/get:
    publish:
      summary: Get volume
      description: 'see <<zbos/audio/volume/response/{key}>> for response

        '
      tags:
      - name: Audio
        description: All audio related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/audio/volume/response/{key}:
    subscribe:
      summary: 'response: Get volume'
      description: ''
      tags:
      - name: Audio
        description: All audio related topics.
      message:
        payload:
          type: integer
          maximum: 100
          minimum: 0
        name: Int
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/audio/volume/event:
    subscribe:
      summary: 'event: Volume change'
      description: 'Notify subscribers of a volume change.

        '
      tags:
      - name: Audio
        description: All audio related topics.
      message:
        payload:
          type: integer
          maximum: 100
          minimum: 0
        name: Int
  zbos/audio/beep:
    publish:
      summary: Play beep
      description: 'Publish to play a beep sound. Used by the robot when the hot word
        is recognized.

        '
      tags:
      - name: Audio
        description: All audio related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/camera/picture/get:
    publish:
      summary: Get picture
      description: ''
      tags:
      - name: Camera
        description: All camera related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/camera/picture/event:
    publish:
      summary: 'event: Get picture'
      description: 'Picture in base64 formatsee zbos/facetracking/response for response

        '
      tags:
      - name: Face tracking
        description: All face tracking related topics.
      message:
        payload:
          type: string
        name: String
  zbos/camera/stream/start:
    publish:
      summary: Start the camera stream of the selected camera.
      description: ''
      tags:
      - name: Camera
        description: All camera related topics.
      message:
        payload:
          type: object
          properties:
            cameraId:
              type: string
              description: Camera id
            extras:
              type: object
        name: StreamStartRequest
        examples:
        - payload:
            cameraId: string
            extras: {}
  zbos/camera/stream/stop:
    publish:
      summary: Stop camera stream
      description: ''
      tags:
      - name: Camera
        description: All camera related topics.
      message:
        payload:
          type: object
          properties:
            requestId:
              type: string
            cameraId:
              type: string
              description: camera id
        name: VideoOptions
        examples:
        - payload:
            requestId: string
            cameraId: string
  zbos/camera/stream/stop/event:
    subscribe:
      summary: Camera stream has stopped
      description: ''
      tags:
      - name: Camera
        description: All camera related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/camera/stream/init:
    publish:
      summary: Initialize camera stream
      description: 'Send by the robot to start the webrtc handshake

        '
      tags:
      - name: Camera
        description: All camera related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/camera/stream/offer:
    description: WebRTC Session Description
    publish:
      summary: Handsake offer for camera stream
      description: ''
      tags:
      - name: Camera
        description: All camera related topics.
      message:
        payload:
          type: string
        name: String
  zbos/camera/stream/answer:
    description: WebRTC Session Description
    subscribe:
      summary: Handsake answer for camera stream
      description: ''
      tags:
      - name: Camera
        description: All camera related topics.
      message:
        payload:
          type: object
          properties:
            type:
              type: object
              properties:
                name:
                  type: string
                ordinal:
                  type: integer
              enum:
              - OFFER
              - PRANSWER
              - ANSWER
            sdp:
              type: string
        name: StreamAnswer
        examples:
        - payload:
            type: ANSWER
            sdp: string
  zbos/camera/stream/candidate/core:
    description: WebRTC Session Description
    subscribe:
      summary: RTC ICE Candidate Core
      description: ''
      tags:
      - name: Camera
        description: All camera related topics.
      message:
        payload:
          type: object
          properties:
            cameraId:
              type: string
              description: camera id
            type:
              type: string
              description: Always returns "candidate"
            label:
              type: integer
              description: sdpMLineIndex
            id:
              type: string
              description: sdpMid
            candidate:
              type: string
        name: Candidate
        examples:
        - payload:
            cameraId: string
            type: string
            label: 5
            id: string
            candidate: string
  zbos/camera/stream/candidate/control:
    subscribe:
      summary: RTC ICE Candidate Control
      description: ''
      tags:
      - name: Camera
        description: All camera related topics.
      message:
        payload:
          type: object
          properties:
            cameraId:
              type: string
              description: camera id
            type:
              type: string
              description: Always returns "candidate"
            label:
              type: integer
              description: sdpMLineIndex
            id:
              type: string
              description: sdpMid
            candidate:
              type: string
        name: Candidate
        examples:
        - payload:
            cameraId: string
            type: string
            label: 5
            id: string
            candidate: string
  zbos/camera/stream/twoway/request:
    publish:
      summary: Request two way camera stream
      description: ''
      tags:
      - name: Camera
        description: All camera related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/camera/preview/resume:
    publish:
      summary: Resume camera preview
      description: ''
      tags:
      - name: Camera
        description: All camera related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/camera/preview/pause:
    publish:
      summary: Pause camera preview
      description: ''
      tags:
      - name: Camera
        description: All camera related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/camera/error:
    publish:
      summary: Camera error
      description: ''
      tags:
      - name: Camera
        description: All camera related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/camera/qr/scan/start:
    publish:
      summary: Start QR Scanning
      description: 'Start a QR code scan using the camera.

        '
      tags:
      - name: Camera
        description: All camera related topics.
      message:
        payload:
          type: object
          properties:
            scan_id:
              type: string
              description: Unique ID that will be used in related topics.
            scan_timeout:
              type: integer
              description: |-
                Timeout in seconds after which the scan should automatically be stopped.
                Pass 0 to not have a timeout. 0 is also the default when no value was passed.
        name: QrScanStartRequest
        examples:
        - payload:
            scan_id: abc
            scan_timeout: 60
        - payload:
            scan_id: xyz
            scan_timeout: 0
  zbos/camera/qr/scan/stop:
    publish:
      summary: Stop QR Scanning
      description: 'Stop a QR code scan using the camera.

        '
      tags:
      - name: Camera
        description: All camera related topics.
      message:
        payload:
          type: object
          properties:
            scan_id:
              type: string
              description: Unique ID that should be the same as the one used in the
                start request.
        name: QrScanStopRequest
        examples:
        - payload:
            scan_id: abc
  zbos/camera/qr/scan/stopped/event:
    subscribe:
      summary: 'Event: Stopped QR scanning'
      description: 'This event is published when a QR scan has stopped, either manually
        or due to a timeout.

        '
      tags:
      - name: Camera
        description: All camera related topics.
      message:
        payload:
          type: object
          properties:
            scan_id:
              type: string
              description: Unique ID that will be the same as the one used in the
                start request.
        name: QrScanStoppedEvent
        examples:
        - payload:
            scan_id: abc
  zbos/camera/qr/result/event:
    subscribe:
      summary: QR Result Event
      description: 'This event is published every time a QR code is decoded while
        a scan is active.

        '
      tags:
      - name: Camera
        description: All camera related topics.
      message:
        payload:
          type: object
          properties:
            content:
              type: string
        name: QrResultEvent
        examples:
        - payload:
            content: QR Code Content
  zbos/cloud/login:
    publish:
      summary: Login to the cloud
      description: 'see <<zbos/cloud/login/response>> for response

        '
      tags:
      - name: Cloud
        description: All cloud related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/cloud/login/response:
    subscribe:
      summary: 'response: Login to the cloud'
      description: 'Response indicating if login to the cloud was successful or not

        '
      tags:
      - name: Cloud
        description: All cloud related topics.
      message:
        payload:
          type: object
          properties:
            token:
              type: string
              description: jwt auth token
            success:
              type: boolean
        name: LoginResponse
        examples:
        - payload:
            token: string
            success: true
  zbos/cloud/config/get:
    publish:
      summary: Get cloud config
      description: 'see <<zbos/cloud/config/response/{key}>> for response

        '
      tags:
      - name: Cloud
        description: All cloud related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/cloud/config/response/{key}:
    subscribe:
      summary: 'response: Get cloud config'
      description: ''
      tags:
      - name: Cloud
        description: All cloud related topics.
      message:
        payload:
          type: object
        name: Map
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/cloud/config/set:
    publish:
      summary: Set cloud config
      description: ''
      tags:
      - name: Cloud
        description: All cloud related topics.
      message:
        payload:
          type: object
        name: Map
  zbos/cloud/config/event:
    subscribe:
      summary: 'event: Config cloud'
      description: ''
      tags:
      - name: Cloud
        description: All cloud related topics.
      message:
        payload:
          type: object
        name: Map
  zbos/media/library/resync:
    publish:
      summary: Resync all media libraries
      description: 'see <<zbos/media/library/resync/response/{key}>> for response

        '
      tags:
      - name: Cloud
        description: All cloud related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/media/library/resync/response/{key}:
    subscribe:
      summary: 'response: Resync all media libraries'
      description: ''
      tags:
      - name: Cloud
        description: All cloud related topics.
      message:
        "$ref": "#/components/messages/successMessage"
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/media/library/file/upload:
    publish:
      summary: Upload file in media library
      description: 'see <<zbos/media/library/file/upload/response/{key}>> for response

        '
      tags:
      - name: Cloud
        description: All cloud related topics.
      message:
        payload:
          type: object
          properties:
            file:
              type: string
            storageAccount:
              type: string
            key:
              type: string
            metadata:
              type: object
        name: FileUploadRequest
        examples:
        - payload:
            file: string
            storageAccount: string
            key: string
            metadata: {}
  zbos/media/library/file/upload/response/{key}:
    subscribe:
      summary: 'response: Upload file in media library'
      description: ''
      tags:
      - name: Cloud
        description: All cloud related topics.
      message:
        payload:
          type: object
          properties:
            success:
              type: boolean
            cloudFileId:
              type: string
        name: CloudResult
        examples:
        - payload:
            success: false
            cloudFileId: string
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/composition/start:
    publish:
      summary: Start composition
      description: 'Payload is composition json

        '
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        payload:
          type: string
        name: String
  zbos/composition/start/id:
    publish:
      summary: Start composition by id
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
            name:
              type: string
            type:
              type: object
              properties:
                name:
                  type: string
                ordinal:
                  type: integer
              enum:
              - SIMPLE_COMPOSITION
              - ADVANCED_COMPOSITION
            settings:
              type: object
              properties:
                pinned:
                  type: boolean
                schedulerParallel:
                  type: boolean
        name: SimpleComposition
        examples:
        - payload:
            id: string
            name: string
            type: SIMPLE_COMPOSITION
            settings:
              pinned: false
              schedulerParallel: false
  zbos/{source}/start/event:
    subscribe:
      summary: 'event: Composition started'
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
    parameters:
      source:
        description: The source that this composition belongs to
        schema:
          type: string
          enum:
          - scheduler/timeline
          - composition
  zbos/{source}/stop:
    publish:
      summary: Stop composition
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
    parameters:
      source:
        description: The source that this composition belongs to
        schema:
          type: string
          enum:
          - scheduler/timeline
          - composition
  zbos/{source}/stop/event:
    subscribe:
      summary: 'event: Composition stopped'
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        payload:
          type: string
        name: String
    parameters:
      source:
        description: The source that this composition belongs to
        schema:
          type: string
          enum:
          - scheduler/timeline
          - composition
  zbos/composition/pause:
    publish:
      summary: Pause composition
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/composition/pause/event:
    subscribe:
      summary: 'event: Composition paused'
      description: 'Timeline ID

        '
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        payload:
          type: string
        name: String
  zbos/composition/resume:
    publish:
      summary: Resume composition
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/composition/resume/event:
    subscribe:
      summary: 'event: Composition Resumed'
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        payload:
          type: string
        name: String
  zbos/{source}/loop/event:
    subscribe:
      summary: 'event: Composition loop state'
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        payload:
          type: object
          properties:
            infinite:
              type: boolean
            repeatTimes:
              type: integer
              description: Total loop count
            currentRepeatTimes:
              type: integer
              description: current loop count
        name: LoopProperty
        examples:
        - payload:
            infinite: true
            currentRepeatTimes: 3
    parameters:
      source:
        description: The source that this composition belongs to
        schema:
          type: string
          enum:
          - scheduler/timeline
          - composition
  zbos/composition/settings:
    publish:
      summary: Settings for a given composition
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        payload:
          type: object
          properties:
            properties:
              type: object
              properties:
                loop:
                  type: object
                  properties:
                    infinite:
                      type: boolean
                    repeatTimes:
                      type: integer
                      description: Total loop count
                    currentRepeatTimes:
                      type: integer
                      description: current loop count
                general:
                  type: object
                  properties:
                    stoppable:
                      type: boolean
                    powerManagement:
                      type: object
                      properties:
                        name:
                          type: string
                        ordinal:
                          type: integer
                      enum:
                      - DEFAULT
                      - AWARE
                      - DISABLED
            timelineId:
              type: string
              description: Composition ID
            isScheduler:
              type: boolean
            isPinned:
              type: boolean
            type:
              type: object
              properties:
                name:
                  type: string
                ordinal:
                  type: integer
              enum:
              - SIMPLE_COMPOSITION
              - ADVANCED_COMPOSITION
        name: TimelinePropertiesWrapper
        examples:
        - payload: {}
  zbos/composition/save:
    publish:
      summary: Save composition
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/composition/save/multiple:
    publish:
      summary: Save multiple compositions
      description: 'see <<zbos/composition/save/multiple/response/{key}>> for response

        '
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        payload:
          type: object
          properties:
            key:
              type: string
              description: Required key
            compositions:
              type: array
              description: Array of compositions
              items:
                type: object
                properties:
                  id:
                    type: string
                  name:
                    type: string
                  type:
                    type: object
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - SIMPLE_COMPOSITION
                    - ADVANCED_COMPOSITION
                  settings:
                    type: object
                    properties:
                      pinned:
                        type: boolean
                      schedulerParallel:
                        type: boolean
        name: SaveMultipleCompositionRequest
        examples:
        - payload:
            compositions:
            - id: string
              name: string
              type: SIMPLE_COMPOSITION
              settings:
                pinned: false
                schedulerParallel: false
  zbos/composition/save/event:
    subscribe:
      summary: 'event: Composition Saved'
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
            name:
              type: string
            type:
              type: object
              properties:
                name:
                  type: string
                ordinal:
                  type: integer
              enum:
              - SIMPLE_COMPOSITION
              - ADVANCED_COMPOSITION
            settings:
              type: object
              properties:
                pinned:
                  type: boolean
                schedulerParallel:
                  type: boolean
        name: SimpleComposition
        examples:
        - payload:
            id: string
  zbos/composition/save/multiple/response/{key}:
    subscribe:
      summary: 'response: Save multiple compositions'
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        payload:
          type: object
        name: Map
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/composition/load:
    publish:
      summary: Load composition
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
            name:
              type: string
            type:
              type: object
              properties:
                name:
                  type: string
                ordinal:
                  type: integer
              enum:
              - SIMPLE_COMPOSITION
              - ADVANCED_COMPOSITION
            settings:
              type: object
              properties:
                pinned:
                  type: boolean
                schedulerParallel:
                  type: boolean
        name: SimpleComposition
        examples:
        - payload:
            id: string
  zbos/composition/load/event:
    subscribe:
      summary: 'event: Composition loaded'
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        payload:
          type: string
        name: String
  zbos/composition/list:
    publish:
      summary: Get list of compositions
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/composition/list/event:
    subscribe:
      summary: 'event: Get list of compositions'
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
              name:
                type: string
              type:
                type: object
                properties:
                  name:
                    type: string
                  ordinal:
                    type: integer
                enum:
                - SIMPLE_COMPOSITION
                - ADVANCED_COMPOSITION
              settings:
                type: object
                properties:
                  pinned:
                    type: boolean
                  schedulerParallel:
                    type: boolean
        name: Array<SimpleComposition>
        examples:
        - payload:
            id: string
            name: string
            type: SIMPLE_COMPOSITION
            settings:
              pinned: false
              schedulerParallel: false
  zbos/composition/delete:
    publish:
      summary: Delete composition by id
      description: 'see <<zbos/composition/delete/response>> for response

        '
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
            name:
              type: string
            type:
              type: object
              properties:
                name:
                  type: string
                ordinal:
                  type: integer
              enum:
              - SIMPLE_COMPOSITION
              - ADVANCED_COMPOSITION
            settings:
              type: object
              properties:
                pinned:
                  type: boolean
                schedulerParallel:
                  type: boolean
        name: SimpleComposition
        examples:
        - payload:
            id: string
  zbos/composition/delete/all:
    publish:
      summary: Deletes all compositions
      description: 'see <<zbos/composition/delete/response>> for response

        '
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/composition/delete/response:
    subscribe:
      summary: 'response: Delete composition'
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        "$ref": "#/components/messages/successMessage"
  zbos/composition/changed/event:
    subscribe:
      summary: 'event: Composition changed'
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/composition/audio/stop:
    publish:
      summary: Stop audio composition
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/composition/video/stop:
    publish:
      summary: Stop video composition
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/composition/image/stop:
    publish:
      summary: Stop image composition
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/composition/error:
    subscribe:
      summary: 'event: Composition encountered error'
      description: |
        List of possible error reasons:
        'INVALID_ID': The block id is malformed/broken.
        'INVALID_TYPE': The block type is malformed/broken.
        'INVALID_BLOCK': One of the properties aside from id and type is malformed/broken.
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        payload:
          type: object
          properties:
            type:
              type: string
              description: Block type that caused the error, 'UNKNOWN' if not known
            id:
              type: string
              description: Block ID that caused the error, 'UNKNOWN' if not known
            reasons:
              type: array
              items:
                type: string
        name: CompositionError
        examples:
        - payload:
            type: string
            id: string
  zbos/api/request:
    publish:
      summary: Get api
      description: 'see <<zbos/api/response/{key}>> for response

        '
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        payload:
          type: object
          properties:
            name:
              type: string
            endpoint:
              type: string
            body:
              type: string
            params:
              type: object
            headers:
              type: object
        name: ApiRequestBlock
        examples:
        - payload: {}
  zbos/api/response/{key}:
    subscribe:
      summary: 'response: Get api'
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        payload:
          type: string
        name: String
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/composition/default/variable/request:
    publish:
      summary: Get default composition variables
      description: 'Payload "key" is optionalsee <<zbos/composition/default/variable/response/{key}>>
        for response

        '
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/composition/default/variable/response/{key}:
    subscribe:
      summary: 'response: Get default composition variables'
      description: 'Payload is array of variable names

        '
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        payload:
          type: array
          items:
            type: string
        name: Array<String>
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/composition/status/get:
    publish:
      summary: Get composition statussee <<zbos/composition/status/response/{key}>>
        for response
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/composition/status/response/{key}:
    subscribe:
      summary: 'response: Composition status'
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
            state:
              type: object
              description: Default, playing or paused
              properties:
                name:
                  type: string
                ordinal:
                  type: integer
              enum:
              - DEFAULT
              - PLAYING
              - PAUSED
            activeBlocks:
              type: array
              items:
                type: string
            properties:
              type: object
              description: Composition properties
              properties:
                loop:
                  type: object
                  properties:
                    infinite:
                      type: boolean
                    repeatTimes:
                      type: integer
                      description: Total loop count
                    currentRepeatTimes:
                      type: integer
                      description: current loop count
                general:
                  type: object
                  properties:
                    stoppable:
                      type: boolean
                    powerManagement:
                      type: object
                      properties:
                        name:
                          type: string
                        ordinal:
                          type: integer
                      enum:
                      - DEFAULT
                      - AWARE
                      - DISABLED
            playCount:
              type: integer
              description: Current repeat iteration
        name: CompositionStatus
        examples:
        - payload:
            id: string
            state: DEFAULT
            activeBlocks:
            - string
            properties:
              loop:
                infinite: true
                currentRepeatTimes: 3
              general:
                powerManagement: DEFAULT
            playCount: 5
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/composition/block/start:
    publish:
      summary: Start composition block
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
              description: Block ID
            index:
              type: integer
            blocking:
              type: boolean
            input:
              type: object
              properties:
                connectors:
                  type: array
                  items:
                    type: object
                    properties:
                      id:
                        type: string
                      connection:
                        type: object
                        properties:
                          blockId:
                            type: string
                          connectorId:
                            type: string
            output:
              type: object
              properties:
                connectors:
                  type: array
                  items:
                    type: object
                    properties:
                      id:
                        type: string
                      connection:
                        type: object
                        properties:
                          blockId:
                            type: string
                          connectorId:
                            type: string
            nextBlockId:
              type: string
        name: Block
        examples:
        - payload:
            index: 5
            blocking: false
            nextBlockId: string
  zbos/{source}/block/start/event:
    subscribe:
      summary: 'event: Composition block started'
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        payload:
          type: string
        name: String
    parameters:
      source:
        description: The source that this composition belongs to
        schema:
          type: string
          enum:
          - scheduler/timeline
          - composition
  zbos/composition/block/stop:
    publish:
      summary: Stop composition block
      description: 'Block ID to stop, when key = "all", all active blocks will be
        stopped.

        '
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/{source}/block/end/event:
    subscribe:
      summary: 'event: Composition block ended'
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        payload:
          type: string
        name: String
    parameters:
      source:
        description: The source that this composition belongs to
        schema:
          type: string
          enum:
          - scheduler/timeline
          - composition
  zbos/{source}/block/pause/event:
    subscribe:
      summary: 'event: Composition block paused'
      description: ''
      tags:
      - name: Composer
        description: All composer related topics.
      message:
        payload:
          type: string
        name: String
    parameters:
      source:
        description: The source that this composition belongs to
        schema:
          type: string
          enum:
          - scheduler/timeline
          - composition
  zbos/connection/status/get:
    publish:
      summary: Get the connection status
      description: 'Requesting the connection information for the WiFi, access point
        and cablesee <<zbos/connection/status/response/{key}>> for response

        '
      tags:
      - name: Connection
        description: All connection related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/connection/status/response/{key}:
    subscribe:
      summary: 'response: Get the connection status'
      description: 'Response with the status information for the WiFi, access point
        and cable

        '
      tags:
      - name: Connection
        description: All connection related topics.
      message:
        payload:
          type: object
          properties:
            wifi:
              type: array
              items:
                type: object
                properties:
                  ssid:
                    type: string
                  encryption:
                    type: object
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - UNSECURE
                    - SHARE
                    - WEP
                    - WPA
                    - WPA_PSK
                    - WPA_OR_WPA2
                    - WPA_OR_WPA2_PSK
                    - WPA2
                    - WPA2_PSK
                    - WPA2_EAP
                    - WAI_CERT
                    - WAI_PSK
                  ip4:
                    type: string
                  ip6:
                    type: string
                  dhcp:
                    type: boolean
                  subnetmask:
                    type: string
                  gateway:
                    type: string
                  dns:
                    type: object
                    properties:
                      dns1:
                        type: string
                      dns2:
                        type: string
                      adapterName:
                        type: string
                  serviceId:
                    type: string
                  connectionStatus:
                    type: object
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - CONNECTING
                    - CONNECTED
                    - DISCONNECTED
                  hasInternet:
                    type: boolean
                  adapterName:
                    type: string
            cable:
              type: array
              items:
                type: object
                properties:
                  ip4:
                    type: string
                  ip6:
                    type: string
                  dhcp:
                    type: boolean
                  subnetmask:
                    type: string
                  gateway:
                    type: string
                  dns:
                    type: object
                    properties:
                      dns1:
                        type: string
                      dns2:
                        type: string
                      adapterName:
                        type: string
                  hasConnection:
                    type: boolean
                  hasInternet:
                    type: boolean
                  serviceId:
                    type: string
                  adapterName:
                    type: string
            ap:
              type: array
              items:
                type: object
                properties:
                  ssid:
                    type: string
                  ip:
                    type: string
                  encryption:
                    type: object
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - UNSECURE
                    - SHARE
                    - WEP
                    - WPA
                    - WPA_PSK
                    - WPA_OR_WPA2
                    - WPA_OR_WPA2_PSK
                    - WPA2
                    - WPA2_PSK
                    - WPA2_EAP
                    - WAI_CERT
                    - WAI_PSK
                  hasConnection:
                    type: boolean
                  hasInternet:
                    type: boolean
                  adapterName:
                    type: string
        name: ConnectionStatus
        examples:
        - payload:
            wifi:
            - ssid: ZoraBotsNetwork
              encryption: WPA2_PSK
              ip4: 192.168.0.5
              ip6: 2a02:1811:b282:ae00:5850:a744:3c37:711b
              dhcp: true
              subnetmask: 255.255.254.0
              gateway: 192.168.0.1
              dns:
                dns1: 8.8.8.8
                dns2: 8.8.4.4
                valid: true
              serviceId: wifi_kdsjfqsdf5185
              connectionStatus: CONNECTED
              hasInternet: true
              adapterName: wlan0
            cable:
            - ip4: 192.168.0.4
              ip6: 2a02:1811:b282:ae00:5850:a744:3c37:711a
              dhcp: true
              subnetmask: 255.255.254.0
              gateway: 192.168.0.1
              dns:
                dns1: 8.8.8.8
                dns2: 8.8.4.4
                valid: true
              hasConnection: true
              hasInternet: true
              adapterName: eth0
            ap:
            - ssid: ZoraBotsHotspot
              ip: 192.168.60.1
              encryption: WPA2_PSK
              hasConnection: true
              hasInternet: true
              adapterName: teth0
        - payload:
            cable:
            - ip4: 192.168.0.4
              ip6: 2a02:1811:b282:ae00:5850:a744:3c37:711a
              dhcp: true
              subnetmask: 255.255.254.0
              gateway: 192.168.0.1
              dns:
                dns1: 8.8.8.8
                dns2: 8.8.4.4
                valid: true
              hasConnection: true
              hasInternet: true
              adapterName: eth0
        - payload:
            wifi:
            - ssid: ZoraBotsNetwork
              encryption: WPA2_PSK
              ip4: 192.168.0.5
              ip6: 2a02:1811:b282:ae00:5850:a744:3c37:711b
              dhcp: true
              subnetmask: 255.255.254.0
              gateway: 192.168.0.1
              dns:
                dns1: 8.8.8.8
                dns2: 8.8.4.4
                valid: true
              serviceId: wifi_kdsjfqsdf5185
              connectionStatus: CONNECTED
              hasInternet: true
              adapterName: wlan0
        - payload:
            ap:
            - ssid: ZoraBotsHotspot
              ip: 192.168.60.1
              encryption: WPA2_PSK
              hasConnection: true
              hasInternet: true
              adapterName: teth0
            - ssid: ZoraBotsHotspot5GHz
              ip: 192.168.60.1
              encryption: WPA2_PSK
              hasConnection: true
              hasInternet: true
              adapterName: teth1
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/connection/status/event:
    subscribe:
      summary: 'event: Connection status'
      description: 'Periodic status information for the WiFi, access point and cable

        '
      tags:
      - name: Connection
        description: All connection related topics.
      message:
        payload:
          type: object
          properties:
            wifi:
              type: array
              items:
                type: object
                properties:
                  ssid:
                    type: string
                  encryption:
                    type: object
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - UNSECURE
                    - SHARE
                    - WEP
                    - WPA
                    - WPA_PSK
                    - WPA_OR_WPA2
                    - WPA_OR_WPA2_PSK
                    - WPA2
                    - WPA2_PSK
                    - WPA2_EAP
                    - WAI_CERT
                    - WAI_PSK
                  ip4:
                    type: string
                  ip6:
                    type: string
                  dhcp:
                    type: boolean
                  subnetmask:
                    type: string
                  gateway:
                    type: string
                  dns:
                    type: object
                    properties:
                      dns1:
                        type: string
                      dns2:
                        type: string
                      adapterName:
                        type: string
                  serviceId:
                    type: string
                  connectionStatus:
                    type: object
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - CONNECTING
                    - CONNECTED
                    - DISCONNECTED
                  hasInternet:
                    type: boolean
                  adapterName:
                    type: string
            cable:
              type: array
              items:
                type: object
                properties:
                  ip4:
                    type: string
                  ip6:
                    type: string
                  dhcp:
                    type: boolean
                  subnetmask:
                    type: string
                  gateway:
                    type: string
                  dns:
                    type: object
                    properties:
                      dns1:
                        type: string
                      dns2:
                        type: string
                      adapterName:
                        type: string
                  hasConnection:
                    type: boolean
                  hasInternet:
                    type: boolean
                  serviceId:
                    type: string
                  adapterName:
                    type: string
            ap:
              type: array
              items:
                type: object
                properties:
                  ssid:
                    type: string
                  ip:
                    type: string
                  encryption:
                    type: object
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - UNSECURE
                    - SHARE
                    - WEP
                    - WPA
                    - WPA_PSK
                    - WPA_OR_WPA2
                    - WPA_OR_WPA2_PSK
                    - WPA2
                    - WPA2_PSK
                    - WPA2_EAP
                    - WAI_CERT
                    - WAI_PSK
                  hasConnection:
                    type: boolean
                  hasInternet:
                    type: boolean
                  adapterName:
                    type: string
        name: ConnectionStatus
        examples:
        - payload:
            wifi:
            - ssid: ZoraBotsNetwork
              encryption: WPA2_PSK
              ip4: 192.168.0.5
              ip6: 2a02:1811:b282:ae00:5850:a744:3c37:711b
              dhcp: true
              subnetmask: 255.255.254.0
              gateway: 192.168.0.1
              dns:
                dns1: 8.8.8.8
                dns2: 8.8.4.4
                valid: true
              serviceId: wifi_kdsjfqsdf5185
              connectionStatus: CONNECTED
              hasInternet: true
              adapterName: wlan0
            cable:
            - ip4: 192.168.0.4
              ip6: 2a02:1811:b282:ae00:5850:a744:3c37:711a
              dhcp: true
              subnetmask: 255.255.254.0
              gateway: 192.168.0.1
              dns:
                dns1: 8.8.8.8
                dns2: 8.8.4.4
                valid: true
              hasConnection: true
              hasInternet: true
              adapterName: eth0
            ap:
            - ssid: ZoraBotsHotspot
              ip: 192.168.60.1
              encryption: WPA2_PSK
              hasConnection: true
              hasInternet: true
              adapterName: teth0
        - payload:
            cable:
            - ip4: 192.168.0.4
              ip6: 2a02:1811:b282:ae00:5850:a744:3c37:711a
              dhcp: true
              subnetmask: 255.255.254.0
              gateway: 192.168.0.1
              dns:
                dns1: 8.8.8.8
                dns2: 8.8.4.4
                valid: true
              hasConnection: true
              hasInternet: true
              adapterName: eth0
        - payload:
            wifi:
            - ssid: ZoraBotsNetwork
              encryption: WPA2_PSK
              ip4: 192.168.0.5
              ip6: 2a02:1811:b282:ae00:5850:a744:3c37:711b
              dhcp: true
              subnetmask: 255.255.254.0
              gateway: 192.168.0.1
              dns:
                dns1: 8.8.8.8
                dns2: 8.8.4.4
                valid: true
              serviceId: wifi_kdsjfqsdf5185
              connectionStatus: CONNECTED
              hasInternet: true
              adapterName: wlan0
        - payload:
            ap:
            - ssid: ZoraBotsHotspot
              ip: 192.168.60.1
              encryption: WPA2_PSK
              hasConnection: true
              hasInternet: true
              adapterName: teth0
            - ssid: ZoraBotsHotspot5GHz
              ip: 192.168.60.1
              encryption: WPA2_PSK
              hasConnection: true
              hasInternet: true
              adapterName: teth1
  zbos/connection/wifi/scan:
    publish:
      summary: Scan for WiFi networks
      description: 'Start scanning for WiFi networks

        '
      tags:
      - name: Connection
        description: All connection related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/connection/wifi/scan/event:
    subscribe:
      summary: 'response: Scan for WiFi networks'
      description: 'A list of all the scanned WiFi networks the robot can connect
        to

        '
      tags:
      - name: Connection
        description: All connection related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              ssid:
                type: string
              encryption:
                type: object
                properties:
                  name:
                    type: string
                  ordinal:
                    type: integer
                enum:
                - UNSECURE
                - SHARE
                - WEP
                - WPA
                - WPA_PSK
                - WPA_OR_WPA2
                - WPA_OR_WPA2_PSK
                - WPA2
                - WPA2_PSK
                - WPA2_EAP
                - WAI_CERT
                - WAI_PSK
              signal:
                type: number
              isSaved:
                type: boolean
              serviceId:
                type: string
              channel:
                type: number
        name: Array<ScannedNetwork>
        examples:
        - payload:
            ssid: ZoraBotsNetwork
            encryption: WPA2_PSK
            signal: -60
            serviceId: wifi_ksdjfsf4894
            saved: false
        - payload:
            ssid: ZoraBotsNetworkEnterprise
            encryption: WPA2_EAP
            signal: -55
            serviceId: wifi_wxvze5651
            saved: false
        - payload:
            ssid: ZoraBotsNetworkOpen
            encryption: UNSECURE
            signal: -50
            serviceId: wifi_wxvsezt8137
            saved: false
        - payload:
            ssid: ZoraBotsNetworkWEP
            encryption: WEP
            signal: -70
            serviceId: wifi_mqlkspfaf2168751
            saved: false
  zbos/connection/wifi/connect:
    publish:
      summary: Connect to a network
      description: 'Connect to a specific WiFi network

        '
      tags:
      - name: Connection
        description: All connection related topics.
      message:
        payload:
          type: object
          properties:
            ssid:
              type: string
            encryption:
              type: object
              properties:
                name:
                  type: string
                ordinal:
                  type: integer
              enum:
              - UNSECURE
              - SHARE
              - WEP
              - WPA
              - WPA_PSK
              - WPA_OR_WPA2
              - WPA_OR_WPA2_PSK
              - WPA2
              - WPA2_PSK
              - WPA2_EAP
              - WAI_CERT
              - WAI_PSK
            password:
              type: string
            username:
              type: string
            serviceId:
              type: string
            isSaved:
              type: boolean
            hidden:
              type: boolean
            channel:
              type: number
            adapterName:
              type: string
        name: ConnectToNetwork
        examples:
        - payload:
            ssid: ZoraNetwork1
            encryption: WPA2_PSK
            password: Nice_try123
            serviceId: wifi_ksdjfsf4894
            hidden: false
            adapterName: wlan0
            valid: true
            saved: false
            enterpriseNetwork: false
  zbos/connection/wifi/connect/event:
    subscribe:
      summary: 'event: Connect to a network'
      description: 'A (json) message is published when the connection request was
        successful or not

        '
      tags:
      - name: Connection
        description: All connection related topics.
      message:
        payload:
          type: object
          properties:
            success:
              type: boolean
            message:
              type: string
        name: ConnectionResponse
        examples:
        - payload:
            success: true
            message: ZoraBotsNetwork
        - payload:
            success: true
            message: ''
        - payload:
            success: false
            message: INVALID_CREDENTIALS
  zbos/connection/wifi/forget:
    publish:
      summary: Forget a network
      description: 'Forget a network. If the robot is connected to the given network,
        it will disconnect

        '
      tags:
      - name: Connection
        description: All connection related topics.
      message:
        payload:
          type: object
          properties:
            ssid:
              type: string
            serviceId:
              type: string
            adapterName:
              type: string
        name: ForgetNetwork
        examples:
        - payload:
            ssid: ZoraBotsNetworkEnterprise
            serviceId: wifi_wxvze5651
            adapterName: wlan0
            valid: true
  zbos/connection/wifi/forget/event:
    subscribe:
      summary: 'event: Forget a network'
      description: 'A (json) message is published when the forget request was successful
        or not

        '
      tags:
      - name: Connection
        description: All connection related topics.
      message:
        payload:
          type: object
          properties:
            success:
              type: boolean
            message:
              type: string
        name: ConnectionResponse
        examples:
        - payload:
            success: true
            message: ZoraBotsNetwork
        - payload:
            success: true
            message: ''
        - payload:
            success: false
            message: INVALID_CREDENTIALS
  zbos/connection/wifi/list/saved/get:
    publish:
      summary: Get the saved networks
      description: 'Get an overview of all the networks that are saved on the robotsee
        <<zbos/connection/wifi/list/saved/response/{key}>> for response

        '
      tags:
      - name: Connection
        description: All connection related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/connection/wifi/list/saved/response/{key}:
    subscribe:
      summary: 'response: Get the saved networks'
      description: 'A list of all the saved networks that are stored on the robot

        '
      tags:
      - name: Connection
        description: All connection related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              ssid:
                type: string
              encryption:
                type: object
                properties:
                  name:
                    type: string
                  ordinal:
                    type: integer
                enum:
                - UNSECURE
                - SHARE
                - WEP
                - WPA
                - WPA_PSK
                - WPA_OR_WPA2
                - WPA_OR_WPA2_PSK
                - WPA2
                - WPA2_PSK
                - WPA2_EAP
                - WAI_CERT
                - WAI_PSK
              password:
                type: string
              username:
                type: string
              hidden:
                type: boolean
              networkConfig:
                type: object
                properties:
                  dhcp:
                    type: boolean
                  fixedIp4:
                    type: string
                  fixedIp6:
                    type: string
                  subnetmask:
                    type: string
                  gateway:
                    type: string
                  adapterName:
                    type: string
              dns:
                type: object
                properties:
                  dns1:
                    type: string
                  dns2:
                    type: string
                  adapterName:
                    type: string
        name: Array<SavedNetwork>
        examples:
        - payload:
            ssid: ZoraBotsNetwork
            encryption: WPA2_PSK
            password: Nice_try123
            hidden: false
            networkConfig:
              dhcp: false
              fixedIp4: 192.168.5.2
              subnetmask: 255.255.255.0
              gateway: 192.168.5.1
              valid: true
            dns:
              dns1: 8.8.8.8
              dns2: 8.8.4.4
              valid: true
        - payload:
            ssid: ZoraBotsNetworkEnterprise
            encryption: WPA2_EAP
            password: Nice_try123
            username: let_me_see
            hidden: false
        - payload:
            ssid: ZoraBotsNetworkOpen
            encryption: UNSECURE
            hidden: false
        - payload:
            ssid: ZoraBotsNetworkHidden
            encryption: WEP
            password: Nice_try123
            hidden: true
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/connection/wifi/network/configure/set:
    publish:
      summary: Set network configuration
      description: 'Set specific WiFi network configuration (DHCP, IPv4, IPv6, subnetmask,
        default gateway).see <<zbos/connection/wifi/network/configure/response/{key}>>
        for response

        '
      tags:
      - name: Connection
        description: All connection related topics.
      message:
        payload:
          type: object
          properties:
            dhcp:
              type: boolean
            fixedIp4:
              type: string
            fixedIp6:
              type: string
            subnetmask:
              type: string
            gateway:
              type: string
            adapterName:
              type: string
        name: NetworkConfig
        examples:
        - payload:
            dhcp: false
            fixedIp4: 192.168.0.101
            subnetmask: 255.255.254.0
            gateway: 192.168.0.2
            adapterName: wlan0
            valid: true
        - payload:
            dhcp: false
            fixedIp4: 192.168.0.101
            fixedIp6: 2a02:1811:b282:ae00:5850:a744:3c37:711b
            subnetmask: 255.255.254.0
            gateway: 192.168.0.2
            adapterName: wlan1
            valid: true
        - payload:
            dhcp: true
            valid: true
  zbos/connection/wifi/network/configure/response/{key}:
    subscribe:
      summary: 'response: Set network configuration'
      description: 'A (json) message is published when saving the configuration was
        successful or not

        '
      tags:
      - name: Connection
        description: All connection related topics.
      message:
        payload:
          type: object
          properties:
            success:
              type: boolean
            message:
              type: string
        name: ConnectionResponse
        examples:
        - payload:
            success: true
            message: ZoraBotsNetwork
        - payload:
            success: true
            message: ''
        - payload:
            success: false
            message: INVALID_CREDENTIALS
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/connection/wifi/dns/get:
    publish:
      summary: Get DNS configuration
      description: 'Get the DNS configuration of the network the robot is connected
        tosee <<zbos/connection/wifi/dns/get/response/{key}>> for response

        '
      tags:
      - name: Connection
        description: All connection related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/connection/wifi/dns/get/response/{key}:
    subscribe:
      summary: 'response: Get DNS configuration'
      description: 'Response with the DNS configuration of the connected network

        '
      tags:
      - name: Connection
        description: All connection related topics.
      message:
        payload:
          type: object
          properties:
            dns1:
              type: string
            dns2:
              type: string
            adapterName:
              type: string
        name: DNSConfig
        examples:
        - payload:
            dns1: 8.8.8.8
            dns2: 8.8.4.4
            adapterName: wlan0
            valid: true
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/connection/wifi/dns/set:
    publish:
      summary: Set DNS configuration
      description: 'Set the DNS configuration of the network the robot is connected
        to.see <<zbos/connection/wifi/dns/set/response/{key}>> for response

        '
      tags:
      - name: Connection
        description: All connection related topics.
      message:
        payload:
          type: object
          properties:
            dns1:
              type: string
            dns2:
              type: string
            adapterName:
              type: string
        name: DNSConfig
        examples:
        - payload:
            dns1: 1.1.1.1
            dns2: 1.0.0.1
            adapterName: wlan0
            valid: true
  zbos/connection/wifi/dns/set/response/{key}:
    subscribe:
      summary: 'response: Set DNS configuration'
      description: 'A (json) message is published when saving the DNS configuration
        was successful or not

        '
      tags:
      - name: Connection
        description: All connection related topics.
      message:
        payload:
          type: object
          properties:
            success:
              type: boolean
            message:
              type: string
        name: ConnectionResponse
        examples:
        - payload:
            success: true
            message: ZoraBotsNetwork
        - payload:
            success: true
            message: ''
        - payload:
            success: false
            message: INVALID_CREDENTIALS
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/connection/ap/config/get:
    publish:
      summary: Get access point configuration
      description: 'Get the access point configuration of the network that the robot
        is broadcastingsee <<zbos/connection/ap/config/get/response/{key}>> for response

        '
      tags:
      - name: Connection
        description: All connection related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/connection/ap/config/get/response/{key}:
    subscribe:
      summary: 'response: Get access point configuration'
      description: 'Response about the access point that the robot is broadcasting

        '
      tags:
      - name: Connection
        description: All connection related topics.
      message:
        payload:
          type: object
          properties:
            enabled:
              type: boolean
            ssid:
              type: string
            password:
              type: string
            adapterName:
              type: string
        name: APConfig
        examples:
        - payload:
            enabled: true
            ssid: ZoraBotsHotspot
            password: hotspot_123
        - payload:
            enabled: false
            ssid: ZoraBotsHotspot
            password: hotspot_123
            adapterName: teth1
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/connection/ap/config/set:
    publish:
      summary: Set access point configuration
      description: 'Set the access point configuration of the network that the robot
        is broadcasting.see <<zbos/connection/ap/config/set/response/{key}>> for response

        '
      tags:
      - name: Connection
        description: All connection related topics.
      message:
        payload:
          type: object
          properties:
            enabled:
              type: boolean
            ssid:
              type: string
            password:
              type: string
            adapterName:
              type: string
        name: APConfig
        examples:
        - payload:
            enabled: true
            ssid: ZoraBotsHotspot
            password: hotspot_123
        - payload:
            enabled: false
            ssid: ZoraBotsHotspot
            password: hotspot_123
            adapterName: teth1
  zbos/connection/ap/config/set/response/{key}:
    subscribe:
      summary: 'response: Set access point configuration'
      description: 'A (json) message is published when saving the access point configuration
        was successful or not

        '
      tags:
      - name: Connection
        description: All connection related topics.
      message:
        payload:
          type: object
          properties:
            success:
              type: boolean
            message:
              type: string
        name: ConnectionResponse
        examples:
        - payload:
            success: true
            message: ZoraBotsNetwork
        - payload:
            success: true
            message: ''
        - payload:
            success: false
            message: INVALID_CREDENTIALS
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/connection/ap/enable/event:
    subscribe:
      summary: 'event: Access point enabled'
      description: 'Triggered when the access point/hotspot is turned on

        '
      tags:
      - name: Connection
        description: All connection related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/connection/ap/disable/event:
    subscribe:
      summary: 'event: Access point disabled'
      description: 'Triggered when the access point/hotspot is turned off

        '
      tags:
      - name: Connection
        description: All connection related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/connection/usb/config/start:
    publish:
      summary: Start connecting to a wifi config
      description: 'Look for a wifi config on the robot and attempt to connect to
        it

        '
      tags:
      - name: Connection
        description: All connection related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/diagnostics/chassis/get:
    publish:
      summary: Get diagnostics for chassis
      description: 'see <<zbos/diagnostics/chassis/response/{key}>> for response

        '
      tags:
      - name: Diagnostics
        description: All diagnostics related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/diagnostics/chassis/event:
    subscribe:
      summary: 'event: Chassis state changed'
      description: 'An event will be published when there is a problem detected with
        a motor or motor controller.

        '
      tags:
      - name: Diagnostics
        description: All diagnostics related topics.
      message:
        payload:
          type: object
          properties:
            partId:
              type: string
              description: Name of the part
            partType:
              type: object
              description: Type of the part
              properties:
                name:
                  type: string
                ordinal:
                  type: integer
              enum:
              - MOTOR
              - MOTOR_CONTROLLER
              - SERVO
              - SERVO_CONTROLLER
              - CPU
              - MEMORY
              - LIDAR
              - POWER_BOARD
              - BATTERY
            info:
              type: object
              properties:
                translationKey:
                  type: string
                  description: status code
                message:
                  type: string
                  description: status message
            temperature:
              type: string
              description: optional, depending on robot
        name: DiagnosticState
        examples:
        - payload: {}
  zbos/diagnostics/chassis/response/{key}:
    subscribe:
      summary: 'response: Diagnostics chassis'
      description: ''
      tags:
      - name: Diagnostics
        description: All diagnostics related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              partId:
                type: string
                description: Name of the part
              partType:
                type: object
                description: Type of the part
                properties:
                  name:
                    type: string
                  ordinal:
                    type: integer
                enum:
                - MOTOR
                - MOTOR_CONTROLLER
                - SERVO
                - SERVO_CONTROLLER
                - CPU
                - MEMORY
                - LIDAR
                - POWER_BOARD
                - BATTERY
              info:
                type: object
                properties:
                  translationKey:
                    type: string
                    description: status code
                  message:
                    type: string
                    description: status message
              temperature:
                type: string
                description: optional, depending on robot
        name: Array<DiagnosticState>
        examples:
        - payload: {}
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/diagnostics/servos/get:
    publish:
      summary: Get diagnostics for servos
      description: 'see <<zbos/diagnostics/servos/response/{key}>> for response

        '
      tags:
      - name: Diagnostics
        description: All diagnostics related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/diagnostics/servos/event:
    subscribe:
      summary: 'event: Servo state changed'
      description: 'An event will be published when there is a problem detected with
        a servo.

        '
      tags:
      - name: Diagnostics
        description: All diagnostics related topics.
      message:
        payload:
          type: object
          properties:
            partId:
              type: string
              description: Name of the part
            partType:
              type: object
              description: Type of the part
              properties:
                name:
                  type: string
                ordinal:
                  type: integer
              enum:
              - MOTOR
              - MOTOR_CONTROLLER
              - SERVO
              - SERVO_CONTROLLER
              - CPU
              - MEMORY
              - LIDAR
              - POWER_BOARD
              - BATTERY
            info:
              type: object
              properties:
                translationKey:
                  type: string
                  description: status code
                message:
                  type: string
                  description: status message
            temperature:
              type: string
              description: optional, depending on robot
        name: DiagnosticState
        examples:
        - payload: {}
  zbos/diagnostics/servos/response/{key}:
    subscribe:
      summary: 'response: Diagnostics servos'
      description: ''
      tags:
      - name: Diagnostics
        description: All diagnostics related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              partId:
                type: string
                description: Name of the part
              partType:
                type: object
                description: Type of the part
                properties:
                  name:
                    type: string
                  ordinal:
                    type: integer
                enum:
                - MOTOR
                - MOTOR_CONTROLLER
                - SERVO
                - SERVO_CONTROLLER
                - CPU
                - MEMORY
                - LIDAR
                - POWER_BOARD
                - BATTERY
              info:
                type: object
                properties:
                  translationKey:
                    type: string
                    description: status code
                  message:
                    type: string
                    description: status message
              temperature:
                type: string
                description: optional, depending on robot
        name: Array<DiagnosticState>
        examples:
        - payload: {}
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/domotica/get/settings:
    publish:
      summary: Get settings
      description: 'see <<zbos/domotica/get/settings/response/{key}>> for response

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/domotica/get/settings/response/{key}:
    subscribe:
      summary: 'response: Get settings'
      description: ''
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            ADD:
              type: string
            ADD_RESPONSE:
              type: string
            CHANGED_EVENT:
              type: string
            GET:
              type: string
            GET_RESPONSE:
              type: string
            REQUEST:
              type: string
            RESET:
              type: string
            RESET_RESPONSE:
              type: string
            UPDATE:
              type: string
            UPDATE_RESPONSE:
              type: string
        name: Settings
        examples:
        - payload:
            brand: creadomotics
            login: admin
            password: admin
            ip: 192.168.0.123
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/domotica/set/setting:
    publish:
      summary: Set settings
      description: 'Sets login, password and ip of a domotics center. Automatically
        replaces settings from the same brand. Settings are saved to the sd card.
        If no file exists, it is automatically created.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            ADD:
              type: string
            ADD_RESPONSE:
              type: string
            CHANGED_EVENT:
              type: string
            GET:
              type: string
            GET_RESPONSE:
              type: string
            REQUEST:
              type: string
            RESET:
              type: string
            RESET_RESPONSE:
              type: string
            UPDATE:
              type: string
            UPDATE_RESPONSE:
              type: string
        name: Settings
        examples:
        - payload:
            brand: creadomotics
            login: admin
            password: admin
            ip: 192.168.0.123
  zbos/domotica/delete/settings/all:
    publish:
      summary: Delete all settings
      description: 'Deletes all the plugin settings/configs from the device.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/domotica/get/status:
    publish:
      summary: Get status
      description: 'see <<zbos/domotica/get/status/response/{key}>> for response

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/domotica/get/status/response/{key}:
    subscribe:
      summary: 'response: Get status'
      description: ''
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              brand:
                type: string
              state:
                type: object
                description: 'Can be: INITIALIZING, CONNECTING, CONNECTION_FAILED,
                  CONNECTION_SUCCEEDED'
                properties:
                  name:
                    type: string
                  ordinal:
                    type: integer
                enum:
                - INITIALIZING
                - CONNECTING
                - CONNECTION_FAILED
                - CONNECTION_SUCCEEDED
                - NOT_CONFIGURED
        name: Array<PluginState>
        examples:
        - payload:
            brand: creadomotics
            state: CONNECTION_FAILED
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/domotica/get/devices:
    publish:
      summary: Get devices
      description: 'see <<zbos/domotica/get/devices/response/{key}>> for response

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/domotica/get/devices/response/{key}:
    subscribe:
      summary: 'response: Get devices'
      description: ''
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
              room:
                type: string
              tags:
                type: array
                items:
                  type: string
              type:
                type: string
              brand:
                type: string
        name: Array<DomoticaDevice>
        examples:
        - payload:
            id: string
            room: kitchen
            tags:
            - string
            - bar
            - kitchen
            type: dimmer
            brand: creadomotics
            validDevice: true
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/domotica/add/device:
    publish:
      summary: Add device
      description: 'Automatically removes device from same brand with same id. devices
        are saved to the sd card. If no file exists, it is automatically created.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
            room:
              type: string
            tags:
              type: array
              items:
                type: string
            type:
              type: string
            brand:
              type: string
        name: DomoticaDevice
        examples:
        - payload:
            id: string
            room: kitchen
            tags:
            - string
            - bar
            - kitchen
            type: dimmer
            brand: creadomotics
            validDevice: true
  zbos/domotica/delete/device:
    publish:
      summary: Delete device
      description: ''
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
            room:
              type: string
            tags:
              type: array
              items:
                type: string
            type:
              type: string
            brand:
              type: string
        name: DomoticaDevice
        examples:
        - payload:
            id: string
            validDevice: false
  zbos/domotica/delete/devices/all:
    publish:
      summary: Delete all devices
      description: 'Deletes all locally configured devices.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/domotica/get/rooms:
    publish:
      summary: Get rooms
      description: 'see <<zbos/domotica/get/rooms/response/{key}>> for response

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/domotica/get/rooms/response/{key}:
    subscribe:
      summary: 'response: Get rooms'
      description: ''
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            key:
              type: string
            devices:
              type: array
              items:
                type: object
                properties:
                  id:
                    type: string
                  room:
                    type: string
                  tags:
                    type: array
                    items:
                      type: string
                  type:
                    type: string
                  brand:
                    type: string
        name: Room
        examples:
        - payload: {}
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/domotica/set/notifications:
    publish:
      summary: Enable notifications on device state changes
      description: 'To get notifications for all device types, pass "all" as a device
        type.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/domotica/event:
    subscribe:
      summary: 'event: Domotica state changes'
      description: ''
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            room:
              type: string
            tags:
              type: array
              items:
                type: string
            state:
              type: object
              properties:
                value:
                  type: object
                  properties: {}
                optionalValue:
                  type: object
                  properties: {}
                unit:
                  type: string
            type:
              type: string
            id:
              type: string
        name: DeviceState
        examples:
        - payload:
            room: kitchen
            tags:
            - bar
            - kitchen
            state:
              value: 'ON'
            type: motion
            id: string
  zbos/domotica/device/event:
    subscribe:
      summary: 'event: Domotica device'
      description: 'Domotica device state changes trigger this event. Has no payload,
        state is in the topic itself.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/domotica/plugin/event:
    subscribe:
      summary: 'event: Domotica plugin'
      description: 'Plugin state changes (such as connectivity changes) trigger this
        event.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            brand:
              type: string
            state:
              type: object
              description: 'Can be: INITIALIZING, CONNECTING, CONNECTION_FAILED, CONNECTION_SUCCEEDED'
              properties:
                name:
                  type: string
                ordinal:
                  type: integer
              enum:
              - INITIALIZING
              - CONNECTING
              - CONNECTION_FAILED
              - CONNECTION_SUCCEEDED
              - NOT_CONFIGURED
        name: PluginState
        examples:
        - payload:
            brand: creadomotics
            state: INITIALIZING
  zbos/domotica/set/device/bool:
    publish:
      summary: Set device
      description: 'All devices in given room of given type including all given tags
        will be adressed.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            type:
              type: string
              description: 'The device type. Currently supported types are: light,
                dimmer, switch, plug, door, shutter, speaker.'
            state:
              type: boolean
              description: True for on/open/..., false for off/closed/...
            room:
              type: string
            tags:
              type: array
              items:
                type: string
        name: DomoticaSetDeviceOptions
        examples:
        - payload:
            type: string
            state: true
  zbos/domotica/get/light:
    publish:
      summary: Get light
      description: 'All lights in given room including all given tags will be adressed.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            room:
              type: string
              description: Optional
            tags:
              type: array
              description: Optional
              items:
                type: string
        name: DomoticaGetOptions
        examples:
        - payload:
            room: kitchen
            tags:
            - bar
            - kitchen
  zbos/domotica/set/light:
    publish:
      summary: Set light
      description: 'All lights in given room including all given tags will be adressed.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            state:
              type: boolean
              description: True for on, false for off
            room:
              type: string
            tags:
              type: array
              items:
                type: string
        name: DomoticaSetBooleanOptions
        examples:
        - payload:
            room: kitchen
            tags:
            - bar
            - kitchen
            state: true
  zbos/domotica/get/dimmer:
    publish:
      summary: Get dimmer
      description: 'All dimmers in given room including all given tags will be adressed.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            room:
              type: string
              description: Optional
            tags:
              type: array
              description: Optional
              items:
                type: string
        name: DomoticaGetOptions
        examples:
        - payload:
            room: kitchen
            tags:
            - bar
            - kitchen
  zbos/domotica/set/dimmer:
    publish:
      summary: Set dimmer
      description: 'All dimmers in given room including all given tags will be adressed.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            value:
              type: integer
              description: Value between 0 and 100 (percentage). To turn off, give
                value zero
            room:
              type: string
            tags:
              type: array
              items:
                type: string
        name: DomoticaSetIntOptions
        examples:
        - payload:
            room: kitchen
            tags:
            - bar
            - kitchen
            value: 100
  zbos/domotica/get/switch:
    publish:
      summary: Get switch
      description: 'All switches in given room including all given tags will be adressed.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            room:
              type: string
              description: Optional
            tags:
              type: array
              description: Optional
              items:
                type: string
        name: DomoticaGetOptions
        examples:
        - payload:
            room: kitchen
            tags:
            - bar
            - kitchen
  zbos/domotica/set/switch:
    publish:
      summary: Set switch
      description: 'All switches in given room including all given tags will be adressed.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            state:
              type: boolean
              description: True for on, false for off
            room:
              type: string
            tags:
              type: array
              items:
                type: string
        name: DomoticaSetBooleanOptions
        examples:
        - payload:
            room: kitchen
            tags:
            - bar
            - kitchen
            state: true
  zbos/domotica/get/door:
    publish:
      summary: Get door
      description: 'All doors in given room including all given tags will be adressed.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            room:
              type: string
              description: Optional
            tags:
              type: array
              description: Optional
              items:
                type: string
        name: DomoticaGetOptions
        examples:
        - payload:
            room: kitchen
            tags:
            - bar
            - kitchen
  zbos/domotica/set/door:
    publish:
      summary: Set door
      description: 'All doors in given room including all given tags will be adressed.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            state:
              type: boolean
              description: True for on, false for off
            room:
              type: string
            tags:
              type: array
              items:
                type: string
        name: DomoticaSetBooleanOptions
        examples:
        - payload:
            room: kitchen
            tags:
            - bar
            - kitchen
            state: true
  zbos/domotica/get/shutter:
    publish:
      summary: Get Shutter
      description: 'All shutters in given room including all given tags will be adressed.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            room:
              type: string
              description: Optional
            tags:
              type: array
              description: Optional
              items:
                type: string
        name: DomoticaGetOptions
        examples:
        - payload:
            room: kitchen
            tags:
            - bar
            - kitchen
  zbos/domotica/set/shutter:
    publish:
      summary: Set shutter
      description: 'All shutters in given room including all given tags will be adressed.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            state:
              type: boolean
              description: True for on, false for off
            room:
              type: string
            tags:
              type: array
              items:
                type: string
        name: DomoticaSetBooleanOptions
        examples:
        - payload:
            room: kitchen
            tags:
            - bar
            - kitchen
            state: true
  zbos/domotica/get/speaker:
    publish:
      summary: Get speaker
      description: 'All speakers in given room including all given tags will be adressed.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            room:
              type: string
              description: Optional
            tags:
              type: array
              description: Optional
              items:
                type: string
        name: DomoticaGetOptions
        examples:
        - payload:
            room: kitchen
            tags:
            - bar
            - kitchen
  zbos/domotica/set/speaker:
    publish:
      summary: Set speaker
      description: 'All speakers in given room including all given tags will be adressed.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            command:
              type: string
              description: 'Supported commands: play, pause, mute, unmute, set volume,
                increase volume, decrease volume, next song, previous song'
            value:
              type: integer
              description: Optional. Only used for 'set volume' command. Value between
                0 and 100 (percentage)
            room:
              type: string
            tags:
              type: array
              items:
                type: string
        name: DomoticaSetSpeakerOptions
        examples:
        - payload:
            room: kitchen
            tags:
            - bar
            - kitchen
            command: play
            value: 70
  zbos/domotica/get/doorsensor:
    publish:
      summary: Get doorsensor
      description: 'All doorsensors in given room including all given tags will be
        adressed.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            room:
              type: string
              description: Optional
            tags:
              type: array
              description: Optional
              items:
                type: string
        name: DomoticaGetOptions
        examples:
        - payload:
            room: kitchen
            tags:
            - bar
            - kitchen
  zbos/domotica/get/motionsensor:
    publish:
      summary: Get motionsensor
      description: 'All motionsensors in given room including all given tags will
        be adressed.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            room:
              type: string
              description: Optional
            tags:
              type: array
              description: Optional
              items:
                type: string
        name: DomoticaGetOptions
        examples:
        - payload:
            room: kitchen
            tags:
            - bar
            - kitchen
  zbos/domotica/get/floodsensor:
    publish:
      summary: Get floodsensor
      description: 'All floodsensors in given room including all given tags will be
        adressed.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            room:
              type: string
              description: Optional
            tags:
              type: array
              description: Optional
              items:
                type: string
        name: DomoticaGetOptions
        examples:
        - payload:
            room: kitchen
            tags:
            - bar
            - kitchen
  zbos/domotica/get/lightsensor:
    publish:
      summary: Get lightsensor
      description: 'All lightsensors in given room including all given tags will be
        adressed.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            room:
              type: string
              description: Optional
            tags:
              type: array
              description: Optional
              items:
                type: string
        name: DomoticaGetOptions
        examples:
        - payload:
            room: kitchen
            tags:
            - bar
            - kitchen
  zbos/domotica/get/temperature:
    publish:
      summary: Get temperature
      description: 'All temperature sensors in given room including all given tags
        will be adressed.

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            room:
              type: string
              description: Optional
            tags:
              type: array
              description: Optional
              items:
                type: string
        name: DomoticaGetOptions
        examples:
        - payload:
            room: kitchen
            tags:
            - bar
            - kitchen
  zbos/domotica/play/scene:
    publish:
      summary: Set scene
      description: 'All scenes in given room will be adressed. Use scene property
        to specify specific scene. Scene names can be found in the tags of scene objects.see
        <<zbos/domotica/response/{key}>> for response

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties:
            room:
              type: string
            scene:
              type: string
              description: Optional
        name: DomoticaPlaySceneOptions
        examples:
        - payload:
            room: kitchen
            scene: demo scene
  zbos/domotica/response/{key}:
    subscribe:
      summary: Domotics response
      description: 'Response for the various device getters: get light, get dimmer,
        etc

        '
      tags:
      - name: Domotics
        description: All domotics related topics.
      message:
        payload:
          type: object
          properties: {}
        name: Any
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/facetracking/detected/faces:
    subscribe:
      summary: 'event: Detected faces'
      description: ''
      tags:
      - name: Face tracking
        description: All face tracking related topics.
      message:
        payload:
          type: string
        name: String
  zbos/facetracking/response:
    subscribe:
      summary: 'response: Face'
      description: ''
      tags:
      - name: Face tracking
        description: All face tracking related topics.
      message:
        payload:
          type: object
          properties:
            name:
              type: string
            role:
              type: string
            lastUpdated:
              type: object
              properties:
                fastTime:
                  type: number
                cdate:
                  type: object
                  properties:
                    cachedYear:
                      type: integer
                    cachedFixedDateJan1:
                      type: number
                    cachedFixedDateNextJan1:
                      type: number
            lastSeen:
              type: object
              properties:
                fastTime:
                  type: number
                cdate:
                  type: object
                  properties:
                    cachedYear:
                      type: integer
                    cachedFixedDateJan1:
                      type: number
                    cachedFixedDateNextJan1:
                      type: number
            seenCount:
              type: integer
        name: Detection
        examples:
        - payload:
            name: string
            role: string
            lastUpdated: 1616061846645
            lastSeen: 1616061846645
            seenCount: 5
  zbos/facetracking/add_request:
    publish:
      summary: Add face
      description: 'see <<zbos/facetracking/add_response>> for response

        '
      tags:
      - name: Face tracking
        description: All face tracking related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/facetracking/add_response:
    subscribe:
      summary: 'response: Add face'
      description: ''
      tags:
      - name: Face tracking
        description: All face tracking related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/facetracking/update_request:
    publish:
      summary: Update face
      description: 'see <<zbos/facetracking/update_response>> for response

        '
      tags:
      - name: Face tracking
        description: All face tracking related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/facetracking/update_response:
    subscribe:
      summary: 'response: Update face'
      description: ''
      tags:
      - name: Face tracking
        description: All face tracking related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/facetracking/update_person_request:
    publish:
      summary: Update person
      description: 'see <<zbos/facetracking/update_person_response>> for response

        '
      tags:
      - name: Face tracking
        description: All face tracking related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/facetracking/update_person_response:
    subscribe:
      summary: 'response: Update person'
      description: ''
      tags:
      - name: Face tracking
        description: All face tracking related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/facetracking/delete_request:
    publish:
      summary: Delete face
      description: 'see <<zbos/facetracking/delete_response>> for response

        '
      tags:
      - name: Face tracking
        description: All face tracking related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/facetracking/delete_response:
    subscribe:
      summary: 'response: Delete face'
      description: ''
      tags:
      - name: Face tracking
        description: All face tracking related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/facetracking/name_request:
    publish:
      summary: Request name
      description: 'see <<zbos/facetracking/name_response>> for response

        '
      tags:
      - name: Face tracking
        description: All face tracking related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/facetracking/name_response:
    subscribe:
      summary: 'response: Request name'
      description: ''
      tags:
      - name: Face tracking
        description: All face tracking related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/facetracking/persondata_request:
    publish:
      summary: Request data from person
      description: 'see <<zbos/facetracking/persondata_response>> for response

        '
      tags:
      - name: Face tracking
        description: All face tracking related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/facetracking/persondata_response:
    subscribe:
      summary: 'response: Request data from person'
      description: ''
      tags:
      - name: Face tracking
        description: All face tracking related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/kiosk/resume/event:
    subscribe:
      summary: 'event: Kiosk is active'
      description: 'Fired when kiosk is active after being moved to the background

        '
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/remote/kiosk/apps/home:
    publish:
      summary: Open home screen
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/remote/kiosk/apps/start:
    publish:
      summary: Start application remotely on Kiosk
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: object
          properties:
            appName:
              type: string
            extras:
              type: object
        name: ApplicationStartRequest
        examples:
        - payload: {}
  zbos/remote/kiosk/apps/get:
    publish:
      summary: Get installed applications on Kiosk
      description: 'Request a list of all installed & listed applications from the
        Kiosksee <<zbos/remote/kiosk/apps/response/{key}>> for response

        '
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/remote/kiosk/apps/response/{key}:
    subscribe:
      summary: 'response: Get installed applications on Kiosk'
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              app_name:
                type: string
              package_name:
                type: string
              image_base64:
                type: string
        name: Array<SimpleApplicationNodeDto>
        examples:
        - payload:
            app_name: string
            package_name: string
            image_base64: string
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/remote/kiosk/apps/all/get:
    publish:
      summary: Get installed applications on Kiosk
      description: 'Request a list of all installed & listed applications from the
        Kiosksee <<zbos/remote/kiosk/apps/all/response/{key}>> for response

        '
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/remote/kiosk/apps/all/response/{key}:
    subscribe:
      summary: 'response: Get installed applications on Kiosk'
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              app_name:
                type: string
              package_name:
                type: string
              image_base64:
                type: string
        name: Array<SimpleApplicationNodeDto>
        examples:
        - payload:
            app_name: string
            package_name: string
            image_base64: string
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/remote/kiosk/multimedia/{type}/show:
    publish:
      summary: Show multimedia
      description: 'see <<zbos/remote/kiosk/multimedia/{type}/show/response/{key}>>
        for response

        '
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
    parameters:
      type:
        description: Type of multimedia
        schema:
          type: string
  zbos/remote/kiosk/multimedia/{type}/show/response/{key}:
    subscribe:
      summary: 'response: Show multimedia'
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
    parameters:
      type:
        description: Type of multimedia
        schema:
          type: string
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/remote/kiosk/input/show:
    publish:
      summary: Show input prompt
      description: 'see <<zbos/remote/kiosk/input/show/response/{key}>> for response

        '
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: object
          properties:
            question:
              type: string
            textType:
              type: string
            confirmText:
              type: string
        name: InputBlock
        examples:
        - payload:
            question: string
  zbos/remote/kiosk/input/show/response/{key}:
    subscribe:
      summary: 'response: Show input prompt'
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: object
          properties:
            input:
              type: string
        name: InputResponse
        examples:
        - payload:
            input: input
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/remote/kiosk/microphone/show:
    publish:
      summary: Show microphone in composition
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/remote/kiosk/multimedia/image/show:
    publish:
      summary: Show image
      description: 'see <<zbos/remote/kiosk/multimedia/image/show/response/{key}>>
        for response

        '
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
            path:
              type: string
            extension:
              type: string
            fileName:
              type: string
            style:
              type: object
              properties:
                backgroundColor:
                  type: string
            url:
              type: string
        name: Image
        examples:
        - payload:
            id: string
            style:
              backgroundColor: string
            url: string
  zbos/remote/kiosk/multimedia/image/show/response/{key}:
    subscribe:
      summary: 'response: Show image'
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
            path:
              type: string
            extension:
              type: string
            fileName:
              type: string
            style:
              type: object
              properties:
                backgroundColor:
                  type: string
            url:
              type: string
        name: Image
        examples:
        - payload:
            id: string
            style:
              backgroundColor: string
            url: string
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/remote/kiosk/multimedia/image/stop:
    publish:
      summary: Stop showing image
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/remote/kiosk/multimedia/image/{filename}/end:
    subscribe:
      summary: 'event: Image ended'
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
    parameters:
      filename:
        description: Name of the file
        schema:
          type: string
  zbos/remote/kiosk/multimedia/video/show:
    publish:
      summary: Show video
      description: 'see <<zbos/remote/kiosk/multimedia/video/show/response/{key}>>
        for response

        '
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
            url:
              type: string
            repeat:
              type: boolean
            audioUrl:
              type: string
            videoOnly:
              type: boolean
            showControls:
              type: boolean
        name: Video
        examples:
        - payload:
            id: string
            url: string
            repeat: true
            audioUrl: string
            videoOnly: false
            showControls: true
            remoteVideo: false
  zbos/remote/kiosk/multimedia/video/show/response/{key}:
    subscribe:
      summary: 'response: Show video'
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
            url:
              type: string
            repeat:
              type: boolean
            audioUrl:
              type: string
            videoOnly:
              type: boolean
            showControls:
              type: boolean
        name: Video
        examples:
        - payload:
            id: string
            url: string
            repeat: true
            audioUrl: string
            videoOnly: false
            showControls: true
            remoteVideo: false
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/remote/kiosk/multimedia/video/stop:
    publish:
      summary: Stop video
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/remote/kiosk/multimedia/video/{filename}/end:
    subscribe:
      summary: 'event: Video ended'
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
    parameters:
      filename:
        description: Name of the file
        schema:
          type: string
  zbos/remote/kiosk/multimedia/page/show:
    publish:
      summary: Show page in kiosk
      description: 'see <<zbos/remote/kiosk/multimedia/page/show/response/{key}>>
        for response

        '
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: object
          properties:
            blocking:
              type: boolean
            id:
              type: string
            index:
              type: integer
            url:
              type: string
        name: OpenBrowserBlock
        examples:
        - payload: {}
  zbos/remote/kiosk/multimedia/page/show/response/{key}:
    subscribe:
      summary: 'response: Show page in kiosk'
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: object
          properties:
            blocking:
              type: boolean
            id:
              type: string
            index:
              type: integer
            url:
              type: string
        name: OpenBrowserBlock
        examples:
        - payload: {}
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/remote/kiosk/action/start:
    publish:
      summary: Start action
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: object
          properties: {}
        name: Action
  zbos/remote/kiosk/settings/lock/state/get:
    publish:
      summary: Get current lockstate
      description: 'see <<zbos/remote/kiosk/settings/lock/state/response>> for response

        '
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/remote/kiosk/settings/lock/state/response:
    subscribe:
      summary: 'response: Get current lockstate'
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: object
          properties:
            isLocked:
              type: boolean
            isPincodeSet:
              type: boolean
        name: LockStatus
        examples:
        - payload:
            pincodeSet: false
            locked: true
  zbos/remote/kiosk/settings/unlock:
    publish:
      summary: Unlock settings page
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/remote/kiosk/settings/lock:
    publish:
      summary: Lock settings page
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/remote/kiosk/settings/lock/event:
    subscribe:
      summary: 'response: Lock settings page'
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: object
          properties:
            response:
              type: string
            success:
              type: boolean
        name: LockResponse
        examples:
        - payload: {}
  zbos/remote/kiosk/settings/unlock/event:
    subscribe:
      summary: 'response: Unlock settings page'
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: object
          properties:
            response:
              type: string
            success:
              type: boolean
        name: LockResponse
        examples:
        - payload: {}
  zbos/remote/kiosk/settings/pincode/change/event:
    subscribe:
      summary: 'response: Change current pincode'
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: object
          properties:
            response:
              type: string
            success:
              type: boolean
        name: LockResponse
        examples:
        - payload: {}
  zbos/remote/kiosk/settings/pincode/remove:
    publish:
      summary: Remove current pincode
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/remote/kiosk/settings/pincode/remove/event:
    subscribe:
      summary: 'response: Remove current pincode'
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: object
          properties:
            response:
              type: string
            success:
              type: boolean
        name: LockResponse
        examples:
        - payload: {}
  zbos/kiosk/datasource/get/all:
    publish:
      summary: Get all datasources
      description: 'see <<zbos/kiosk/datasource/get/all/response/{key}>> for response

        '
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/kiosk/datasource/get/all/response/{key}:
    subscribe:
      summary: 'response: Get all datasources'
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
              name:
                type: string
        name: Array<SimpleDataSource>
        examples:
        - payload:
            id: string
            name: string
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/kiosk/datasource/get:
    publish:
      summary: Get specific datasources
      description: 'see <<zbos/kiosk/datasource/get/response/{key}>> for response

        '
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
            name:
              type: string
        name: SimpleDataSource
        examples:
        - payload:
            id: string
            name: string
  zbos/kiosk/datasource/get/response/{key}:
    subscribe:
      summary: 'response: Get specific datasources'
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: string
        name: String
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/kiosk/datasource/current/get:
    publish:
      summary: Get active datasources
      description: 'see <<zbos/kiosk/datasource/current/get/response/{key}>> for response

        '
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/kiosk/datasource/current/get/response/{key}:
    subscribe:
      summary: 'response: Get active datasources'
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: string
        name: String
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/kiosk/datasource/set:
    publish:
      summary: Set current Kiosk datasources
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
        name: ChangeDatasourceRequest
        examples:
        - payload:
            id: string
  zbos/kiosk/datasource/save:
    publish:
      summary: Save or add a datasource
      description: 'see <<zbos/kiosk/datasource/save/event/{kiosk_id}>> for response

        '
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
            name:
              type: string
        name: SimpleDataSource
        examples:
        - payload:
            id: string
            name: String
  zbos/kiosk/datasource/save/event/{kiosk_id}:
    subscribe:
      summary: 'response: Get active datasources'
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: string
        name: String
    parameters:
      kiosk_id:
        description: ID of kiosk
        schema:
          type: string
  zbos/kiosk/datasource/delete:
    publish:
      summary: Delete a datasource
      description: 'see <<zbos/kiosk/datasource/delete/event/{kiosk_id}>> for response

        '
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
            name:
              type: string
        name: SimpleDataSource
        examples:
        - payload:
            id: string
  zbos/kiosk/datasource/delete/event/{kiosk_id}:
    subscribe:
      summary: 'response: Delete a datasource'
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: string
        name: String
    parameters:
      kiosk_id:
        description: ID of kiosk
        schema:
          type: string
  zbos/kiosk/composition/pin/lock:
    publish:
      summary: Pin a composition
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
        name: PinnedComposition
        examples:
        - payload:
            id: string
  zbos/kiosk/composition/pin/unlock:
    publish:
      summary: Unpin a composition
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/kiosk/composition/pin/get:
    publish:
      summary: Request the current pin status & pinned composition.
      description: 'see <<zbos/kiosk/composition/pin/get/response/{key}>> for response

        '
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/kiosk/composition/pin/get/response/{key}:
    subscribe:
      summary: 'response: pin status & pinned composition'
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: object
          properties:
            isPinned:
              type: boolean
            id:
              type: string
        name: PinnedCompositionState
        examples:
        - payload:
            id: string
            pinned: true
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/kiosk/app/pin/lock:
    publish:
      summary: Pin an app, if installed
      description: 'A locked app will be launched immediately when the kiosk opens.

        '
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: object
          properties:
            packageName:
              type: string
        name: PinnedApplication
        examples:
        - payload:
            packageName: string
  zbos/kiosk/app/pin/unlock:
    publish:
      summary: Unpin an app.
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/kiosk/app/pin/get:
    publish:
      summary: Request the current pin status & pinned app.
      description: 'see <<zbos/kiosk/app/pin/get/response/{key}>> for response

        '
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/kiosk/app/pin/get/response/{key}:
    subscribe:
      summary: 'response: pin status & pinned app'
      description: ''
      tags:
      - name: Kiosk
        description: All kiosk related topics.
      message:
        payload:
          type: object
          properties:
            isPinned:
              type: boolean
            packageName:
              type: string
        name: PinnedApplicationState
        examples:
        - payload:
            packageName: string
            pinned: true
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/leds/chestlight/set:
    publish:
      summary: Set chest light color
      description: ''
      tags:
      - name: Leds
        description: All leds related topics.
      message:
        payload:
          type: object
          properties:
            part:
              type: object
              properties:
                name:
                  type: string
                ordinal:
                  type: integer
              enum:
              - CHEST
              - MOUTH
              - EYES
              - HEAD
              - SPEECH
            color:
              type: string
              description: The format is "#FF0000" (red)
            breathe:
              type: boolean
            breathDuration:
              type: integer
            duration:
              type: integer
        name: LedOptions
        examples:
        - payload:
            part: CHEST
            color: "#ff077e"
            breathDuration: 1500
            duration: -1
  zbos/media/library/list:
    publish:
      summary: List all media libraries
      description: |+
        [DEPRECATED]
        Please use <<zbos/media/library/list/get>>

      tags:
      - name: Media
        description: All media related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/media/library/list/event:
    subscribe:
      summary: 'event: Listing all media libraries'
      description: ''
      tags:
      - name: Media
        description: All media related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/media/library/list/get:
    publish:
      summary: Get a list of media items
      description: 'see <<zbos/media/library/list/response/{key}>> for response

        '
      tags:
      - name: Media
        description: All media related topics.
      message:
        payload:
          type: object
          properties:
            key:
              type: string
            limit:
              type: integer
            offset:
              type: integer
            filters:
              type: array
              items:
                type: object
                properties:
                  field:
                    type: string
                    description: Field to check on. Note that the field should be
                      camelCase, not snake_case
                  value:
                    type: string
                    description: Value to check on. For numbers you should use 'min'
                      and 'max'.
                  min:
                    type: number
                    description: Minimum value, only usable for number fields
                  max:
                    type: number
                    description: Maximum value, only usable for number fields
                  direction:
                    type: object
                    description: |-
                      Direction to sort on.
                      Can be 'asc' or 'desc'.
                      The default direction is 'asc'
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - ASC
                    - DESC
                  operator:
                    type: object
                    description: |-
                      Operator for either the child filters, or this filter object itself.
                      Can be 'and', 'or' or 'not'.
                      Default is 'and'.
                      The root operator is always 'and'
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - AND
                    - OR
                    - NOT
                  match_type:
                    type: object
                    description: |-
                      Match type for string values.
                      Can be 'exact', 'contains', 'starts_with', 'ends_with'.
                      The default match_type is 'contains'
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - EXACT
                    - CONTAINS
                    - STARTS_WITH
                    - ENDS_WITH
                  filters:
                    type: array
                    description: |-
                      Filters on which the operator will be applied.
                      If there are no child filters, the operator will be applied to the filter object itself.
                    items:
                      type: object
                  field_filters:
                    type: array
                    description: |-
                      Filters to apply on the child fields of the field.
                      Will only work if the field is an object, array/list or map.
                    items:
                      type: object
            sort:
              type: array
              items:
                type: object
                properties:
                  field:
                    type: string
                    description: Field to check on. Note that the field should be
                      camelCase, not snake_case
                  value:
                    type: string
                    description: Value to check on. For numbers you should use 'min'
                      and 'max'.
                  min:
                    type: number
                    description: Minimum value, only usable for number fields
                  max:
                    type: number
                    description: Maximum value, only usable for number fields
                  direction:
                    type: object
                    description: |-
                      Direction to sort on.
                      Can be 'asc' or 'desc'.
                      The default direction is 'asc'
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - ASC
                    - DESC
                  operator:
                    type: object
                    description: |-
                      Operator for either the child filters, or this filter object itself.
                      Can be 'and', 'or' or 'not'.
                      Default is 'and'.
                      The root operator is always 'and'
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - AND
                    - OR
                    - NOT
                  match_type:
                    type: object
                    description: |-
                      Match type for string values.
                      Can be 'exact', 'contains', 'starts_with', 'ends_with'.
                      The default match_type is 'contains'
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - EXACT
                    - CONTAINS
                    - STARTS_WITH
                    - ENDS_WITH
                  filters:
                    type: array
                    description: |-
                      Filters on which the operator will be applied.
                      If there are no child filters, the operator will be applied to the filter object itself.
                    items:
                      type: object
                  field_filters:
                    type: array
                    description: |-
                      Filters to apply on the child fields of the field.
                      Will only work if the field is an object, array/list or map.
                    items:
                      type: object
        name: FilteringRequest
        examples:
        - payload:
            key: Test123
            limit: 50
            offset: 10
            filters:
            - operator: or
              filters:
              - field: name
                value: foo
                operator: and
                match_type: contains
              - field: name
                value: bar
                operator: and
                match_type: contains
              match_type: contains
            - field: type
              value: image
              operator: and
              filters:
              - field: type
                value: image
                operator: and
                match_type: contains
              match_type: contains
            - field: date
              operator: and
              filters:
              - field: date
                operator: and
                match_type: contains
              match_type: contains
            sort:
            - field: extension
              operator: and
              filters:
              - field: extension
                operator: and
                match_type: contains
              match_type: contains
            - field: name
              operator: and
              filters:
              - field: name
                operator: and
                match_type: contains
              match_type: contains
  zbos/media/library/list/response/{key}:
    subscribe:
      summary: 'response: Get a list of media items'
      description: ''
      tags:
      - name: Media
        description: All media related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              fileId:
                type: string
              path:
                type: string
              fileName:
                type: string
              extension:
                type: string
              type:
                type: string
              mimeType:
                type: string
              downloadPath:
                type: string
              previewPath:
                type: string
              thumbnailPath:
                type: string
              checksum:
                type: string
              cloudFileId:
                type: string
              size:
                type: number
              modifiedAt:
                type: number
              isDefaultAsset:
                type: boolean
              fullPath:
                type: string
        name: Array<MediaFile>
        examples:
        - payload:
          - fileId: string
            path: string
            fileName: string
            extension: string
            type: string
            mimeType: string
            downloadPath: string
            previewPath: string
            thumbnailPath: string
            checksum: string
            cloudFileId: string
            size: 0
            modifiedAt: 0
            fullPath: string/string.string
            defaultAsset: false
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/media/library/event:
    subscribe:
      summary: Library item changed event
      description: 'This event is published when an item in the media library list
        changes

        '
      tags:
      - name: Media
        description: All media related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/media/sync/device/get:
    publish:
      summary: Get media sync devices
      description: ''
      tags:
      - name: Media
        description: All media related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/media/sync/device/event:
    subscribe:
      summary: 'event: Media sync devices'
      description: ''
      tags:
      - name: Media
        description: All media related topics.
      message:
        payload:
          type: string
        name: String
  zbos/media/export/get:
    publish:
      summary: Get all media exports
      description: ''
      tags:
      - name: Media
        description: All media related topics.
      message:
        payload:
          type: object
          properties:
            clientId:
              type: string
            compositionId:
              type: string
            compositionName:
              type: string
            mediaPaths:
              type: array
              items:
                type: string
        name: ExportRequestDto
        examples:
        - payload:
            clientId: string
            compositionId: string
            compositionName: string
            mediaPaths:
            - string
  zbos/media/export/event:
    subscribe:
      summary: 'event: All media exported'
      description: ''
      tags:
      - name: Media
        description: All media related topics.
      message:
        payload:
          type: object
          properties:
            clientId:
              type: string
            compositionId:
              type: string
            compositionName:
              type: string
            mediaPaths:
              type: array
              items:
                type: string
        name: ExportRequestDto
        examples:
        - payload:
            clientId: string
            compositionId: string
            compositionName: string
            mediaPaths:
            - string
  zbos/media/apk/install:
    publish:
      summary: Install APK
      description: ''
      tags:
      - name: Media
        description: All media related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/media/delete/all:
    publish:
      summary: Delete all media
      description: ''
      tags:
      - name: Media
        description: All media related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/motion/animation/run:
    publish:
      summary: Fires specific animation ID
      description: ''
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        payload:
          type: object
          properties:
            requestId:
              type: string
            type:
              type: string
            animationId:
              type: string
        name: AnimationOptions
        examples:
        - payload:
            requestId: string
            type: string
            animationId: string
  zbos/motion/animation/stop:
    publish:
      summary: Stops all animations
      description: ''
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/motion/animation/get:
    publish:
      summary: Get available animations
      description: 'see <<zbos/motion/animation/response/{key}>> for response

        '
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/motion/animation/response/{key}:
    subscribe:
      summary: 'response: Get available animations'
      description: ''
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
              name:
                type: string
              animation:
                type: string
              type:
                type: string
        name: Array<AvailableAnimation>
        examples:
        - payload:
            id: string
            name: string
            animation: string
            type: string
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/motion/animation/event:
    subscribe:
      summary: 'Event: animation started/stopped'
      description: 'A message (Boolean) is publish on this topic when an animation
        started or stopped running

        '
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        payload:
          type: boolean
        name: Boolean
  zbos/motion/dance/start:
    publish:
      summary: Starts dance
      description: ''
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        payload:
          type: object
          properties:
            requestId:
              type: string
            danceId:
              type: string
        name: DanceOptions
        examples:
        - payload:
            requestId: string
            danceId: string
  zbos/motion/dance/start/random:
    publish:
      summary: Start random dance
      description: 'Start a random default dance

        '
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/motion/dance/stop:
    publish:
      summary: Stops dance
      description: ''
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/motion/dance/get:
    publish:
      summary: Get available dances
      description: 'see <<zbos/motion/dance/response/{key}>> for response

        '
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/motion/dance/response/{key}:
    subscribe:
      summary: 'response: Get available dances'
      description: ''
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
              name:
                type: string
              animation:
                type: string
              song:
                type: string
        name: Array<AvailableDance>
        examples:
        - payload:
            id: string
            name: string
            animation: string
            song: string
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/motion/control/head:
    publish:
      summary: Get available animations
      description: ''
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        payload:
          type: object
          properties:
            requestId:
              type: string
            yaw:
              type: number
            pitch:
              type: number
            angle:
              type: object
              properties:
                degree:
                  type: number
                  maximum: 100
                  minimum: -100
                  description: " Angles in percent between -100 en +100"
            force:
              type: number
            distance:
              type: number
              description: In meters
            relative_rotation:
              type: number
            partName:
              type: string
        name: MobilityActionOptions
        examples:
        - payload:
            requestId: string
            yaw: 10
            pitch: 0
            angle:
              degree: 90
            force: 50
            distance: 2
            relativeRotation: 0
            partName: string
  zbos/motion/control/movement:
    publish:
      summary: Move head
      description: 'Publish on this topic to move the head of the robot.

        '
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        payload:
          type: object
          properties:
            requestId:
              type: string
            yaw:
              type: number
            pitch:
              type: number
            angle:
              type: object
              properties:
                degree:
                  type: number
                  maximum: 100
                  minimum: -100
                  description: " Angles in percent between -100 en +100"
            force:
              type: number
            distance:
              type: number
              description: In meters
            relative_rotation:
              type: number
            partName:
              type: string
        name: MobilityActionOptions
        examples:
        - payload:
            requestId: string
            yaw: 10
            pitch: 0
            angle:
              degree: 90
            force: 50
            distance: 2
            relativeRotation: 0
            partName: string
  zbos/motion/control/part/{name}:
    publish:
      summary: Move a specific part of the robot
      description: 'Publish on this topic to move a specific part of the robot, like
        an arm or a leg.

        '
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        payload:
          type: object
          properties:
            requestId:
              type: string
            yaw:
              type: number
            pitch:
              type: number
            angle:
              type: object
              properties:
                degree:
                  type: number
                  maximum: 100
                  minimum: -100
                  description: " Angles in percent between -100 en +100"
            force:
              type: number
            distance:
              type: number
              description: In meters
            relative_rotation:
              type: number
            partName:
              type: string
        name: MobilityActionOptions
        examples:
        - payload:
            requestId: string
            yaw: 10
            pitch: 0
            angle:
              degree: 90
            force: 50
            distance: 2
            relativeRotation: 0
            partName: string
    parameters:
      name:
        description: Name of the part which you want to control
        schema:
          type: string
  zbos/motion/event:
    subscribe:
      summary: 'Event: started/stopped'
      description: 'A message (Boolean) is publish on this topic when the robot chassis
        starts, or stops moving.

        '
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        payload:
          type: boolean
        name: Boolean
  zbos/emotion/eyes/run:
    publish:
      summary: Run animation for the eyes
      description: ''
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        payload:
          type: object
          properties:
            requestId:
              type: string
            emotionId:
              type: string
        name: EmotionOptions
        examples:
        - payload:
            emotionId: '2'
  zbos/emotion/eyes/get:
    publish:
      summary: Get list of available emotions for the eyes
      description: 'see <<zbos/emotion/eyes/response/{key}>> for response

        '
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/emotion/eyes/response/{key}:
    subscribe:
      summary: 'response: Get list of available emotions for the eyes'
      description: ''
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
              name:
                type: string
              animation:
                type: string
              translationkey:
                type: string
        name: Array<AvailableEmotion>
        examples:
        - payload:
            id: '2'
            name: Eyeroll
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/followme/enable:
    publish:
      summary: Enable follow me
      description: ''
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/followme/disable:
    publish:
      summary: Disable follow me
      description: ''
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/followme/event:
    subscribe:
      summary: 'response: follow me status'
      description: ''
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/gestures/data:
    publish:
      summary: Gestures data
      description: ''
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/gestures/enable:
    publish:
      summary: Enable gestures
      description: ''
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/gestures/disable:
    publish:
      summary: Disable gestures
      description: ''
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/gym/get/all:
    publish:
      summary: Get all the gym movements that can be used in the composer
      description: 'see <<zbos/gym/get/all/response/{key}>> for response

        '
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/gym/get/all/response/{key}:
    subscribe:
      summary: 'response: Get all gym movements'
      description: ''
      tags:
      - name: Motion
        description: All motion related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              categories:
                type: array
                items:
                  type: object
                  properties:
                    name:
                      type: string
                    translation:
                      type: string
                    exercises:
                      type: array
                      items:
                        type: object
                        properties:
                          name:
                            type: string
                          translation:
                            type: string
                          speedIn_min:
                            type: number
                          speedIn_max:
                            type: number
                          speedOut_min:
                            type: number
                          speedOut_max:
                            type: number
                          duty_min:
                            type: number
                          duty_max:
                            type: number
                          period_min:
                            type: number
                          period_max:
                            type: number
                          cycles_min:
                            type: number
                          cycles_max:
                            type: number
                          profiles:
                            type: array
                            items:
                              type: object
                              properties:
                                name:
                                  type: string
                                code:
                                  type: string
                                translation:
                                  type: string
        name: Array<AvailableGymMovement>
        examples:
        - payload:
            categories:
            - name: string
              translation: string
              exercises:
              - name: string
                translation: string
                profiles:
                - name: string
                  code: string
                  translation: string
                speedIn_min: 15
                speedIn_max: 50
                speedOut_min: 25
                speedOut_max: 60
                duty_min: 5
                duty_max: 10
                period_min: 5
                period_max: 10
                cycles_min: 5
                cycles_max: 10
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/security/motiondetect/start:
    publish:
      summary: Start motion detection
      description: ''
      tags:
      - name: Motion detection
        description: All motion detection related topics.
      message:
        payload:
          type: object
          properties:
            key:
              type: string
              description: Required key
            unit:
              type: string
              description: Can be "s", "h" or "m" (seconds, hours, minutes), used
                for duration. Defaults to seconds
            initialDelay:
              type: number
              minimum: 0
              description: How long to wait until starting motion detection, in milliseconds.
                Defaults to 2000, lower values may cause false positives
            interval:
              type: number
              minimum: 0
              description: How often the camera should check for motion, in milliseconds.
                Defaults to 200
            duration:
              type: number
              minimum: 0
              description: The maximum time the motion detection will be active, after
                the time is elapsed, the motion detection will stop. Defaults to 10
            stopOnDetection:
              type: boolean
              description: If true the motion detection will stop after the first
                detection. Defaults to true
            upload:
              type: boolean
              description: If true, the picture with motion detected will be uploaded
                to the cloud. A notification is sent to zbos-control (if enabled).
                Defaults to false
            stopAfterDuration:
              type: boolean
              description: If true the motion detection will stop at the end of the
                duration. Defaults to true
        name: MotionDetectionOptions
        examples:
        - payload:
            key: test
            unit: h
            initialDelay: 2500
            interval: 250
            duration: 7
            stopOnDetection: true
            upload: true
            stopAfterDuration: true
            timeInMilliseconds: 25200000
  zbos/security/motiondetect/stop:
    publish:
      summary: Stop motion detection
      description: ''
      tags:
      - name: Motion detection
        description: All motion detection related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/security/motiondetect/event/{key}:
    subscribe:
      summary: 'event: Motion detected'
      description: ''
      tags:
      - name: Motion detection
        description: All motion detection related topics.
      message:
        payload:
          type: object
          properties:
            image:
              type: string
              description: Image of the detected motion, only given if upload is enabled
                in motion detection options.
        name: MotionDetectionEvent
        examples:
        - payload:
            image: SomeBase64Image
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/security/motiondetect/started/{key}:
    subscribe:
      summary: Motion detection started
      description: ''
      tags:
      - name: Motion detection
        description: All motion detection related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/security/motiondetect/stopped/{key}:
    subscribe:
      summary: Motion detection stopped
      description: ''
      tags:
      - name: Motion detection
        description: All motion detection related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/sensors/touch/get:
    publish:
      summary: Get all touch sensors
      description: 'see <<zbos/sensors/touch/response/{key}>> for response

        '
      tags:
      - name: Sensors
        description: All sensors related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/sensors/touch/response/{key}:
    subscribe:
      summary: 'response: Get all touch sensors'
      description: ''
      tags:
      - name: Sensors
        description: All sensors related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
            type:
              type: object
              properties:
                name:
                  type: string
                ordinal:
                  type: integer
              enum:
              - TOUCHSENSOR
              - TOUCHSENSOR_GROUP
            translationkey:
              type: string
        name: AvailableSensor
        examples:
        - payload:
            id: string
            type: TOUCHSENSOR
            translationkey: string
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/sensors/event:
    subscribe:
      summary: 'event: Sensor'
      description: ''
      tags:
      - name: Sensors
        description: All sensors related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
            type:
              type: string
            source:
              type: string
            state:
              type: string
        name: SensorEvent
        examples:
        - payload:
            id: string
            type: string
            state: string
  zbos/settings/get:
    publish:
      summary: Get settings
      description: 'Get all settings for the provided category

        '
      tags:
      - name: Settings
        description: All settings related topics.
      message:
        payload:
          type: object
          properties:
            key:
              type: string
            category:
              type: string
            setting_keys:
              type: array
              description: Optional, will return all settings if not set.
              items:
                type: string
            subcategories:
              type: object
              description: Optional, will return all subcategories if not set.
        name: GetSettingsRequest
        examples:
        - payload:
            key: abc
            category: category_1
        - payload:
            key: abc
            category: category_1
            setting_keys:
            - setting_key_1
            - setting_key_2
  zbos/settings/get/response/{key}:
    publish:
      summary: 'Response: Get settings'
      description: ''
      tags:
      - name: Settings
        description: All settings related topics.
      message:
        payload:
          type: object
          properties:
            label_key:
              type: string
              description: 'Translation key should use the dot notation: {category}.{key}'
            description_key:
              type: string
              description: |-
                Optional description key
                Translation key should use the dot notation: {category}.{key}
            settings:
              type: object
            subcategories:
              type: object
              description: Optional subcategories
            orphaned:
              type: boolean
              description: The orphaned state indicates that this category was not
                added again since boot.
        name: SettingsCategory
        examples:
        - payload:
            category:
              settings:
                setting_key_1:
                  value: Value 1
                  type: string
                  required: true
                  label_key: translations_category.setting_1_label
                  description_key: translations_category.setting_1_description
                setting_key_2:
                  value: '100'
                  type: integer
                  range:
                    min: 0
                    max: 150
                  required: false
                  label_key: translations_category.setting_2_label
                  description_key: translations_category.setting_2_description
                setting_key_3:
                  value: '100.50'
                  type: number
                  range:
                    min: 1
                    max: 150
                  required: true
                  label_key: translations_category.setting_3_label
                  description_key: translations_category.setting_3_description
                setting_key_4:
                  value: 'true'
                  type: boolean
                  label_key: translations_category.setting_4_label
                  description_key: translations_category.setting_4_description
                setting_key_5:
                  value: option_1
                  type: select_single
                  options:
                  - key: option_1
                    value: Option 1
                    label_key: translations_category.setting_5_option_1
                  - key: option_2
                    value: Option 2
                    label_key: translations_category.setting_5_option_2
                  label_key: translations_category.translations_category.setting_5_label
                  description_key: translations_category.setting_5_description
                setting_key_6:
                  values:
                  - option_1
                  - option_2
                  type: select_multi
                  options:
                  - key: option_1
                    value: Option 1
                    label_key: translations_category.setting_6_option_1
                  - key: option_2
                    value: Option 2
                    label_key: translations_category.setting_6_option_2
                  - key: option_3
                    value: Option 3
                    label_key: translations_category.setting_6_option_3
                  label_key: translations_category.setting_6_label
                  description_key: translations_category.setting_6_description
              label_key: translations_category.category_1_label
        - payload:
            category:
              settings:
                setting_key_1:
                  value: Value 1
                  type: string
                  required: true
                  label_key: translations_category.setting_1_label
                  description_key: translations_category.setting_1_description
                setting_key_2:
                  value: '100'
                  type: integer
                  range:
                    min: 0
                    max: 150
                  required: false
                  label_key: translations_category.setting_2_label
                  description_key: translations_category.setting_2_description
                setting_key_3:
                  value: '100.50'
                  type: number
                  range:
                    min: 1
                    max: 150
                  required: true
                  label_key: translations_category.setting_3_label
                  description_key: translations_category.setting_3_description
                setting_key_4:
                  value: 'true'
                  type: boolean
                  label_key: translations_category.setting_4_label
                  description_key: translations_category.setting_4_description
                setting_key_5:
                  value: option_1
                  type: select_single
                  options:
                  - key: option_1
                    value: Option 1
                    label_key: translations_category.setting_5_option_1
                  - key: option_2
                    value: Option 2
                    label_key: translations_category.setting_5_option_2
                  label_key: translations_category.translations_category.setting_5_label
                  description_key: translations_category.setting_5_description
                setting_key_6:
                  values:
                  - option_1
                  - option_2
                  type: select_multi
                  options:
                  - key: option_1
                    value: Option 1
                    label_key: translations_category.setting_6_option_1
                  - key: option_2
                    value: Option 2
                    label_key: translations_category.setting_6_option_2
                  - key: option_3
                    value: Option 3
                    label_key: translations_category.setting_6_option_3
                  label_key: translations_category.setting_6_label
                  description_key: translations_category.setting_6_description
              subcategories:
                category_2a:
                  settings: {}
                  label_key: translations_category.category_2a_label
              label_key: translations_category.category_2_label
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/settings/request:
    publish:
      summary: Request settings registrations
      description: 'Request all setting providers to register their settings using
        the topics below.

        '
      tags:
      - name: Settings
        description: All settings related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/settings/add:
    publish:
      summary: Add settings
      description: |
        Add settings with their default values.
        These default values will be used as long as they are not updated via <<zbos/settings/update>>
      tags:
      - name: Settings
        description: All settings related topics.
      message:
        payload:
          type: object
          properties:
            key:
              type: string
            category_name:
              type: string
            file:
              type: string
              description: Optional. Use either category or file
            category:
              type: object
              description: Optional. Use either category or file
              properties:
                label_key:
                  type: string
                  description: 'Translation key should use the dot notation: {category}.{key}'
                description_key:
                  type: string
                  description: |-
                    Optional description key
                    Translation key should use the dot notation: {category}.{key}
                settings:
                  type: object
                subcategories:
                  type: object
                  description: Optional subcategories
        name: AddSettingsRequest
        examples:
        - payload:
            key: abc
            category:
              settings:
                setting_key_1:
                  type: string
                  required: true
                  default_value: Value 1
                  label_key: translations_category.setting_1_label
                  description_key: translations_category.setting_1_description
                setting_key_2:
                  type: integer
                  range:
                    min: 0
                    max: 150
                  required: false
                  default_value: '100'
                  label_key: translations_category.setting_2_label
                  description_key: translations_category.setting_2_description
                setting_key_3:
                  type: number
                  range:
                    min: 1
                    max: 150
                  required: true
                  default_value: '100.50'
                  label_key: translations_category.setting_3_label
                  description_key: translations_category.setting_3_description
                setting_key_4:
                  type: boolean
                  default_value: 'true'
                  label_key: translations_category.setting_4_label
                  description_key: translations_category.setting_4_description
                setting_key_5:
                  type: select_single
                  options:
                  - key: option_1
                    value: Option 1
                    label_key: translations_category.setting_5_option_1
                  - key: option_2
                    value: Option 2
                    label_key: translations_category.setting_5_option_2
                  default_value: option_1
                  label_key: translations_category.translations_category.setting_5_label
                  description_key: translations_category.setting_5_description
                setting_key_6:
                  type: select_multi
                  options:
                  - key: option_1
                    value: Option 1
                    label_key: translations_category.setting_6_option_1
                  - key: option_2
                    value: Option 2
                    label_key: translations_category.setting_6_option_2
                  - key: option_3
                    value: Option 3
                    label_key: translations_category.setting_6_option_3
                  label_key: translations_category.setting_6_label
                  description_key: translations_category.setting_6_description
              label_key: translations_category.category_1_label
            category_name: category_1
        - payload:
            key: abc
            category:
              settings:
                setting_key_1:
                  type: string
                  required: true
                  default_value: Value 1
                  label_key: translations_category.setting_1_label
                  description_key: translations_category.setting_1_description
                setting_key_2:
                  type: integer
                  range:
                    min: 0
                    max: 150
                  required: false
                  default_value: '100'
                  label_key: translations_category.setting_2_label
                  description_key: translations_category.setting_2_description
                setting_key_3:
                  type: number
                  range:
                    min: 1
                    max: 150
                  required: true
                  default_value: '100.50'
                  label_key: translations_category.setting_3_label
                  description_key: translations_category.setting_3_description
                setting_key_4:
                  type: boolean
                  default_value: 'true'
                  label_key: translations_category.setting_4_label
                  description_key: translations_category.setting_4_description
                setting_key_5:
                  type: select_single
                  options:
                  - key: option_1
                    value: Option 1
                    label_key: translations_category.setting_5_option_1
                  - key: option_2
                    value: Option 2
                    label_key: translations_category.setting_5_option_2
                  default_value: option_1
                  label_key: translations_category.translations_category.setting_5_label
                  description_key: translations_category.setting_5_description
                setting_key_6:
                  type: select_multi
                  options:
                  - key: option_1
                    value: Option 1
                    label_key: translations_category.setting_6_option_1
                  - key: option_2
                    value: Option 2
                    label_key: translations_category.setting_6_option_2
                  - key: option_3
                    value: Option 3
                    label_key: translations_category.setting_6_option_3
                  label_key: translations_category.setting_6_label
                  description_key: translations_category.setting_6_description
              subcategories:
                category_2a:
                  settings: {}
                  label_key: translations_category.category_2a_label
              label_key: translations_category.category_2_label
            category_name: category_2
        - payload:
            key: abc
            file: path/to/file.json
            category_name: category_3
  zbos/settings/add/response/{key}:
    publish:
      summary: 'Response: Add settings'
      description: ''
      tags:
      - name: Settings
        description: All settings related topics.
      message:
        "$ref": "#/components/messages/successMessage"
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/settings/update:
    publish:
      summary: Update settings
      description: 'Update settings overriding the default values.

        '
      tags:
      - name: Settings
        description: All settings related topics.
      message:
        payload:
          type: object
          properties:
            key:
              type: string
            category_name:
              type: string
            category:
              type: object
              properties:
                settings:
                  type: object
                subcategories:
                  type: object
                  description: Optional subcategories
        name: UpdateSettingsRequest
        examples:
        - payload:
            key: abc
            category:
              settings:
                setting_key_1:
                  value: Value 1B
                setting_key_2:
                  value: '50'
                setting_key_3:
                  value: '110.20'
                setting_key_4:
                  value: 'false'
                setting_key_5:
                  value: option_2
                setting_key_6:
                  values:
                  - option_2
                  - option_3
              subcategories:
                category_1a:
                  settings:
                    setting_key_1a:
                      value: Value 1A
            category_name: category_1
  zbos/settings/update/response/{key}:
    publish:
      summary: 'Response: Update settings'
      description: ''
      tags:
      - name: Settings
        description: All settings related topics.
      message:
        "$ref": "#/components/messages/successMessage"
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/settings/changed/event/{category}:
    publish:
      summary: 'Event: Settings changed'
      description: ''
      tags:
      - name: Settings
        description: All settings related topics.
      message:
        payload:
          type: object
          properties:
            category_name:
              type: string
            category:
              type: object
              properties:
                settings:
                  type: object
                subcategories:
                  type: object
                  description: Optional subcategories
        name: SettingsChangedEvent
        examples:
        - payload:
            category:
              settings:
                setting_key_1:
                  type: string
                  value: Value 1
                setting_key_2:
                  type: integer
                  value: '100'
                setting_key_3:
                  type: number
                  value: '100.50'
                setting_key_4:
                  type: boolean
                  value: 'true'
                setting_key_5:
                  type: select_single
                  value: option_1
                  options:
                  - key: option_1
                    value: Option 1
                    label_key: translations_category.setting_5_option_1
                  - key: option_2
                    value: Option 2
                    label_key: translations_category.setting_5_option_2
                setting_key_6:
                  type: select_multi
                  values:
                  - option_1
                  - option_2
                  options:
                  - key: option_1
                    value: Option 1
                    label_key: translations_category.setting_6_option_1
                  - key: option_2
                    value: Option 2
                    label_key: translations_category.setting_6_option_2
                  - key: option_3
                    value: Option 3
                    label_key: translations_category.setting_6_option_3
            category_name: category_1
    parameters:
      category:
        description: ID of the settings category that was changed
        schema:
          type: string
  zbos/settings/reset:
    publish:
      summary: Reset settings
      description: 'Reset settings to their default values

        '
      tags:
      - name: Settings
        description: All settings related topics.
      message:
        payload:
          type: object
          properties:
            key:
              type: string
            category:
              type: string
        name: ResetSettingsRequest
        examples:
        - payload:
            key: abc
            category: category_1
  zbos/settings/reset/response/{key}:
    publish:
      summary: 'Response: Reset settings'
      description: ''
      tags:
      - name: Settings
        description: All settings related topics.
      message:
        "$ref": "#/components/messages/successMessage"
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/sip/config/event:
    subscribe:
      summary: SIP config changed
      description: ''
      tags:
      - name: SIP
        description: All sip related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/sip/errors/get:
    publish:
      summary: Get SIP errors
      description: 'see <<zbos/sip/errors/response/{key}>> for response

        '
      tags:
      - name: SIP
        description: All sip related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/sip/errors/response/{key}:
    subscribe:
      summary: 'response: SIP errors'
      description: ''
      tags:
      - name: SIP
        description: All sip related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              error:
                type: string
        name: Array<SipError>
        examples:
        - payload:
            error: string
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/sip/call/end:
    publish:
      summary: End the current SIP call
      description: ''
      tags:
      - name: SIP
        description: All sip related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/sip/call/end/event:
    subscribe:
      summary: The current SIP call has ended
      description: ''
      tags:
      - name: SIP
        description: All sip related topics.
      message:
        payload:
          type: object
          properties:
            success:
              type: boolean
        name: CallEndInfo
        examples:
        - payload:
            success: true
  zbos/slam/start:
    publish:
      summary: Start slam service
      description: 'see <<zbos/slam/start/response/{key}>> for response

        '
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/start/response/{key}:
    subscribe:
      summary: 'response: Start slam'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/slam/stop:
    publish:
      summary: Stop slam service
      description: 'see <<zbos/slam/stop/response/{key}>> for response

        '
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/stop/response/{key}:
    subscribe:
      summary: 'response: Stop slam'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/slam/error:
    subscribe:
      summary: ERROR in Slam
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            errorCode:
              type: string
            message:
              type: string
        name: SlamError
        examples:
        - payload:
            errorCode: String
            message: string
  zbos/slam/collision/start/event:
    subscribe:
      summary: One or more collisions have started
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
              type:
                type: object
                properties:
                  name:
                    type: string
                  ordinal:
                    type: integer
                enum:
                - TOUCHSENSOR
                - TOUCHSENSOR_GROUP
              translationkey:
                type: string
        name: Array<AvailableSensor>
        examples:
        - payload:
            id: string
            type: TOUCHSENSOR
            translationkey: string
  zbos/slam/collision/end/event:
    subscribe:
      summary: One or more collisions have stopped
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
              type:
                type: object
                properties:
                  name:
                    type: string
                  ordinal:
                    type: integer
                enum:
                - TOUCHSENSOR
                - TOUCHSENSOR_GROUP
              translationkey:
                type: string
        name: Array<AvailableSensor>
        examples:
        - payload:
            id: string
            type: TOUCHSENSOR
            translationkey: string
  zbos/slam/status/get:
    publish:
      summary: Get SLAM status
      description: 'see <<zbos/slam/status/response/{key}>> for response

        '
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/slam/status/response/{key}:
    subscribe:
      summary: 'response: Get SLAM status'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            mappingConfigurable:
              type: boolean
            mappingEnabled:
              type: boolean
        name: SlamStatus
        examples:
        - payload:
            mappingConfigurable: true
            mappingEnabled: true
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/slam/status/event:
    subscribe:
      summary: 'event: Status SLAM'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            mappingConfigurable:
              type: boolean
            mappingEnabled:
              type: boolean
        name: SlamStatus
        examples:
        - payload:
            mappingConfigurable: true
            mappingEnabled: true
  zbos/slam/mapview/clear:
    publish:
      summary: Clear current map view
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/mapview/clear/event:
    subscribe:
      summary: 'event: Map view cleared'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/mapview/current:
    subscribe:
      summary: 'event: Map view changed'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: string
        name: String
  zbos/slam/mapview/current/get:
    publish:
      summary: Get current map view
      description: 'see <<zbos/slam/mapview/current/response/{key}>> for response

        '
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/slam/mapview/current/response/{key}:
    subscribe:
      summary: 'response: Get current map view'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            mapName:
              type: string
            data:
              type: string
        name: RemoteMapResponseObject
        examples:
        - payload:
            mapName: string
            data: string
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/slam/mapping/enable:
    publish:
      summary: Enable SLAM mapping
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/mapping/disable:
    publish:
      summary: Disable SLAM mapping
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/mapping/extend/start:
    publish:
      summary: Start extending SLAM mapping
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/mapping/extend/cancel:
    publish:
      summary: Stop extending SLAM mapping
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/mapping/extend/get:
    publish:
      summary: Get extending SLAM mapping
      description: 'see <<zbos/slam/mapping/extend/response/{key}>> for response

        '
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/slam/mapping/extend/response/{key}:
    subscribe:
      summary: 'response: Get extending SLAM mapping'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: string
        name: String
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/slam/mapping/extend/started:
    subscribe:
      summary: 'event: SLAM mapping extending started'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/mapping/extend/stopped:
    subscribe:
      summary: 'event: SLAM mapping extending stopped'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/mapping/extend/failed:
    subscribe:
      summary: 'event: SLAM mapping extending failed'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/mapping/extend/canceled:
    subscribe:
      summary: 'event: SLAM mapping extending canceled'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/maps/list/get:
    publish:
      summary: Get maps
      description: 'see <<zbos/slam/maps/list/response/{key}>> for response

        '
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/slam/maps/list/response/{key}:
    subscribe:
      summary: 'event: Get all maps'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: array
          items:
            type: string
        name: Array<String>
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/slam/maps/get/current:
    publish:
      summary: Get current maps
      description: 'see <<zbos/slam/maps/get/current/response/{key}>> for response

        '
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/slam/maps/get/current/response/{key}:
    subscribe:
      summary: 'event: Get current maps'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            mapName:
              type: string
            poiList:
              type: array
              items:
                type: object
                properties:
                  name:
                    type: string
                  uuid:
                    type: string
                  type:
                    type: object
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - DEFAULT
                    - CHARGING_STATION
                    - INTERACTIVE
                  coordinate:
                    type: object
                    properties:
                      x:
                        type: number
                      y:
                        type: number
                      rotation:
                        type: number
                      rawX:
                        type: number
                      rawY:
                        type: number
                  inAction:
                    type: object
                    properties:
                      actionType:
                        type: object
                        properties:
                          name:
                            type: string
                          ordinal:
                            type: integer
                        enum:
                        - MQTT
                        - API
                      radius:
                        type: number
                      target:
                        type: string
                        description: Mqtt topic or API url
                      data:
                        type: string
                        description: Mqtt payload or post body
                  outAction:
                    type: object
                    properties:
                      actionType:
                        type: object
                        properties:
                          name:
                            type: string
                          ordinal:
                            type: integer
                        enum:
                        - MQTT
                        - API
                      radius:
                        type: number
                      target:
                        type: string
                        description: Mqtt topic or API url
                      data:
                        type: string
                        description: Mqtt payload or post body
        name: SlamMap
        examples:
        - payload:
            mapName: string
            poiList:
            - name: string
              uuid: string
              type: DEFAULT
              coordinate:
                x: 15
                y: 15
                rotation: 90
                rawX: 14.8
                rawY: 15.4
              inAction:
                actionType: MQTT
                radius: 270
                target: string
                data: string
              outAction:
                actionType: MQTT
                radius: 270
                target: string
                data: string
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/slam/maps/load:
    publish:
      summary: Load map
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: string
        name: String
        examples:
        - payload: string
  zbos/slam/maps/load/event:
    subscribe:
      summary: 'event: Load map'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/maps/save:
    publish:
      summary: Save map
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: string
        name: String
        examples:
        - payload: string
  zbos/slam/maps/save/event:
    subscribe:
      summary: 'event: Save map'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/maps/delete:
    publish:
      summary: Delete map
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: string
        name: String
        examples:
        - payload: string
  zbos/slam/maps/delete/all:
    publish:
      summary: Deletes all maps
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/maps/delete/event:
    subscribe:
      summary: 'event: Delete map'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/location/current:
    subscribe:
      summary: 'event: Location changed'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            x:
              type: number
            y:
              type: number
            rotation:
              type: number
            rawX:
              type: number
            rawY:
              type: number
        name: ZbosLocation
        examples:
        - payload:
            x: 15
            y: 15
            rotation: 90
            rawX: 14.8
            rawY: 15.4
  zbos/slam/location/current/get:
    publish:
      summary: Get robot location
      description: 'see <<zbos/slam/location/current/response/{key}>> for response

        '
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/slam/location/current/response/{key}:
    subscribe:
      summary: 'response: Get robot location'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            x:
              type: number
            y:
              type: number
            rotation:
              type: number
            rawX:
              type: number
            rawY:
              type: number
        name: ZbosLocation
        examples:
        - payload:
            x: 15
            y: 15
            rotation: 90
            rawX: 14.8
            rawY: 15.4
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/slam/location/current/set:
    publish:
      summary: Set robot location
      description: 'see <<zbos/slam/location/current/set/response/{key}>> for response

        '
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            key:
              type: string
              description: Required random key
            coordinate:
              type: object
              properties:
                x:
                  type: number
                y:
                  type: number
                rotation:
                  type: number
                rawX:
                  type: number
                rawY:
                  type: number
        name: ZbosSetLocationRequest
        examples:
        - payload:
            key: string
            coordinate:
              x: 15
              y: 15
              rotation: 90
              rawX: 14.8
              rawY: 15.4
  zbos/slam/location/current/set/response/{key}:
    subscribe:
      summary: 'response: Set robot location'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/slam/location/recover:
    publish:
      summary: Recover robot location
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/location/recover/started:
    subscribe:
      summary: Location revocery started
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/location/recover/stopped:
    subscribe:
      summary: Location revocery stopped
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/location/recover/failed:
    subscribe:
      summary: Location revocery failed
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/location/reset/chargingstation:
    publish:
      summary: Reset robot to charging station
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/location/reset/chargingstation/started:
    subscribe:
      summary: Reset robot to charging station started
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/location/reset/chargingstation/stopped:
    subscribe:
      summary: Reset robot to charging station stopped
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/location/home:
    subscribe:
      summary: Home location changed
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            x:
              type: number
            y:
              type: number
            rotation:
              type: number
            rawX:
              type: number
            rawY:
              type: number
        name: ZbosLocation
        examples:
        - payload:
            x: 15
            y: 15
            rotation: 90
            rawX: 14.8
            rawY: 15.4
  zbos/slam/location/home/get:
    publish:
      summary: Get home location
      description: 'see <<zbos/slam/location/home/response/{key}>> for response

        '
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/slam/location/home/response/{key}:
    subscribe:
      summary: 'response: Get home location'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            x:
              type: number
            y:
              type: number
            rotation:
              type: number
            rawX:
              type: number
            rawY:
              type: number
        name: ZbosLocation
        examples:
        - payload:
            x: 15
            y: 15
            rotation: 90
            rawX: 14.8
            rawY: 15.4
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/slam/walls/clear:
    publish:
      summary: clear all walls
      description: 'Save is optional, if false, then the map will not be saved. By
        default the map will be saved.

        '
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            save:
              type: boolean
        name: WallClearRequest
        examples:
        - payload:
            save: true
  zbos/slam/walls/clear/event:
    subscribe:
      summary: 'response: Clear all walls'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/walls/current:
    subscribe:
      summary: Walls changed
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: string
        name: String
  zbos/slam/walls/current/get:
    publish:
      summary: Get current walls
      description: 'see <<zbos/slam/walls/current/response/{key}>> for response

        '
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/slam/walls/current/response/{key}:
    subscribe:
      summary: 'response: Get current walls'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              startPoint:
                type: object
                properties:
                  x:
                    type: number
                  y:
                    type: number
              endPoint:
                type: object
                properties:
                  x:
                    type: number
                  y:
                    type: number
              segmentId:
                type: string
              save:
                type: boolean
        name: Array<Wall>
        examples:
        - payload:
            startPoint:
              x: 1
              y: 1
            endPoint:
              x: 5
              y: 5
            segmentId: string
            save: true
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/slam/walls/add:
    publish:
      summary: Add wall
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            startPoint:
              type: object
              properties:
                x:
                  type: number
                y:
                  type: number
            endPoint:
              type: object
              properties:
                x:
                  type: number
                y:
                  type: number
            segmentId:
              type: string
            save:
              type: boolean
        name: Wall
        examples:
        - payload:
            startPoint:
              x: 1
              y: 1
            endPoint:
              x: 5
              y: 5
            segmentId: string
            save: true
  zbos/slam/walls/add/event:
    subscribe:
      summary: 'event: Add wall'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            startPoint:
              type: object
              properties:
                x:
                  type: number
                y:
                  type: number
            endPoint:
              type: object
              properties:
                x:
                  type: number
                y:
                  type: number
            segmentId:
              type: string
            save:
              type: boolean
        name: Wall
        examples:
        - payload:
            startPoint:
              x: 1
              y: 1
            endPoint:
              x: 5
              y: 5
            segmentId: string
            save: true
  zbos/slam/walls/remove:
    publish:
      summary: Remove wall
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            segmentId:
              type: integer
            save:
              type: boolean
        name: WallRemoveRequest
        examples:
        - payload:
            segmentId: 5
            save: true
  zbos/slam/walls/remove/multiple:
    publish:
      summary: Remove walls
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              segmentId:
                type: integer
              save:
                type: boolean
        name: Array<WallRemoveRequest>
        examples:
        - payload:
          - segmentId: 5
            save: true
          - segmentId: 7
            save: true
  zbos/slam/walls/remove/event:
    subscribe:
      summary: 'event: Remove wall'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/walls/update:
    publish:
      summary: Update wall
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            startPoint:
              type: object
              properties:
                x:
                  type: number
                y:
                  type: number
            endPoint:
              type: object
              properties:
                x:
                  type: number
                y:
                  type: number
            segmentId:
              type: string
            save:
              type: boolean
        name: Wall
        examples:
        - payload:
            startPoint:
              x: 1
              y: 1
            endPoint:
              x: 5
              y: 5
            segmentId: string
            save: true
  zbos/slam/walls/update/multiple:
    publish:
      summary: Update walls
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              startPoint:
                type: object
                properties:
                  x:
                    type: number
                  y:
                    type: number
              endPoint:
                type: object
                properties:
                  x:
                    type: number
                  y:
                    type: number
              segmentId:
                type: string
              save:
                type: boolean
        name: Array<Wall>
        examples:
        - payload:
          - startPoint:
              x: 1
              y: 1
            endPoint:
              x: 5
              y: 5
            segmentId: string
            save: true
          - startPoint:
              x: 10
              y: 5
            endPoint:
              x: 20
              y: 10
            segmentId: another_id
            save: true
  zbos/slam/walls/update/event:
    subscribe:
      summary: 'event: Update wall'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            startPoint:
              type: object
              properties:
                x:
                  type: number
                y:
                  type: number
            endPoint:
              type: object
              properties:
                x:
                  type: number
                y:
                  type: number
            segmentId:
              type: string
            save:
              type: boolean
        name: Wall
        examples:
        - payload:
            startPoint:
              x: 1
              y: 1
            endPoint:
              x: 5
              y: 5
            segmentId: string
            save: true
  zbos/slam/interaction/moveto:
    publish:
      summary: Move robot to coordinates
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            mapName:
              type: string
            coordinate:
              type: object
              properties:
                x:
                  type: number
                y:
                  type: number
        name: ZbosMoveToPointRequest
        examples:
        - payload:
            mapName: First floor
            coordinate:
              x: 39
              y: 40
  zbos/slam/interaction/moveto/started:
    subscribe:
      summary: MoveTo started
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: string
        name: String
  zbos/slam/interaction/moveto/stopped:
    subscribe:
      summary: MoveTo stopped
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: string
        name: String
  zbos/slam/interaction/moveto/failed:
    subscribe:
      summary: MoveTo failed
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: string
        name: String
  zbos/slam/interaction/moveto/aborted:
    subscribe:
      summary: MoveTo aborted
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: string
        name: String
  zbos/slam/interaction/moveto/blocked:
    subscribe:
      summary: MoveTo Blocked
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: string
        name: String
  zbos/slam/interaction/moveto/retrying:
    subscribe:
      summary: MoveTo retrying
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: string
        name: String
  zbos/slam/interaction/stop:
    publish:
      summary: Stop moving
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/interaction/stop/event:
    subscribe:
      summary: 'event: Movement stopped'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/laserscan/enable:
    publish:
      summary: Enable laserscan
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/laserscan/disable:
    publish:
      summary: disable laserscan
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/laserscan/current:
    subscribe:
      summary: 'event: Laserscan changed'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            angle:
              type: number
            distance:
              type: number
        name: ZbosLaserScan
        examples:
        - payload:
            angle: 0
            distance: 15
  zbos/slam/poi/current:
    subscribe:
      summary: 'event: POI changed'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            mapName:
              type: string
            poiList:
              type: array
              items:
                type: object
                properties:
                  name:
                    type: string
                  uuid:
                    type: string
                  type:
                    type: object
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - DEFAULT
                    - CHARGING_STATION
                    - INTERACTIVE
                  coordinate:
                    type: object
                    properties:
                      x:
                        type: number
                      y:
                        type: number
                      rotation:
                        type: number
                      rawX:
                        type: number
                      rawY:
                        type: number
                  inAction:
                    type: object
                    properties:
                      actionType:
                        type: object
                        properties:
                          name:
                            type: string
                          ordinal:
                            type: integer
                        enum:
                        - MQTT
                        - API
                      radius:
                        type: number
                      target:
                        type: string
                        description: Mqtt topic or API url
                      data:
                        type: string
                        description: Mqtt payload or post body
                  outAction:
                    type: object
                    properties:
                      actionType:
                        type: object
                        properties:
                          name:
                            type: string
                          ordinal:
                            type: integer
                        enum:
                        - MQTT
                        - API
                      radius:
                        type: number
                      target:
                        type: string
                        description: Mqtt topic or API url
                      data:
                        type: string
                        description: Mqtt payload or post body
        name: SlamMap
        examples:
        - payload:
            mapName: First floor
            poiList:
            - name: string
              uuid: string
              type: DEFAULT
              coordinate:
                x: 15
                y: 15
                rotation: 90
                rawX: 14.8
                rawY: 15.4
              inAction:
                actionType: MQTT
                radius: 270
                target: string
                data: string
              outAction:
                actionType: MQTT
                radius: 270
                target: string
                data: string
  zbos/slam/poi/clear:
    publish:
      summary: Clear all pois
      description: 'Save is optional, if false, then the map will not be saved. By
        default the map will be saved.

        '
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            mapName:
              type: string
            save:
              type: boolean
        name: ZbosClearPoiRequest
        examples:
        - payload:
            mapName: First floor
            save: true
  zbos/slam/poi/clear/event:
    subscribe:
      summary: 'event: Clear all pois'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/poi/list/all/get:
    publish:
      summary: Get list of pois for all maps
      description: 'see <<zbos/slam/poi/list/all/response/{key}>> for response

        '
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/slam/poi/list/all/response/{key}:
    subscribe:
      summary: 'event: Get list of pois for all maps'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              mapName:
                type: string
              poiList:
                type: array
                items:
                  type: object
                  properties:
                    name:
                      type: string
                    uuid:
                      type: string
                    type:
                      type: object
                      properties:
                        name:
                          type: string
                        ordinal:
                          type: integer
                      enum:
                      - DEFAULT
                      - CHARGING_STATION
                      - INTERACTIVE
                    coordinate:
                      type: object
                      properties:
                        x:
                          type: number
                        y:
                          type: number
                        rotation:
                          type: number
                        rawX:
                          type: number
                        rawY:
                          type: number
                    inAction:
                      type: object
                      properties:
                        actionType:
                          type: object
                          properties:
                            name:
                              type: string
                            ordinal:
                              type: integer
                          enum:
                          - MQTT
                          - API
                        radius:
                          type: number
                        target:
                          type: string
                          description: Mqtt topic or API url
                        data:
                          type: string
                          description: Mqtt payload or post body
                    outAction:
                      type: object
                      properties:
                        actionType:
                          type: object
                          properties:
                            name:
                              type: string
                            ordinal:
                              type: integer
                          enum:
                          - MQTT
                          - API
                        radius:
                          type: number
                        target:
                          type: string
                          description: Mqtt topic or API url
                        data:
                          type: string
                          description: Mqtt payload or post body
        name: Array<SlamMap>
        examples:
        - payload:
            mapName: First floor
            poiList:
            - name: string
              uuid: string
              type: DEFAULT
              coordinate:
                x: 15
                y: 15
                rotation: 90
                rawX: 14.8
                rawY: 15.4
              inAction:
                actionType: MQTT
                radius: 270
                target: string
                data: string
              outAction:
                actionType: MQTT
                radius: 270
                target: string
                data: string
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/slam/poi/list/get:
    publish:
      summary: Get list of pois for current map
      description: 'see <<zbos/slam/poi/list/response/{key}>> for response

        '
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            key:
              type: string
              description: Required random key
            mapName:
              type: string
        name: ZbosMapDetailRequest
        examples:
        - payload:
            key: _dfse
            mapName: First floor
  zbos/slam/poi/list/response/{key}:
    subscribe:
      summary: 'event: Get list of pois for current map'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            mapName:
              type: string
            poiList:
              type: array
              items:
                type: object
                properties:
                  name:
                    type: string
                  uuid:
                    type: string
                  type:
                    type: object
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - DEFAULT
                    - CHARGING_STATION
                    - INTERACTIVE
                  coordinate:
                    type: object
                    properties:
                      x:
                        type: number
                      y:
                        type: number
                      rotation:
                        type: number
                      rawX:
                        type: number
                      rawY:
                        type: number
                  inAction:
                    type: object
                    properties:
                      actionType:
                        type: object
                        properties:
                          name:
                            type: string
                          ordinal:
                            type: integer
                        enum:
                        - MQTT
                        - API
                      radius:
                        type: number
                      target:
                        type: string
                        description: Mqtt topic or API url
                      data:
                        type: string
                        description: Mqtt payload or post body
                  outAction:
                    type: object
                    properties:
                      actionType:
                        type: object
                        properties:
                          name:
                            type: string
                          ordinal:
                            type: integer
                        enum:
                        - MQTT
                        - API
                      radius:
                        type: number
                      target:
                        type: string
                        description: Mqtt topic or API url
                      data:
                        type: string
                        description: Mqtt payload or post body
        name: SlamMap
        examples:
        - payload:
            mapName: First floor
            poiList:
            - name: string
              uuid: string
              type: DEFAULT
              coordinate:
                x: 15
                y: 15
                rotation: 90
                rawX: 14.8
                rawY: 15.4
              inAction:
                actionType: MQTT
                radius: 270
                target: string
                data: string
              outAction:
                actionType: MQTT
                radius: 270
                target: string
                data: string
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/slam/poi/add:
    publish:
      summary: Add poi
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            mapName:
              type: string
            poi:
              type: object
              properties:
                name:
                  type: string
                uuid:
                  type: string
                type:
                  type: object
                  properties:
                    name:
                      type: string
                    ordinal:
                      type: integer
                  enum:
                  - DEFAULT
                  - CHARGING_STATION
                  - INTERACTIVE
                coordinate:
                  type: object
                  properties:
                    x:
                      type: number
                    y:
                      type: number
                    rotation:
                      type: number
                    rawX:
                      type: number
                    rawY:
                      type: number
                inAction:
                  type: object
                  properties:
                    actionType:
                      type: object
                      properties:
                        name:
                          type: string
                        ordinal:
                          type: integer
                      enum:
                      - MQTT
                      - API
                    radius:
                      type: number
                    target:
                      type: string
                      description: Mqtt topic or API url
                    data:
                      type: string
                      description: Mqtt payload or post body
                outAction:
                  type: object
                  properties:
                    actionType:
                      type: object
                      properties:
                        name:
                          type: string
                        ordinal:
                          type: integer
                      enum:
                      - MQTT
                      - API
                    radius:
                      type: number
                    target:
                      type: string
                      description: Mqtt topic or API url
                    data:
                      type: string
                      description: Mqtt payload or post body
            save:
              type: boolean
        name: ZbosAddPoiRequest
        examples:
        - payload:
            mapName: First floor
            poi:
              name: Home
              uuid: string
              type: DEFAULT
              coordinate:
                x: 15
                y: 15
                rotation: 90
            save: false
  zbos/slam/poi/add/event:
    subscribe:
      summary: 'event: Add poi'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            name:
              type: string
            uuid:
              type: string
            type:
              type: object
              properties:
                name:
                  type: string
                ordinal:
                  type: integer
              enum:
              - DEFAULT
              - CHARGING_STATION
              - INTERACTIVE
            coordinate:
              type: object
              properties:
                x:
                  type: number
                y:
                  type: number
                rotation:
                  type: number
                rawX:
                  type: number
                rawY:
                  type: number
            inAction:
              type: object
              properties:
                actionType:
                  type: object
                  properties:
                    name:
                      type: string
                    ordinal:
                      type: integer
                  enum:
                  - MQTT
                  - API
                radius:
                  type: number
                target:
                  type: string
                  description: Mqtt topic or API url
                data:
                  type: string
                  description: Mqtt payload or post body
            outAction:
              type: object
              properties:
                actionType:
                  type: object
                  properties:
                    name:
                      type: string
                    ordinal:
                      type: integer
                  enum:
                  - MQTT
                  - API
                radius:
                  type: number
                target:
                  type: string
                  description: Mqtt topic or API url
                data:
                  type: string
                  description: Mqtt payload or post body
        name: Poi
        examples:
        - payload:
            name: string
            uuid: string
            type: DEFAULT
            coordinate:
              x: 15
              y: 15
              rotation: 90
  zbos/slam/poi/edit:
    publish:
      summary: Edit poi
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            mapName:
              type: string
            poi:
              type: object
              properties:
                name:
                  type: string
                uuid:
                  type: string
                type:
                  type: object
                  properties:
                    name:
                      type: string
                    ordinal:
                      type: integer
                  enum:
                  - DEFAULT
                  - CHARGING_STATION
                  - INTERACTIVE
                coordinate:
                  type: object
                  properties:
                    x:
                      type: number
                    y:
                      type: number
                    rotation:
                      type: number
                    rawX:
                      type: number
                    rawY:
                      type: number
                inAction:
                  type: object
                  properties:
                    actionType:
                      type: object
                      properties:
                        name:
                          type: string
                        ordinal:
                          type: integer
                      enum:
                      - MQTT
                      - API
                    radius:
                      type: number
                    target:
                      type: string
                      description: Mqtt topic or API url
                    data:
                      type: string
                      description: Mqtt payload or post body
                outAction:
                  type: object
                  properties:
                    actionType:
                      type: object
                      properties:
                        name:
                          type: string
                        ordinal:
                          type: integer
                      enum:
                      - MQTT
                      - API
                    radius:
                      type: number
                    target:
                      type: string
                      description: Mqtt topic or API url
                    data:
                      type: string
                      description: Mqtt payload or post body
            save:
              type: boolean
        name: ZbosEditPoiRequest
        examples:
        - payload:
            mapName: First floor
            poi:
              name: Home
              uuid: string
              type: DEFAULT
              coordinate:
                x: 15
                y: 15
                rotation: 90
            save: false
  zbos/slam/poi/edit/event:
    subscribe:
      summary: 'event: Edit poi'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/poi/remove/name:
    publish:
      summary: Remove poi by name
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            mapName:
              type: string
            name:
              type: string
            save:
              type: boolean
        name: ZbosRemovePoiByNameRequest
        examples:
        - payload:
            mapName: First floor
            name: Home
            save: false
  zbos/slam/poi/remove/name/event:
    subscribe:
      summary: 'event: Remove poi by name'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/poi/remove/uuid:
    publish:
      summary: Remove poi by uuid
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            mapName:
              type: string
            uuid:
              type: string
            save:
              type: boolean
        name: ZbosRemovePoiByUUIDRequest
        examples:
        - payload:
            mapName: First floor
            uuid: abcd-qsdf-qsdfd-qsdf
            save: false
  zbos/slam/poi/remove/uuid/event:
    subscribe:
      summary: 'event: Remove poi by uuid'
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/poi/moveto/uuid:
    publish:
      summary: Move robot to poi
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            mapName:
              type: string
            uuid:
              type: string
            speed:
              type: integer
              "$ref": "#/components/schemas/percentage"
        name: ZbosMoveToPoiByUUIDRequest
        examples:
        - payload:
            mapName: First floor
            uuid: abcd-qsdf-qsdfd-qsdf
            speed: 50
  zbos/slam/path/remaining/current:
    subscribe:
      summary: Path remaining changed
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        payload:
          type: object
          properties:
            remainingPathPoints:
              type: array
              items:
                type: object
                properties:
                  x:
                    type: number
                  y:
                    type: number
                  z:
                    type: number
            remainingMilestones:
              type: array
              items:
                type: object
                properties:
                  x:
                    type: number
                  y:
                    type: number
                  z:
                    type: number
        name: ZbosRemainingPathObject
        examples:
        - payload:
            remainingPathPoints:
            - x: 50
              y: 35
              z: 1
            remainingMilestones:
            - x: 50
              y: 35
              z: 1
  zbos/slam/charging/required/started:
    subscribe:
      summary: Charging required
      description: 'Is published when battery is low/critical to indicate the robot
        is going to try charge itself.

        '
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/charging/required/stopped:
    subscribe:
      summary: Battery is not critical
      description: 'Is published when robot has stopped charging itself

        '
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/charging/goto:
    publish:
      summary: Go to charging station
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/charging/goto/started:
    subscribe:
      summary: Move to charging station started
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/charging/goto/stopped:
    subscribe:
      summary: Move to charging station stopped
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/charging/goto/failed:
    subscribe:
      summary: Move to charging station failed
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/docking/undock/start:
    publish:
      summary: Undock
      description: 'Leave charging station

        '
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/docking/undock/started:
    subscribe:
      summary: Undocking started
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/docking/undock/finished:
    subscribe:
      summary: Undocking finished
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/slam/docking/undock/failed:
    subscribe:
      summary: Undocking failed
      description: ''
      tags:
      - name: SLAM
        description: All slam related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/languages/available/get:
    publish:
      summary: Get available languages
      description: 'Legacy topic for getting all installed languages (both tts and
        asr combined). Better not to use this.see <<zbos/dialog/languages/available/response/{key}>>
        for response

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/dialog/languages/available/response/{key}:
    subscribe:
      summary: 'response: Get available languages'
      description: 'response: Legacy topic for getting all installed languages (both
        tts and asr combined)

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: array
          items:
            type: string
        name: Array<String>
        examples:
        - payload: en-US
        - payload: nl-BE
        - payload: fr-FR
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/dialog/languages/current/get:
    publish:
      summary: Get current language
      description: 'see <<zbos/dialog/languages/current/response/{key}>> for response

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/dialog/languages/current/response/{key}:
    subscribe:
      summary: 'response: Get current language'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: string
        name: String
        examples:
        - payload: en-US
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/dialog/languages/current/set:
    publish:
      summary: Set current language
      description: 'Set the active language, example: ''en-US''. Note: this will be
        probably be changed to <<zbos/dialog/set/language>> in a future release.

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: string
        name: String
        examples:
        - payload: en-US
  zbos/dialog/set/message:
    publish:
      summary: Speak a message
      description: 'Use this to make the robot say something.

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: string
        name: String
        examples:
        - payload: Hello world
  zbos/dialog/set:
    publish:
      summary: Speak a message with parameters
      description: 'Use this to make the robot say something with parameters. Only
        message is required, other params are optional.

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: object
          properties:
            requestId:
              type: string
            message:
              type: string
            speed:
              type: integer
            language:
              type: string
              description: Language string like "en-US"
            volume:
              type: integer
            gesticulation:
              type: boolean
            voice:
              type: string
            pitch:
              type: integer
            blocking:
              type: boolean
        name: DialogOptions
        examples:
        - payload:
            requestId: '1'
            message: Hello world
            speed: 50
            language: en-US
            volume: 50
            gesticulation: true
            voice: Ava
            pitch: 120
  zbos/dialog/languages/current/event:
    subscribe:
      summary: 'event: Current language'
      description: 'Event when the system is done with changing language to a new
        language.

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: string
        name: String
        examples:
        - payload: en-US
  zbos/dialog/animatedspeech/enable:
    publish:
      summary: Enable animated speech
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/animatedspeech/disable:
    publish:
      summary: Disable animated speech
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/animatedspeech/get:
    publish:
      summary: Get status of animated speech
      description: 'see <<zbos/dialog/animatedspeech/response/{key}>> for response

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/dialog/animatedspeech/response/{key}:
    subscribe:
      summary: 'response: Get status of animated speech'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: boolean
        name: Boolean
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/dialog/tts/start:
    publish:
      summary: 'event: TTS started'
      description: 'Event when the robot starts speaking and what it is saying

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: string
        name: String
        examples:
        - payload: Hi, my name is James
  zbos/dialog/pause/hotword:
    publish:
      summary: pause hotword recognition
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/resume/hotword:
    publish:
      summary: resume hotword recognition
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/tts/end:
    subscribe:
      summary: 'event: TTS ended'
      description: 'Event when the robot has finished speaking

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: string
        name: String
  zbos/event/dialog/listen/started:
    subscribe:
      summary: 'event: robot starts listening'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/event/dialog/listen/stopped:
    subscribe:
      summary: 'event: robot stops listening'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/listen/start:
    publish:
      summary: Start listening
      description: 'Start listening for hotword and commands

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/listen/stop:
    publish:
      summary: Stop listening
      description: 'Cancel hotword recognition

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/service/start:
    publish:
      summary: Start dialog service
      description: 'Start the dialog service so the robot can listen to the mic.

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/service/stop:
    publish:
      summary: Stop dialog service
      description: 'Stop the dialog service so the mic is free to use by other applications.

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/service/stopped:
    subscribe:
      summary: 'Event: dialog service stopped'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/service/started:
    subscribe:
      summary: 'Event: dialog service started'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/iflytek/rotation/started:
    subscribe:
      summary: Iflytek rotation started
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/iflytek/rotation/stopped:
    subscribe:
      summary: Iflytek rotation stopped
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/tts/phonemereached:
    subscribe:
      summary: event. Phoneme reached
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: object
          properties:
            jawOpen:
              type: boolean
            lipTension:
              type: integer
            mouthHeight:
              type: integer
            mouthUpturn:
              type: integer
            mouthWidth:
              type: integer
            teethLowerVisible:
              type: integer
            teethUpperVisible:
              type: integer
            tonguePosition:
              type: integer
        name: PhonemeInfo
        examples:
        - payload:
            jawOpen: false
            lipTension: 0
            mouthHeight: 10
            mouthUpturn: 0
            mouthWidth: 5
            teethLowerVisible: 1
            teethUpperVisible: 1
            tonguePosition: 1
  zbos/dialog/grammars/add/multiple:
    publish:
      summary: 'Grammars: add multiple'
      description: 'This is an extension for the grammar add topic. It removes all
        grammars first and then triggers a single platform reload. Hence grammars
        are added a lot faster.see <<zbos/dialog/grammars/add/response>> for response

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
                description: a unique id of the grammar. This must be unique among
                  the application (next field).
              app:
                type: string
                description: The application name. This will be used to determined
                  which MQTT topic will be used to post the json output to.
              continuous:
                type: boolean
              input:
                type: object
                description: Contains an array for each language with all the possible
                  sentences. The sentences need to be in a format that the speech
                  software understands.
              variables:
                type: object
        name: Array<CustomGrammar>
        examples:
        - payload:
            id: question_1_variable
            app: App
            continuous: true
            input:
              nl-BE:
              - Ken jij $name
              en-US:
              - Do you know $name
            variables:
              name:
                nl-BE:
                - input: Arno
                  data: name_in_dutch
                - input: Gilles
                  data: name_in_dutch
                en-US:
                - input: Arno
                  data: name_in_english
                - input: Gilles
                  data: name_in_english
  zbos/dialog/grammars/add/response:
    subscribe:
      summary: 'response: grammar add'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/successMessage"
  zbos/dialog/grammars/remove/multiple:
    publish:
      summary: 'Grammars: remove multiple'
      description: 'This is an extension for the grammar remove topic. It removes
        all grammars first and then triggers a single platform reload. Hence grammars
        are removed a lot faster.see <<zbos/dialog/grammars/remove/response>> for
        response

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
                description: a unique id of the grammar. This must be unique among
                  the application (next field).
              app:
                type: string
                description: The application name. This will be used to determined
                  which MQTT topic will be used to post the json output to.
              continuous:
                type: boolean
              input:
                type: object
                description: Contains an array for each language with all the possible
                  sentences. The sentences need to be in a format that the speech
                  software understands.
              variables:
                type: object
        name: Array<CustomGrammar>
        examples:
        - payload:
            id: id send in add
            app: app from add
  zbos/dialog/grammars/remove/response:
    subscribe:
      summary: 'response: grammar add'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/successMessage"
  zbos/dialog/grammars/match/{appId}:
    publish:
      summary: 'Event: grammar match'
      description: "Event when a custom grammar match is found, the output data is
        posted here. \n"
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: object
          properties:
            app:
              type: string
            triggered-by:
              type: string
              description: The id of the grammer that has matched with the user input.
                This is the id from the input json.
            language:
              type: string
              description: Language that speech software was configured in when the
                sentence is recognised.
            variables:
              type: object
        name: GrammarMatch
        examples:
        - payload:
            app: food_pair_question_2_variable
            id: input ID
            language: en-US
            variables:
              beverage:
                input: Wine
                data: this is wine
              dish:
                input: hamburger
                data: this is a hamburger
    parameters:
      appId:
        description: Should be replaced by the app id used in the 'zbos/dialog/grammars/add/multiple'
          topic
        schema:
          type: string
  zbos/dialog/custom/grammar/rules/get:
    publish:
      summary: Gets all custom grammar rules
      description: 'see <<zbos/dialog/custom/grammar/rules/get/response>> for response

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/dialog/custom/grammar/rules/get/response:
    subscribe:
      summary: 'response: Get all custom grammar rules'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: array
          items:
            type: string
        name: Array<String>
  zbos/dialog/tts/languages/get:
    publish:
      summary: Get TTS languages
      description: 'Get a list of languages that the TTS engine can use to talk.see
        <<zbos/dialog/tts/languages/response/{key}>> for response

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/dialog/tts/languages/response/{key}:
    subscribe:
      summary: 'response: TTS languages list'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: string
        name: String
        examples:
        - payload: BE
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/dialog/tts/languages/current/get:
    publish:
      summary: Get current TTS language
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/dialog/tts/languages/current/set:
    publish:
      summary: Set TTS language
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: string
        name: String
        examples:
        - payload: nl-BE
  zbos/dialog/asr/languages/get:
    publish:
      summary: Get ASR languages
      description: 'Get a list of languages recognized by the ASR engine. note: For
        now this is limited to the language code defined in the config. No Vocon load
        check is done yet.see <<zbos/dialog/asr/languages/response/{key}>> for response

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/dialog/asr/languages/response/{key}:
    subscribe:
      summary: 'response: ASR languages list'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: string
        name: String
        examples:
        - payload: nl-BE
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/dialog/asr/languages/current/get:
    publish:
      summary: Get current ASR language
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/dialog/asr/languages/current/set:
    publish:
      summary: Set ASR language
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: string
        name: String
        examples:
        - payload: nl-BE
  zbos/asr/recognition/result:
    subscribe:
      summary: Speech recognised event
      description: 'Event send by the dialog service when user said something. Mainly
        for subtitles.

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: object
          properties:
            language:
              type: object
              properties:
                baseLocale:
                  type: object
                  properties:
                    language:
                      type: string
                    script:
                      type: string
                    region:
                      type: string
                    variant:
                      type: string
                    hash:
                      type: integer
                localeExtensions:
                  type: object
                  properties:
                    extensionMap:
                      type: object
                    id:
                      type: string
                hashCodeValue:
                  type: integer
                languageTag:
                  type: string
            text:
              type: string
            confidence:
              type: number
        name: SpeechToTextResult
        examples:
        - payload:
            text: Okay James
            confidence: 78
  zbos/dialog/grammars/load:
    publish:
      summary: 'Grammars: load'
      description: 'Request from speech software to load custom grammars from the
        storage on the robot.see <<zbos/dialog/grammars/load/response>> for response

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/grammars/load/response:
    subscribe:
      summary: 'response: loaded grammars'
      description: 'Response from the RIL with all the rules stored in a file on the
        robot.

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/speech/provider/start:
    publish:
      summary: Start speech provider
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/speech/provider/stop:
    publish:
      summary: Stop speech provider
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/text/command:
    publish:
      summary: Send a text message to dialog system
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: string
        name: String
  zbos/dialog/language/setup/start:
    publish:
      summary: Start language setup
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/language/setup/stop:
    publish:
      summary: Stop language setup
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/set/config:
    publish:
      summary: Set the current speech config
      description: 'see <<zbos/dialog/set/config/response/{key}>> for response

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: object
          properties:
            config_items:
              type: object
              description: One or more config items.
            key:
              type: string
              description: Required random key
        name: SetDialogConfigRequest
        examples:
        - payload:
            key: ABCxyz
            config_items: {}
  zbos/dialog/set/config/response/{key}:
    subscribe:
      summary: 'response: Speech config was set'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: object
          properties:
            config_items:
              type: object
              description: One or more config items.
            key:
              type: string
              description: Required random key
        name: SetDialogConfigRequest
        examples:
        - payload:
            key: ABCxyz
            config_items: {}
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/dialog/get/config:
    publish:
      summary: Get the current speech config
      description: 'see <<zbos/dialog/get/config/response>> for response

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: object
          properties:
            config_items:
              type: array
              description: One or more config keys.
              items:
                type: string
            key:
              type: string
              description: Required random key
        name: GetDialogConfigRequest
        examples:
        - payload:
            key: ABCxyz
            config_items: []
  zbos/dialog/get/config/response:
    subscribe:
      summary: 'response: Current dialog config'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: object
          properties:
            config_items:
              type: array
              description: One or more config keys.
              items:
                type: string
            key:
              type: string
              description: Required random key
        name: GetDialogConfigRequest
        examples:
        - payload:
            key: ABCxyz
            config_items: []
  zbos/dialog/reset/config:
    publish:
      summary: Reset the current speech config
      description: 'see <<zbos/dialog/reset/config/response>> for response

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/dialog/reset/config/response:
    subscribe:
      summary: 'response: Config has been reset'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/successMessage"
  zbos/dialog/odp/system/ready:
    subscribe:
      summary: ODP System is initialised
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/odp/started:
    subscribe:
      summary: 'ODP event: Speech engine starts or stops'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/odp/text/command:
    publish:
      summary: 'ODP: speak a message'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: object
          properties:
            text:
              type: string
            offerMoreHelp:
              type: boolean
        name: OdpParseContextMessage
        examples:
        - payload:
            text: Text
            offerMoreHelp: true
  zbos/dialog/odp/get/config:
    publish:
      summary: 'ODP: get config'
      description: 'see <<zbos/dialog/odp/get/config/response>> for response

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/dialog/odp/get/config/response:
    subscribe:
      summary: 'ODP response: get config'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: object
        name: Map
  zbos/dialog/odp/reset/config:
    publish:
      summary: 'ODP: reset config'
      description: 'see <<zbos/dialog/odp/reset/config/response>> for response

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/dialog/odp/reset/config/response:
    subscribe:
      summary: 'ODP response: reset config'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/successMessage"
  zbos/dialog/odp/pause/hotword:
    publish:
      summary: 'ODP: pause hotword'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/odp/resume/hotword:
    publish:
      summary: 'ODP: resume hotword'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/odp/hotword/recognised:
    subscribe:
      summary: 'ODP event: hotword recognised'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: object
          properties:
            language:
              type: string
            confidence:
              type: number
            text:
              type: string
        name: OdpHotwordRecognisedPayload
        examples:
        - payload:
            language: en-US
            confidence: 50
            text: Okay James
  zbos/dialog/odp/grammars/load:
    publish:
      summary: 'ODP: load grammars'
      description: 'see <<zbos/dialog/odp/grammars/load/response>> for response

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: string
        name: String
  zbos/dialog/odp/grammars/load/response:
    subscribe:
      summary: 'ODP response: load grammars'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: string
        name: String
  zbos/dialog/odp/asr/recognition/result:
    subscribe:
      summary: 'ODP event: asr recognition'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/odp/tts/languages/get:
    publish:
      summary: 'ODP: get tts languages'
      description: 'see <<zbos/dialog/odp/tts/languages/response/{key}>> for response

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/dialog/odp/tts/languages/response/{key}:
    subscribe:
      summary: 'ODP response: get tts languages'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              service:
                type: string
              name:
                type: string
              age:
                type: string
              language:
                type: string
              languageCode:
                type: string
              gender:
                type: string
              languageVersion:
                type: string
              frequency:
                type: integer
        name: Array<TtsVoiceInfo>
        examples:
        - payload:
            service: Service
            name: Name
            age: '21'
            language: English
            languageCode: en-US
            gender: Female
            languageVersion: 4.2.0
            frequency: 65
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/dialog/odp/asr/enable:
    publish:
      summary: 'ODP: enable ASR'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/odp/asr/disable:
    publish:
      summary: 'ODP: disable ASR'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/odp/asr/languages/get:
    publish:
      summary: 'ODP: get ASR languages'
      description: 'see <<zbos/dialog/odp/asr/languages/response/{key}>> for response

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/dialog/odp/asr/languages/response/{key}:
    subscribe:
      summary: 'ODP response: get ASR languages'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              languageCode:
                type: string
        name: Array<OdpAsrLanguagesResponse>
        examples:
        - payload:
            languageCode: en-US
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/dialog/odp/languages/current/event:
    subscribe:
      summary: 'ODP event: current language'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: string
        name: String
  zbos/dialog/odp/listen/started:
    subscribe:
      summary: 'ODP event: listen started'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: boolean
        name: Boolean
  zbos/dialog/odp/listen/stopped:
    subscribe:
      summary: 'ODP event: listen stopped'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: boolean
        name: Boolean
  zbos/dialog/odp/listen/start:
    publish:
      summary: 'ODP: start listening'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/odp/listen/stop:
    publish:
      summary: 'ODP: stop listening'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/odp/asr/event:
    subscribe:
      summary: 'ODP event: ASR'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: object
          properties:
            recogniseId:
              type: string
            language:
              type: string
            confidence:
              type: number
            text:
              type: string
        name: OdpSpeechRecognisedMessage
        examples:
        - payload:
            recogniseId: ID
            language: en-US
            confidence: 50
            text: Hello James
  zbos/dialog/odp/tts/phonemereached:
    subscribe:
      summary: 'ODP event: tts phoneme reached'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: object
          properties:
            jawOpen:
              type: boolean
            lipTension:
              type: integer
            mouthHeight:
              type: integer
            mouthUpturn:
              type: integer
            mouthWidth:
              type: integer
            teethLowerVisible:
              type: integer
            teethUpperVisible:
              type: integer
            tonguePosition:
              type: integer
        name: OdpPhonemeInfo
        examples:
        - payload:
            jawOpen: false
            lipTension: 0
            mouthHeight: 2
            mouthUpturn: 0
            mouthWidth: 5
            teethLowerVisible: 1
            teethUpperVisible: 1
            tonguePosition: 0
  zbos/dialog/odp/tts/phonemes/on:
    publish:
      summary: 'ODP: start tts phoneme'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/odp/tts/phonemes/off:
    publish:
      summary: 'ODP: stop tts phoneme'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/odp/grammars/add/multiple:
    publish:
      summary: 'ODP: add multiple grammars'
      description: 'see <<zbos/dialog/odp/grammars/add/response>> for response

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
              description: a unique id of the grammar. This must be unique among the
                application (next field).
            app:
              type: string
              description: The application name. This will be used to determined which
                MQTT topic will be used to post the json output to.
            continuous:
              type: boolean
            input:
              type: object
              description: Contains an array for each language with all the possible
                sentences. The sentences need to be in a format that the speech software
                understands.
            variables:
              type: object
        name: OdpCustomGrammar
        examples:
        - payload:
            id: question_1_variable
            app: App
            continuous: true
            input:
              en-US:
              - Do you know $name
              nl-BE:
              - Ken jij $name
            variables:
              name:
                en-US:
                - input: Arno
                  data: name_in_english
                - input: Gilles
                  data: name_in_english
                nl-BE:
                - input: Arno
                  data: name_in_dutch
                - input: Gilles
                  data: name_in_dutch
  zbos/dialog/odp/grammars/add/response:
    subscribe:
      summary: 'ODP response: add multiple grammars'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/successMessage"
  zbos/dialog/odp/grammars/remove/multiple:
    publish:
      summary: 'ODP: remove multiple grammars'
      description: 'see <<zbos/dialog/odp/grammars/remove/response>> for response

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
            app:
              type: string
        name: OdpRemoveCustomGrammarRequest
        examples:
        - payload:
            id: ID
            app: App
  zbos/dialog/odp/grammars/remove/response:
    subscribe:
      summary: 'ODP response: remove multiple grammars'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/successMessage"
  zbos/dialog/odp/grammars/match/{key}:
    publish:
      summary: 'ODP: match grammars'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: object
          properties:
            triggered-by:
              type: string
            language:
              type: string
            variables:
              type: object
        name: OdpGrammarMatchResponse
        examples:
        - payload:
            language: en-US
            variables:
              name:
                input: James
                data: name_james
            triggered-by: I am $name
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/dialog/odp/custom/grammar/rules/get:
    publish:
      summary: 'ODP: get custom grammar rules'
      description: 'see <<zbos/dialog/odp/custom/grammar/rules/get/response>> for
        response

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/odp/custom/grammar/rules/get/response:
    subscribe:
      summary: 'ODP response: get custom grammar rules'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/odp/context/event:
    subscribe:
      summary: 'event: Context parsing triggered by ODP'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: object
          properties:
            synthesisId:
              type: string
            language:
              type: string
            text:
              type: string
        name: OdpContextParsed
        examples:
        - payload:
            language: en-US
            text: Hi my name is James
  zbos/dialog/odp/context/listen/request:
    publish:
      summary: New request for user input
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/odp/tts/say:
    publish:
      summary: 'ODP: tts say'
      description: 'see <<zbos/dialog/odp/tts/say/response/{key}>> for response

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: object
          properties:
            synthesisId:
              type: string
            mqttResponseKey:
              type: string
            language:
              type: string
            voiceName:
              type: string
            ssml:
              type: string
        name: OdpTtsSayMessage
        examples:
        - payload:
            language: en-US
            voiceName: default
  zbos/dialog/odp/tts/say/response/{key}:
    subscribe:
      summary: 'ODP response: tts say'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/dialog/odp/tts/started:
    subscribe:
      summary: 'ODP event: tts started'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: boolean
        name: Boolean
  zbos/dialog/odp/tts/stopped:
    subscribe:
      summary: 'ODP event: tts stopped'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: boolean
        name: Boolean
  zbos/dialog/odp/beep:
    publish:
      summary: Beep
      description: 'see <<zbos/dialog/odp/beep/response/{key}>> for response

        '
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/dialog/odp/beep/response/{key}:
    subscribe:
      summary: 'response: Beep'
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        payload:
          type: boolean
        name: Boolean
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/dialog/odp/offer/help:
    publish:
      summary: Offer help
      description: ''
      tags:
      - name: Speech
        description: All speech related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/notification/all/event:
    subscribe:
      summary: Notify everything
      description: ''
      tags:
      - name: Status
        description: All status related topics.
      message:
        "$ref": "#/components/messages/notificationMessage"
  zbos/notification/info/event:
    subscribe:
      summary: Notify information
      description: ''
      tags:
      - name: Status
        description: All status related topics.
      message:
        "$ref": "#/components/messages/notificationMessage"
  zbos/notification/warning/event:
    subscribe:
      summary: Notify warnings
      description: ''
      tags:
      - name: Status
        description: All status related topics.
      message:
        "$ref": "#/components/messages/notificationMessage"
  zbos/notification/error/event:
    subscribe:
      summary: Notify errors
      description: ''
      tags:
      - name: Status
        description: All status related topics.
      message:
        "$ref": "#/components/messages/notificationMessage"
  zbos/survey/get:
    publish:
      summary: Get survey
      description: 'see <<zbos/survey/get/response/{key}>> for response

        '
      tags:
      - name: Survey
        description: All survey related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/survey/get/response/{key}:
    subscribe:
      summary: 'response: Get survey'
      description: ''
      tags:
      - name: Survey
        description: All survey related topics.
      message:
        payload:
          type: string
        name: String
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/survey/all/get:
    publish:
      summary: Get all surveys
      description: 'see <<zbos/survey/all/get/response/{key}>> for response

        '
      tags:
      - name: Survey
        description: All survey related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/survey/all/get/response/{key}:
    subscribe:
      summary: 'response: Get all surveys'
      description: ''
      tags:
      - name: Survey
        description: All survey related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
              name:
                type: string
              type:
                type: string
              meta:
                type: object
                properties:
                  languages:
                    type: array
                    items:
                      type: string
                  default_language:
                    type: string
                  version:
                    type: string
                  created_on:
                    type: string
                  last_updated_on:
                    type: string
        name: Array<SimpleSurvey>
        examples:
        - payload:
            id: string
            name: string
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/survey/save:
    publish:
      summary: Add/save survey
      description: ''
      tags:
      - name: Survey
        description: All survey related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
            name:
              type: string
            type:
              type: string
            meta:
              type: object
              properties:
                languages:
                  type: array
                  items:
                    type: string
                default_language:
                  type: string
                version:
                  type: string
                created_on:
                  type: string
                last_updated_on:
                  type: string
        name: SimpleSurvey
        examples:
        - payload:
            id: string
  zbos/survey/save/event:
    subscribe:
      summary: 'event: Survey added/saved'
      description: ''
      tags:
      - name: Survey
        description: All survey related topics.
      message:
        "$ref": "#/components/messages/successMessage"
  zbos/survey/delete:
    publish:
      summary: Delete survey
      description: ''
      tags:
      - name: Survey
        description: All survey related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
            name:
              type: string
            type:
              type: string
            meta:
              type: object
              properties:
                languages:
                  type: array
                  items:
                    type: string
                default_language:
                  type: string
                version:
                  type: string
                created_on:
                  type: string
                last_updated_on:
                  type: string
        name: SimpleSurvey
        examples:
        - payload:
            id: string
  zbos/survey/delete/event:
    subscribe:
      summary: 'event: Survey deleted'
      description: ''
      tags:
      - name: Survey
        description: All survey related topics.
      message:
        "$ref": "#/components/messages/successMessage"
  zbos/alarm/trigger:
    publish:
      summary: Call for help
      description: 'Send an Alarm message, trigger alarm, call for help.

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: object
          properties:
            serverDomain:
              type: string
            localUsername:
              type: string
            localPassword:
              type: string
            localPort:
              type: integer
            peerUsername:
              type: string
            peerPassword:
              type: string
            peerPort:
              type: integer
            metaData:
              type: object
            alarmType:
              type: object
              properties:
                name:
                  type: string
                ordinal:
                  type: integer
              enum:
              - DEFAULT
              - VERKLIZAN
              - SENSOR
            callTimeout:
              type: integer
            hangupAllowed:
              type: boolean
            enabled:
              type: boolean
        name: SipConfig
        examples:
        - payload:
            serverDomain: string
            localUsername: string
            localPassword: string
            localPort: 5060
            peerUsername: string
            peerPassword: string
            peerPort: 5060
            metaData: {}
            alarmType: DEFAULT
            callTimeout: 120000
            hangupAllowed: false
            enabled: false
  zbos/alarm/trigger/event:
    subscribe:
      summary: 'event: Trigger alarm and call for help'
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/alarm/call/started:
    subscribe:
      summary: Alarm call started
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/alarm/call/established:
    subscribe:
      summary: Alarm call established
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/alarm/call/ended:
    subscribe:
      summary: Alarm call ended
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/alarm/set:
    publish:
      summary: Set alarm call
      description: 'see <<zbos/alarm/set/response>> for response

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: object
          properties:
            key:
              type: string
            alarmServiceProvider:
              type: object
              properties:
                name:
                  type: string
                ordinal:
                  type: integer
              enum:
              - verklizan
              - sensor
            metadata:
              type: object
        name: ZbosAlarm
        examples:
        - payload:
            key: string
            alarmServiceProvider: sensor
            metadata: {}
  zbos/alarm/set/response:
    subscribe:
      summary: 'response: Set alarm call'
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/successMessage"
  zbos/alarm/event:
    subscribe:
      summary: Alarm has been received
      description: 'An event indicating an alarm was triggered

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: object
        name: Map
  zbos/alarm/config/get:
    publish:
      summary: Get alarm configs
      description: 'Get an object containing all alarm configssee <<zbos/alarm/config/get/response/{key}>>
        for response

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/alarm/config/get/response/{key}:
    subscribe:
      summary: Get alarm configs response
      description: 'Response of configs by alarm name

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: object
        name: HashMap
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/alarm/config/set:
    publish:
      summary: 'Set alarm config '
      description: 'Sets the config for a specific alarm type

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: object
          properties:
            key:
              type: string
            type:
              type: string
            config:
              type: object
        name: AlarmConfigRequest
        examples:
        - payload:
            type: string
            config:
              string: string
  zbos/alarm/config/set/event:
    subscribe:
      summary: Set alarm config response
      description: 'An event indicating the alarm config was changed

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: object
          properties:
            success:
              type: boolean
            error:
              type: object
              properties:
                name:
                  type: string
                ordinal:
                  type: integer
              enum:
              - MALFORMED_REQUEST
              - MISSING_CONFIG_PROPERTY
              - TYPE_NOT_FOUND
        name: AlarmConfigResult
        examples:
        - payload:
            type: string
            config:
              string: string
  zbos/alarm/database/get:
    publish:
      summary: Get alarm database
      description: 'Retrieves a list of all the alarms stored in the databasesee <<zbos/alarm/database/get/response/{key}>>
        for response

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/alarm/database/get/response/{key}:
    subscribe:
      summary: Get alarm database response
      description: 'The response to a database get request

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
              type:
                type: string
              downloadPath:
                type: string
              previewPath:
                type: string
              mediaFile:
                type: string
              timestamp:
                type: number
              metadata:
                type: object
        name: Array<MonitoringResult>
        examples:
        - payload:
            id: string
            type: string
            downloadPath: string
            previewPath: string
            mediaFile: string
            timestamp: 1012001
            metadata: {}
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/alarm/database/remove:
    publish:
      summary: Remove alarm database
      description: 'Remove all alarms from the database

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/alarm/database/remove/event:
    subscribe:
      summary: Remove alarm database response
      description: 'An event indicating the alarm database was removed

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/successMessage"
  zbos/alarm/images/remove:
    publish:
      summary: Remove alarm images
      description: 'Remove all alarm images from the robot

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/alarm/images/remove/event:
    subscribe:
      summary: Remove alarm images response
      description: 'An event indicating images were removed

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/successMessage"
  zbos/alarm/all/remove:
    publish:
      summary: Remove alarm images and database
      description: 'Remove all alarm images and database entries from the robot

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/alarm/all/remove/event:
    subscribe:
      summary: Remove alarm images and database response
      description: 'An event indicating images and databases were removed

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/successMessage"
  zbos/status/battery/get:
    publish:
      summary: Get battery status
      description: 'see <<zbos/status/battery/response/{key}>> for response

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/status/battery/response/{key}:
    subscribe:
      summary: 'response: Get battery status'
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: object
          properties:
            level:
              type: integer
              "$ref": "#/components/schemas/percentage"
            charging:
              type: boolean
            docked:
              type: boolean
        name: BatteryEvent
        examples:
        - payload:
            level: 50
            charging: true
            docked: true
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/status/battery/event:
    subscribe:
      summary: 'event: Battery change'
      description: 'A message (json) is published on this topic when the robot battery
        status changes. Level is the battery level in percent. If the battery status
        is not yet available, then the level is -1.

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: object
          properties:
            level:
              type: integer
              "$ref": "#/components/schemas/percentage"
            charging:
              type: boolean
            docked:
              type: boolean
        name: BatteryEvent
        examples:
        - payload:
            level: 50
            charging: true
            docked: true
  zbos/status/battery/low/set:
    publish:
      summary: Set the battery low level threshold
      description: 'At what battery percentage the robot will act as if it is at low
        battery

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: object
          properties:
            percent:
              type: integer
              "$ref": "#/components/schemas/percentage"
        name: BatterySetRequest
        examples:
        - payload:
            percent: 30
  zbos/status/battery/low/get:
    publish:
      summary: Get the battery low level threshold
      description: 'see <<zbos/status/battery/low/response/{key}>> for response

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/status/battery/low/response/{key}:
    subscribe:
      summary: 'Response: battery low level'
      description: 'Response which shows the battery low level threshold

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: string
        name: String
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/status/battery/critical/set:
    publish:
      summary: Set the battery critical level threshold
      description: 'At what battery percentage the robot will act as if it is at critical
        battery

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: object
          properties:
            percent:
              type: integer
              "$ref": "#/components/schemas/percentage"
        name: BatterySetRequest
        examples:
        - payload:
            percent: 10
  zbos/status/battery/critical/get:
    publish:
      summary: Get the battery critical level threshold
      description: 'see <<zbos/status/battery/critical/response/{key}>> for response

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/status/battery/critical/response/{key}:
    subscribe:
      summary: 'Response: battery critical level'
      description: 'Response which shows the battery critical level threshold

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: string
        name: String
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/system/robot/identification/get:
    publish:
      summary: Request robot identification
      description: 'Use this to ask a detailed list of robot specifics like serial,
        features, ...

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/system/robot/identification/event:
    subscribe:
      summary: 'response: Robot identification'
      description: 'A detailed list of robot specifics

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: object
          properties:
            robot_type:
              type: string
            body_id:
              type: string
            serial:
              type: string
            name:
              type: string
            versions:
              type: object
            network_info:
              type: object
              properties:
                ip:
                  type: string
                mac_address:
                  type: string
                ssid:
                  type: string
            features:
              type: object
              properties:
                external_displays:
                  type: array
                  items:
                    type: object
                    properties:
                      video:
                        type: boolean
                      audio:
                        type: boolean
                      width:
                        type: integer
                      height:
                        type: integer
                cameras:
                  type: array
                  items:
                    type: object
                    properties:
                      key:
                        type: string
                      primary:
                        type: boolean
                      rotation:
                        type: integer
                      image_rotation:
                        type: integer
                can_poi:
                  type: boolean
                can_move:
                  type: boolean
                can_dance:
                  type: boolean
                can_speech:
                  type: boolean
                has_storage:
                  type: boolean
                can_animate:
                  type: boolean
                can_gym:
                  type: boolean
                has_sensors:
                  type: boolean
                has_emotions:
                  type: boolean
                can_video_stream:
                  type: boolean
                can_take_picture:
                  type: boolean
                has_slam_image_map:
                  type: boolean
                has_security_mode:
                  type: boolean
                can_detect_motion:
                  type: boolean
                can_face_recognize:
                  type: boolean
                can_poi_interactive:
                  type: boolean
                has_monitoring:
                  type: boolean
                has_qr_scanner:
                  type: boolean
                can_change_ntp_server:
                  type: boolean
                voice_feature:
                  type: object
                  properties:
                    supports_gesticulate:
                      type: boolean
                    supports_language:
                      type: boolean
                    supports_pitch:
                      type: boolean
                    supports_speed:
                      type: boolean
                    supports_volume:
                      type: boolean
                    supports_speech_volume:
                      type: boolean
                listen_feature:
                  type: object
                  properties:
                    can_trigger_manual:
                      type: boolean
                    can_trigger_hotword:
                      type: boolean
                slam_feature:
                  type: object
                  properties:
                    can_navigate:
                      type: boolean
                    can_extend_map:
                      type: boolean
                    can_manage_pois:
                      type: boolean
                    can_manage_walls:
                      type: boolean
                    has_docking_station:
                      type: boolean
                voip_feature:
                  type: object
                  properties:
                    supportsVoip:
                      type: boolean
                face_recognition_feature:
                  type: object
                  properties:
                    can_detect_known_faces:
                      type: boolean
                    can_detect_number_of_faces:
                      type: boolean
            hardware:
              type: object
              properties:
                heads:
                  type: array
                  items:
                    type: object
                    properties:
                      moveable:
                        type: boolean
                      can_reset_to_default_position:
                        type: boolean
                parts:
                  type: array
                  items:
                    type: object
                    properties:
                      name:
                        type: string
                      moveable:
                        type: boolean
                      can_reset_to_default_position:
                        type: boolean
                usb:
                  type: array
                  items:
                    type: object
                    properties:
                      type:
                        type: object
                        properties:
                          name:
                            type: string
                          ordinal:
                            type: integer
                        enum:
                        - USB_1
                        - USB_1_1
                        - USB_2
                        - USB_3
                        - USB_3_1
                        - USB_3_2
                        - USB_4
            composer:
              type: object
              properties:
                simple:
                  type: object
                  properties:
                    dance:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    speech:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    animation:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    emotion:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    wait_duration:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    wait_sensor:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    wait_face:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    wait_voice:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    wait_qr_code:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    motion_head:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    motion_detection:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    multimedia:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    poi:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    mqtt:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    app_start:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    change_datasource:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    input:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    multimedia_stop:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    browser:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    gym:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                advanced:
                  type: object
                  properties:
                    math_formula:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    math_operations:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    if_else:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    variables:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    api:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    loop:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    start:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    stop:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
            supported_file_types:
              type: array
              items:
                type: object
                properties:
                  mime_type:
                    type: string
                  type:
                    type: string
            connection_features:
              type: object
              properties:
                has_wifi:
                  type: boolean
                has_cable:
                  type: boolean
                has_hotspot:
                  type: boolean
                cable_features:
                  type: object
                  properties:
                    adapter_names:
                      type: array
                      items:
                        type: string
                wifi_features:
                  type: object
                  properties:
                    can_configure:
                      type: boolean
                    adapter_names:
                      type: array
                      items:
                        type: string
                hotspot_features:
                  type: object
                  properties:
                    can_activate:
                      type: boolean
                    can_change_ssid:
                      type: boolean
                    can_change_password:
                      type: boolean
                    adapter_names:
                      type: array
                      items:
                        type: string
        name: RobotIdentification
        examples:
        - payload:
            serial: SH-J01-00096
            name: Jamesy
            versions: {}
            features:
              cameras:
              - key: kiosk
                primary: true
                rotation: 0
              external_displays:
              - video: true
                audio: true
                width: 1280
                height: 800
              can_poi: true
              can_move: true
              can_dance: false
              can_speech: true
              has_storage: true
              can_animate: false
              can_gym: false
              has_sensors: true
              has_emotions: false
              can_video_stream: true
              can_take_picture: true
              has_slam_image_map: true
              has_security_mode: true
              can_detect_motion: true
              can_face_recognize: true
              can_poi_interactive: true
              has_monitoring: false
              has_qr_scanner: false
              can_change_ntp_server: false
              voice_feature:
                supports_gesticulate: false
                supports_language: true
                supports_pitch: true
                supports_speed: true
                supports_volume: true
                supports_speech_volume: true
              listen_feature:
                can_trigger_manual: true
                can_trigger_hotword: true
              slam_feature:
                can_navigate: true
                can_extend_map: true
                can_manage_pois: true
                can_manage_walls: true
                has_docking_station: false
              voip_feature:
                supportsVoip: true
              face_recognition_feature:
                can_detect_known_faces: false
                can_detect_number_of_faces: true
            hardware:
              heads:
              - moveable: true
                can_reset_to_default_position: true
              parts:
              - name: Leg
                moveable: false
                can_reset_to_default_position: false
            composer:
              simple:
                dance:
                  enabled: false
                  enabled_sources: []
                speech:
                  enabled: true
                  enabled_sources:
                  - scheduler
                  - composer
                animation:
                  enabled: false
                  enabled_sources: []
                emotion:
                  enabled: false
                  enabled_sources: []
                multimedia:
                  enabled: true
                  enabled_sources:
                  - scheduler
                  - composer
                poi:
                  enabled: true
                  enabled_sources:
                  - scheduler
                  - composer
                mqtt:
                  enabled: true
                  enabled_sources:
                  - scheduler
                  - composer
                input:
                  enabled: true
                  enabled_sources:
                  - composer
                browser:
                  enabled: true
                  enabled_sources:
                  - scheduler
                  - composer
                gym:
                  enabled: false
                  enabled_sources: []
                wait_duration:
                  enabled: true
                  enabled_sources:
                  - composer
                wait_sensor:
                  enabled: true
                  enabled_sources:
                  - composer
                wait_face:
                  enabled: false
                  enabled_sources: []
                wait_voice:
                  enabled: false
                  enabled_sources: []
                wait_qr_code:
                  enabled: false
                  enabled_sources: []
                motion_head:
                  enabled: true
                  enabled_sources:
                  - scheduler
                  - composer
                motion_detection:
                  enabled: true
                  enabled_sources:
                  - composer
                app_start:
                  enabled: true
                  enabled_sources:
                  - scheduler
                  - composer
                change_datasource:
                  enabled: true
                  enabled_sources:
                  - scheduler
                  - composer
                multimedia_stop:
                  enabled: true
                  enabled_sources:
                  - scheduler
                  - composer
              advanced:
                variables:
                  enabled: false
                  enabled_sources: []
                api:
                  enabled: false
                  enabled_sources: []
                loop:
                  enabled: false
                  enabled_sources: []
                start:
                  enabled: false
                  enabled_sources: []
                stop:
                  enabled: false
                  enabled_sources: []
                math_formula:
                  enabled: false
                  enabled_sources: []
                math_operations:
                  enabled: false
                  enabled_sources: []
                if_else:
                  enabled: false
                  enabled_sources: []
            robot_type: James
            body_id: D2EE32C8F3EFF59FDFEAF6E21834F71C
            network_info:
              ip: 172.16.0.100
              ssid: string
              mac_address: 02:00:00:00:00:00
            supported_file_types:
            - type: string
              mime_type: string
            connection_features:
              has_wifi: true
              has_cable: false
              has_hotspot: true
              cable_features:
                adapter_names: []
              wifi_features:
                can_configure: false
                adapter_names:
                - wlan0
              hotspot_features:
                can_activate: true
                can_change_ssid: true
                can_change_password: true
                adapter_names:
                - WIFI1
                - WIFI2
  zbos/system/name/set:
    publish:
      summary: Set robot name
      description: 'Use this to change the robot name. The change will be published
        through <<zbos/system/robot/identification/event>>

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: object
          properties:
            robot_type:
              type: string
            body_id:
              type: string
            serial:
              type: string
            name:
              type: string
            versions:
              type: object
            network_info:
              type: object
              properties:
                ip:
                  type: string
                mac_address:
                  type: string
                ssid:
                  type: string
            features:
              type: object
              properties:
                external_displays:
                  type: array
                  items:
                    type: object
                    properties:
                      video:
                        type: boolean
                      audio:
                        type: boolean
                      width:
                        type: integer
                      height:
                        type: integer
                cameras:
                  type: array
                  items:
                    type: object
                    properties:
                      key:
                        type: string
                      primary:
                        type: boolean
                      rotation:
                        type: integer
                      image_rotation:
                        type: integer
                can_poi:
                  type: boolean
                can_move:
                  type: boolean
                can_dance:
                  type: boolean
                can_speech:
                  type: boolean
                has_storage:
                  type: boolean
                can_animate:
                  type: boolean
                can_gym:
                  type: boolean
                has_sensors:
                  type: boolean
                has_emotions:
                  type: boolean
                can_video_stream:
                  type: boolean
                can_take_picture:
                  type: boolean
                has_slam_image_map:
                  type: boolean
                has_security_mode:
                  type: boolean
                can_detect_motion:
                  type: boolean
                can_face_recognize:
                  type: boolean
                can_poi_interactive:
                  type: boolean
                has_monitoring:
                  type: boolean
                has_qr_scanner:
                  type: boolean
                can_change_ntp_server:
                  type: boolean
                voice_feature:
                  type: object
                  properties:
                    supports_gesticulate:
                      type: boolean
                    supports_language:
                      type: boolean
                    supports_pitch:
                      type: boolean
                    supports_speed:
                      type: boolean
                    supports_volume:
                      type: boolean
                    supports_speech_volume:
                      type: boolean
                listen_feature:
                  type: object
                  properties:
                    can_trigger_manual:
                      type: boolean
                    can_trigger_hotword:
                      type: boolean
                slam_feature:
                  type: object
                  properties:
                    can_navigate:
                      type: boolean
                    can_extend_map:
                      type: boolean
                    can_manage_pois:
                      type: boolean
                    can_manage_walls:
                      type: boolean
                    has_docking_station:
                      type: boolean
                voip_feature:
                  type: object
                  properties:
                    supportsVoip:
                      type: boolean
                face_recognition_feature:
                  type: object
                  properties:
                    can_detect_known_faces:
                      type: boolean
                    can_detect_number_of_faces:
                      type: boolean
            hardware:
              type: object
              properties:
                heads:
                  type: array
                  items:
                    type: object
                    properties:
                      moveable:
                        type: boolean
                      can_reset_to_default_position:
                        type: boolean
                parts:
                  type: array
                  items:
                    type: object
                    properties:
                      name:
                        type: string
                      moveable:
                        type: boolean
                      can_reset_to_default_position:
                        type: boolean
                usb:
                  type: array
                  items:
                    type: object
                    properties:
                      type:
                        type: object
                        properties:
                          name:
                            type: string
                          ordinal:
                            type: integer
                        enum:
                        - USB_1
                        - USB_1_1
                        - USB_2
                        - USB_3
                        - USB_3_1
                        - USB_3_2
                        - USB_4
            composer:
              type: object
              properties:
                simple:
                  type: object
                  properties:
                    dance:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    speech:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    animation:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    emotion:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    wait_duration:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    wait_sensor:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    wait_face:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    wait_voice:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    wait_qr_code:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    motion_head:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    motion_detection:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    multimedia:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    poi:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    mqtt:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    app_start:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    change_datasource:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    input:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    multimedia_stop:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    browser:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    gym:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                advanced:
                  type: object
                  properties:
                    math_formula:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    math_operations:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    if_else:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    variables:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    api:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    loop:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    start:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
                    stop:
                      type: object
                      properties:
                        enabled:
                          type: boolean
                        enabled_sources:
                          type: array
                          items:
                            type: object
                            properties:
                              topicName:
                                type: string
                              name:
                                type: string
                              ordinal:
                                type: integer
                            enum:
                            - SCHEDULER
                            - COMPOSER
            supported_file_types:
              type: array
              items:
                type: object
                properties:
                  mime_type:
                    type: string
                  type:
                    type: string
            connection_features:
              type: object
              properties:
                has_wifi:
                  type: boolean
                has_cable:
                  type: boolean
                has_hotspot:
                  type: boolean
                cable_features:
                  type: object
                  properties:
                    adapter_names:
                      type: array
                      items:
                        type: string
                wifi_features:
                  type: object
                  properties:
                    can_configure:
                      type: boolean
                    adapter_names:
                      type: array
                      items:
                        type: string
                hotspot_features:
                  type: object
                  properties:
                    can_activate:
                      type: boolean
                    can_change_ssid:
                      type: boolean
                    can_change_password:
                      type: boolean
                    adapter_names:
                      type: array
                      items:
                        type: string
        name: RobotIdentification
        examples:
        - payload:
            name: Betsy
            versions: {}
  zbos/system/version/get:
    publish:
      summary: Get system version
      description: 'see <<zbos/system/version/response/{key}>> for response

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/system/version/response/{key}:
    subscribe:
      summary: 'response: Get system version'
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: object
          properties:
            name:
              type: string
            version:
              type: string
            buildDate:
              type: object
              properties:
                fastTime:
                  type: number
                cdate:
                  type: object
                  properties:
                    cachedYear:
                      type: integer
                    cachedFixedDateJan1:
                      type: number
                    cachedFixedDateNextJan1:
                      type: number
        name: AppVersion
        examples:
        - payload:
            name: CR-16
            version: 4.2.0
            buildDate: 1616061847107
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/system/serial/get:
    publish:
      summary: Get system serial number
      description: 'see <<zbos/system/serial/response/{key}>> for response

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/system/serial/response/{key}:
    subscribe:
      summary: 'response: Get system serial number'
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: string
        name: String
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/event/system/poke:
    subscribe:
      summary: Poke robot
      description: 'When robot receives this event, it responds by showing he received
        the event. This can be by flashing a led. This is useful to see which robot
        your are controlling.

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/system/ready/event:
    subscribe:
      summary: 'event: System ready'
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/system/ready/request:
    publish:
      summary: Get system ready
      description: 'see <<zbos/system/ready/response/{key}>> for response

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/system/ready/response/{key}:
    subscribe:
      summary: 'response: System ready'
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/system/hotword/rotation:
    publish:
      summary: Enable hotword rotation
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/system/hotword/rotation/changed/event:
    subscribe:
      summary: Hotword rotation changed event
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: string
        name: String
  zbos/system/hotword/rotation/get:
    publish:
      summary: Get hotword rotation
      description: 'see <<zbos/system/hotword/rotation/response/{key}>> for response

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/system/hotword/rotation/response/{key}:
    subscribe:
      summary: 'Response: hotword rotation'
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: string
        name: String
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/system/adblogs/upload:
    publish:
      summary: Enable adb logs upload
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/system/adblogs/changed/event:
    subscribe:
      summary: Adb logs changed event
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: string
        name: String
  zbos/system/adblogs/get:
    publish:
      summary: Get adb logs
      description: 'see <<zbos/system/adblogs/response/{key}>> for response

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/system/adblogs/response/{key}:
    subscribe:
      summary: 'Response: Get adb logs'
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: string
        name: String
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/system/cloud/enable:
    publish:
      summary: Enable cloud broker
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/system/cloud/enable/changing/event:
    subscribe:
      summary: Cloud broker state is currently changing
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/system/cloud/enable/changed/event:
    subscribe:
      summary: Cloud broker enable changed event
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: string
        name: String
  zbos/system/cloud/enable/get:
    publish:
      summary: Get cloud broker enabled state
      description: 'see <<zbos/system/cloud/enable/response/{key}>> for response

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/system/cloud/enable/response/{key}:
    subscribe:
      summary: 'Response: cloud broker enabled state'
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: string
        name: String
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/cloud/broker/status/event:
    subscribe:
      summary: 'event: Broker status'
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: object
          properties:
            connected:
              type: boolean
            graceful:
              type: boolean
        name: BrokerStatus
        examples:
        - payload:
            connected: true
            graceful: true
  zbos/system/multimedia/rename:
    publish:
      summary: Rename file
      description: 'Rename a multimedia filesee <<zbos/system/multimedia/rename/response>>
        for response

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: object
          properties:
            path:
              type: string
              description: Path of existing file
            name:
              type: string
              description: New name of file with extension
        name: RenameRequest
        examples:
        - payload:
            path: string
            name: string
  zbos/system/multimedia/rename/response:
    subscribe:
      summary: 'response: Rename file'
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/successMessage"
  zbos/system/multimedia/delete/request:
    publish:
      summary: Remove a file from the robot
      description: 'Removes a file from the robot; limited to files inside of the
        zbos_media_library directory.see zbos/system/multimedia/delete/response/{key}
        for response

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: object
          properties:
            key:
              type: string
            path:
              type: string
        name: DeleteRequest
        examples:
        - payload:
            path: string
  zbos/system/multimedia/delete/response/{key}:
    subscribe:
      summary: 'response: Remove a file from the robot'
      description: 'Result if file is successfully deleted

        '
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: object
          properties:
            success:
              type: boolean
            error:
              type: object
              properties:
                name:
                  type: string
                ordinal:
                  type: integer
              enum:
              - FILE_NOT_EXIST
              - NOT_PERMITTED
              - FAILED
        name: DeleteResponse
        examples:
        - payload:
            success: false
            error: FILE_NOT_EXIST
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/monitoring/event/{source}/{type}:
    subscribe:
      summary: Monitoring event
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
              description: Mandatory. A unique ID for the event
            timestamp:
              type: number
              description: Mandatory. The time at which the event occurred
            type:
              type: string
              description: Mandatory. The type of event this is, no dots allowed
            source:
              type: string
              description: Mandatory. What device produced this event, no dots allowed
            value:
              type: string
              description: Optional. A value relating to the event such as a temperature
            data:
              type: object
              description: Optional. Extra data related to the event
            unit:
              type: string
              description: Optional. The type of unit the value is expressed in such
                as Â°C
            alarms:
              type: array
              description: Optional. Alarms attached to this event
              items:
                type: object
                properties:
                  type:
                    type: object
                    description: Mandatory. The type of alarm
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - ItemOmission
                    - ItemCommission
                    - ServiceOmission
                    - ServiceCommission
                    - TransientServiceOmission
                    - TransientServiceCommission
                    - EarlyServiceOmission
                    - LateServiceCommission
                    - EarlyServiceStart
                    - LateServiceStart
                    - BoundedOmissionInterval
                    - UndetectableValueError
                    - BelowRange
                    - AboveRange
                    - BoundedValueChange
                    - StuckValue
                    - OutOfBounds
                    - OutOfOrder
                    - OutOfCalibration
                    - EarlyDelivery
                    - LateDelivery
                    - HighRate
                    - LowRate
                    - RateJitter
                    - EarlyService
                    - DelayedService
                    - SymmetricReplicationError
                    - AsymmetricApproximateValue
                    - AsymmetricExactValue
                    - AsymmetricItemOmission
                    - AsymmetricServiceOmission
                    - AsymmetricTiming
                    - ReadWriteRace
                    - WriteWriteRace
                    - Deadlock
                    - Starvation
                    - AuthorizationError
                    - AuthenticationError
                  severity:
                    type: integer
                    description: Mandatory. How critical the alarm is
                  persist:
                    type: boolean
                    description: Mandatory. If this is an ongoing alarm
                  timestamp:
                    type: number
                    description: Mandatory. When the alarm initially started
        name: MonitoringEvent
    parameters:
      source:
        description: Source of monitoring event
        schema:
          type: string
      type:
        description: Type of monitoring event
        schema:
          type: string
  zbos/monitoring/list/get:
    publish:
      summary: Get monitoring events
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: object
          properties:
            key:
              type: string
            limit:
              type: integer
            offset:
              type: integer
            filters:
              type: array
              items:
                type: object
                properties:
                  field:
                    type: string
                    description: Field to check on. Note that the field should be
                      camelCase, not snake_case
                  value:
                    type: string
                    description: Value to check on. For numbers you should use 'min'
                      and 'max'.
                  min:
                    type: number
                    description: Minimum value, only usable for number fields
                  max:
                    type: number
                    description: Maximum value, only usable for number fields
                  direction:
                    type: object
                    description: |-
                      Direction to sort on.
                      Can be 'asc' or 'desc'.
                      The default direction is 'asc'
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - ASC
                    - DESC
                  operator:
                    type: object
                    description: |-
                      Operator for either the child filters, or this filter object itself.
                      Can be 'and', 'or' or 'not'.
                      Default is 'and'.
                      The root operator is always 'and'
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - AND
                    - OR
                    - NOT
                  match_type:
                    type: object
                    description: |-
                      Match type for string values.
                      Can be 'exact', 'contains', 'starts_with', 'ends_with'.
                      The default match_type is 'contains'
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - EXACT
                    - CONTAINS
                    - STARTS_WITH
                    - ENDS_WITH
                  filters:
                    type: array
                    description: |-
                      Filters on which the operator will be applied.
                      If there are no child filters, the operator will be applied to the filter object itself.
                    items:
                      type: object
                  field_filters:
                    type: array
                    description: |-
                      Filters to apply on the child fields of the field.
                      Will only work if the field is an object, array/list or map.
                    items:
                      type: object
            sort:
              type: array
              items:
                type: object
                properties:
                  field:
                    type: string
                    description: Field to check on. Note that the field should be
                      camelCase, not snake_case
                  value:
                    type: string
                    description: Value to check on. For numbers you should use 'min'
                      and 'max'.
                  min:
                    type: number
                    description: Minimum value, only usable for number fields
                  max:
                    type: number
                    description: Maximum value, only usable for number fields
                  direction:
                    type: object
                    description: |-
                      Direction to sort on.
                      Can be 'asc' or 'desc'.
                      The default direction is 'asc'
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - ASC
                    - DESC
                  operator:
                    type: object
                    description: |-
                      Operator for either the child filters, or this filter object itself.
                      Can be 'and', 'or' or 'not'.
                      Default is 'and'.
                      The root operator is always 'and'
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - AND
                    - OR
                    - NOT
                  match_type:
                    type: object
                    description: |-
                      Match type for string values.
                      Can be 'exact', 'contains', 'starts_with', 'ends_with'.
                      The default match_type is 'contains'
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - EXACT
                    - CONTAINS
                    - STARTS_WITH
                    - ENDS_WITH
                  filters:
                    type: array
                    description: |-
                      Filters on which the operator will be applied.
                      If there are no child filters, the operator will be applied to the filter object itself.
                    items:
                      type: object
                  field_filters:
                    type: array
                    description: |-
                      Filters to apply on the child fields of the field.
                      Will only work if the field is an object, array/list or map.
                    items:
                      type: object
        name: FilteringRequest
        examples:
        - payload:
            key: Test123
            limit: 50
            offset: 10
            filters:
            - operator: or
              filters:
              - field: name
                value: foo
                operator: and
                match_type: contains
              - field: name
                value: bar
                operator: and
                match_type: contains
              match_type: contains
            - field: type
              value: image
              operator: and
              filters:
              - field: type
                value: image
                operator: and
                match_type: contains
              match_type: contains
            - field: date
              operator: and
              filters:
              - field: date
                operator: and
                match_type: contains
              match_type: contains
            sort:
            - field: extension
              operator: and
              filters:
              - field: extension
                operator: and
                match_type: contains
              match_type: contains
            - field: name
              operator: and
              filters:
              - field: name
                operator: and
                match_type: contains
              match_type: contains
  zbos/monitoring/list/get/response/{key}:
    subscribe:
      summary: 'response: Get monitoring events'
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
                description: Mandatory. A unique ID for the event
              timestamp:
                type: number
                description: Mandatory. The time at which the event occurred
              type:
                type: string
                description: Mandatory. The type of event this is, no dots allowed
              source:
                type: string
                description: Mandatory. What device produced this event, no dots allowed
              value:
                type: string
                description: Optional. A value relating to the event such as a temperature
              data:
                type: object
                description: Optional. Extra data related to the event
              unit:
                type: string
                description: Optional. The type of unit the value is expressed in
                  such as Â°C
              alarms:
                type: array
                description: Optional. Alarms attached to this event
                items:
                  type: object
                  properties:
                    type:
                      type: object
                      description: Mandatory. The type of alarm
                      properties:
                        name:
                          type: string
                        ordinal:
                          type: integer
                      enum:
                      - ItemOmission
                      - ItemCommission
                      - ServiceOmission
                      - ServiceCommission
                      - TransientServiceOmission
                      - TransientServiceCommission
                      - EarlyServiceOmission
                      - LateServiceCommission
                      - EarlyServiceStart
                      - LateServiceStart
                      - BoundedOmissionInterval
                      - UndetectableValueError
                      - BelowRange
                      - AboveRange
                      - BoundedValueChange
                      - StuckValue
                      - OutOfBounds
                      - OutOfOrder
                      - OutOfCalibration
                      - EarlyDelivery
                      - LateDelivery
                      - HighRate
                      - LowRate
                      - RateJitter
                      - EarlyService
                      - DelayedService
                      - SymmetricReplicationError
                      - AsymmetricApproximateValue
                      - AsymmetricExactValue
                      - AsymmetricItemOmission
                      - AsymmetricServiceOmission
                      - AsymmetricTiming
                      - ReadWriteRace
                      - WriteWriteRace
                      - Deadlock
                      - Starvation
                      - AuthorizationError
                      - AuthenticationError
                    severity:
                      type: integer
                      description: Mandatory. How critical the alarm is
                    persist:
                      type: boolean
                      description: Mandatory. If this is an ongoing alarm
                    timestamp:
                      type: number
                      description: Mandatory. When the alarm initially started
        name: Array<MonitoringEvent>
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/monitoring/event/add:
    publish:
      summary: Add a new event
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: object
          properties:
            key:
              type: string
            event:
              type: object
              properties:
                timestamp:
                  type: number
                  description: Mandatory. The time at which the event occurred
                type:
                  type: string
                  description: Mandatory. The type of event this is, no dots allowed
                source:
                  type: string
                  description: Mandatory. What device produced this event, no dots
                    allowed
                value:
                  type: string
                  description: Optional. A value relating to the event such as a temperature
                data:
                  type: object
                  description: Optional. Extra data related to the event
                unit:
                  type: string
                  description: Optional. The type of unit the value is expressed in
                    such as Â°C
                alarms:
                  type: array
                  description: Optional. Alarms attached to this event
                  items:
                    type: object
                    properties:
                      type:
                        type: object
                        description: Mandatory. The type of alarm
                        properties:
                          name:
                            type: string
                          ordinal:
                            type: integer
                        enum:
                        - ItemOmission
                        - ItemCommission
                        - ServiceOmission
                        - ServiceCommission
                        - TransientServiceOmission
                        - TransientServiceCommission
                        - EarlyServiceOmission
                        - LateServiceCommission
                        - EarlyServiceStart
                        - LateServiceStart
                        - BoundedOmissionInterval
                        - UndetectableValueError
                        - BelowRange
                        - AboveRange
                        - BoundedValueChange
                        - StuckValue
                        - OutOfBounds
                        - OutOfOrder
                        - OutOfCalibration
                        - EarlyDelivery
                        - LateDelivery
                        - HighRate
                        - LowRate
                        - RateJitter
                        - EarlyService
                        - DelayedService
                        - SymmetricReplicationError
                        - AsymmetricApproximateValue
                        - AsymmetricExactValue
                        - AsymmetricItemOmission
                        - AsymmetricServiceOmission
                        - AsymmetricTiming
                        - ReadWriteRace
                        - WriteWriteRace
                        - Deadlock
                        - Starvation
                        - AuthorizationError
                        - AuthenticationError
                      severity:
                        type: integer
                        description: Mandatory. How critical the alarm is
                      persist:
                        type: boolean
                        description: Mandatory. If this is an ongoing alarm
                      timestamp:
                        type: number
                        description: Mandatory. When the alarm initially started
        name: AddMonitoringEventRequest
        examples:
        - payload:
            key: some_key
            event:
              timestamp: 1349333576093
              type: SomeType
              source: SomeSource
              valid: true
  zbos/monitoring/event/add/response/{key}:
    subscribe:
      summary: 'response: Add a new event'
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        "$ref": "#/components/messages/successMessage"
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/monitoring/event/delete:
    publish:
      summary: Delete an event
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
              description: Mandatory. A unique ID for the event
            timestamp:
              type: number
              description: Mandatory. The time at which the event occurred
            type:
              type: string
              description: Mandatory. The type of event this is, no dots allowed
            source:
              type: string
              description: Mandatory. What device produced this event, no dots allowed
            value:
              type: string
              description: Optional. A value relating to the event such as a temperature
            data:
              type: object
              description: Optional. Extra data related to the event
            unit:
              type: string
              description: Optional. The type of unit the value is expressed in such
                as Â°C
            alarms:
              type: array
              description: Optional. Alarms attached to this event
              items:
                type: object
                properties:
                  type:
                    type: object
                    description: Mandatory. The type of alarm
                    properties:
                      name:
                        type: string
                      ordinal:
                        type: integer
                    enum:
                    - ItemOmission
                    - ItemCommission
                    - ServiceOmission
                    - ServiceCommission
                    - TransientServiceOmission
                    - TransientServiceCommission
                    - EarlyServiceOmission
                    - LateServiceCommission
                    - EarlyServiceStart
                    - LateServiceStart
                    - BoundedOmissionInterval
                    - UndetectableValueError
                    - BelowRange
                    - AboveRange
                    - BoundedValueChange
                    - StuckValue
                    - OutOfBounds
                    - OutOfOrder
                    - OutOfCalibration
                    - EarlyDelivery
                    - LateDelivery
                    - HighRate
                    - LowRate
                    - RateJitter
                    - EarlyService
                    - DelayedService
                    - SymmetricReplicationError
                    - AsymmetricApproximateValue
                    - AsymmetricExactValue
                    - AsymmetricItemOmission
                    - AsymmetricServiceOmission
                    - AsymmetricTiming
                    - ReadWriteRace
                    - WriteWriteRace
                    - Deadlock
                    - Starvation
                    - AuthorizationError
                    - AuthenticationError
                  severity:
                    type: integer
                    description: Mandatory. How critical the alarm is
                  persist:
                    type: boolean
                    description: Mandatory. If this is an ongoing alarm
                  timestamp:
                    type: number
                    description: Mandatory. When the alarm initially started
        name: MonitoringEvent
        examples:
        - payload:
            id: some_id
            timestamp: 1349333576093
            type: SomeType
            source: SomeSource
            valid: true
  zbos/monitoring/event/delete/event:
    subscribe:
      summary: 'event: Delete an event'
      description: ''
      tags:
      - name: System
        description: All system related topics.
      message:
        payload:
          type: object
          properties:
            key:
              type: string
              description: The key used by the add request
            success:
              type: boolean
              description: Did the operation succeed
            id:
              type: string
              description: The ID of the new event
        name: MonitoringResponse
  zbos/time/info/get:
    publish:
      summary: Get Time information, such as the accuracy
      description: 'see <<zbos/time/info/response/{key}>> for response

        '
      tags:
      - name: Time
        description: All time related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/time/info/response/{key}:
    subscribe:
      summary: 'response: Time information'
      description: ''
      tags:
      - name: Time
        description: All time related topics.
      message:
        payload:
          type: object
          properties:
            accurate:
              type: boolean
        name: TimeInfo
        examples:
        - payload:
            accurate: true
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/quiet/hours:
    publish:
      summary: Quiet hours
      description: ''
      tags:
      - name: Time
        description: All time related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/scheduler/save:
    publish:
      summary: Save schedule
      description: ''
      tags:
      - name: Time
        description: All time related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/scheduler/save/event:
    subscribe:
      summary: 'event: Schedule saved'
      description: ''
      tags:
      - name: Time
        description: All time related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
            name:
              type: string
        name: SimpleScheduler
        examples:
        - payload:
            id: string
            name: string
  zbos/scheduler/load:
    publish:
      summary: Get schedule
      description: 'see <<zbos/scheduler/load/response/{key}>> for response

        '
      tags:
      - name: Time
        description: All time related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
            name:
              type: string
        name: SimpleScheduler
        examples:
        - payload:
            id: string
  zbos/scheduler/load/response/{key}:
    subscribe:
      summary: 'response: Get schedule'
      description: ''
      tags:
      - name: Time
        description: All time related topics.
      message:
        payload:
          type: string
        name: String
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/scheduler/delete:
    publish:
      summary: Delete schedule
      description: ''
      tags:
      - name: Time
        description: All time related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
            name:
              type: string
        name: SimpleScheduler
        examples:
        - payload:
            id: string
  zbos/scheduler/delete/event:
    subscribe:
      summary: 'event: Schedule deleted'
      description: ''
      tags:
      - name: Time
        description: All time related topics.
      message:
        payload:
          type: string
        name: String
  zbos/scheduler/list/get:
    publish:
      summary: Get all schedules
      description: 'see <<zbos/scheduler/list/response/{key}>> for response

        '
      tags:
      - name: Time
        description: All time related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/scheduler/list/response/{key}:
    subscribe:
      summary: 'response: Get all schedules'
      description: ''
      tags:
      - name: Time
        description: All time related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
              name:
                type: string
        name: Array<SimpleScheduler>
        examples:
        - payload:
            id: string
            name: string
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/scheduler/start:
    publish:
      summary: Start schedule by name
      description: ''
      tags:
      - name: Time
        description: All time related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
            name:
              type: string
        name: SimpleScheduler
        examples:
        - payload:
            name: string
  zbos/scheduler/start/event:
    subscribe:
      summary: 'event: Started schedule'
      description: ''
      tags:
      - name: Time
        description: All time related topics.
      message:
        payload:
          type: string
        name: String
  zbos/scheduler/start/id:
    publish:
      summary: Start schedule by id
      description: ''
      tags:
      - name: Time
        description: All time related topics.
      message:
        payload:
          type: object
          properties:
            id:
              type: string
            name:
              type: string
        name: SimpleScheduler
        examples:
        - payload:
            id: string
  zbos/scheduler/stop:
    publish:
      summary: Stop schedule
      description: ''
      tags:
      - name: Time
        description: All time related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/scheduler/stop/event:
    subscribe:
      summary: 'event: Schedule stopped'
      description: ''
      tags:
      - name: Time
        description: All time related topics.
      message:
        payload:
          type: string
        name: String
  zbos/scheduler/current/get:
    publish:
      summary: Get current schedule
      description: 'see <<zbos/scheduler/current/get/response/{key}>> for response

        '
      tags:
      - name: Time
        description: All time related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/scheduler/current/get/response/{key}:
    subscribe:
      summary: 'response: Get current schedule'
      description: ''
      tags:
      - name: Time
        description: All time related topics.
      message:
        payload:
          type: string
        name: String
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/translations/get:
    publish:
      summary: Get translations
      description: |+
        Get translations for the provided category and language.
        You have two ways to get the translations: either pass the category + the corresponding keys,
        or only pass the keys, but prefix each one with the category and a dot. Eg: {category}.{key}

      tags:
      - name: Translations
        description: All translations related topics.
      message:
        payload:
          type: object
          properties:
            key:
              type: string
            category:
              type: string
              description: Optional when using the dot notation in the translations
                keys.
            language:
              type: string
              description: 'ISO 639-1 language code, Eg: ''en'' or ''en-US'''
            translation_keys:
              type: array
              description: Optional if the category is set. In that case it will return
                all translations for that category.
              items:
                type: string
        name: GetTranslationsRequest
        examples:
        - payload:
            key: abc
            category: category_1
            language: en-US
        - payload:
            key: abc
            category: category_1
            language: en-US
            translation_keys:
            - translation_key_1
            - translation_key_2
        - payload:
            key: abc
            language: en-US
            translation_keys:
            - category_1.translation_key_1
            - category_1.translation_key_2
  zbos/translations/get/response/{key}:
    publish:
      summary: 'Response: Get translations'
      description: ''
      tags:
      - name: Translations
        description: All translations related topics.
      message:
        payload:
          type: object
          properties:
            translations:
              type: object
        name: GetTranslationsResponse
        examples:
        - payload:
            translations:
              translation_key_1: Translation 1
              translation_key_2: Translation 2
            valid: true
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/translations/request:
    publish:
      summary: Request translation registrations
      description: 'Request all translation providers to register their translations
        using the topics below.

        '
      tags:
      - name: Translations
        description: All translations related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/translations/add:
    publish:
      summary: Add translations
      description: |
        Add translations with their default values.
        These default values will be used as long as they are not updated via zbos/translations/update
      tags:
      - name: Translations
        description: All translations related topics.
      message:
        payload:
          type: object
          properties:
            key:
              type: string
            category:
              type: string
            language:
              type: string
              description: 'ISO 639-1 language code, Eg: ''en'' or ''en-US'''
            file:
              type: string
              description: |-
                Optional. Use either translations or file.
                The file location should be a path accessible for the RAIL.
                The content should be a json object with key-value pairs.
                Dots (.) are not allowed in the keys and will be replaced with underscores (_)"
            translations:
              type: object
              description: |-
                Optional. Use either translations or file
                Dots (.) are not allowed in the keys and will be replaced with underscores (_)
        name: AddTranslationsRequest
        examples:
        - payload:
            key: abc
            category: category_1
            language: en-US
            translations:
              translation_key_1: Translation 1
              translation_key_2: Translation 2
            valid: true
        - payload:
            key: abc
            category: category_1
            language: en-US
            file: path/to/file.json
            valid: true
  zbos/translations/add/response/{key}:
    publish:
      summary: 'Response: Add translations'
      description: ''
      tags:
      - name: Translations
        description: All translations related topics.
      message:
        "$ref": "#/components/messages/successMessage"
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/translations/update:
    publish:
      summary: Update translations
      description: 'Update translations overriding the default values.

        '
      tags:
      - name: Translations
        description: All translations related topics.
      message:
        payload:
          type: object
          properties:
            key:
              type: string
            category:
              type: string
            language:
              type: string
              description: 'ISO 639-1 language code, Eg: ''en'' or ''en-US'''
            file:
              type: string
              description: |-
                Optional. Use either translations or file.
                The file location should be a path accessible for the RAIL.
                The content should be a json object with key-value pairs.
            translations:
              type: object
              description: Optional. Use either translations or file
        name: UpdateTranslationsRequest
        examples:
        - payload:
            key: abc
            category: category_1
            language: en-US
            translations:
              translation_key_1: Translation 1
              translation_key_2: Translation 2
            valid: true
        - payload:
            key: abc
            category: category_1
            language: en-US
            file: path/to/file.json
            valid: true
  zbos/translations/update/response/{key}:
    publish:
      summary: 'Response: Update translations'
      description: ''
      tags:
      - name: Translations
        description: All translations related topics.
      message:
        "$ref": "#/components/messages/successMessage"
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/translations/changed/event/{category}:
    publish:
      summary: 'Event: Translations changed'
      description: ''
      tags:
      - name: Translations
        description: All translations related topics.
      message:
        payload:
          type: object
          properties:
            category:
              type: string
            language:
              type: string
              description: 'ISO 639-1 language code, Eg: ''en'' or ''en-US'''
        name: TranslationsChangedEvent
        examples:
        - payload:
            category: category_1
            language: en-US
            valid: true
    parameters:
      category:
        description: ID of the translations category that was changed
        schema:
          type: string
  zbos/translations/reset:
    publish:
      summary: Reset translations
      description: 'Reset translations to their default values

        '
      tags:
      - name: Translations
        description: All translations related topics.
      message:
        payload:
          type: object
          properties:
            key:
              type: string
            category:
              type: string
            language:
              type: string
              description: 'ISO 639-1 language code, Eg: ''en'' or ''en-US'''
        name: ResetTranslationsRequest
        examples:
        - payload:
            key: abc
            category: category_1
            language: en-US
            valid: true
  zbos/translations/reset/response/{key}:
    publish:
      summary: 'Response: Reset translations'
      description: ''
      tags:
      - name: Translations
        description: All translations related topics.
      message:
        "$ref": "#/components/messages/successMessage"
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/variables/get:
    publish:
      summary: Get all variables
      description: 'see <<zbos/variables/response/{key}>> for response

        '
      tags:
      - name: Variables
        description: All variables related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/variables/response/{key}:
    subscribe:
      summary: 'response: Get all variables'
      description: ''
      tags:
      - name: Variables
        description: All variables related topics.
      message:
        payload:
          type: object
          properties:
            variables:
              type: array
              description: A list of all variables, not present when status is false.
              items:
                type: object
                properties:
                  name:
                    type: string
                  value:
                    type: string
                  id:
                    type: string
                  state:
                    type: string
            status:
              type: boolean
              description: Will be present when status is false (error message)
            message:
              type: string
        name: GlobalVariables
        examples:
        - payload:
            variables:
            - name: string
              value: string
            status: true
            message: string
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/variables/set:
    publish:
      summary: Set variables
      description: 'Saving the global variables on the robot.see <<zbos/variables/set/response/{key}>>
        for response

        '
      tags:
      - name: Variables
        description: All variables related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/variables/set/response/{key}:
    subscribe:
      summary: 'response: indicates if the save was successful or not'
      description: ''
      tags:
      - name: Variables
        description: All variables related topics.
      message:
        payload:
          type: object
          properties:
            variables:
              type: array
              description: A list of all variables, not present when status is false.
              items:
                type: object
                properties:
                  name:
                    type: string
                  value:
                    type: string
                  id:
                    type: string
                  state:
                    type: string
            status:
              type: boolean
              description: Will be present when status is false (error message)
            message:
              type: string
        name: GlobalVariables
        examples:
        - payload:
            variables:
            - name: string
              value: string
            status: true
            message: string
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/wifi/scan:
    publish:
      summary: Request WiFi scan
      description: 'Start scanning for WiFi networks

        '
      tags:
      - name: Wifi
        description: All wifi related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/wifi/event/scan:
    subscribe:
      summary: 'event: Wifi scan'
      description: 'All WiFi scan results are publish as an event. The event can be
        triggered by a scan request or by the robot system.

        '
      tags:
      - name: Wifi
        description: All wifi related topics.
      message:
        payload:
          type: array
          items:
            type: object
            properties:
              ssid:
                type: string
              bssid:
                type: string
              channel:
                type: string
              bandwidth:
                type: string
              auth:
                type: string
                description: type off network, "0" for open networks
              is_5g:
                type: string
              rssi:
                type: string
                description: Network strength (0-100)
                "$ref": "#/components/schemas/percentage"
              save:
                type: string
                maximum: 2
                minimum: 0
                description: '"0" not saved, "1" saved, "2" currently connected'
              password:
                type: string
        name: Array<AccessPoint>
        examples:
        - payload:
            ssid: QMBTEERO
            bssid: 0025.9e45.24a0
            channel: '20'
            bandwidth: '45'
            auth: '1'
            rssi: '100'
            save: '2'
            password: string
            savedNetwork:
              ssid: QMBTEERO
              encryption: SHARE
              password: string
              hidden: false
            scannedNetwork:
              ssid: QMBTEERO
              encryption: SHARE
              signal: 100
              serviceId: 0025.9e45.24a0
              channel: 20
              saved: true
  zbos/wifi/connect:
    publish:
      summary: Connect to wifi
      description: ''
      tags:
      - name: Wifi
        description: All wifi related topics.
      message:
        payload:
          type: object
          properties:
            ssid:
              type: string
            bssid:
              type: string
            channel:
              type: string
            bandwidth:
              type: string
            auth:
              type: string
              description: type off network, "0" for open networks
            is_5g:
              type: string
            rssi:
              type: string
              description: Network strength (0-100)
              "$ref": "#/components/schemas/percentage"
            save:
              type: string
              maximum: 2
              minimum: 0
              description: '"0" not saved, "1" saved, "2" currently connected'
            password:
              type: string
        name: AccessPoint
        examples:
        - payload:
            ssid: QBMTEERO
            password: string
            savedNetwork:
              ssid: QBMTEERO
              encryption: UNSECURE
              password: string
              hidden: false
            scannedNetwork:
              ssid: QBMTEERO
              encryption: UNSECURE
              saved: false
  zbos/wifi/event/connected:
    subscribe:
      summary: 'event: Wifi connected'
      description: 'Whenever there is a WiFi status available, this will be published.
        This can be triggered by a request, or the robot system at any time independently
        of an actual change in the status. On these topic the current WiFi status
        is also published.

        '
      tags:
      - name: Wifi
        description: All wifi related topics.
      message:
        payload:
          type: object
          properties:
            app_enable:
              type: string
            auth:
              type: string
              description: type off network, "0" for open networks
            auto:
              type: string
            bandwidth:
              type: string
            bssid:
              type: string
            channel:
              type: string
            dns0:
              type: string
            dns1:
              type: string
            enable:
              type: string
            encrypt:
              type: string
            gw:
              type: string
              description: The gateway
            internet:
              type: string
              description: '0 - internet is available, anything else: no internet
                available'
            ip:
              type: string
            is_wan_priority:
              type: string
            key:
              type: string
            mask:
              type: string
            rssi:
              type: string
              description: Network strength (0-100)
              "$ref": "#/components/schemas/percentage"
            run_time:
              type: string
            ssid:
              type: string
            status:
              type: string
              maximum: 3
              minimum: 0
              description: 0 - disconnected, 1 - connected, 3 - connecting
        name: WispStatus
        examples:
        - payload:
            app_enable: string
            auth: '1'
            auto: string
            bandwidth: '50'
            bssid: 0025.9e45.24a0
            channel: '20'
            dns0: 8.8.8.8
            dns1: 8.8.4.4
            enable: string
            encrypt: WPA/ WPA2
            gw: 192.168.0.1
            internet: '0'
            ip: 192.168.0.100
            key: string
            mask: 255.255.255.0
            rssi: '100'
            run_time: string
            ssid: QMBTEERO
            status: '1'
            wifiStatus:
              ssid: QMBTEERO
              encryption: SHARE
              ip4: 192.168.0.100
              dhcp: false
              subnetmask: 255.255.255.0
              gateway: 192.168.0.1
              dns:
                dns1: 8.8.8.8
                dns2: 8.8.4.4
                adapterName: wlan0
                valid: true
              serviceId: 0025.9e45.24a0
              connectionStatus: CONNECTED
              hasInternet: true
              adapterName: wlan0
            dnsconfig:
              dns1: 8.8.8.8
              dns2: 8.8.4.4
              adapterName: wlan0
              valid: true
  zbos/wifi/event/disconnected:
    subscribe:
      summary: 'event: Wifi disconnected'
      description: 'Whenever there is a WiFi status available, this will be published.
        This can be triggered by a request, or the robot system at any time independently
        of an actual change in the status. On these topic the current WiFi status
        is also published.

        '
      tags:
      - name: Wifi
        description: All wifi related topics.
      message:
        payload:
          type: object
          properties:
            app_enable:
              type: string
            auth:
              type: string
              description: type off network, "0" for open networks
            auto:
              type: string
            bandwidth:
              type: string
            bssid:
              type: string
            channel:
              type: string
            dns0:
              type: string
            dns1:
              type: string
            enable:
              type: string
            encrypt:
              type: string
            gw:
              type: string
              description: The gateway
            internet:
              type: string
              description: '0 - internet is available, anything else: no internet
                available'
            ip:
              type: string
            is_wan_priority:
              type: string
            key:
              type: string
            mask:
              type: string
            rssi:
              type: string
              description: Network strength (0-100)
              "$ref": "#/components/schemas/percentage"
            run_time:
              type: string
            ssid:
              type: string
            status:
              type: string
              maximum: 3
              minimum: 0
              description: 0 - disconnected, 1 - connected, 3 - connecting
        name: WispStatus
        examples:
        - payload:
            app_enable: string
            auth: '1'
            auto: string
            bandwidth: '50'
            bssid: 0025.9e45.24a0
            channel: '20'
            dns0: 8.8.8.8
            dns1: 8.8.4.4
            enable: string
            encrypt: WPA/ WPA2
            gw: 192.168.0.1
            internet: '0'
            ip: 192.168.0.100
            key: string
            mask: 255.255.255.0
            rssi: '100'
            run_time: string
            ssid: QMBTEERO
            status: '0'
            wifiStatus:
              ssid: QMBTEERO
              encryption: SHARE
              ip4: 192.168.0.100
              dhcp: false
              subnetmask: 255.255.255.0
              gateway: 192.168.0.1
              dns:
                dns1: 8.8.8.8
                dns2: 8.8.4.4
                adapterName: wlan0
                valid: true
              serviceId: 0025.9e45.24a0
              connectionStatus: DISCONNECTED
              hasInternet: true
              adapterName: wlan0
            dnsconfig:
              dns1: 8.8.8.8
              dns2: 8.8.4.4
              adapterName: wlan0
              valid: true
  zbos/wifi/status/get:
    publish:
      summary: get Wifi status
      description: 'see zbos/wifi/status/response for response

        '
      tags:
      - name: Wifi
        description: All wifi related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/wifi/status/response:
    subscribe:
      summary: 'response: Wifi status'
      description: 'All WiFi scan results are publish as an event. The event can be
        triggered by a scan request or by the robot system.

        '
      tags:
      - name: Wifi
        description: All wifi related topics.
      message:
        payload:
          type: object
          properties:
            app_enable:
              type: string
            auth:
              type: string
              description: type off network, "0" for open networks
            auto:
              type: string
            bandwidth:
              type: string
            bssid:
              type: string
            channel:
              type: string
            dns0:
              type: string
            dns1:
              type: string
            enable:
              type: string
            encrypt:
              type: string
            gw:
              type: string
              description: The gateway
            internet:
              type: string
              description: '0 - internet is available, anything else: no internet
                available'
            ip:
              type: string
            is_wan_priority:
              type: string
            key:
              type: string
            mask:
              type: string
            rssi:
              type: string
              description: Network strength (0-100)
              "$ref": "#/components/schemas/percentage"
            run_time:
              type: string
            ssid:
              type: string
            status:
              type: string
              maximum: 3
              minimum: 0
              description: 0 - disconnected, 1 - connected, 3 - connecting
        name: WispStatus
        examples:
        - payload:
            app_enable: string
            auth: '1'
            auto: string
            bandwidth: '50'
            bssid: 0025.9e45.24a0
            channel: '20'
            dns0: 8.8.8.8
            dns1: 8.8.4.4
            enable: string
            encrypt: WPA/ WPA2
            gw: 192.168.0.1
            internet: '0'
            ip: 192.168.0.100
            key: string
            mask: 255.255.255.0
            rssi: '100'
            run_time: string
            ssid: QMBTEERO
            status: '0'
            wifiStatus:
              ssid: QMBTEERO
              encryption: SHARE
              ip4: 192.168.0.100
              dhcp: false
              subnetmask: 255.255.255.0
              gateway: 192.168.0.1
              dns:
                dns1: 8.8.8.8
                dns2: 8.8.4.4
                adapterName: wlan0
                valid: true
              serviceId: 0025.9e45.24a0
              connectionStatus: DISCONNECTED
              hasInternet: true
              adapterName: wlan0
            dnsconfig:
              dns1: 8.8.8.8
              dns2: 8.8.4.4
              adapterName: wlan0
              valid: true
  zbos/wifi/status/event:
    subscribe:
      summary: 'event: Wifi status'
      description: ''
      tags:
      - name: Wifi
        description: All wifi related topics.
      message:
        payload:
          type: object
          properties:
            app_enable:
              type: string
            auth:
              type: string
              description: type off network, "0" for open networks
            auto:
              type: string
            bandwidth:
              type: string
            bssid:
              type: string
            channel:
              type: string
            dns0:
              type: string
            dns1:
              type: string
            enable:
              type: string
            encrypt:
              type: string
            gw:
              type: string
              description: The gateway
            internet:
              type: string
              description: '0 - internet is available, anything else: no internet
                available'
            ip:
              type: string
            is_wan_priority:
              type: string
            key:
              type: string
            mask:
              type: string
            rssi:
              type: string
              description: Network strength (0-100)
              "$ref": "#/components/schemas/percentage"
            run_time:
              type: string
            ssid:
              type: string
            status:
              type: string
              maximum: 3
              minimum: 0
              description: 0 - disconnected, 1 - connected, 3 - connecting
        name: WispStatus
        examples:
        - payload:
            app_enable: string
            auth: '1'
            auto: string
            bandwidth: '50'
            bssid: 0025.9e45.24a0
            channel: '20'
            dns0: 8.8.8.8
            dns1: 8.8.4.4
            enable: string
            encrypt: WPA/ WPA2
            gw: 192.168.0.1
            internet: '0'
            ip: 192.168.0.100
            key: string
            mask: 255.255.255.0
            rssi: '100'
            run_time: string
            ssid: QMBTEERO
            status: '0'
            wifiStatus:
              ssid: QMBTEERO
              encryption: SHARE
              ip4: 192.168.0.100
              dhcp: false
              subnetmask: 255.255.255.0
              gateway: 192.168.0.1
              dns:
                dns1: 8.8.8.8
                dns2: 8.8.4.4
                adapterName: wlan0
                valid: true
              serviceId: 0025.9e45.24a0
              connectionStatus: DISCONNECTED
              hasInternet: true
              adapterName: wlan0
            dnsconfig:
              dns1: 8.8.8.8
              dns2: 8.8.4.4
              adapterName: wlan0
              valid: true
  zbos/wifi/error:
    subscribe:
      summary: Wifi error
      description: 'A message is published on this topic, whenever there is an error,
        during execution of WiFi commands

        '
      tags:
      - name: Wifi
        description: All wifi related topics.
      message:
        payload:
          type: string
        name: String
  zbos/wifi/forget:
    publish:
      summary: Forget network
      description: 'Forget a saved network, only possible when not connected to the
        saved network.

        '
      tags:
      - name: Wifi
        description: All wifi related topics.
      message:
        payload:
          type: object
          properties:
            ssid:
              type: string
            bssid:
              type: string
            channel:
              type: string
            bandwidth:
              type: string
            auth:
              type: string
              description: type off network, "0" for open networks
            is_5g:
              type: string
            rssi:
              type: string
              description: Network strength (0-100)
              "$ref": "#/components/schemas/percentage"
            save:
              type: string
              maximum: 2
              minimum: 0
              description: '"0" not saved, "1" saved, "2" currently connected'
            password:
              type: string
        name: AccessPoint
        examples:
        - payload:
            ssid: QMBTEERO
            savedNetwork:
              ssid: QMBTEERO
              encryption: UNSECURE
              hidden: false
            scannedNetwork:
              ssid: QMBTEERO
              encryption: UNSECURE
              saved: false
  zbos/wifi/forget/event:
    subscribe:
      summary: 'event: Wifi forgotten'
      description: ''
      tags:
      - name: Wifi
        description: All wifi related topics.
      message:
        payload:
          type: object
          properties:
            bssid:
              type: string
            success:
              type: boolean
        name: ForgetResponse
        examples:
        - payload: {}
  zbos/wifi/repair:
    publish:
      summary: Repair Wifi
      description: ''
      tags:
      - name: Wifi
        description: All wifi related topics.
      message:
        "$ref": "#/components/messages/emptyMessage"
  zbos/wifi/accesspoint/password/set:
    publish:
      summary: Set hotspot password
      description: ''
      tags:
      - name: Wifi
        description: All wifi related topics.
      message:
        payload:
          type: string
        name: String
  zbos/wifi/accesspoint/password/get:
    publish:
      summary: Get hotspot password
      description: 'see <<zbos/wifi/accesspoint/password/response>> for response

        '
      tags:
      - name: Wifi
        description: All wifi related topics.
      message:
        "$ref": "#/components/messages/keyMessage"
  zbos/wifi/accesspoint/password/response:
    subscribe:
      summary: 'response: Get hotspot password'
      description: ''
      tags:
      - name: Wifi
        description: All wifi related topics.
      message:
        payload:
          type: string
        name: String
  zbos/wifi/hotspot/set:
    publish:
      summary: Set wifi hotspot
      description: 'see <<zbos/wifi/hotspot/set/response/{key}>> for response

        '
      tags:
      - name: Wifi
        description: All wifi related topics.
      message:
        payload:
          type: object
          properties:
            network_mode:
              type: string
            port_id:
              type: string
            ap_id:
              type: string
            AP_SSID:
              type: string
            SSID_broadcast:
              type: string
            channel_band:
              type: string
            channel_num:
              type: string
            channel_width:
              type: string
            need_reboot:
              type: string
            radio_criterion:
              type: string
            region:
              type: string
            waln_partition:
              type: string
            wire_enable:
              type: string
            wire_mac:
              type: string
        name: PostFieldsHotspot
        examples:
        - payload:
            port_id: string
            ap_id: string
  zbos/wifi/hotspot/set/response/{key}:
    subscribe:
      summary: 'response: Set wifi hotspot'
      description: ''
      tags:
      - name: Wifi
        description: All wifi related topics.
      message:
        payload:
          type: string
        name: String
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
  zbos/wifi/hotspot/get:
    publish:
      summary: Get wifi hotspot
      description: 'see <<zbos/wifi/hotspot/get/response/{key}>> for response

        '
      tags:
      - name: Wifi
        description: All wifi related topics.
      message:
        payload:
          type: object
          properties:
            network_mode:
              type: string
            port_id:
              type: string
            ap_id:
              type: string
            AP_SSID:
              type: string
            SSID_broadcast:
              type: string
            channel_band:
              type: string
            channel_num:
              type: string
            channel_width:
              type: string
            need_reboot:
              type: string
            radio_criterion:
              type: string
            region:
              type: string
            waln_partition:
              type: string
            wire_enable:
              type: string
            wire_mac:
              type: string
        name: PostFieldsHotspot
        examples:
        - payload:
            port_id: string
            ap_id: string
  zbos/wifi/hotspot/get/response/{key}:
    subscribe:
      summary: 'response: Get wifi hotspot'
      description: ''
      tags:
      - name: Wifi
        description: All wifi related topics.
      message:
        payload:
          type: string
        name: String
    parameters:
      key:
        description: Request key to create a unique subscription topic
        schema:
          type: string
components:
  schemas:
    percentage:
      type: integer
      maximum: 100
      minimum: 0
      description: Percentage value between with range 0 to 100
    key:
      type: string
      description: Required random key
  messages:
    emptyMessage:
      payload:
        type: object
      name: EmptyMessage
      summary: Empty message
    keyMessage:
      payload:
        type: object
        properties:
          key:
            type: string
            description: Required random key
      name: KeyResult
      summary: Random key
      examples:
      - payload:
          key: ABCxyz
    successMessage:
      payload:
        type: object
        properties:
          success:
            type: boolean
            description: Success message
      name: SuccessMessage
      summary: Success message
      examples:
      - payload:
          success: true
    notificationMessage:
      payload:
        type: object
        properties:
          message:
            type: object
            properties:
              message:
                type: string
              translate:
                type: boolean
              formatArguments:
                type: array
                items:
                  type: string
              translationCategory:
                type: string
      name: NotificationOptions
      summary: Message json
      examples:
      - payload:
          message:
            message: string
            translate: true
            formatArguments:
            - string
tags:
- name: Speech
  description: All speech related topics.
- name: Motion
  description: All motion related topics.
- name: Audio
  description: All audio related topics.
- name: Status
  description: All status related topics.
- name: System
  description: All system related topics.
- name: Sensors
  description: All sensors related topics.
- name: Leds
  description: All leds related topics.
- name: Composer
  description: All composer related topics.
- name: Kiosk
  description: All kiosk related topics.
- name: Media
  description: All media related topics.
- name: Applications
  description: All applications related topics.
- name: Translations
  description: All translations related topics.
- name: Settings
  description: All settings related topics.
- name: Camera
  description: All camera related topics.
- name: Domotics
  description: All domotics related topics.
- name: Cloud
  description: All cloud related topics.
- name: SLAM
  description: All slam related topics.
- name: Wifi
  description: All wifi related topics.
- name: Connection
  description: All connection related topics.
- name: Survey
  description: All survey related topics.
- name: Motion detection
  description: All motion detection related topics.
- name: Face tracking
  description: All face tracking related topics.
- name: SIP
  description: All sip related topics.
- name: Time
  description: All time related topics.
- name: Variables
  description: All variables related topics.
- name: Diagnostics
  description: All diagnostics related topics.
`;
