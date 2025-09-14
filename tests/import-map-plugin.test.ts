import { describe, it, expect } from "vitest";
import webpack from "webpack";
import path from "path";
import ImportMapPlugin from "../src/import-map-plugin";

describe("ImportMapPlugin", () => {
  it("should resolve alias correctly", async () => {
    const aliases = {
      "@alias/test": path.resolve(__dirname, "mocks/test-module.js"),
    };

    const outputPath = path.resolve(__dirname, "dist");

    const compiler = webpack({
      mode: "development",
      entry: path.resolve(__dirname, "mocks/entry.js"),
      output: {
        path: outputPath,
        filename: "bundle.js",
        library: { type: "module" }, // Set library type to ESM
      },
      experiments: {
        outputModule: true, // Enable ESM output
      },
      plugins: [new ImportMapPlugin({ aliases })],
    });

    // Wrap the compiler.run in a Promise to handle async execution
    await new Promise<void>((resolve, reject) => {
      compiler?.run(async (err, stats) => {
        if (err) return reject(err);

        if (stats?.hasErrors()) {
          return reject(new Error(stats.toJson().errors?.[0]?.message));
        }

        // Dynamically import the compiled module
        try {
          const bundlePath = path.join(outputPath, "bundle.js");
          const module = await import(bundlePath);
          expect(module.default).toBe("resolved test module"); // Verify the output
          resolve();
        } catch (importError) {
          reject(importError);
        }
      });
    });
  });

  it("should throw error if aliases are empty", async () => {
    await expect(
      new Promise<void>((resolve, reject) => {
        webpack({
          mode: "development",
          entry: path.resolve(__dirname, "mocks/entry.js"),
          output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js",
            library: { type: "module" },
          },
          experiments: {
            outputModule: true,
          },
          plugins: [new ImportMapPlugin({ aliases: {} })], // Pass empty aliases
        })?.run((err, stats) => {
          if (err) return reject(err);
          if (stats?.hasErrors()) {
            return reject(new Error(stats.toJson().errors?.[0]?.message));
          }
          resolve();
        });
      })
    ).rejects.toThrow(
      "Aliases cannot be empty. Please provide at least one alias."
    );
  });
});
