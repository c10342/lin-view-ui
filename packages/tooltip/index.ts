import { App } from "vue";
import directive from "./src/directive";

const install = (app: App) => {
  app.directive("tooltip", directive);
};

export default {
  install
};
