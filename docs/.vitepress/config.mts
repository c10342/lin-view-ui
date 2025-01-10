import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZUI",
  description: "组件库文档",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "组件", link: "/components/basic/button.md" },
    ],
    // 组件菜单
    sidebar: [
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

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
