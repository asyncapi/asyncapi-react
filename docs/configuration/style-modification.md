# Style Modification

## Overview

This document describes how you can apply the styles for the AsyncApi component.

## Changing styles

In the AsyncApi component we use pure css styling and [`BEM`](http://getbem.com/) methodology. Each HTML tag inside the AsyncApi component has a unique css class. Each class has form: `asyncapi__{ELEMENT}--{MODIFIER}`, where:

- `{ELEMENT}` - is a name of specific element. Each element name is the concatenation of the names of the elements in which it is located. For example: `asyncapi__channel-header-title` is located in `header` HTML element of `channel` element. 
- `{MODIFIER}` - is a modifier for `{ELEMENT}`. Very few elements have a modifier. This is usually badge, button and similar, generic components.

For changing styles, you must create (or if you use [default](../../library/src/styles/fiori.css) style, modify) appropriate class.

> **NOTE**: We recommend copy default styles from [here](../../library/src/styles/fiori.css) and changing them at its sole discretion.
