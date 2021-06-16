
import service from './src/service.js';

import directive from './src/directive.js';



export default {
  install(Vue) {
    Vue.use(Loading.directive);
    Vue.prototype.$loading = service;
  },
  directive: directive,
  service: service
};
