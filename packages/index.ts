import { App } from "vue";
import { ZButton, ZIcon } from "./components";

const components = {
  ZButton,
  ZIcon,
};

export default {
  install(app: App) {
    Object.values(components).forEach((component) => {
      app.use(component);
    });
  },
  ...components,
};

export * from "./components";
export * from "./utils";
