const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',

  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: {
      name: 'AsyncApiUI',
      type: 'umd',
    },
    libraryExport: 'default',
    umdNamedDefine: true,
    globalObject: `(typeof self !== 'undefined' ? self : this)`,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      path: require.resolve('path-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
    },
  },
};
