/* eslint-disable-next-line */
import Vue from 'vue/dist/vue';

import LinViewUI from 'src/index.js';

Vue.use(LinViewUI);

const createElm = function () {
  const elm = document.createElement('div');

  // elm.id = 'app' + ++id;
  document.body.appendChild(elm);

  return elm;
};

export const createVue = function ({ template }) {
  return new Vue({
    template,
  }).$mount(createElm());
};
