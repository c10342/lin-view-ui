import Vue from "vue";
import App from "./App.vue";

import LinVueUi from "lin-vue-ui";

Vue.use(LinVueUi);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
