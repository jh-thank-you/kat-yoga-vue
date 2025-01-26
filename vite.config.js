import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import UnheadVite from "@unhead/addons/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), UnheadVite()],
  // for files to be uploaded to my shared derver dev folder use base: "/dev/katyoga/"
  // base: "/dev/katyoga/",
  // for final domain make base: "/"
  base: "/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    define: {
      // flags set for proper tree shaking
      // see https://vue-i18n.intlify.dev/guide/advanced/optimization.html#reduce-bundle-size-with-feature-build-flags
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
  },
});
