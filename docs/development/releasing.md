# Releasing

## Overview

Read the document to find out how to release new version of library and/or playground, and create release notes.

## Publish library

To publish new version of library, please run following commands:

```
$ npm version {version_kind} -m "Upgrade to %s for reasons: {reason}"
```
where:
- `{version_kind}` - version of release (available [https://docs.npmjs.com/cli/version.html#synopsis](versions)).
- `{reason}` - short description of incoming changes in release.

**NOTE:** If you have problem with publishing, please contact with administration of repository.

## Publish playground app

[Playground application](https://www.asyncapi.com/asyncapi-react/) is hosted on [GitHub Pages](https://pages.github.com/). To publish new version of playground application run following command at [playground](../../playground) directory:

```
$ npm run publish:upstream
```

You can also publish playground app at yours github profile by command:

```
$ npm run publish:origin
```

**NOTE:** If you have problem with publishing, please contact with administration of repository.

## Release notes

Follow these steps to create a changelog for the new release.

1. Generate the changelog using the [`lerna-changelog`](https://github.com/lerna/lerna-changelog) tool. Run the following command to generate the changelog content for PRs merged after creating the last Git tag:

    ```
    $ npm run changelog
    ```

    You can also generate the changelog content corresponding to PRs merged in-between particular Git tags:

    ```
    $ npm run changelog -- --from=v{pre-version} --to=v{post-version}
    ```

    The `lerna-changelog` tool detects changes based on PR labels and maps them to sections as per the configuration in the `package.json` file.

    ```
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

    **NOTE:** `{pre-version}` and `{post-version}` have a following form: `MAJOR.MINOR.PATCH`.

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
