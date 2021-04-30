import Vue from 'vue';

import MultiPlayer from './multi-player.vue';

import 'packages/multi-player/src/style.scss';

import 'packages/video-player/src/style.scss';

import 'packages/player-fullscreen/src/style.scss';

import 'packages/player-process/src/style.scss';

import 'packages/player-volume/src/style.scss';

import 'src/fonts/iconfont.css';

import { handleEl } from 'packages/video-player/src/utils.js';

const MultiPlayerConstructor = Vue.extend(MultiPlayer);

// export default MultiPlayer;

class LinMultiPlayer {
  // 组件实例
  instance = null;

  // 插入容器
  container = null;

  // vue实例
  vm = null;

  // 视频列表
  videoList = [];

  // 视频类型
  type = null;

  // 是否为直播
  live = false;

  // 是否自动播放
  autoplay = false;

  // el元素，字符串或者DOM类型
  el = null;

  constructor(options) {
    const { el } = options;
    // 检验参数
    handleEl(el);

    // 初始化参数
    this.initParams(options);
    // 初始化播放器
    this.initPlayer(options);
  }

  // 初始化参数
  initParams(options) {
    const {
      el,
      type,
      autoplay = false,
      videoList = [],
      live = false
    } = options;
    this.videoList = videoList;
    this.autoplay = autoplay;
    this.type = type;
    this.el = el;
    this.live = live;
  }

  // 初始化播放器
  initPlayer() {
    this.instance = new MultiPlayerConstructor({
      data: {
        autoplay: this.autoplay,
        videoList: this.videoList,
        type: this.type,
        live: this.live
      }
    });
    // 初始化挂在的容器
    if (typeof this.el === 'string') {
      this.container = document.querySelector(this.el);
    } else {
      this.container = this.el;
    }

    // 渲染DOM
    this.vm = this.instance?.$mount();

    // 获取video标签
    this.videos = this.instance?.playerList;

    // 将dom添加进入容器
    this.container?.appendChild(this.vm.$el);
  }

  // 事件监听
  on(eventName, func) {
    if (this.videos && this.videos[0]) {
      this.videos[0].on(eventName, func);
    }
  }
}

export default LinMultiPlayer;
