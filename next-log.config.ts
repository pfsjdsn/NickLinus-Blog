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

sitemap: {
    exclude: ['/resume'], // 从 Sitemap 中排除简历页
  },
navigation: {
  resume: true,  // 改成 false
},
  googleVerification: "",
  googleAnalyticsId: "",
} satisfies SiteConfig;

export default config;
