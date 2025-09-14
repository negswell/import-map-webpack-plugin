import { Compiler } from "webpack";

type Aliases = Record<string, string>;

interface ImportMapPluginOptions {
  aliases: Aliases;
}

/**
 * A Webpack plugin that resolves module imports based on a provided alias map.
 * This plugin intercepts the module resolution process and replaces the requested
 * module paths with their corresponding aliases, if defined.
 */
class ImportMapPlugin {
  /**
   * A map of aliases where the key is the module name and the value is the resolved path.
   */
  private aliases: Aliases;

  /**
   * Creates an instance of the ImportMapPlugin.
   *
   * @param options - The options for the plugin.
   * @param options.aliases - An object containing alias mappings for module resolution.
   */
  constructor({ aliases }: ImportMapPluginOptions) {
    if (!aliases || Object.keys(aliases).length === 0) {
      throw new Error(
        "Aliases cannot be empty. Please provide at least one alias."
      );
    }
    this.aliases = aliases;
  }

  /**
   * Applies the plugin to the Webpack compiler.
   *
   * @param compiler - The Webpack compiler instance.
   */
  apply(compiler: Compiler) {
    compiler.hooks.normalModuleFactory.tap("ImportMapPlugin", (factory) => {
      factory.hooks.beforeResolve.tapAsync(
        "ImportMapPlugin",
        async (data, callback) => {
          if (!data) return callback();
          if (Object.hasOwn(this.aliases, data.request)) {
            data.request = this.aliases[data.request] as string;
          }
          callback();
        }
      );
    });
  }
}

export default ImportMapPlugin;
