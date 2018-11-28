const airbnb = require('@neutrinojs/airbnb');
const eslint = require('@conduitvc/eslint');
const { merge } = require('eslint/lib/config/config-ops');

const TS_EXTENSIONS = ['.js', '.jsx', '.mjs', '.json', '.tsx', '.ts'];

module.exports = (neutrino, { flow, typescript, ...opts } = {}) => {
  const base = eslint({ flow, typescript });
  const extensions = ['prettier/react'];
  const plugins = [];
  const rules = {
    // Enable anchors with react-router Link
    'jsx-a11y/anchor-is-valid': ['error', {
      components: ['Link'],
      specialLink: ['to'],
    }],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-console': process.env.NODE_ENV === 'development' ? 'off' : 'error',
    // handled by prettier rules
    'react/default-props-match-prop-types': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'react/jsx-handler-names': ['error', {
      eventHandlerPrefix: 'handle',
      eventHandlerPropPrefix: 'on',
    }],
    'react/jsx-indent': 'off',
    // styling choice which makes using redux in es6 style more difficult.
    'react/no-multi-comp': 'off',
    'react/prefer-stateless-function': 'off',
    // we have not annotated anything in prop-types
    'react/prop-types': 'off',
    'react/sort-comp': 'off',
  };
  const settings = {};

  if (typescript) {
    rules['react/jsx-filename-extension'] = [
      'error',
      { extensions: ['.tsx', '.ts', '.jsx', '.js'] }
    ];
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
    },
  });
  const options = {
    ...base,
    ...opts,
    eslint: merge(airbnbDefaults, opts.eslint || {}),
  };

  neutrino.use(airbnb, options);
};
