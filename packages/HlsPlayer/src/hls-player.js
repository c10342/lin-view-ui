import Vue from "vue";
import HlsPlayer from "./hls-player.vue";

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

  constructor(options) {
    const { el, type, speedList = [], videoList = [] } = options;
    handleEl(el);
    handleType(type);
    handleSpeedList(speedList);
    handleVideoList(videoList);

    this.init(options);
  }

  init(options) {
    const {
      el,
      type,
      autoplay = false,
      speedList = [],
      videoList = [],
    } = options;
    this.instance = new HlsPlayerConstructor({
      data: {
        autoplay,
        speedList,
        videoList,
        type,
      },
    });
    if (typeof el === "string") {
      this.container = document.querySelector(el);
    } else {
      this.container = el;
    }

    this.vm = this.instance.$mount();

    this.hls = this.instance?.hls;
    this.video = this.instance?.video;

    this.container.appendChild(this.vm.$el);
  }

  on(eventName, func) {
    if (this.video) {
      this.video.addEventListener(eventName, func);
    }
  }

  seek(time) {
    if (this.video) {
      this.video.currentTime = time;
    }
  }

  play() {
    this.video?.play();
  }

  pause() {
    this.video?.pause();
  }

  get currentTime() {
    return this.video?.currentTime || 0;
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
