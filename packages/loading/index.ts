import { App } from "vue";
import service from "./src/service";
import directive from "./src/directive";

const install = (app: App) => {
  app.config.globalProperties.$loading = service;
  app.directive("loading", directive);
};

export default {
  install,
  service,
  directive
};
