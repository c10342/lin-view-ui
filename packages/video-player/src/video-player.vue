<template>
  <div
    :class="['lin-video-player', { 'lin-video-player-fix': isWebFullscreen }]"
    ref="videoPlayerContainer"
    @mouseleave="onMouseLeave"
    @mouseenter="onMouseEnter"
  >
    <video
      crossorigin="anonymous"
      class="lin-video-player-video"
      id="lin_hls_player_video"
      ref="videoPlayerVideo"
      :autoplay="autoplay"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedmetadata"
      @progress="onprogress"
      @play="onPlay"
      @pause="onPause"
      @click="switchPlayingStatus"
      @canplaythrough="onCanplaythrough"
      @waiting="onWaiting"
      @volumechange="onVolumechange"
    ></video>
    <player-image></player-image>
    <player-loading></player-loading>
    <player-tip></player-tip>
    <player-animation></player-animation>
    <player-controls
      :isPlaying="isPlaying"
      :currentTime="currentTime"
      :totalTime="totalTime"
      :live="live"
      :isEnter="isEnter"
      :preloadTime="preloadTime"
      :volume="volume"
      @play="switchPlayingStatus"
      @pause="switchPlayingStatus"
      @seek="seek"
      @setVolume="setVolume"
      @offsetTime="onOffsetTime"
      @browser-fullscreen="onBrowserFullscreen"
      @web-fullscreen="onWebFullscreen"
    ></player-controls>
  </div>
</template>

<script>
import Hls from "hls.js";
import flvjs from "flv.js/dist/flv.js";
import { cloneDeep, isEqual } from "lodash";
import { LocaleMixin } from "@lin-view-ui/mixins";
import {
  isBrowserFullscreen,
  isBrowserFullscreenEnabled,
  enterBrowserFullScreen,
  exitBrowserFullscreen,
  isFunction
} from "@lin-view-ui/utils";
import PlayerControls from "./video-player-controls.vue";
import PlayerAnimation from "./video-player-animation.vue";
import PlayerImage from "./video-player-image.vue";
import PlayerLoading from "./video-player-loading.vue";
import PlayerTip from "./video-player-tip.vue";

