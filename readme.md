# Import Map Webpack Plugin

[![npm version](https://img.shields.io/npm/v/import-map-webpack-plugin.svg)](https://www.npmjs.com/package/import-map-webpack-plugin)
[![npm downloads](https://img.shields.io/npm/dm/import-map-webpack-plugin.svg)](https://www.npmjs.com/package/import-map-webpack-plugin)
[![license](https://img.shields.io/github/license/negswell/import-map-webpack-plugin.svg)](LICENSE)

The **Import Map Webpack Plugin** is a Webpack plugin that mimics an [import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) for your modules.  

Unlike traditional Webpack aliases, this plugin allows resolution of **remote URLs** at the bundler level — enabling you to alias modules from CDNs or other remote sources directly. This fills a gap since Webpack does not support import maps natively.

## ✨ Features

- Resolve modules using an **import-map–like configuration**.  
- Seamlessly alias **remote URLs (CDNs, external scripts, etc.)**.  
- Supports custom mappings for local and external libraries.  

## 📦 Installation

Install with the package manager of your choice:

```bash
npm install import-map-webpack-plugin --save-dev
```

or

```bash
yarn add import-map-webpack-plugin --dev
```

or

```bash
pnpm add import-map-webpack-plugin -D
```

## 🚀 Usage

### Webpack Example

Add the plugin to your Webpack configuration:

```javascript
// webpack.config.js
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

You can simply do:

```javascript
import { useState } from "react";
```
---
### Next.js Example 

You can configure the plugin in `next.config.ts`:

```typescript
// next.config.ts
import type { NextConfig } from "next";
import ImportMapPlugin from "import-map-webpack-plugin";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new ImportMapPlugin({
        aliases: {
          react: "https://cdn.skypack.dev/react",
          "react-dom": "https://cdn.skypack.dev/react-dom",
        },
      })
    );
    return config;
  },
};

export default nextConfig;
```

Now you can safely import remote modules with aliases in your Next.js pages/components:

```javascript
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```
---
### Options

- `aliases` (object): Custom mapping for module paths.
  
```javascript
{
  aliases: {
    lodash: "https://cdn.skypack.dev/lodash-es",
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/negswell/import-map-webpack-plugin).

## 📄 License

This project is licensed under the [MIT License](LICENSE).
