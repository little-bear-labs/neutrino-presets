const airbnbBase = require('@neutrinojs/airbnb-base');
const eslint = require('@conduitvc/eslint');
const { merge } = require('eslint/lib/config/config-ops');

const TS_EXTENSIONS = ['.js', '.mjs', '.json', '.ts'];

module.exports = (neutrino, { flow, typescript, ...opts } = {}) => {
  const base = eslint({ flow, typescript });
  const baseConfig = {
    extends: [],
    plugins: [],
    rules: {
      'no-console': 'off',
    },
    settings: {},
  };

  if (typescript) {
    baseConfig.settings['import/resolver'] = {
      node: {
        extensions: TS_EXTENSIONS
      }
    };
    baseConfig.settings['import/extensions'] = TS_EXTENSIONS;
    baseConfig.parser = 'typescript-eslint-parser';
  }

  const airbnbDefaults = merge(base.eslint, { baseConfig });
  const options = {
    ...base,
    ...opts,
    eslint: merge(airbnbDefaults, opts.eslint || {}),
  };

  neutrino.use(airbnbBase, options);
};
