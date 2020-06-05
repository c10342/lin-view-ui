import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles/index.scss";

import demoBlock from "./components/demo-block.vue";

Vue.component("demo-block", demoBlock);

import LinVueUi from "lin-vue-ui";

Vue.use(LinVueUi);

import "highlight.js/styles/color-brewer.css";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
