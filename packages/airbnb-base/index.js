const airbnbBase = require('@neutrinojs/airbnb-base');
const eslint = require('@conduitvc/eslint');
const { merge } = require('eslint/lib/config/config-ops');

const TS_EXTENSIONS = ['.js', '.mjs', '.json', '.ts'];

module.exports = (neutrino, { flow, typescript, ...opts } = {}) => {
  const base = eslint({ flow, typescript });
  const extensions = [];
  const plugins = [];
  const rules = {};
  const settings = {};

  if (typescript) {
    settings['import/resolver'] = {
      node: {
        extensions: TS_EXTENSIONS
      }
    };
    settings['import/extensions'] = TS_EXTENSIONS;
  }

  const airbnbDefaults = merge(base.eslint, {
    baseConfig: {
      extends: extensions,
      plugins,
      rules,
      settings,
    },
  });
  const options = {
    ...base,
    ...opts,
    eslint: merge(airbnbDefaults, opts.eslint || {}),
  };

  neutrino.use(airbnbBase, options);
};
