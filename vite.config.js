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

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(_dirname, "src")
    }
  },
  plugins: [
    vue(),
    webExtension({
      manifest: generateManifest,
      watchFilePaths: ["package.json", "manifest.json"],
    }),
  ]
});