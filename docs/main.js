import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {getLang, langType} from './utils/lang'
import "./assets/styles/index.scss";
import demoBlock from "./components/demo-block.vue";

const lang = getLang()

Vue.component("demo-block", demoBlock);

import LinVueUi from "lin-view-ui";
import enLang from 'src/locale/lang/en-US.js'
import zhLang from 'src/locale/lang/zh-CN.js'
import locale from 'src/locale/index.js'

if(lang === langType.en){
  locale.use(enLang)
}else{
  locale.use(zhLang)
}

Vue.use(LinVueUi);

import "highlight.js/styles/color-brewer.css";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
