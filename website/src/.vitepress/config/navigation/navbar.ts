import type { DefaultTheme } from "vitepress";

const nav: DefaultTheme.NavItem[] = [
  {
    text: "Download",
    link: "/downloads/",
    activeMatch: "/downloads/",
  },
  {
    text: "Docs",
    link: "/docs/guides/getting-started",
    activeMatch: "/docs/guides/",
  },
  {
    text: "FAQ",
    link: "/docs/faq/general",
    activeMatch: "/docs/faq/",
  },
  {
    text: "Changelog",
    link: "/changelogs/",
    activeMatch: "/changelogs/",
  },
];

export default nav;
