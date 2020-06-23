import Vue from "vue";
import App from "./App.vue";

import LinVueUi from "lin-vue-ui";
// import LinVueUi from "../lib/index/index";
// import "../lib/index/style.css";

Vue.use(LinVueUi);

const testComps = require.context("./components", false, /\.vue$/);
// console.log(testComps);

testComps.keys().forEach((key) => {
  const componentEntity = testComps(key).default;
  Vue.component(componentEntity.name, componentEntity);
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
