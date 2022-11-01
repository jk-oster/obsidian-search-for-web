import { resolve } from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { chromeExtension } from "vite-plugin-chrome-extension";
import ViteComponents from "vite-plugin-components";
// import vitePluginRequire from "vite-plugin-require";
import { viteRequire } from 'vite-require'


import ViteIcons, { ViteIconsResolver } from "vite-plugin-icons";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  build: {
    rollupOptions: {
      input: "src/manifest.json",

      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == 'main.css')
            return 'main.css';
          return assetInfo.name;
        },
      }
    }
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
    // vitePluginRequire(),
    viteRequire()
  ]
});