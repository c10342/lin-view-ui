// eslint-disable-next-line
import Vue from 'vue/dist/vue';
import LinViewUI from 'src/index.js';

Vue.use(LinViewUI);

const createElm = function () {
  const elm = document.createElement('div');

  document.body.appendChild(elm);

  return elm;
};

export const createVue = function (Compo) {
  if (Object.prototype.toString.call(Compo) === '[object String]') {
    Compo = { template: Compo };
  }
  return new Vue(Compo).$mount(createElm());
};

export const createTest = function (Compo, propsData = {}) {
  const elm = createElm();
  const Ctor = Vue.extend(Compo);
  return new Ctor({ propsData }).$mount(elm);
};

export const sleep = function (ms = 50) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
};

export const transitionStub = () => ({
  render: function (h) {
    return this.$options._renderChildren;
  }
});
