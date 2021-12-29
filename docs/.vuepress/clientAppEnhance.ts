


import { defineClientAppEnhance } from '@vuepress/client'

import LinViewUi from '../../src/index'

import '../../src/theme-chalk/index.scss';



export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.use(LinViewUi)
})