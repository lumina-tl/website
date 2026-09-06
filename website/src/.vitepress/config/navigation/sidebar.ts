import type { DefaultTheme } from "vitepress";

const sidebar: DefaultTheme.SidebarMulti = {
  "/downloads/": [],
  "/changelogs/": [],
  "/docs/guides/": [
    {
      text: "Guides",
      items: [
        { text: "Getting started", link: "/docs/guides/getting-started" },
        { text: "Translation workflow", link: "/docs/guides/workflow" },
        { text: "Projects & export", link: "/docs/guides/projects" },
        { text: "Managing models", link: "/docs/guides/models" },
        { text: "Translation settings", link: "/docs/guides/translation" },
        { text: "Troubleshooting", link: "/docs/guides/troubleshooting" },
      ],
    },
  ],
  "/docs/faq/": [
    {
      text: "Frequently Asked Questions",
      items: [
        { text: "General", link: "/docs/faq/general" },
        { text: "Installation", link: "/docs/faq/install" },
        { text: "Technical", link: "/docs/faq/technical" },
      ],
    },
  ],
};

export default sidebar;
