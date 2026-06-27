import type { SiteConfig } from "./types/config";

const config = {
  title: "NickLinus Blog",
  description: "前端开发|seo实战|独立开发者|AI",
  url: "https://example.com",
  language: "zh",

  author: {
    name: "NickLinus",
  },

  social: {
    github: "",
    linkedin: "",
  },

  theme: {
    primaryColor: "#1ed760",
  },

  googleVerification: "",
  googleAnalyticsId: "",
} satisfies SiteConfig;

export default config;
