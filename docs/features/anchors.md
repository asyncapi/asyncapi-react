# Anchors

## Overview

Read the document to find out how to works internal anchors in the AsyncAPI React component.

## How works anchors

In the AsyncAPI React component is a possibility to direct to appropriate part of schema by anchors in url. Each component has a unique anchor in the `{NAME_OF_SCHEMA}--{CONTAINER|ITEM}--{ITEM_NAME}--{ITEM_PROPERTY}` format, where:

- `{NAME_OF_SCHEMA}` is the name of schema. It is passed to component by configuration with [`schemaID`](../configuration/config-modification.md#definition) field.
- `{CONTAINER|ITEM}` is the name of container or item. Possible values are:
    - for `container`: `info`, `channels`, `servers`, `messages`, `schemas`
    - for `item`: `channel`, `server`, `message`, `schema`
- `{ITEM_NAME}` this part only appears, when on second part of anchor is item and contains `name` or `title` of item.
- `{ITEM_PROPERTY}` this part only appears, when on second part of anchor is item. Possible values are:
    - for `channel` item: `parameters`
    - for `server` item: `url-variables`, `security`
    - for `message` item: `headers`, `payload`, `payload-{NAME_OF_PARAMETER}`
    - for `schema` are not defined properties

Each part of anchor has a [kebab cased](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles) form (except are `{ITEM_NAME}` of `channel` and `server` items).
