import Vue from "vue";
import Router from "vue-router";
import navConf from "../nav.config.zh.json";
import { getLang } from "../utils/lang";
import hljs from 'highlight.js'

const lang = getLang();

Vue.use(Router);

let routes = [];

Object.keys(navConf).forEach((header) => {
  routes = routes.concat(navConf[header]);
});

let addComponent = (router) => {
  router.forEach((route) => {
    if (route.items) {
      addComponent(route.items);
      routes = routes.concat(route.items);
    } else {
      if (route.type === "guide") {
        route.component = () =>
          import(`../markdown/${lang}/guide/${route.name}.md`);
        return;
      }
      route.component = () =>
        import(`../markdown/${lang}/components/${route.name}.md`);
    }
  });
};
addComponent(routes);

const router = new Router({
  mode:'history',
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import(`../pages/index.vue`),
    },
    {
      path: "/component",
      name: "component",
      component: () => import(`../pages/components.vue`),
      children: routes,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.afterEach((route) => {
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
  })
})


export default router
