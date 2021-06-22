import Vue from "vue";
import VideoPlayer from "./video-player.vue";

import {
  handleType,
  handleEl,
  handleSpeedList,
  handleVideoList
} from "./utils.js";

const VideoPlayerConstructor = Vue.extend(VideoPlayer);

class LinVideoPlayer {
  // hls实例
  hls = null;

  // flv实例
  flv = null;

  // video标签
  video = null;

  // 组件实例
  instance = null;

  // 插入容器
  container = null;

  // vue实例
  vm = null;

  // 视频列表
  videoList = [];

  // 倍数列表
  speedList = [];

  // 视频类型
  type = null;

  // 是否自动播放
  autoplay = false;

  // el元素，字符串或者DOM类型
  el = null;

  // 自定义ESM
  customType = null;

  // 是否为直播
  live = false;

  constructor(options) {
    const { el, type, speedList = [], videoList = [], customType } = options;
    // 检验参数
    handleEl(el);
    handleType(type, customType);
    handleSpeedList(speedList);
    handleVideoList(videoList);

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
      speedList = [],
      videoList = [],
      live = false,
      customType
    } = options;
    this.videoList = videoList;
    this.speedList = speedList;
    this.autoplay = autoplay;
    this.type = type;
    this.el = el;
    this.live = live;
    if (typeof customType === "function") {
      this.customType = customType;
    }
  }

  // 初始化播放器
  initPlayer() {
    this.instance = new VideoPlayerConstructor({
      data: {
        autoplay: this.autoplay,
        speedList: this.speedList,
        videoList: this.videoList,
        type: this.type,
        live: this.live,
        customType: this.customType
      }
    });
    // 初始化挂在的容器
    if (typeof this.el === "string") {
      this.container = document.querySelector(this.el);
    } else {
      this.container = this.el;
    }

    // 渲染DOM
    this.vm = this.instance?.$mount();

    // 获取hls实例
    this.hls = this.instance?.hls;

    // 获取flv实例
    this.flv = this.instance?.flv;

    // 获取video标签
    this.video = this.instance?.video;

    // 将dom添加进入容器
    this.container?.appendChild(this.vm.$el);
  }

  // 事件监听
  on(eventName, func) {
    if (this.video) {
      this.video.addEventListener(eventName, func);
    }
  }

  // 跳转到特定时间
  seek(time) {
    if (this.video) {
      this.video.currentTime = time;
    }
  }

  // 播放
  play() {
    this.video?.play();
  }

  // 暂停
  pause() {
    this.video?.pause();
  }

  // 切换播放和暂停
  toggle() {
    this.instance?.switchPlayingStatus();
  }

  // 切换视频
  switchVideo(options) {
    const { videoList = [] } = options;
    handleVideoList(videoList);
    this.videoList = videoList;
    if ("autoplay" in options) {
      // 设置自动播放
      this.autoplay = options.autoplay;
    }
    if (this.instance) {
      // 重新赋值属性
      this.instance.videoList = videoList;
      this.instance.autoplay = this.autoplay;
      this.instance.initParams();
    }
  }

  // 显示通知
  notice(text, time = 2000) {
    if (this.instance) {
      this.instance.tipTime = time;
      this.instance.tip = text;
    }
  }

  // 切换清晰度
  switchQuality(index) {
    const data = this.videoList[index];
    if (data) {
      this.instance?.setDefinition(data);
    }
  }

  // 设置视频速度
  speed(rate) {
    this.instance?.setSpeed(rate);
  }

  // 设置视频音量
  volume(percent) {
    this.instance?.setVolume(percent);
  }

  // 全屏 web 和 browser，默认类型是 browser
  get fullScreen() {
    const self = this;
    return {
      request(type) {
        if (type === "web") {
          self.instance?.setWebFullScreen();
        } else if (type === "browser") {
          self.instance?.setBrowserFullScreen();
        }
      },
      cancel(type) {
        if (type === "web") {
          self.instance?.cancelWebFullScreen();
        } else if (type === "browser") {
          self.instance?.cancelBrowserFullScreen();
        }
      }
    };
  }

  // 当前播放事件
  get currentTime() {
    return this.video?.currentTime || 0;
  }

  // 视频总时长
  get totalTime() {
    return this.video?.duration || 0;
  }

  // 是否处于暂停状态
  get paused() {
    return this.video?.paused || true;
  }

  // 重置
  resetParams() {
    this.hls = null;

    this.flv = null;

    this.video = null;

    this.instance = null;

    this.container = null;

    this.vm = null;

    this.videoList = [];

    this.speedList = [];

    this.type = null;

    this.autoplay = false;

    this.el = null;

    this.live = false;

    this.customType = null;
  }

  // 销毁
  destory() {
    this.instance?.destoryPlayer();

    if (this.vm && this.vm.$el && this.container) {
      this.container.removeChild(this.vm.$el);
    }
    this.vm?.$destroy();
    this.resetParams();
  }
}

export default LinVideoPlayer;
