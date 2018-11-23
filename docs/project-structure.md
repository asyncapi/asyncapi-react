# Project structure

This repository has the following structure:

```
  ├── .github                     # Pull request and issue templates
  ├── docs-navigation-builder     # Repository used for creating a navigation file out of the documentation
  ├── scripts                     # Scripts used in Continous Integration (do not use them locally)
  ├── src                         # Website's source code
  │    ├── blog-posts             # Blog posts
  │    ├── components             # Structure of website's components
  │    │       ├── blog           # Structure and styles of the blog posts
  │    │       ├── content        # Styled content of the blog posts
  │    │       ├── cookiee        # Cookie banner
  │    │       ├── docs           # Documentation structure and styles
  │    │       ├── landing        # Landing page structure and styles
  │    │       ├── layout         # Website structure and styles
  │    │       ├── loading        # Loading indicator
  │    │       └── translation    # Language switcher
  │    ├── config                 # Configuration files
  │    ├── constants              # Constants used in the project
  │    ├── helpers                # Various helper functions
  │    ├── locales                # Localization files
  │    ├── pages                  # Main pages displayed on the website
  │    └── templates              # Template files, for example, for a blog post
  └── static                      # Documentation created during the build process, fonts, and images (do not edit the documentation files there)
```