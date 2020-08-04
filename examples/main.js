import Vue from "vue";
import App from "./App.vue";

import LinVueUi from "lin-view-ui";

// import utils from "packages/assets/utils/index.js";

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
