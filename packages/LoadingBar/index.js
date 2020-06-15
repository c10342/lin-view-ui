import LoadingBar from "./src/loading-bar.js";

LoadingBar.install = (Vue) => (Vue.prototype.$loading = LoadingBar);

export default LoadingBar;
