import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import path from 'path'

function resolveDir(pathSrc:string){
  return path.resolve(__dirname,pathSrc)
}

export default defineUserConfig<DefaultThemeOptions>({
  //   lang: 'en-US',
  title: "组件库文档",
  description: "组件演示",

  // plugins: ["demo-container-v2"],
  plugins:[
    [
      '@vuepress/register-components',
      {
        componentsDir: resolveDir('./components'),
      },
    ],
  ],

  bundlerConfig: {
    viteOptions:{
      resolve: {
        alias: {
          "@packages": resolveDir("../../packages"),
          "@src": resolveDir("../../src"),
        },
      },
    },
  },
});
