import { App, DefineComponent } from "vue";

function withInstall(component: DefineComponent<{}, {}, any>) {
  component.install = (app: App) => {
    app.component(component.name, component);
  };

  return component;
}

export default withInstall;
