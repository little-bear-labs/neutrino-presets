const jest = require('@neutrinojs/jest');
const { merge } = require('eslint/lib/config/config-ops');

module.exports = (neutrino, opts = {}) => {
  neutrino.use(jest, opts);

  if (neutrino.config.module.rules.has('lint')) {
    neutrino.config.module.rule('lint').use('eslint').tap(options =>
      merge(options, {
        baseConfig: {
          plugins: ['jest'],
        },
      }));
  }
};
