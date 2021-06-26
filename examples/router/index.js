import VueRouter from "vue-router";

import Vue from "vue";

Vue.use(VueRouter);

const pages = require.context("../pages", false, /\.vue$/);

const routes = [];

pages.keys().forEach(key => {
  const fileName = key.replace(/(.*\/)*([^.]+).*/gi, "$2");
  const routeItem = {
    path: `/${fileName}`,
    name: fileName,
    component: pages(key).default
  };
  routes.push(routeItem);
});

routes.push({
  path: "/",
  redirect: "/index"
});

const router = new VueRouter({ routes });

export function getRoutes() {
  return routes;
}

export default router;
