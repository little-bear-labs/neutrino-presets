module.exports = ({ flow = false, typescript = false } = {}) => {
  const baseConfig = {
    parserOptions: {
      ecmaFeatures: {
        legacyDecorators: true,
      },
    },
    extends: ['eslint-config-prettier'],
    plugins: ['eslint-plugin-prettier'],
    rules: {
      'consistent-return': 'off',
      'no-shadow': 'off',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          bracketSpacing: true,
          jsxBracketSameLine: true,
          trailingComma: 'all',
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
  };

  if (flow) {
    baseConfig.extends.push('plugin:flowtype/recommended');
    baseConfig.plugins.push('eslint-plugin-flowtype');
    // specifically makes annotating functions with flow more difficult:
    baseConfig.rules['function-paren-newline'] = 'off';
  } else if (typescript) {
    baseConfig.plugins.push('eslint-plugin-typescript');
    // Seems to be incompatible with current TypeScript:
    baseConfig.rules['no-unused-vars'] = 'off';
    // Doesn't play very nicely with TypeScript optional property chains:
    baseConfig.rules['prefer-destructuring'] = 'off';
  }

  return {
    eslint: { baseConfig },
  };
};
