<template>
  <div
    :class="['lin-video-player',{'lin-video-player-fix':isWebFullscreen}]"
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
    ></video>
    <player-image></player-image>
    <player-loading></player-loading>
    <player-tip></player-tip>
    <player-animation></player-animation>
    <player-controls></player-controls>
  </div>
</template>

<script>
import Hls from "hls.js";
import Flv from "flv.js";
import PlayerControls from "./video-player-controls";
import PlayerAnimation from "./video-player-animation";
import PlayerImage from "./video-player-image";
import PlayerLoading from "./video-player-loading";
import PlayerTip from "./video-player-tip";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import {
  isBrowserFullscreen,
  isBrowserFullscreenEnabled,
  enterBrowserFullScreen,
  exitBrowserFullscreen,
} from "./utils";
export default {
  name: "LinVideoPlayer",
  components: {
    PlayerControls,
    PlayerAnimation,
    PlayerImage,
    PlayerLoading,
    PlayerTip,
  },
  provide() {
    return {
      videoPlayer: this,
    };
  },
  data() {
    return {
      currentTime: 0,
      totalTime: 0,
      preloadTime: 0,
      isPlaying: false,
      isWebFullscreen: false,
      speedList: [],
      videoList: [],
      imgSrc: "",
      isLoading: false,
      tip: "",
      tipTime: 2000,
      type: "hls",
      autoplay: false,
      currentDefinitionVideo: null,
      definitionList: [],
      live: false,
      isEnter: true,
      customType: null,
    };
  },
  mounted() {
    this.hls = null;
    this.flv = null;
    this.video = this.$refs.videoPlayerVideo;
    this.initParams();
  },
  methods: {
    initParams() {
      if (this.videoList.length > 0) {
        const videoList = cloneDeep(this.videoList);
        this.currentDefinitionVideo = videoList[0];
        this.definitionList = videoList.slice(1);
        this.initPlayer(this.currentDefinitionVideo);
      }
    },
    initPlayer(data) {
      this.isLoading = true;
      if (typeof this.customType === "function") {
        this.initCustomType(data);
      } else {
        const videoSrc = data.url;
        if (this.type === "hls") {
          this.initHls(videoSrc);
        } else if (this.type === "flv") {
          this.initFlv(videoSrc);
        } else if (this.type === "mp4") {
          this.video.src = videoSrc;
        }
      }
    },
    switchPlayerUrl(data) {
      const videoSrc = data.url;
      const label = data.label;
      if (!videoSrc) {
        return;
      }
      this.isLoading = true;
      this.tip = `已经切换至 ${label} 画质`;
      this.getImage();
      if (typeof this.customType === "function") {
        this.initCustomType(data);
      } else {
        if (this.type === "hls") {
          this.initHls(videoSrc);
        } else if (this.type === "flv") {
          this.destoryFlv();
          this.initFlv(videoSrc);
        } else if (this.type === "mp4") {
          this.video.src = videoSrc;
        }
      }

      this.seek(this.currentTime);
    },
    initHls(videoSrc, hlsParams = {}) {
      if (Hls.isSupported()) {
        if (!this.hls) {
          this.hls = new Hls(hlsParams);
        }
        this.hls.loadSource(videoSrc);
        this.hls.attachMedia(this.video);
      } else if (this.video.canPlayType("application/vnd.apple.mpegurl")) {
        this.video.src = videoSrc;
      }
    },
    initFlv(videoSrc, flvParams = {}) {
      if (Flv.isSupported()) {
        Flv.LoggingControl.enableAll = false;
        // Flv.LoggingControl = this.LoggingControl;
        this.flv = Flv.createPlayer({
          type: "flv",
          url: videoSrc,
          isLive: this.live,
          ...flvParams,
        });
        this.flv.attachMediaElement(this.video);
        this.flv.load();
      }
    },
    initCustomType(data) {
      this.customType(
        this.video,
        cloneDeep({
          currenVideo: data,
          autoplay: this.autoplay,
          speedList: this.speedList,
          videoList: this.videoList,
          live: this.live,
        })
      );
    },
    onTimeUpdate() {
      const currentTime = this.video?.currentTime || 0;
      this.currentTime = currentTime;
    },
    onLoadedmetadata() {
      const duration = this.video?.duration || 0;
      this.totalTime = duration;
    },
    onCanplaythrough() {
      this.imgSrc = "";
      this.isLoading = false;
      if (this.isPlaying) {
        this.play();
      } else {
        this.pause();
      }
    },
    onWaiting() {
      this.isLoading = true;
    },
    onprogress() {
      if (this.video && this.video.buffered?.length != 0) {
        const preloadTime = this.video?.buffered.end(0) || 0;
        this.preloadTime = preloadTime;
      }
    },
    seek(time) {
      if (this.video) {
        this.video.currentTime = time;
      }
    },
    onPlay() {
      this.emitPlayingStatus(this.video?.paused);
    },
    onPause() {
      this.emitPlayingStatus(this.video?.paused);
    },
    emitPlayingStatus(status) {
      this.isPlaying = !status;
    },
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
    getImage() {
      if (this.video) {
        try {
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext("2d");
          canvas.width = this.video.clientWidth;
          canvas.height = this.video.clientHeight;
          ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);
          this.imgSrc = canvas.toDataURL();
        } catch (error) {
          console.log(error);
        }
      }
    },
    destoryHls() {
      if (this.hls) {
        this.hls.destroy();
        this.hls = null;
      }
    },
    destoryFlv() {
      if (this.flv) {
        this.flv.pause();
        this.flv.unload();
        this.flv.detachMediaElement();
        this.flv.destroy();
        this.flv = null;
      }
    },
    destoryPlayer() {
      this.destoryFlv();
      this.destoryHls();
      this.video = null;
    },
    setTip(tip) {
      this.tip = tip;
    },
    setSpeed(rate) {
      if (this.video) {
        let playbackRate = rate;
        playbackRate = playbackRate < 0 ? 0 : playbackRate;
        this.video.playbackRate = playbackRate;
      }
    },
    setVolume(percentage) {
      if (this.video) {
        let volume = percentage;
        volume = volume < 0 ? 0 : volume;
        volume = volume > 1 ? 1 : volume;
        this.video.volume = volume;
        this.setTip(`音量${Math.round(volume * 100)}%`);
        return volume;
      }
      return -1;
    },
    switchWebfullscreen() {
      this.isWebFullscreen = !this.isWebFullscreen;
    },
    setWebFullScreen() {
      exitBrowserFullscreen();

      this.isWebFullscreen = true;
    },
    setBrowserFullScreen() {
      if (this.isWebFullscreen) {
        this.isWebFullscreen = false;
      }
      enterBrowserFullScreen(this.$refs?.videoPlayerContainer);
    },
    cancelWebFullScreen() {
      exitBrowserFullscreen();

      this.isWebFullscreen = false;
    },
    cancelBrowserFullScreen() {
      if (this.isWebFullscreen) {
        this.isWebFullscreen = false;
      }
      exitBrowserFullscreen();
    },
    setDefinition(data) {
      if (!isEqual(this.currentDefinitionVideo, data)) {
        const definitionList = cloneDeep(this.definitionList);
        const index = definitionList.findIndex((item) => isEqual(item, data));
        if (index > -1) {
          definitionList.splice(index, 1);
          definitionList.push(this.currentDefinitionVideo);
          this.definitionList = definitionList;
          this.currentDefinitionVideo = data;
          this.switchPlayerUrl(data);
        }
      }
    },
    onMouseLeave() {
      this.isEnter = false;
    },
    onMouseEnter() {
      this.isEnter = true;
    },
  },
  beforeDestroy() {
    this.destoryPlayer();
  },
};
</script>