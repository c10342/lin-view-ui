import { App } from "vue";
import { Button } from "./components";

const components = {
  Button
};

export default {
  install(app: App) {
    Object.values(components).forEach((component) => {
      app.use(component);
    });
  },
  ...components
};

export * from "./components";
export * from "./utils";
