<template>
  <div class="multi-player">
    <div id="container" class="player-container"></div>
    <div>
      <lin-button @click="onSeek">seek</lin-button>
      <lin-button @click="onPlay">play</lin-button>
      <lin-button @click="onPause">pause</lin-button>
      <lin-button @click="onToggle">toggle</lin-button>
      <lin-button @click="setVolume">setVolume</lin-button>
      <lin-button @click="onWebFullscreen">网页全屏</lin-button>
      <lin-button @click="onBrowserFullscreen">浏览器全屏</lin-button>
      <lin-button @click="onSingleFullscreen">单个全屏</lin-button>
      <lin-button @click="onDestory">destory</lin-button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.initPlayer();
  },
  methods: {
    initPlayer() {
      this.player = new this.$MultiPlayer({
        el: "#container",
        type: "mp4",
        videoList: [
          "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
          "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
          "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4"
        ]
        // live:true
      });
    },
    onSeek() {
      this.player?.seek(10);
    },
    onPlay() {
      this.player?.play();
    },
    onPause() {
      this.player?.pause();
    },
    onToggle() {
      this.player?.toggle();
    },
    setVolume() {
      this.player?.setVolume(0);
    },
    onWebFullscreen() {
      this.player?.fullScreen.request("web");
    },
    onBrowserFullscreen() {
      this.player?.fullScreen.request("browser");
    },
    onSingleFullscreen() {
      this.player?.fullScreen.singleFullscreen(1);
    },
    onDestory() {
      this.player?.destory();
    }
  },
  beforeDestroy() {
    this.player.destory();
  }
};
</script>

<style lang="scss" scoped>
.multi-player {
  // width: 830px;
  // height: 500px;
  // margin: 100px auto;
  .player-container {
    width: 830px;
    height: 500px;
  }
}
</style>
