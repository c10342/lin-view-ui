import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";

import LinVueUi from "@lin-view-ui/lin-view-ui";
import "@lin-view-ui/theme-chalk/src/index.scss";

Vue.use(LinVueUi);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
