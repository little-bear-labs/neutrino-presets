const react = require('@neutrinojs/react');
const babelMerge = require('babel-merge');
const merge = require('deepmerge');

module.exports = (
  neutrino,
  {
    babel = {},
    flow = false,
    typescript = false,
    ...opts
  } = {}) => {
  const presets = [];

  if (typescript) {
    presets.push(require.resolve('@babel/preset-typescript'));
  } else if (flow) {
    presets.push(require.resolve('@babel/preset-flow'));
  }

  const options = merge({
    devtool: {
      production: 'source-map',
    },
    // Decorators generally need to be enabled *before* other syntax
    babel: babelMerge({
      plugins: [
        [require.resolve('@babel/plugin-proposal-decorators'), {
          legacy: true,
        }],
        [require.resolve('@babel/plugin-proposal-class-properties'), {
          loose: true,
        }],
      ],
      presets,
    }, babel),
  }, opts);

  neutrino.use(react, options);
};