export default {
  name: "LinVideoPlayer",
  mixins: [LocaleMixin],
  components: {
    PlayerControls,
    PlayerAnimation,
    PlayerImage,
    PlayerLoading,
    PlayerTip
  },
  provide() {
    return {
      videoPlayer: this
    };
  },
  data() {
    return {
      // 当前进度时间
      currentTime: 0,
      // 视频总时间
      totalTime: 0,
      // 缓冲到第几秒
      preloadTime: 0,
      // 是否处于播放状态
      isPlaying: false,
      // 是否网页全屏
      isWebFullscreen: false,
      // 播放数度
      speedList: [],
      // 视频清晰度列表
      videoList: [],
      // 视频截图，用于切换清晰度的时候，防止出现闪屏。先显示图片，再切换清晰度，这样图片就盖住了闪屏了
      imgSrc: "",
      // 是否在加载数据，切换清晰度或者切换视频的时候用到，要给出loading提示
      isLoading: false,
      // 左下角的提示
      tip: "",
      // 左下角提示多久就消失
      tipTime: 2000,
      // 默认播放的视频流类型
      type: "hls",
      // 是否自动播放
      autoplay: false,
      // 当前视频清晰度对象
      currentDefinitionVideo: null,
      // 清晰度列表
      definitionList: [],
      // 是否为直播
      live: false,
      // 鼠标是否进入容器
      isEnter: true,
      // 自定义支持其他 MSE 可使用此参数
      customType: null,
      // 音量
      volume: 1
    };
  },
  mounted() {
    // hls实例对象
    this.hls = null;
    // flv实例对象
    this.flv = null;
    // video元素
    this.video = this.$refs.videoPlayerVideo;
    this.initParams();
  },
  methods: {
    initParams() {
      if (this.videoList.length > 0) {
        const videoList = cloneDeep(this.videoList);
        // 获取第一个清晰度视频
        this.currentDefinitionVideo = videoList[0];
        // 剩下的清晰度
        this.definitionList = videoList.slice(1);
        // 初始化播放器
        this.initPlayer(this.currentDefinitionVideo);
      }
    },
    initPlayer(data) {
      // 显示loading
      this.isLoading = true;
      if (isFunction(this.customType)) {
        // 自定义MSE
        this.initCustomType(data);
      } else {
        const videoSrc = data.url;
        if (this.type === "hls") {
          // hls流
          this.initHls(videoSrc);
        } else if (this.type === "flv") {
          // flv流
          this.initFlv(videoSrc);
        } else if (this.type === "mp4") {
          // mp4
          this.video.src = videoSrc;
        }
      }
    },
    // 切换视频播放地址
    switchPlayerUrl(data) {
      const videoSrc = data.url;
      const label = data.label;
      if (!videoSrc) {
        return;
      }
      // 显示loading
      this.isLoading = true;
      // 提示正在切换清晰度
      this.tip = `${this.t("LinViewUI.VideoPlayer.switch")} ${label} ${this.t(
        "LinViewUI.VideoPlayer.quality"
      )}`;
      // 截图显示出来，防止闪屏
      this.getImage();
      if (isFunction(this.customType)) {
        this.initCustomType(data);
      } else if (this.type === "hls") {
        this.initHls(videoSrc);
      } else if (this.type === "flv") {
        this.destoryFlv();
        this.initFlv(videoSrc);
      } else if (this.type === "mp4") {
        this.video.src = videoSrc;
      }

      this.seek(this.currentTime);
    },
    initHls(videoSrc, hlsParams = {}) {
      if (!Hls) {
        throw new ReferenceError("Hls is not defind");
      }
      if (Hls.isSupported()) {
        // 判断是否支持hls
        if (!this.hls) {
          this.hls = new Hls(hlsParams);
        }
        // 加载视频
        this.hls.loadSource(videoSrc);
        this.hls.attachMedia(this.video);
      } else if (this.video.canPlayType("application/vnd.apple.mpegurl")) {
        // 判断是否支持直接播放m3u8文件
        this.video.src = videoSrc;
      }
    },
    initFlv(videoSrc, flvParams = {}) {
      if (!flvjs) {
        throw new ReferenceError("flvjs is not defind");
      }
      if (flvjs.isSupported()) {
        // 判断是否支持flv
        // 关闭日志输出
        flvjs.LoggingControl.enableAll = false;
        // 初始化flv实例
        this.flv = flvjs.createPlayer({
          type: "flv",
          url: videoSrc,
          isLive: this.live,
          ...flvParams
        });
        this.flv.attachMediaElement(this.video);
        this.flv.load();
      }
    },
    initCustomType(data) {
      // 自定义EMS
      this.customType(
        this.video,
        cloneDeep({
          currenVideo: data,
          autoplay: this.autoplay,
          speedList: this.speedList,
          videoList: this.videoList,
          live: this.live
        })
      );
    },
    // video播放时间变化
    onTimeUpdate() {
      const currentTime = this.video?.currentTime || 0;
      this.currentTime = currentTime;
    },
    // 加载数据源
    onLoadedmetadata() {
      const duration = this.video?.duration || 0;
      const volume = this.video?.volume || 0;
      this.totalTime = duration;
      this.volume = volume;
    },
    // 可以流畅播放
    onCanplaythrough() {
      // 清空截图
      this.imgSrc = "";
      // 隐藏loading
      this.isLoading = false;
      if (this.isPlaying) {
        this.play();
      } else {
        this.pause();
      }
    },
    // 正在等待
    onWaiting() {
      this.isLoading = true;
    },
    // 缓冲事件
    onprogress() {
      if (this.video && this.video.buffered?.length !== 0) {
        const preloadTime = this.video?.buffered.end(0) || 0;
        this.preloadTime = preloadTime;
      }
    },
    // 音量发生变化
    onVolumechange() {
      if (this.video) {
        this.volume = this.video.volume;
      }
    },
    // 跳转到某个视频点
    seek(time) {
      if (this.video) {
        this.video.currentTime = time;
      }
    },
    // 播放事件
    onPlay() {
      this.emitPlayingStatus(this.video?.paused);
    },
    // 暂停事件
    onPause() {
      this.emitPlayingStatus(this.video?.paused);
    },
    // 修改状态为是否正在播放
    emitPlayingStatus(status) {
      this.isPlaying = !status;
    },
    // 切换播放状态
    switchPlayingStatus() {
      if (this.video && this.video.paused) {
        this.play();
      } else if (this.video && !this.video.paused) {
        this.pause();
      }
    },
    play() {
      this.video?.play();
    },
    pause() {
      this.video?.pause();
    },
    // 视频截图
    getImage() {
      if (this.video) {
        try {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = this.video.clientWidth;
          canvas.height = this.video.clientHeight;
          ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);
          this.imgSrc = canvas.toDataURL();
        } catch (error) {
          // console.log(error);
        }
      }
    },
    // 销毁hls
    destoryHls() {
      if (this.hls) {
        this.hls.destroy();
        this.hls = null;
      }
    },
    // 销毁flv
    destoryFlv() {
      if (this.flv) {
        this.flv.pause();
        this.flv.unload();
        this.flv.detachMediaElement();
        this.flv.destroy();
        this.flv = null;
      }
    },
    // 销毁播放器
    destoryPlayer() {
      this.destoryFlv();
      this.destoryHls();
      this.video = null;
    },
    // 设置左下角提示
    setTip(tip) {
      this.tip = tip;
    },
    // 进度条发生变化，提示前进或者后退了多少秒
    onOffsetTime(offsetTime) {
      if (offsetTime < 0) {
        this.setTip(
          `${this.t("LinViewUI.VideoPlayer.goBack")} ${Math.round(
            -offsetTime
          )} ${this.t("LinViewUI.VideoPlayer.second")}`
        );
      } else {
        this.setTip(
          `${this.t("LinViewUI.VideoPlayer.fastForward")} ${Math.round(
            offsetTime
          )} ${this.t("LinViewUI.VideoPlayer.second")}`
        );
      }
    },
    // 设置播放速度
    setSpeed(rate) {
      if (this.video) {
        let playbackRate = rate;
        playbackRate = playbackRate < 0 ? 0 : playbackRate;
        this.video.playbackRate = playbackRate;
      }
    },
    // 设置音量
    setVolume(percentage) {
      if (this.video) {
        // 音量只能是0-1
        let volume = percentage;
        volume = volume < 0 ? 0 : volume;
        volume = volume > 1 ? 1 : volume;
        this.video.volume = volume;
        // 显示左下角提示
        this.setTip(
          `${this.t("LinViewUI.VideoPlayer.volume")}${Math.round(
            volume * 100
          )}%`
        );
        return volume;
      }
      return -1;
    },
    // 切换网页全屏
    switchWebfullscreen() {
      this.isWebFullscreen = !this.isWebFullscreen;
    },
    // 设置网页全屏
    setWebFullScreen() {
      // 需要先退出浏览器全屏
      exitBrowserFullscreen();

      this.isWebFullscreen = true;
    },
    // 设置浏览器全屏
    setBrowserFullScreen() {
      if (this.isWebFullscreen) {
        // 需要先退出网页全屏
        this.isWebFullscreen = false;
      }
      // 进入浏览器全屏
      enterBrowserFullScreen(this.$refs?.videoPlayerContainer);
    },
    // 退出网页全屏
    cancelWebFullScreen() {
      // 首先需要退出浏览器全屏
      exitBrowserFullscreen();

      this.isWebFullscreen = false;
    },
    // 退出浏览器全屏
    cancelBrowserFullScreen() {
      if (this.isWebFullscreen) {
        // 退出网页全屏
        this.isWebFullscreen = false;
      }
      exitBrowserFullscreen();
    },
    // 设置视频清晰度
    setDefinition(data) {
      // 判断当前清晰度是否跟传入的清晰度相同
      if (!isEqual(this.currentDefinitionVideo, data)) {
        const definitionList = cloneDeep(this.definitionList);
        // 找出对应的清晰度对象
        const index = definitionList.findIndex(item => isEqual(item, data));
        if (index > -1) {
          // 有的情况
          // definitionList存放的是剩下的清晰度,不包含当前的清晰度
          // 移除对应的清晰度
          definitionList.splice(index, 1);
          // 把旧清晰度放进去
          definitionList.push(this.currentDefinitionVideo);
          // 更新一下数据
          this.definitionList = definitionList;
          this.currentDefinitionVideo = data;
          // 切换视频地址
          this.switchPlayerUrl(data);
        }
      }
    },
    // 鼠标离开容器
    onMouseLeave() {
      this.isEnter = false;
    },
    // 鼠标进入容器
    onMouseEnter() {
      this.isEnter = true;
    },
    // 浏览器全屏
    onBrowserFullscreen() {
      if (this.isWebFullscreen) {
        this.isWebFullscreen = false;
      }
      if (isBrowserFullscreenEnabled()) {
        if (!isBrowserFullscreen()) {
          enterBrowserFullScreen(this.$refs.videoPlayerContainer);
        } else {
          exitBrowserFullscreen();
        }
      }
    },
    // 网页全屏
    onWebFullscreen() {
      exitBrowserFullscreen();
      this.switchWebfullscreen();
    }
  },
  beforeDestroy() {
    this.destoryPlayer();
  }
};
</script>
