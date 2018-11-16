# `@conduitvc/react`

> Neutrino preset that supports building React projects according to Conduit's
process and settings.

## Features

- Zero upfront configuration necessary to start developing and building a React web app
- Modern Babel compilation adding JSX, object rest spread syntax, and class properties.
- Optionally supports Flow and TypeScript syntax
- Support for React Hot Loader
- Write JSX in `.js` or `.jsx` files
- Extends from [@neutrinojs/web](https://neutrinojs.org/packages/web/)
  - Modern Babel compilation supporting ES modules, last 2 major browser versions, async functions, and dynamic imports
  - webpack loaders for importing HTML, CSS, images, icons, and fonts
  - webpack Dev Server during development
  - Automatic creation of HTML pages, no templating necessary
  - Automatic stylesheet extraction; importing stylesheets into modules creates bundled external stylesheets
  - Pre-configured to support CSS Modules via `*.module.css` file extensions
  - Hot Module Replacement support including CSS
  - Tree-shaking to create smaller bundles
  - Production-optimized bundles with minification, easy chunking, and scope-hoisted modules for faster execution
  - Easily extensible to customize your project as needed

## Requirements

- Node.js ^8.10 or 10+
- Yarn v1.2.1+, or npm v5.4+
- Neutrino 9
- webpack 4
- webpack-cli 3
- webpack-dev-server 3

## Installation

`@conduitvc/react` can be installed via the Yarn client. Inside your project,
make sure that the Neutrino and webpack related dependencies below are installed
as development dependencies. You will also need React and React DOM for actual
React development.

```bash
❯ yarn add --dev neutrino@next @conduitvc/react webpack webpack-cli webpack-dev-server
❯ yarn add react react-dom
```

## Project Layout

`@conduitvc/react` follows the standard
[project layout](https://neutrinojs.org/project-layout/) specified by Neutrino.
This means that by default all project source code should live in a directory
named `src` in the root of the project. This includes JavaScript files, CSS
stylesheets, images, and any other assets that would be available to import your
compiled project.

After installing Neutrino and the React preset, add a new directory named `src`
in the root of the project, with a single JS file named `index.jsx` in it.

```bash
❯ mkdir src && touch src/index.jsx
```

This React preset exposes an element in the page with an ID of `root` to which
you can mount your application. Edit your `src/index.jsx` file with the
following:

```jsx
import { render } from 'react-dom';

render(<h1>Hello world!</h1>, document.getElementById('root'));
```

Now edit your project's `package.json` to add commands for starting and building
the application:

```json
{
  "scripts": {
    "start": "webpack-dev-server --mode development --open",
    "build": "webpack --mode production"
  }
}
```

Then create a `.neutrinorc.js` file alongside `package.json`, which contains
your Neutrino configuration:

```js
module.exports = {
  use: [
    '@neutrinojs/react',
  ],
};
```

And create a `webpack.config.js` file, that uses the Neutrino API to access the
generated webpack config:

```js
const neutrino = require('neutrino');

module.exports = neutrino().webpack();
```

Start the app, then open a browser to the address in the console:

```bash
❯ yarn start
```

## Building

`@conduitvc/react` builds static assets to the `build` directory by default when
running `yarn build`. You can either serve or deploy the contents of this
`build` directory as a static site.

## Static assets

If you wish to copy files to the build directory that are not imported from
application code, use the
[@neutrinojs/copy](https://neutrinojs.org/packages/copy/) preset alongside this
one.

## Deployment Path

By default `@conduitvc/react` assumes that your application will be deployed at
the root of a domain (eg: `https://www.my-app.com/`), and so sets webpack's
[`output.publicPath`](https://webpack.js.org/configuration/output/#output-publicpath)
to `'/'`, which means assets will be loaded from the site root using absolute
paths.

If your app is instead deployed within a subdirectory, you will need to adjust
the `publicPath` [preset option](#preset-options). For example if your app is
hosted at `https://my-username.github.io/my-app/`, you will need to set
`publicPath` to `'/my-app/'`.

Alternatively, if you would like your app to be able to be served from any
location, and are not using the HTML5 pushState history API or client-side
routing, then you can set `publicPath` to the empty string, which will cause
relative asset paths to be used instead.

## Preset options

You can provide custom options and have them merged with this preset's default
options to easily affect how this preset builds. You can modify React preset
settings from `.neutrinorc.js` by overriding with an options object. Use
an array pair instead of a string to supply these options in `.neutrinorc.js`.

The following shows how you can pass an options object to the React preset and
override its options. See the
[Web documentation](https://neutrinojs.org/packages/web/#preset-options) for
specific options you can override with this object.

```js
module.exports = {
  use: [
    ['@neutrinojs/react', {
      /* preset options */

      // Example: disable Hot Module Replacement
      hot: false,

      // Enables Flow syntax support. Set to true to enable.
      flow: false,

      // Enables TypeScript syntax support. Set to true to enable.
      typescript: false,

      // Controls webpack's `output.publicPath` setting.
      // See the "Deployment Path" section above for more info.
      publicPath: '/',

      // Example: change the page title
      html: {
        title: 'Epic React App',
      },

      // Target specific browsers with @babel/preset-env
      targets: {
        browsers: [
          'last 1 Chrome versions',
          'last 1 Firefox versions',
        ],
      },

      // Add additional Babel plugins, presets, or env options
      babel: {
        // Override options for @babel/preset-env:
        presets: [
          ['@babel/preset-env', {
            useBuiltIns: true,
          }],
        ],
      },
    }],
  ],
};
```

## Customizing

To override the build configuration, start with the documentation on
[customization](https://neutrinojs.org/customization/). `@conduitvc/react` does
not use any additional named rules, loaders, or plugins that aren't already in
use by the Web preset. See the
[Web documentation customization](https://neutrinojs.org/packages/web/#customizing)
for preset-specific configuration to override.

For details on merging and overriding Babel configuration, read more about using
the [`compile-loader` `merge`](https://neutrinojs.org/packages/compile-loader/#advanced-merging)
once you are comfortable customizing your build.

If the need arises, you can also compile `node_modules` by referring to the
relevant [`compile-loader` documentation](https://neutrinojs.org/packages/compile-loader/#compiling-node_modules).

### Advanced configuration

By following the [customization guide](https://neutrinojs.org/customization/)
and knowing the rule, loader, and plugin IDs from `@neutrinojs/web`, you can
override and augment the build by providing a function to your `.neutrinorc.js`
use array. You can also make these changes from the Neutrino API in custom
middleware.

By default Neutrino, and therefore this preset, creates a single **main**
`index` entry point to your application, and this maps to the `index.*` file in
the `src` directory. The extension is resolved by webpack. This value is
provided by `neutrino.options.mains` at `neutrino.options.mains.index`.

If you wish to output multiple pages, you can configure them like so:

```js
module.exports = {
  options: {
    mains: {
      index: {
        // outputs index.html from src/index.*
        entry: 'index',
        // Additional options are passed to html-webpack-plugin, and override
        // any defaults set via the preset's `html` option.
        title: 'Site Homepage',
      },
      admin: {
        // outputs admin.html from src/admin.*
        entry: 'admin',
        title: 'Admin Dashboard',
      },
      account: {
        // outputs account.html from src/user.* using a custom HTML template.
        entry: 'user',
        inject: true,
        template: 'my-custom-template.html',
      },
    }
  },
  use: ['@conduitvc/react'],
};
```

#### Vendoring

External dependencies are automatically split into separate chunks from the
application code, by the new webpack
[SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/).

_Example: The splitChunks settings can be adjusted like so:_

```js
module.exports = {
  use: [
    '@conduitvc/react',
    (neutrino) => {
      neutrino.config
        .optimization
          .merge({
            splitChunks: {
              // Decrease the min. size before extra chunks are created to 10KB
              minSize: 10000,
            },
          });
    },
  ],
};
```

## Hot Module Replacement

While `@conduitvc/react` supports Hot Module Replacement for your app using
React Hot Loader, it does require some application-specific changes in order to
operate.

First, install `react-hot-loader` as a dependency; this **must** be
React Hot Loader v4+:

```bash
❯ yarn add react-hot-loader
```

Neutrino will then automatically load React Hot Loader the next time a build
is performed. Next, you need to mark your root component as _hot-exported_.
For example, if your `src/index` main entry renders a root component from
`App.jsx`, then the exported component needs to have a hot export:

```jsx
// src/App.jsx
import React from 'react';
import { hot } from 'react-hot-loader';

@hot(module)
export default class App extends React.Component {
  render() {
    return <div>Hello World!</div>;
  }
}
```

See the [React Hot Loader](https://gaearon.github.io/react-hot-loader/)
docs for any API specifics on hot reloading other components.
