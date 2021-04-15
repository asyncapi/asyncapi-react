const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  entry: {
    'asyncapi-ui': './src/index.ts',
    'asyncapi-ui.wp': './src/without-parser.ts',
  },
  mode: 'production',

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
    // new BundleAnalyzerPlugin(),
  ],
};
