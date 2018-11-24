# Project structure

This repository has the following structure:

```
  ├── .github                     # Pull request and issue templates
  ├── .ci                         # Scripts used in Continuous Integration (do not use them locally)
  ├── docs                        # Directory contains the documents related to the project
  ├── library                     # Structure of AsyncApi React component
  │    ├── src                    # AsyncApi React component source code
  │    │    ├── components        # Source code of generic components used in containers directory
  │    │    ├── config            # Every thing related to the config of AsyncApi React component
  │    │    ├── containers        # Components for specific parts of AsyncApi React component
  │    │    ├── helpers           # Various helper functions
  │    │    └── theme             # Every thing related to the theme of AsyncApi React component
  │    └── test                   # Tests for AsyncApi React component
  └── playground                  # Structure of Playground app for AsyncApi React component
       ├── public                 # Fonts, images and icons used in Playground app
       ├── src                    # Playground app source code
       │    ├── common            # Various helper functions, mocks and similar things
       │    └── components        # Components used in Playground app
       └── test                   # Tests for Playground app
```