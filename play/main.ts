import { createApp } from "vue";
import ZUI from "@packages/index";
import App from "./App.vue";
import router from "./router";
// 导入组件
import "@packages/theme-chalk/index.scss";

createApp(App).use(router).use(ZUI).mount("#app");
