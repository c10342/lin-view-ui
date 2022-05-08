import { defaultTheme, defineUserConfig } from "vuepress";
import demoBlock from 'vuepress2-plugin-demo-block'
import { viteBundler } from '@vuepress/bundler-vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as path from "path";

const getComponentPath = (name:string)=>{
  return `/components/basic/${name}`
}

const components = ['button','icon','layout','alert']

export default defineUserConfig({
  // 站点配置
  lang: "zh-CN",
  title: "Hello VuePress",
  description: "Just playing around",
  alias: {
    "@packages": path.resolve(__dirname, "../../packages")
  },
  plugins: [
    demoBlock({
        componentsDir: path.resolve(__dirname, "./../examples")
    }),
  ],
  bundler: viteBundler({
    viteOptions: {plugins: [ vueJsx()]},
    vuePluginOptions: {},
  }),
  theme: defaultTheme({
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
          children: ["/guide/introduce", "/guide/install"]
        }
      ],
      "/components/": [
        {
          text: "基础组件",
          children: components.map(getComponentPath)
        }
      ]
    }
  })
});
