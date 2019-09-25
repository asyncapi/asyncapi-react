# Anchors

## Overview

The anchors provide the possibility to point to a particular part of a schema.

## Details

To point to a particular part of a schema, the AsyncAPI React component uses anchors in URLs. Each component has a unique anchor in the `http://{URL}/#{SCHEMA_NAME}--{CONTAINER}--{ITEM_NAME}--{ITEM_PROPERTY}` format, where:

- `{URL}` is the URL address of a website.
- `{SCHEMA_NAME}` is the name of a schema. It is passed to a component by configuration with the [`schemaID`](../configuration/config-modification.md#definition) field. `schemaID` is set to `asyncapi` by default.
- `{CONTAINER}` is the name of a container. The possible values are: `info`, `channels`, `servers`, `messages`, `schemas`.
- `{ITEM_NAME}` is the `name` or `title` of an item. For `info` container are no defined items.
- `{ITEM_PROPERTY}` is the name of particular part of an item. Possible values are:
    - for the `info` container: there are no defined properties
    - for the `channels` container: `parameters`
    - for the `servers` container: `url-variables`, `security`
    - for the `messages` container: `headers`, `payload`, `payloads`, `payload-{NAME_OF_PARAMETER}`
    - for the `schemas` container: there are no defined properties

## Examples

- `http://{URL}/#asyncapi` - anchor point to rendered specification.
- `http://{URL}/#asyncapi--channels` - anchor point to `channels`.
- `http://{URL}/#asyncapi--channels--testUrl` - anchor point to `testUrl` item of `channels`.
- `http://{URL}/#asyncapi--channels--testUrl--parameters` - anchor point to `parameters` part of `testUrl` item of `channels`.
