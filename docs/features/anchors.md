# Anchors

## Overview

The anchors provide the possibility to point to a particular part of a schema.

## Details

Each component has a unique anchor in the `http://{URL}/#{SCHEMA_NAME}--{CONTAINER}--{ITEM_NAME}--{ITEM_PROPERTY}` format, where:

- `{URL}` is the website URL.
- `{SCHEMA_NAME}` is the name of the schema. It is passed to the component by configuration with the [`schemaID`](../configuration/config-modification.md#definition) field. By default, the value of `schemaID` is always `asyncapi`.
- `{CONTAINER}` is the name of the container. The possible values are: `info`, `servers`, `operations`, `messages`.
- `{ITEM_NAME}` is the `name` or `title` of the item. There are no defined items for the `info` container.
- `{ITEM_PROPERTY}` is the name of a particular part of the item. The possible values are:
    - for the `info` container: there are no defined properties
    - for the `servers` container: `url-variables`, `security`
    - for the `operations` container: `parameters`
    - for the `messages` container: `payload`, `headers`

## Examples

- `http://{URL}/#asyncapi` is an anchor that points to the rendered specification. 
- `http://{URL}/#custom-spec--operations` is an anchor that points to the `operations` container of the `custom-spec` specification.
- `http://{URL}/#asyncapi--operations--testUrl` is an anchor that points to the `testUrl` item of the `operations` container.
- `http://{URL}/#asyncapi--operations--testUrl--parameters` - is an anchor that points to the `parameters` part of the `testUrl` item of the `operations` container.
