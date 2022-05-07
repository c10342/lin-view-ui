import { Vuepress } from '@vuepress/client'

const routeItems = [
  ["v-8daa1a0e","/",{"title":""},["/index.html","/README.md"]],
  ["v-e45cc9ec","/guide/install.html",{"title":"安装"},["/guide/install","/guide/install.md"]],
  ["v-ed8c81f4","/guide/introduce.html",{"title":"介绍"},["/guide/introduce","/guide/introduce.md"]],
  ["v-fffb8e28","/guide/",{"title":"指南"},["/guide/index.html","/guide/README.md"]],
  ["v-683d6cbe","/components/basic/alert.html",{"title":"alert"},["/components/basic/alert","/components/basic/alert.md"]],
  ["v-a7a1f574","/components/basic/button.html",{"title":"Button 按钮"},["/components/basic/button","/components/basic/button.md"]],
  ["v-06829fc2","/components/basic/icon.html",{"title":"Icon 图标"},["/components/basic/icon","/components/basic/icon.md"]],
  ["v-e6182764","/components/basic/layout.html",{"title":"Layout 布局"},["/components/basic/layout","/components/basic/layout.md"]],
  ["v-3706649a","/404.html",{"title":""},["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: '404',
      path: '/:catchAll(.*)',
      component: Vuepress,
    }
  ]
)
