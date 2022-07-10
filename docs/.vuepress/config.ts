import { defaultTheme, defineUserConfig } from "vuepress";
import demoBlock from "./plugins/demo-block";
import { viteBundler } from "@vuepress/bundler-vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { searchPlugin } from "@vuepress/plugin-search";
import DefineOptions from "unplugin-vue-define-options/vite";
import * as path from "path";

const getComponentPath = (publicDir: string, name: string) => {
  return `/components/${publicDir}/${name}`;
};

const basicComponents = ["button", "icon", "layout"];

const viewComponents = [
  "alert",
  "selector",
  "collapse",
  "link",
  "badge",
  "show-more",
  "limit-textarea",
  "scroll-view",
  "image",
  "progress",
  "tag",
  "pagination",
  "dialog",
  "dropdown",
  "date-axis"
];

const interactiveComponents = ["loading-bar", "loading"];

const otherComponents = ["meta-info"];

const formComponents = ["date-picker"];

export default defineUserConfig({
  // 站点配置
  lang: "zh-CN",
  title: "lin-view-ui",
  description: "vue3 UI lib",
  alias: {
    "@packages": path.resolve(__dirname, "../../packages"),
    "@lang": path.resolve(__dirname, "../../packages/locale/src")
  },
  plugins: [
    demoBlock({
      componentsDir: path.resolve(__dirname, "./../examples")
    }),
    searchPlugin()
  ],
  markdown: {
    toc: {}
  },
  bundler: viteBundler({
    viteOptions: { plugins: [vueJsx(), DefineOptions()] },
    vuePluginOptions: {}
  }),
  theme: defaultTheme({
    repo: "c10342/lin-view-ui",
    editLink: false,
    navbar: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/introduce" },
      { text: "组件", link: "/components/basic/button" }
    ],
    sidebarDepth: 0,
    sidebar: {
      "/guide/": [
        {
          text: "指南",
          children: [
            "/guide/introduce",
            "/guide/install",
            "/guide/i18n",
            "/guide/start"
          ]
        }
      ],
      "/components/": [
        {
          text: "基础组件",
          children: basicComponents.map((name) =>
            getComponentPath("basic", name)
          )
        },
        {
          text: "表单组件",
          children: formComponents.map((name) => getComponentPath("form", name))
        },
        {
          text: "视图组件",
          children: viewComponents.map((name) => getComponentPath("view", name))
        },
        {
          text: "交互组件",
          children: interactiveComponents.map((name) =>
            getComponentPath("interactive", name)
          )
        },
        {
          text: "其他组件",
          children: otherComponents.map((name) =>
            getComponentPath("other", name)
          )
        }
      ]
    }
  })
});
