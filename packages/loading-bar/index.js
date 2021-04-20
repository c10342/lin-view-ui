import LoadingBar from './src/loading-bar.js';

LoadingBar.install = (Vue) => {
  Vue.prototype.$loadingBar = LoadingBar;
};

export default LoadingBar;
