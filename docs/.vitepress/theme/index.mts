import {  ElementPlusContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import { App } from 'vue'
import DefaultTheme from 'vitepress/theme'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    // element-plus风格
    app.component('demo-preview', ElementPlusContainer)
  }
}