# Style Modification

## Overview

This document describes how you can apply the styles for the AsyncAPI component.

## Changing styles

In the AsyncApi component, we use pure CSS styling and [`BEM`](http://getbem.com/) methodology. Each HTML tag inside the root component has a unique CSS class in the `asyncapi__{ELEMENT}--{MODIFIER}` format, where:

- `{ELEMENT}` is the name of a specific element. Each element name is the concatenation of the names of the elements in which it is located. For example, `asyncapi__channel-header-title` is located in the `header` HTML element of the `channel` element. 
- `{MODIFIER}` is a modifier for `{ELEMENT}`. Very few elements have a modifier. This is usually a badge, button, or similar, generic components.

To change styles, create an appropriate class or modify it if you use the [default](../../library/src/styles/fiori.css) style.

> **NOTE**: We recommend that you first [copy](../../library/src/styles/fiori.css) the default styles to a separate file and then modify them as you prefer.
