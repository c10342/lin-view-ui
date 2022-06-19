import { App } from "vue";
import LoadingBar from "./src/index";

(LoadingBar as any).install = (app: App) => {
  app.config.globalProperties.$loadingBar = LoadingBar;
};

export default LoadingBar;
