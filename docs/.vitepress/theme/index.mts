import {  ElementPlusContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import { App } from 'vue'
import DefaultTheme from 'vitepress/theme'
// 导入组件
// @ts-ignore
import ZUI from "@packages/index";
import "@packages/theme-chalk/index.scss";

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    // element-plus风格
    app.component('demo-preview', ElementPlusContainer)
    // 全局注册组件
    app.use(ZUI)
  }
}