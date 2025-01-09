import { createApp } from "vue";
import App from "./App.vue";
import ZUI from "@packages/index";
import "@packages/theme-chalk/index.scss";
import router from "./router";

createApp(App).use(router).use(ZUI).mount("#app");
