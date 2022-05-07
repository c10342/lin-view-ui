import { defineClientAppEnhance } from '@vuepress/client'
import linViewUi from '../../packages/lin-view-ui/index'
import '../../packages/theme-chalk/index.scss'
import './styles/common.scss'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.use(linViewUi)
})