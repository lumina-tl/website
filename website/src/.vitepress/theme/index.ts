// https://vitepress.dev/guide/custom-theme
import DefaultTheme from "vitepress/theme";

// Import Stylus files
import "./styles/base.styl";
import "./styles/home.styl";

// Import Global plugins
import "element-plus/theme-chalk/dark/css-vars.css";

import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";

// Import icon components
import { IconDownload } from "@iconify-prerendered/vue-mdi";

import Layout from "./Layout.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    enhanceAppWithTabs(app);
    app.component("IconDownload", IconDownload);
  },
  Layout,
};
