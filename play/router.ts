import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import Index from "./pages/index.vue";

// 公共路由，不需要权限就可以访问的路由
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: Index,
  },
];

// 动态导入pages下的所有页面，一个组件对应一个页面路由
const modules = import.meta.glob("./pages/*.vue", { eager: true });

const getRoutes = () => {
  Object.keys(modules).forEach((key) => {
    let fileName: string[] | string = key.split("/");
    fileName = fileName[fileName.length - 1];
    const name = fileName.split(".")[0];
    if (name !== "index") {
      const component = (modules[key] as any)?.default;
      const item: RouteRecordRaw = {
        path: `/${name}`,
        name: name,
        component: component,
      };
      routes.push(item);
    }
  });
};

getRoutes();

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
