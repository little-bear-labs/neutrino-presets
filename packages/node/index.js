const node = require('@neutrinojs/node');
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
  const plugins = [
    // Decorators generally need to be enabled *before* other syntax
    [require.resolve('@babel/plugin-proposal-decorators'), {
      legacy: true,
    }],
    [require.resolve('@babel/plugin-proposal-class-properties'), {
      loose: true,
    }],
  ];

  if (typescript) {
    presets.push(require.resolve('@babel/preset-typescript'));
    plugins.push(require.resolve('babel-plugin-decorator-metadata'));
    plugins.push(require.resolve('babel-plugin-transform-function-parameter-decorators'));
  } else if (flow) {
    presets.push(require.resolve('@babel/preset-flow'));
  }

  const options = merge({
    babel: babelMerge({
      plugins,
      presets,
      env: {
        test: {
          presets: [
            ['@babel/preset-env', { modules: 'commonjs' }],
          ],
        },
      },
    }, babel),
  }, opts);

  neutrino.use(node, options);
};
