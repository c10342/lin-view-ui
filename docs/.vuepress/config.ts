import { defaultTheme, defineUserConfig } from "vuepress";
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
    [
      require("vuepress2-plugin-demo-block/src/index"),
      {
        componentsDir: path.resolve(__dirname, "./../examples")
      }
    ]
  ],
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
