The **Import Map Webpack Plugin** is a Webpack plugin designed to imitate an [import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) for your modules.

Unlike traditional Webpack aliases, this plugin enables module resolution for remote urls at the bundler level, making it possible to alias remote URLs directly,something that Webpack does not support natively.

## Features

- Automatically handles module resolution.
- Supports custom mappings for external libraries.

## Installation

Install the plugin via npm or yarn or pnpm:

```bash
npm install import-map-webpack-plugin --save-dev
```

or

```bash
yarn add import-map-webpack-plugin --dev
```

or

```bash
pnpm add import-map-webpack-plugin --dev
```

## Usage

Add the plugin to your Webpack configuration:

```javascript
import ImportMapPlugin from "import-map-webpack-plugin";

export default {
  // Other Webpack configuration...
  plugins: [
    new ImportMapPlugin({
      aliases: {
        react: "https://cdn.skypack.dev/react",
        "react-dom": "https://cdn.skypack.dev/react-dom",
      },
    }),
  ],
};
```

Now instead of 

```javascript
import { useState } from "https://cdn.skypack.dev/react";
```

you can now do 

```javascript
import { useState } from "react";
```

### Options

- `aliases` (object): Custom mapping for module paths.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/negswell/import-map-webpack-plugin).

## License

This project is licensed under the [MIT License](LICENSE).
