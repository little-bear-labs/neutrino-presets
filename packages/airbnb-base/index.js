const airbnbBase = require('@neutrinojs/airbnb-base');
const defaults = require('@conduitvc/eslint');
const { merge } = require('eslint/lib/config/config-ops');

module.exports = (neutrino, { flow, typescript, ...opts } = {}) => {
  const airbnbDefaults = merge(defaults.eslint, {
    baseConfig: {
      ...(flow
          ? {
            extends: ['plugin:flowtype/recommended'],
            plugins: ['eslint-plugin-flowtype']
          }
          : null
      ),
      ...(typescript
          ? {
            plugins: ['eslint-plugin-typescript']
          }
          : null
      ),
    },
  });
  const options = {
    ...defaults,
    ...opts,
    eslint: merge(airbnbDefaults, opts.eslint || {}),
  };

  neutrino.use(airbnbBase, options);
};
