# Anchors

## Overview

Read the document to find out how to works internal anchors in the AsyncAPI React component.

## How works anchors

In the AsyncAPI React component is a possibility to direct to appropriate part of schema by anchors in url. Each component has a unique id in the `{NAME_OF_SCHEMA}--{CONTAINER|ITEM}--{ITEM_NAME}--{PARAMETERS_OF_ITEM}` format, where:

- `{NAME_OF_SCHEMA}` is the name of schema. It is passed to component by configuration with [`schemaID`]() field.