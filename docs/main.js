import Vue from 'vue';
import zhLang from '@lin-view-ui/locale/src/lang/zh-CN.js';
import enLang from '@lin-view-ui/locale/src/lang/en-US.js';
/* eslint-disable-next-line */
import LinVueUi from '@lin-view-ui/lin-view-ui';
import locale from '@lin-view-ui/locale';
import App from './App.vue';
import router from './router/index.js';
import { getLang, langType } from './utils/lang.js';
import demoBlock from './components/demo-block.vue';

import './assets/styles/index.scss';
import '@lin-view-ui/theme-chalk/src/index.scss'

import 'highlight.js/styles/color-brewer.css';

const lang = getLang();

Vue.component('demo-block', demoBlock);

if (lang === langType.en) {
  locale.use(enLang);
} else {
  locale.use(zhLang);
}

Vue.use(LinVueUi);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');
