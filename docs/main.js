import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles/index.scss";

import demoBlock from "./components/demo-block.vue";

Vue.component("demo-block", demoBlock);

import LinVueUi from "lin-view-ui";
// import lang from 'src/locale/lang/en-US.js'
// import locale from 'src/locale/index.js'

// locale.use(lang)

Vue.use(LinVueUi);

import "highlight.js/styles/color-brewer.css";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
