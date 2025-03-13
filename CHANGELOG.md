# Changelog

## [Unreleased]

### Fixes
- **core:** Improved code quality by aligning with TypeScript best practices ([#1141](https://github.com/asyncapi/asyncapi-react/issues/1141))
  - Marked class members as `readonly` to prevent reassignment in bindingsHelpers.ts, XExtension.tsx, FetchSchema.tsx

  - fixed import react multiple times in ErrorBoundary.tsx

  - Removed redundant React fragments for improved readability in Extensions.tsx, SplitWrapper.tsx
  
### Improvements
- Enhanced code clarity and safety by enforcing stricter TypeScript conventions.
- Ensured compliance with SonarQube recommendations for better maintainability.

## [2.6.3] - Previous Release
- Initial release with foundational features and improvements.
