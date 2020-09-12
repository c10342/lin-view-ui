<template>
  <div :class="['lin-hls-player',{'lin-hls-player-fix':isFullscreen}]" ref="hlsPlayerContainer">
    <video
      class="lin-hls-player-video"
      id="lin_hls_player_video"
      ref="hlsPlayerVideo"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedmetadata"
      @progress="onprogress"
      @play="onPlay"
      @pause="onPause"
      @click="switchPlayingStatus"
    ></video>
    <player-animation></player-animation>
    <player-controls></player-controls>
  </div>
</template>

<script>
import Hls from "hls.js";
import PlayerControls from "./hls-player-controls";
import PlayerAnimation from "./hls-player-animation";
export default {
  name: "LinHlsPlayer",
  components: {
    PlayerControls,
    PlayerAnimation,
  },
  provide() {
    return {
      hlsPlayer: this,
    };
  },
  data() {
    return {
      currentTime: 0,
      totalTime: 0,
      preloadTime: 0,
      isPlaying: false,
      isFullscreen: false,
      speedList: [
        {
          label: "正常",
          value: 1,
        },
        {
          label: "1.5倍",
          value: 1.5,
        },
        {
          label: "2倍",
          value: 2,
        },
      ],
    };
  },
  mounted() {
    this.hls = null;
    this.video = this.$refs.hlsPlayerVideo;
    this.initPlayer();
  },
  methods: {
    initPlayer() {
      const videoSrc =
        "https://th.alink.ava.com.cn/hls/ff8080817253bbb401725573ba96014d/HD/master.m3u8";
      if (Hls.isSupported()) {
        this.hls = new Hls();
        this.hls.loadSource(videoSrc);
        this.hls.attachMedia(this.video);
        // this.initHlsEvent();
      } else if (this.video.canPlayType("application/vnd.apple.mpegurl")) {
        this.video.src = videoSrc;
      }
    },
    initHlsEvent() {
      // document.addEventListener
      this.video.addEventListener("timeupdate");
      this.video.addEventListener("loadedmetadata", this.onLoadedmetadata);
      this.video.addEventListener("progress", () => {
        console.log(this.video.buffered.end(0));
      });
    },
    onTimeUpdate() {
      // return throttle(() => {
      const currentTime = this.video?.currentTime || 0;
      this.currentTime = currentTime;
      // }, 1000);
    },
    onLoadedmetadata() {
      const duration = this.video?.duration || 0;
      this.totalTime = duration;
    },
    onprogress() {
      const preloadTime = this.video?.buffered.end(0) || 0;
      this.preloadTime = preloadTime;
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
    fullscreen() {
      this.isFullscreen = !this.isFullscreen;
    },
  },
};
</script>