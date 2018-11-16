# `@conduitvc/airbnb`

> Neutrino preset that supports linting React projects with Airbnb's ESLint
config, following the [Airbnb styleguide](https://github.com/airbnb/javascript),
with Conduit's stylistic preferences.

## Features

- Zero upfront configuration necessary to start linting your project
- Modern Babel knowledge supporting ES modules, JSX, and optionally Flow and TypeScript
- Highly visible during development, fails compilation when building for production
- Easily extensible to customize as needed

_Note: If you are building a Node.js project, you should probably use 
[`@conduitvc/airbnb-base`](https://www.npmjs.com/package/@conduitvc/airbnb-base)
instead._

## Requirements

- Node.js ^8.10 or 10+
- Yarn v1.2.1+, or npm v5.4+
- Neutrino 9 and one of the Neutrino build presets
- ESLint 5

## Installation

In your project, install the necessary development dependencies:

_Note: You should already have `neutrino@next` installed via your build preset._

```sh
yarn add --dev @conduitvc/airbnb eslint
```

After adding the Airbnb preset to your Neutrino-built project, edit your
project's `.neutrinorc.js` to add the preset for linting **before** your build
preset. For example, when building your project using `@conduitvc/react`:

```js
module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    '@conduitvc/airbnb',
    '@conduitvc/react',
  ],
};
```

Start the app, then check your console for any linting errors. If everything is
successful, you should see no errors in the console. ESLint errors visible
during development are reported, but will still continue to build and serve your
project. ESLint errors during build will not build the project, and will cause
the command to fail.

```bash
❯ yarn start

ERROR in ./src/index.jsx
Module Error (from ./node_modules/eslint-loader/index.js):

error: Missing semicolon (semi) at src/index.jsx:35:51:
  33 |
  34 |
> 35 | const MOUNT_NODE = document.getElementById("root")
     |                                                   ^
  36 |
  37 |
  38 |

1 error found.
1 error potentially fixable with the `--fix` option.
```

## Building

`@conduitvc/airbnb` will cause errors to **fail your build** when `NODE_ENV` is
not `'development'`. If you want to ease introduction of this linting preset to
your project, consider only adding it to your `use` list during development
until all linting errors have been resolved.

```bash
❯ yarn build

ERROR in ./src/index.jsx
Module Error (from ./node_modules/eslint-loader/index.js):

error: Missing semicolon (semi) at src/index.jsx:35:51:
  33 |
  34 |
> 35 | const MOUNT_NODE = document.getElementById("root")
     |                                                   ^
  36 |
  37 |
  38 |

1 error found.
1 error potentially fixable with the `--fix` option.
```

_Example: ease linting into project by only enabling when
`NODE_ENV=development`, i.e., `--mode development`:_

```js
module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    process.env.NODE_ENV === 'development' ? '@conduitvc/airbnb' : false,
    '@conduitvc/react',
  ],
};
```

## Middleware options

This preset uses the same middleware options as
[@neutrinojs/airbnb](https://neutrinojs.org/packages/eslint/#usage). If you wish
to customize what is included, excluded, or any ESLint options, you can provide
an options object with the middleware and this will be merged with our internal
defaults for this preset. Use an array pair instead of a string to supply these
options.

By default the preset configures `eslint-plugin-react` to target the latest
version of React. If using an older version, you must explicitly pass it as in
the example below.

_Example: Extend from a custom configuration (it will be applied after Airbnb),
turn off semicolons from being required, and set a specific React version._

```js
module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    ['@conduitvc/airbnb', {
      eslint: {
        // For supported options, see:
        // https://github.com/webpack-contrib/eslint-loader#options
        // https://eslint.org/docs/developer-guide/nodejs-api#cliengine
        // The options under `baseConfig` correspond to those
        // that can be used in an `.eslintrc.*` file.
        baseConfig: {
          extends: [
            'my-custom-config',
          ],
          rules: {
            'babel/semi': 'off',
          },
          settings: {
            react: {
              version: '16.5',
            },
          },
        },
      },
    }],
  ],
};
```

### Flow Support

To enable linting with Flow syntax support, specify the `flow: true` option to
the preset:

```js
module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    ['@conduitvc/airbnb', {
      flow: true,
    }],
  ],
};
```

### TypeScript Support

To enable linting with TypeScript syntax support, specify the `typescript: true`
option to the preset:

```js
module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    ['@conduitvc/airbnb', {
      typescript: true,
    }],
  ],
};
```

## Exposing generated lint configuration via `.eslintrc.js`

`@neutrinojs/eslint`, from which this preset inherits, provides an `.eslintrc()`
output handler for generating the ESLint configuration in a format suitable for
use in an `.eslintrc.js` file. This allows the ESLint CLI to be used outside of
building the project, and for IDEs and text editors to provide linting
hints and fixes.

Create a `.eslintrc.js` file in the root of the project, containing:

```js
// .eslintrc.js
const neutrino = require('neutrino');

module.exports = neutrino().eslintrc();
```

This `.eslintrc.js` configuration will be automatically used when running the
ESLint CLI. For convenience a `lint` script alias can be added to your
`package.json`, allowing linting to be run via `yarn lint`:

```json
{
  "scripts": {
    "lint": "eslint --cache --format codeframe --ext jsx,js src"
  }
}
```

Projects may face a problem when their editor or IDE lints all files and
highlights errors that were normally excluded from source, i.e. Neutrino's
`include` and `exclude` options. This is because the ESLint CLI does not have a
way to specify included and excluded files from the `.eslintrc.js`
configuration. Instead you will need to create an
[.eslintignore](https://eslint.org/docs/user-guide/configuring#ignoring-files-and-directories)
file that controls which files should be excluded from linting.

## Using your own `.eslintrc.*`

If instead you would prefer to use your own non-generated `.eslintrc.*` file,
set `useEslintrc` to `true`. This will cause `@conduitvc/airbnb` to only set the
loader-specific configuration defaults, and leave all other linting
configuration to be managed by the standalone `.eslintrc.*` file.

See the `@neutrinojs/eslint`
[documentation](https://neutrinojs.org/packages/eslint/#using-your-own-eslintrc)
for more details.
