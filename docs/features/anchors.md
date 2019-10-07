# Anchors

## Overview

The anchors provide the possibility to point to a particular part of a schema.

## Details

Each component has a unique anchor in the `http://{URL}/#{SCHEMA_NAME}--{CONTAINER}--{ITEM_NAME}--{ITEM_PROPERTY}` format, where:

- `{URL}` is the website URL.
- `{SCHEMA_NAME}` is the name of the schema. It is passed to the component by configuration with the [`schemaID`](../configuration/config-modification.md#definition) field. By default, the value of `schemaID` is always `asyncapi`.
- `{CONTAINER}` is the name of the container. The possible values are: `info`, `channels`, `servers`, `messages`, `schemas`.
- `{ITEM_NAME}` is the `name` or `title` of the item. There are no defined items for the `info` container.
- `{ITEM_PROPERTY}` is the name of a particular part of the item. The possible values are:
    - for the `info` container: there are no defined properties
    - for the `channels` container: `parameters`
    - for the `servers` container: `url-variables`, `security`
    - for the `messages` container: `headers`, `payload`, `payloads`, `payload-{NAME_OF_PARAMETER}`
    - for the `schemas` container: there are no defined properties

## Examples

- `http://{URL}/#asyncapi` is an anchor that points to the rendered specification. 
- `http://{URL}/#asyncapi--channels` is an anchor that points to the `channels` container of the `asyncapi` specification.
- `http://{URL}/#asyncapi--channels--testUrl` is an anchor that points to the `testUrl` item of the `channels` container.
- `http://{URL}/#asyncapi--channels--testUrl--parameters` - is an anchor that points to the `parameters` part of the `testUrl` item of the `channels` container.
