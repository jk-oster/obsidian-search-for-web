import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { chromeExtension } from "vite-plugin-chrome-extension";
import ViteComponents from "vite-plugin-components";
import { viteRequire } from 'vite-require'
import ViteIcons, { ViteIconsResolver } from "vite-plugin-icons";
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const _dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url))


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(_dirname, "src")
    }
  },
  define: {
    'process.env': process.env,
  },
  build: {
    rollupOptions: {
      input: "src/manifest.json",
    },
  },
  plugins: [
    vue(),
    ViteComponents({
      extensions: ["vue"],
      // auto import icons
      customComponentResolvers: [
        // https://github.com/antfu/vite-plugin-icons
        ViteIconsResolver({
          componentPrefix: ""
          // enabledCollections: ['carbon']
        })
      ]
    }),
    ViteIcons(),
    chromeExtension(),
    viteRequire()
  ]
});