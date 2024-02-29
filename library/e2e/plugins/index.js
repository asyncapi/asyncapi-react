const wp = require('@cypress/webpack-preprocessor');

const webpackOptions = {
  resolve: {
    extensions: ['.ts', '.js'],
  },
  performance: false,
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'e2e/tsconfig.json',
            },
          },
        ],
      },
    ],
  },
};

module.exports = on => {
  on('file:preprocessor', wp({ webpackOptions }));
};
