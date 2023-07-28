const path = require('path');

module.exports = {
  webpack: function override(config, env) {
    config.resolve = Object.assign({}, config.resolve, {
      modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    });

    return config;
  },
  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.headers = { 'Access-Control-Allow-Origin': '*' };

      return config;
    };
  },
};
