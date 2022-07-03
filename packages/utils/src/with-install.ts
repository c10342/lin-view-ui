import { App } from "vue";

export function withInstall(component: any) {
  component.install = (app: App) => {
    app.component(component.name, component);
  };

  return component;
}
