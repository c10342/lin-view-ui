import Vue from "vue";

import MultiPlayer from "./multi-player.vue";

import { handleEl } from "@lin-view-ui/video-player";

import { isString } from "@lin-view-ui/utils";

import { fullScreenType } from "./enum.js";

const MultiPlayerConstructor = Vue.extend(MultiPlayer);

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
      type = "mp4",
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
    if (isString(this.el)) {
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
    // 要等元素插入到容器中才能初始化播放器，否则document.getElementById(xxx)会找不到元素
    this.instance?.initPlayer();
  }

  // 事件监听
  on(eventName, func) {
    if (this.videos && this.videos[0]) {
      this.videos[0].on(eventName, func);
    }
  }

  seek(time) {
    this.instance?.seek(time);
  }

  play() {
    this.instance?.play();
  }

  pause() {
    this.instance?.pause();
  }

  toggle() {
    this.instance?.toggle();
  }

  // 设置视频音量
  setVolume(percent) {
    this.instance?.setVolume(percent);
  }

  // 全屏 web 和 browser，默认类型是 browser
  get fullScreen() {
    const self = this;
    return {
      request(type) {
        if (type === fullScreenType.web) {
          self.instance?.onWebFullscreen();
        } else if (type === fullScreenType.browser) {
          self.instance?.onBrowserFullscreen();
        }
      },
      cancel(type) {
        if (type === fullScreenType.web) {
          self.instance?.onWebFullscreen();
        } else if (type === fullScreenType.browser) {
          self.instance?.onBrowserFullscreen();
        }
      },
      singleFullscreen(index) {
        const screen = self.instance.getFrameByScreen(index);
        self.instance.onSingleFullscreenClick(screen);
      }
    };
  }

  // 当前播放时间
  get currentTime() {
    return this.instance?.currentTime || 0;
  }

  // 视频总时长
  get totalTime() {
    return this.instance?.totalTime || 0;
  }

  // 是否处于暂停状态
  get paused() {
    return !this.instance?.isPlaying;
  }

  // 重置
  resetParams() {
    this.instance = null;

    this.container = null;

    this.vm = null;

    this.videoList = [];

    this.type = null;

    this.autoplay = false;

    this.el = null;

    this.live = false;
  }

  destory() {
    if (this.vm && this.vm.$el && this.container) {
      this.container.removeChild(this.vm.$el);
    }
    this.vm?.$destroy();
    this.resetParams();
  }
}

export default LinMultiPlayer;
