const { defineConfig } = require('cypress');
const wp = require('@cypress/webpack-preprocessor');

module.exports = defineConfig({
  e2e: {
    specPattern: 'e2e/integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,
    fixturesFolder: false,
    defaultCommandTimeout: 50000,

    setupNodeEvents(on, config) {
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

      on('file:preprocessor', wp({ webpackOptions }));

      return config;
    },
    video: false,
    viewportWidth: 1440,
    viewportHeight: 720,
    excludeSpecPattern: '*.js.map',
  },
});
