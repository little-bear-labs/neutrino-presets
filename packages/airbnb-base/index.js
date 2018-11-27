const airbnbBase = require('@neutrinojs/airbnb-base');
const eslint = require('@conduitvc/eslint');
const { merge } = require('eslint/lib/config/config-ops');

module.exports = (neutrino, { flow, typescript, ...opts } = {}) => {
  const extensions = [];
  const plugins = [];
  const rules = {};
  const base = eslint({ flow, typescript });
  const airbnbDefaults = merge(base.eslint, {
    baseConfig: {
      extends: extensions,
      plugins,
      rules,
    },
  });
  const options = {
    ...base,
    ...opts,
    eslint: merge(airbnbDefaults, opts.eslint || {}),
  };

  neutrino.use(airbnbBase, options);
};
