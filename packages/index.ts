import { App } from "vue";
import { ZButton, ZIcon, ZConfigProvider } from "./components";

const components = {
  ZButton,
  ZIcon,
  ZConfigProvider,
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
export * from "./types";
export * from './hooks'
export * from './locale'