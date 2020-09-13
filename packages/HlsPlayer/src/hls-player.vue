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
import PlayerControls from "./hls-player-controls";
import PlayerAnimation from "./hls-player-animation";
import PlayerImage from "./hls-player-image";
import PlayerLoading from "./hls-player-loading";
import PlayerTip from "./hls-player-tip";
export default {
  name: "LinHlsPlayer",
  components: {
    PlayerControls,
    PlayerAnimation,
    PlayerImage,
    PlayerLoading,
    PlayerTip,
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
      videoList: [
        {
          label: "标清",
          url:
            "https://th.alink.ava.com.cn/hls/ff808081722a7f9c0172309925d900d6/NR/master.m3u8",
        },
        {
          label: "超清",
          url:
            "https://th.alink.ava.com.cn/hls/ff808081722a7f9c0172309925d900d6/HD/master.m3u8",
        },
        // {
        //   label: "高清",
        //   url:
        //     "https://th.alink-test.ava.com.cn/hls/ff80808172c756580172cadf0f250035/SH/master.m3u8",
        // },
      ],
      imgSrc: "",
      isLoading: false,
      tip: "",
    };
  },
  mounted() {
    this.hls = null;
    this.video = this.$refs.hlsPlayerVideo;
    const videoSrc = this.videoList[0].url;
    this.initPlayer(videoSrc);
  },
  methods: {
    initPlayer(videoSrc) {
      this.isLoading = true;
      if (Hls.isSupported()) {
        this.hls = new Hls();
        this.hls.loadSource(videoSrc);
        this.hls.attachMedia(this.video);
      } else if (this.video.canPlayType("application/vnd.apple.mpegurl")) {
        this.video.src = videoSrc;
      }
    },
    switchPlayerUrl(data) {
      const videoSrc = data.url;
      const label = data.label;
      if (!videoSrc) {
        return;
      }
      this.tip = `已经切换至 ${label} 画质`;
      this.getImage();
      if (Hls.isSupported()) {
        if (!this.hls) {
          this.hls = new Hls();
        }
        this.hls.loadSource(videoSrc);
        this.hls.attachMedia(this.video);
      } else if (this.video.canPlayType("application/vnd.apple.mpegurl")) {
        this.video.src = videoSrc;
      }
      this.seek(this.currentTime);
      if (this.isPlaying) {
        this.play();
      } else {
        this.pause();
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
    onCanplaythrough() {
      this.imgSrc = "";
      this.isLoading = false;
    },
    onWaiting() {
      this.isLoading = true;
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
    getImage() {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      canvas.width = this.video.clientWidth;
      canvas.height = this.video.clientHeight;
      ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);
      this.imgSrc = canvas.toDataURL();
    },
    destory() {
      if (this.hls) {
        this.hls.destory();
      }
    },
    setTip(tip) {
      this.tip = tip;
    },
  },
};
</script>