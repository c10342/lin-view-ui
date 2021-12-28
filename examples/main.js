import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";

import LinVueUi from "../src/index.js";
import "../src/theme-chalk/index.scss";

Vue.use(LinVueUi);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
