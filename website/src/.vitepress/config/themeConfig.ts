import type { DefaultTheme } from "vitepress";

import nav from "./navigation/navbar";
import sidebar from "./navigation/sidebar";

const themeConfig: DefaultTheme.Config = {
  logo: {
    src: "/img/logo-128px.png",
    width: 24,
    height: 24,
  },

  nav,
  sidebar,

  outline: [2, 3],

  socialLinks: [
    {
      icon: "github",
      link: "https://github.com/lumina-tl/lumina",
      ariaLabel: "Project GitHub",
    },
  ],

  footer: {
    message:
      'Released under the <a href="https://github.com/lumina-tl/lumina/blob/main/LICENSE" target="_blank" rel="noopener">MIT License</a> <span class="divider">|</span> <a href="/privacy/">Privacy policy</a>',
    copyright: `Copyright © ${new Date().getFullYear()} Lumina Translation`,
  },

  lastUpdated: {
    text: "Last updated",
    formatOptions: {
      forceLocale: true,
      dateStyle: "long",
      timeStyle: "short",
    },
  },

  search: {
    provider: "local",
  },
};

export default themeConfig;
