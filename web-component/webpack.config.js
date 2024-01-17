const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  entry: {
    'asyncapi-web-component': './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'AsyncApiWebComponent',
    libraryExport: 'default',
    umdNamedDefine: true,
  },

  mode: 'production',
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      // this is important as it makes sure react is resolved only once from both library and web-component -> otherwise react may be bundled twice and an error as follows occur
      // "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
      // 1. You might have mismatching versions of React and the renderer (such as React DOM)
      // 2. You might be breaking the Rules of Hooks
      // 3. You might have more than one copy of React in the same app
      // See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem."
      react: path.resolve('./node_modules/react'),
    },
    fallback: {
      fs: false,
    },
  },
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    /**
     * Uncomment plugin when you wanna see dependency map of bundled package
     */
    // new BundleAnalyzerPlugin(),
    new NodePolyfillPlugin(),
  ],
};
