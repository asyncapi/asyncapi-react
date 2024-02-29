const path = require('path');

module.exports = {
  webpack: function(config, env) {
    config.module.rules = config.module.rules.map(rootRule => {
      if (rootRule.oneOf) {
        rootRule.oneOf = rootRule.oneOf.map(rule => {
          if ((rule.loader ?? '').includes('babel-loader/lib/index.js')) {
            rule.use = [
              path.join(
                __dirname,
                '../library/loaders/remove-hashbag-loader.js',
              ),
              {
                loader: rule.loader,
                options: {
                  ...rule.options,
                  plugins: [
                    ...(rule.options.plugins ?? []),
                    '@babel/plugin-proposal-class-properties',
                  ],
                },
              },
            ];
            delete rule.loader;
            delete rule.options;
          }
          return rule;
        });
      }
      return rootRule;
    });
    config.resolve = {
      ...config.resolve,
      ...{
        alias: {
          'nimma/legacy$': path.resolve(
            __dirname,
            '../library/node_modules/nimma/dist/legacy/cjs/index.js',
          ),
          'nimma/fallbacks$': path.resolve(
            __dirname,
            '../library/node_modules/nimma/dist/cjs/fallbacks/index.js',
          ),
        },
      },
    };
    return config;
  },
};
