const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const umdBundle = {
  entry: {
    index: './src/index.ts',
    'without-parser': './src/without-parser.ts',
  },
  target: 'web',
  mode: 'production',

  output: {
    path: path.resolve(__dirname, 'browser'),
    filename: '[name].js',
    library: 'AsyncApiComponent',
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

const standaloneBundle = {
  entry: {
    index: './src/standalone.ts',
  },
  target: 'web',
  mode: 'production',

  output: {
    path: path.resolve(__dirname, 'browser/standalone'),
    filename: '[name].js',
    library: 'AsyncApiStandalone',
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

  plugins: [
    /**
     * Uncomment plugin when you wanna see dependency map of bundled package
     */
    // new BundleAnalyzerPlugin(),
  ],
};

const bundles = [];

process.env['BUILD_MODE'] === 'umd' && bundles.push(umdBundle);
process.env['BUILD_MODE'] === 'standalone' && bundles.push(standaloneBundle);

module.exports = bundles;
