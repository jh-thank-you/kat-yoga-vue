import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "./assets/css/main.css";

import { createI18n } from "vue-i18n/dist/vue-i18n.esm-bundler.js";
/*
 * The i18n resources in the path specified in the plugin `include` option can be read
 * as vue-i18n optimized locale messages using the import syntax
 */
import en from "./locales/en.json";
import sk from "./locales/sk.json";

import { createHead } from "@unhead/vue";

const i18n = createI18n({
  legacy: false,
  locale: "sk",
  messages: {
    en,
    sk,
  },
});

const app = createApp(App);
const head = createHead();

app.use(createPinia());
app.use(router);

// i18n is a plugin that leverages provide/inject under the hood.
app.use(i18n);

app.use(head);

// see article here:
// https://www.vuemastery.com/blog/vue-router-4-route-params-not-available-on-created-setup/
// replace -- app.mount("#app"); -- with the below:

router.isReady().then(() => {
  app.mount("#app");
});
