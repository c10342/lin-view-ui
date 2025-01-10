import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZUI",
  description: "组件库文档",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/basic/install.md" },
      { text: "组件", link: "/components/basic/button.md" },
    ],
    sidebar: {
      // 组件菜单
      "/components/": [
        {
          text: "Basic 基础组件",
          items: [
            { text: "Button 按钮", link: "/components/basic/button.md" },
            { text: "Icon 图标", link: "/components/basic/icon.md" },
          ],
        },
        {
          text: "配置组件",
          items: [
            {
              text: "Config Provider 全局配置",
              link: "/components/configProvider/configProvider.md",
            },
          ],
        },
      ],
      // 指南菜单
      "/guide/": [
        {
          text: "基础",
          items: [
            { text: "安装", link: "/guide/basic/install.md" },
            { text: "快速开始", link: "/guide/basic/start.md" },
          ],
        },
        {
          text: "进阶",
          items: [
            {
              text: "国际化",
              link: "/guide/advanced/locale.md",
            },
            {
              text: "主题",
              link: "/guide/advanced/theme.md",
            },
          ],
        },
        {
          text: "开发",
          items: [
            {
              text: "开发指南",
              link: "/guide/develop/code.md",
            },
            {
              text: "开发常见问题",
              link: "/guide/develop/question.md",
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
