import { App } from "vue";

function withInstall(component: any) {
  component.install = (app: App) => {
    app.component(component.name, component);
  };

  return component;
}

export default withInstall;
