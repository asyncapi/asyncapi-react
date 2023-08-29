const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

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
    alias: {
      'nimma/legacy$': path.resolve(
        __dirname,
        'node_modules/nimma/dist/legacy/cjs/index.js',
      ),
      'nimma/fallbacks$': path.resolve(
        __dirname,
        'node_modules/nimma/dist/cjs/fallbacks/index.js',
      ),
    },
    fallback: {
      fs: false,
    },
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
    new NodePolyfillPlugin(),
  ],
};

const standaloneBundle = {
  entry: {
    index: './src/standalone.ts',
    'without-parser': './src/standalone-without-parser.ts',
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
      {
        include: [
          path.resolve(
            __dirname,
            './node_modules/nimma/dist/cjs/fallbacks/jsonpath-plus.js',
          ),
        ],
        use: ['remove-hashbag-loader'],
      },
    ],
  },
  resolveLoader: {
    alias: {
      'remove-hashbag-loader': path.join(
        __dirname,
        './loaders/remove-hashbag-loader',
      ),
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      'nimma/legacy$': path.resolve(
        __dirname,
        'node_modules/nimma/dist/legacy/cjs/index.js',
      ),
      'nimma/fallbacks$': path.resolve(
        __dirname,
        'node_modules/nimma/dist/cjs/fallbacks/index.js',
      ),
    },
    fallback: {
      fs: false,
    },
  },

  plugins: [
    /**
     * Uncomment plugin when you wanna see dependency map of bundled package
     */
    // new BundleAnalyzerPlugin(),
    new NodePolyfillPlugin(),
  ],
};

const bundles = [];

process.env['BUILD_MODE'] === 'umd' && bundles.push(umdBundle);
process.env['BUILD_MODE'] === 'standalone' && bundles.push(standaloneBundle);

module.exports = bundles;
