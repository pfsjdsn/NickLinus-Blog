export const siteConfig = {
  name: "NickLinus",
  url: "https://nicklinus.com",
  logo: "/logo.png",
  ogImage: "/og.jpg",
  description:
    "前端开发技术博客，分享 Vue、微信小程序、TypeScript 等前端技术实践经验。",
  postsPerPage: 10,
  links: {
    twitter: "https://twitter.com/NickLinus",
    github: "https://github.com/pfsjdsn",
  } as { twitter?: string; github?: string },
  navItems: [
    {
      href: "/",
      label: "首页",
    },
    {
      href: "/tags",
      label: "标签",
    },
    {
      href: "/about",
      label: "关于",
    },
  ],
  copyright: "NickLinus",
  icp: {} as { number?: string; url?: string },
};

export const META_THEME_COLORS = {
  light: "#faf7f5",
  dark: "#09090b",
};
