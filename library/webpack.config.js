const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  entry: {
    'asyncapi-ui.min': './src/index.ts',
    'asyncapi-ui.without-parser.min': './src/standalone.ts',
  },
  mode: 'production',
  target: 'web',

  output: {
    path: path.resolve(__dirname, 'bundles/umd'),
    filename: '[name].js',
    library: 'AsyncApiUI',
    libraryTarget: 'umd',
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
          configFile: 'tsconfig.esm.json',
          transpileOnly: true,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
  },

  plugins: [
    /**
     * Uncomment plugin when you wanna see dependency map of bundled package
     */
    // new BundleAnalyzerPlugin(),
  ],
};
