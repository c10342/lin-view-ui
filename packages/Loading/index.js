import Loading from './src/loading.js';

export default {
  install (Vue) {
    Vue.use(Loading.directive);
    Vue.prototype.$loading = Loading.service;
  },
  directive: Loading.service,
  service: Loading.service
};
