import Vue from "vue";
import HlsPlayer from "./hls-player.vue";
import broadcast from "src/utils/broadcast.js";

import {
  handleType,
  handleEl,
  handleSpeedList,
  handleVideoList,
} from "./utils.js";

const HlsPlayerConstructor = Vue.extend(HlsPlayer);

import "./style.scss";

class HLSPlayer {
  hls = null;

  video = null;

  instance = null;

  container = null;

  vm = null;

  videoList = [];

  speedList = [];

  type = null;

  autoplay = false;

  el = null;

  live = false;

  constructor(options) {
    const { el, type, speedList = [], videoList = [] } = options;
    handleEl(el);
    handleType(type);
    handleSpeedList(speedList);
    handleVideoList(videoList);

    this.initParams(options);
    this.initPlayer(options);
  }

  initParams(options) {
    const {
      el,
      type,
      autoplay = false,
      speedList = [],
      videoList = [],
      live = false,
    } = options;
    this.videoList = videoList;
    this.speedList = speedList;
    this.autoplay = autoplay;
    this.type = type;
    this.el = el;
    this.live = live;
  }

  initPlayer() {
    this.instance = new HlsPlayerConstructor({
      data: {
        autoplay: this.autoplay,
        speedList: this.speedList,
        videoList: this.videoList,
        type: this.type,
        live: this.live,
      },
    });
    if (typeof this.el === "string") {
      this.container = document.querySelector(this.el);
    } else {
      this.container = this.el;
    }

    this.vm = this.instance.$mount();

    this.hls = this.instance?.hls;
    this.video = this.instance?.video;

    this.container.appendChild(this.vm.$el);
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
    this.instance.switchPlayingStatus();
  }

  // 切换视频
  switchVideo(options) {
    const { videoList = [], type, autoplay = false } = options;
    handleVideoList(videoList);
    handleType(type);
    if (type === "mp4" && this.type === "hls") {
      this.instance.destoryHls();
    }
    this.videoList = videoList;
    this.type = type;
    this.autoplay = autoplay;
    this.instance.videoList = videoList;
    this.instance.type = type;
    this.instance.autoplay = autoplay;
    this.instance.initParams();
  }

  // 显示通知
  notice(text, time = 2000) {
    this.instance.tipTime = time;
    this.instance.tip = text;
  }

  // 切换清晰度
  switchQuality(index) {
    const data = this.videoList[index];
    if (data) {
      this.instance.setDefinition(data);
    }
  }

  // 设置视频速度
  speed(rate) {
    this.instance.setSpeed(rate);
  }

  // 设置视频音量
  volume(percent) {
    const volume = this.instance.setVolume(percent);
    if (volume > -1) {
      broadcast.call(this.instance, {
        eventName: "onvolumechange",
        params: volume,
        componentName: "LinHlsPlayerVolume",
      });
    }
  }

  // 全屏 web 和 browser，默认类型是 browser
  get fullScreen() {
    const self = this;
    return {
      request(type) {
        if (type === "web") {
          self.instance.setWebFullScreen();
        } else if (type === "browser") {
          self.instance.setBrowserFullScreen();
        }
      },
      cancel(type) {
        if (type === "web") {
          self.instance.cancelWebFullScreen();
        } else if (type === "browser") {
          self.instance.cancelBrowserFullScreen();
        }
      },
    };
  }

  get currentTime() {
    return this.video?.currentTime || 0;
  }

  get totalTime() {
    return this.video?.duration || 0;
  }

  clearObj() {
    this.hls = null;

    this.video = null;

    this.instance = null;

    this.container = null;

    this.vm = null;
  }

  destory() {
    this.instance.destoryPlayer();

    if (this.vm && this.vm.$el && this.container) {
      this.container.removeChild(this.vm.$el);
    }
    this.clearObj();
  }
}

export default HLSPlayer;
