# Releasing

## Overview

Read the document to find out how to:

- Release a new version of the library or playground
- Create release notes

## Publish the library

To publish a new version of the library, run the following commands:

```bash
npm version {version_kind} -m "Upgrade to %s for reasons: {reason}"
```

The script uses these parameters:

- `{version_kind}` is a version of the release. See the available [versions](https://docs.npmjs.com/cli/version.html#synopsis).
- `{reason}` is a short description of the incoming changes in the release.

**NOTE:** If you have any publishing issues, contact the repository administrators.

## Publish the playground application

The [playground application](https://www.asyncapi.com/asyncapi-react/) is hosted on [GitHub Pages](https://pages.github.com/). To publish its new version, run the following command in the [playground](../../playground) directory:

```bash
npm run publish:upstream
```

You can also publish the playground app with your GitHub profile using this command:

```bash
npm run publish:origin
```

**NOTE:** If you have any publishing issues, contact the repository administrators.

## Release notes

Follow these steps to create a changelog for the new release.

1. Generate the changelog using the [`lerna-changelog`](https://github.com/lerna/lerna-changelog) tool. Run the following command to generate the changelog content for PRs merged after creating the last Git tag:

   ```bash
   npm run changelog
   ```

   You can also generate the changelog content corresponding to PRs merged in-between particular Git tags:

   ```bash
   npm run changelog -- --from=v{pre-version} --to=v{post-version}
   ```

   The `lerna-changelog` tool detects changes based on PR labels and maps them to sections as per the configuration in the `package.json` file.

   ```js
     "changelog": {
       "labels": {
         "breaking": ":boom: Breaking Changes",
         "enhancement": ":rocket: Enhancements",
         "bug": ":bug: Fixed",
         "area/library": ":zap: Library",
         "area/playground": ":video_game: Playground app",
         "area/documentation": ":memo: Documentation"
       }
       ...
     }
   ```

   **NOTE:** Both `{pre-version}` and `{post-version}` follow the `MAJOR.MINOR.PATCH` format.

2. The generated code should look as follows:

   ```
   ## Unreleased (YYYY-MM-DD)

   #### :bug: Fixed
   * [#XXX](https://github.com/asyncapi/asyncapi-react/pull/YYY) Some commit message ([@john-doe](https://github.com/john-doe))

   #### :zap: Library
   * [#XXX](https://github.com/asyncapi/asyncapi-react/pull/ZZZ) Some commit message v2 ([@john-doe](https://github.com/john-doe))

   #### Committers: 1
   - John Doe ([@john-doe](https://github.com/john-doe))
   ```

3. Go to GitHub to [create a new release](https://github.com/asyncapi/asyncapi-react/releases) and paste the generated code as a description. Do not include the **Committers** section.

Make sure you change `## Unreleased ({date})` or `## {tag} ({date})` to `## Released ({date})`.
