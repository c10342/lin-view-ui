import { App, Component, Plugin } from "vue";

// 模板文件的类型
export type SFCWithInstall<T> = T & Plugin;

export function withInstall<T>(component: T) {
  // 给组件添加install方法，以便 app.use(Button) 注册全局组件
  (component as SFCWithInstall<T>).install = (app: App) => {
    const { name } = component as unknown as { name: string };
    // 注册为全局组件
    app.component(name, component as Component);
  };
  return component as SFCWithInstall<T>;
}
