// config-overrides.js
module.exports = function override(config, env) {
  // Override the Webpack Dev Server configuration
  config.devServer = {
    ...config.devServer,
    disableHostCheck: true,
  };
  return config;
};
