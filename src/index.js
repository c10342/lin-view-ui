import locale from './locale/index.js';

import 'src/fonts/iconfont.css';

const testComps = require.context(
  '../packages',
  true,
  /^\.(\/\w+)\/index\.js$/
);

const reg = /^\.\/(\w+)\/index\.js$/;

const componentObjs = {};
testComps.keys().forEach((key) => {
  const componentEntity = testComps(key).default;
  const result = reg.exec(key)[1];
  componentObjs[result] = componentEntity;
});

const install = (Vue, opts = {}) => {
  locale.use(opts.locale);
  locale.i18n(opts.i18n);
  Object.keys(componentObjs).forEach((key) => {
    Vue.use(componentObjs[key]);
  });
};

// 判断是否是直接引入文件,如果是，就不用调用 Vue.use()
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  locale: locale.use,
  i18n: locale.i18n,
  install,
  version: '1.1.0',
  ...componentObjs
};
