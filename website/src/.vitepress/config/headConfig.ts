import type { HeadConfig } from "vitepress";

const softwareSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Lumina",
  operatingSystem: "Windows 10, Windows 11",
  applicationCategory: "UtilitiesApplication",
  applicationSubCategory: "Manga Translator",
  description:
    "Free, open-source desktop app for translating manga, manhwa, and manhua with local detection, OCR, inpainting, and typesetting.",
  url: "https://lumina.navierr.dev",
  downloadUrl: "https://lumina.navierr.dev/downloads/",
  softwareVersion: "0.5.0",
  license: "https://github.com/lumina-tl/lumina/blob/main/LICENSE",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
});

const headConfig: HeadConfig[] = [
  ["meta", { name: "darkreader-lock" }],

  ["meta", { name: "theme-color", content: "#818CF8" }],
  ["meta", { name: "msapplication-TileColor", content: "#818CF8" }],

  [
    "meta",
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
  ],
  ["meta", { name: "referrer", content: "no-referrer-when-downgrade" }],
  [
    "meta",
    {
      name: "keywords",
      content:
        "manga translator, manhwa translator, open source manga translation, manga ocr, manga inpainting, comic translator desktop, baberu ocr, offline manga translation, ai manga translator, lumina, lumina tl, lumina translator, lumina manga translator, lumina manhwa translator, lumina manhua translator",
    },
  ],

  ["link", { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  [
    "link",
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
  ],
  [
    "link",
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
  ],
  ["link", { rel: "manifest", href: "/site.webmanifest" }],
  [
    "link",
    {
      rel: "apple-touch-icon",
      type: "image/png",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
  ],

  ["meta", { name: "twitter:card", content: "summary_large_image" }],

  ["meta", { property: "og:site_name", content: "Lumina" }],
  [
    "meta",
    {
      property: "og:description",
      content:
        "Illuminate every story. Lumina is a free, open-source desktop app for translating manga, manhwa, and manhua — detection, OCR, translation, inpainting, and typesetting, with every step left editable.",
    },
  ],
  ["meta", { property: "og:locale", content: "en_US" }],
  ["meta", { property: "og:type", content: "website" }],
  ["script", { type: "application/ld+json" }, softwareSchema],
];

export default headConfig;
