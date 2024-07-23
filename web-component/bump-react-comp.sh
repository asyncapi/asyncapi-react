#!/usr/bin/env bash

#Use in CI only
#Purpos of this script is to use it to install/bump provided version of the React component

# sleep for 120 seconds before using latest version in web-component, because sometimes NPM needs additional few seconds to `save` package in registry
sleep 2m
echo "Log all versions of the package on npm registry"
npm show @asyncapi/react-component versions
echo "Log latest version of the package on npm registry"
npm show @asyncapi/react-component dist-tags.latest
echo "We need to uninstall old version first to make sure package.json will get updated latest version number"
npm uninstall @asyncapi/react-component
echo "Starting installation of @asyncapi/react-component@$VERSION in $PWD"
npm install @asyncapi/react-component@$VERSION --save --loglevel verbose