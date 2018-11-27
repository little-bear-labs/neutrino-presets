module.exports = ({ flow = false, typescript = false } = {}) => {
  const extensions = ['eslint-config-prettier'];
  const plugins = ['eslint-plugin-prettier'];

  if (flow) {
    extensions.push('plugin:flowtype/recommended');
    plugins.push('eslint-plugin-flowtype');
  } else if (typescript) {
    plugins.push('eslint-plugin-typescript');
  }

  return {
    eslint: {
      baseConfig: {
        parserOptions: {
          ecmaFeatures: {
            legacyDecorators: true,
          },
        },
        extends: extensions,
        plugins,
        rules: {
          'arrow-body-style': 'off',
          'babel/new-cap': 'off',
          'consistent-return': 'off',
          // specifically makes annotating functions with flow more difficult.
          'function-paren-newline': 'off',
          'no-continue': 'off',
          'no-mixed-operators': 'off',
          'no-plusplus': 'off',
          'no-restricted-syntax': 'off',
          'no-shadow': 'off',
          'no-unused-expressions': 'off',
          'prettier/prettier': [
            'error',
            {
              singleQuote: true,
              bracketSpacing: true,
              jsxBracketSameLine: true,
              trailingComma: 'es5',
            },
            { usePrettierrc: false },
          ],
          'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
            { blankLine: 'never', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
            { blankLine: 'always', prev: 'multiline-block-like', next: '*' },
            { blankLine: 'always', prev: '*', next: ['if', 'do', 'for', 'switch', 'try', 'while'] },
            { blankLine: 'always', prev: '*', next: 'return' },
          ],
        },
      },
    },
  };
};
