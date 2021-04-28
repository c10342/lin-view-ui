// eslint-disable-next-line
import Vue from 'vue/dist/vue';
import LinViewUI from 'src/index.js';
Vue.config.productionTip = false;
Vue.config.devtools = false;

Vue.use(LinViewUI);

const createElm = function () {
  const elm = document.createElement('div');

  document.body.appendChild(elm);

  return elm;
};
/**
 * 回收vm
 * @param {*} vm
 */
export const destroyVM = function (vm) {
  vm.$destroy && vm.$destroy();
  vm.$el && vm.$el.parentNode && vm.$el.parentNode.removeChild(vm.$el);
};

/**
 * 创建一个vue实例
 * @param {*} Compo 组件配置，可直接传template
 * @returns
 */
export const createVue = function (Compo, mounted = false) {
  if (Object.prototype.toString.call(Compo) === '[object String]') {
    Compo = { template: Compo };
  }
  return new Vue(Compo).$mount(mounted === false ? null : createElm());
};

/**
 * 创建一个测试组件实例
 * @param {*} Compo 组件对象
 * @param {*} propsData props数据
 * @returns
 */
export const createTest = function (Compo, propsData = {}, mounted = false) {
  const Ctor = Vue.extend(Compo);
  return new Ctor({ propsData }).$mount(mounted === false ? null : createElm());
};

export const sleep = function (ms = 50) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
};

export const transitionStub = () => ({
  render: function (h) {
    return this.$options._renderChildren;
  }
});
