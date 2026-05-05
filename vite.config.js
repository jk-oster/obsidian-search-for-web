import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import webExtension, { readJsonFile } from "vite-plugin-web-extension";


const _dirname = typeof __dirname !== 'undefined'
    ? __dirname
    : dirname(fileURLToPath(import.meta.url));

function generateManifest() {
  const manifest = readJsonFile("src/manifest.json");
  const pkg = readJsonFile("package.json");
  return {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    ...manifest,
  };
}

const target = process.env.TARGET || "chrome";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __BROWSER__: JSON.stringify(target),
  },
  resolve: {
    alias: {
      "@": resolve(_dirname, "src")
    }
  },
  build: {
    outDir: './dist/' + target,
    emptyOutDir: true,
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          whitespace: 'preserve'
        },
      },
    }),
    webExtension({
      browser: target,
      manifest: generateManifest,
      watchFilePaths: ["package.json", "manifest.json"],

      // If you develop on Linux / WSL2 and want to test on Chromium-based browsers, you can specify the path to the Chromium binary here. 
      // This is necessary because web-ext uses the `web-ext-chrome` package to launch Chromium, which does not support WSL2 paths.
      // For development on Windows or macOS, you can omit this option and web-ext will use the default path to the Chromium binary.
      webExtConfig: {
        chromiumBinary: '/usr/bin/chromium-browser',
      },
    }),
  ]
});