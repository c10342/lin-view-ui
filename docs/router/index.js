import Vue from 'vue';
import Router from 'vue-router';
import { getLang, langType } from '../utils/lang.js';
import hljs from 'highlight.js';

import IndexPage from '../pages/index.vue';
import ComponentPage from '../pages/components.vue';

const lang = getLang();

Vue.use(Router);

const zhRoutes = [];

const zhComps = require.context('../markdown/zh-CN', true, /\.(md|vue)$/);

zhComps.keys().forEach((key) => {
  const component = zhComps(key).default;
  const name = key.replace(/(.*\/)*([^.]+).*/gi, '$2');
  zhRoutes.push({
    component,
    name,
    path: `/${name}`,
  });
});

const enRoutes = [];

const enComps = require.context('../markdown/en-US', true, /\.(md|vue)$/);

enComps.keys().forEach((key) => {
  const component = enComps(key).default;
  const name = key.replace(/(.*\/)*([^.]+).*/gi, '$2');
  enRoutes.push({
    component,
    name,
    path: `/${name}`,
  });
});

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexPage,
    },
    {
      path: '/component',
      name: 'component',
      component: ComponentPage,
      children: lang === langType.zh ? zhRoutes : enRoutes,
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
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
});

export default router;
