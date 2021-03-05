import Vue from 'vue';
import LoadingBar from './loading-bar.vue';
import './style.scss';

const LoadingBarConstructor = Vue.extend(LoadingBar);

let timer = null;

let removeTimer = null;

const LLoadingBar = () => new LoadingBarConstructor();

// 设置全局配置信息
LoadingBarConstructor.prototype.config = function config (options) {
  Object.keys(options).forEach((key) => {
    if (key === 'isError' || key === 'totalProgress') {
      return;
    }
    this[key] = options[key];
  });
};

// 初始化加载进度条
LoadingBarConstructor.prototype.init = function init () {
  clearTimeout(timer);
  this.totalProgress = 0;
  this.isError = false;
  this.vm = this.$mount();
  document.body.appendChild(this.vm.$el);
  return this;
};

// 显示加载进度条
LoadingBarConstructor.prototype.start = function start () {
  this.init();

  timer = setInterval(() => {
    // 小于90的时候才进行前进
    if (this.totalProgress < 90) {
      this.totalProgress += (this.percentNum || Math.random()) * this.speed;
    }
  }, 100);
};

// 关闭加载进度条
LoadingBarConstructor.prototype.end = function end () {
  // timer || this.init();
  if (!timer) {
    this.init();
  }
  // 先把总进度设置为100，让他走完
  this.totalProgress = 100;
  clearTimeout(removeTimer);
  removeTimer = setTimeout(() => {
    clearTimeout(timer);
    timer = null;
    document.body.removeChild(this.vm.$el);
  }, 200);
};

// 显示错误进度条
LoadingBarConstructor.prototype.error = function error () {
  this.end();
  this.totalProgress = 100;
  this.isError = true;
};

export default LLoadingBar();
