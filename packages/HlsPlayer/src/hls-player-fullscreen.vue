<template>
  <div class="lin-hls-player-fullscreen">
    <span class="lin-icon-fullscreen" @click="onVideoScreen"></span>
    <div class="lin-hls-player-hover-full">
      <span class="lin-icon-full-screen" @click="onFullscreen"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "LinHlsPlayerFullscreen",
  inject: {
    hlsPlayer: {
      default: null,
    },
  },
  computed: {
    video() {
      if (this.hlsPlayer) {
        return this.hlsPlayer.video;
      }
      return null;
    },
  },
  methods: {
    onVideoScreen() {
      if (this.isFullscreenEnabled()) {
        if (!this.isFullscreen()) {
          this.fullScreen(this.hlsPlayer?.$refs?.hlsPlayerContainer);
        } else {
          this.exitFullscreen();
        }
      }
    },
    onFullscreen() {
      if (this.isFullscreenEnabled()) {
        if (this.isFullscreen()) {
          this.exitFullscreen();
        } else {
          this.hlsPlayer?.fullscreen();
        }
      } else {
        this.hlsPlayer?.fullscreen();
      }
    },
    //进入全屏
    fullScreen(element) {
      if (!element) {
        return;
      }
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    },
    //退出全屏
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    },
    isFullscreen() {
      return (
        document.fullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        false
      );
    },

    isFullscreenEnabled() {
      return (
        document.fullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.msFullscreenEnabled ||
        false
      );
    },
  },
};
</script>

<style lang="scss">
.lin-hls-player-fullscreen {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  span {
    color: #ffffff;
    font-size: 30px;
    cursor: pointer;
    // padding: 5px;
  }
  &:hover {
    .lin-hls-player-hover-full {
      display: block;
    }
  }
}

.lin-hls-player-hover-full {
  position: absolute;
  width: 100%;
  left: 0;
  top: -30px;
  margin-bottom: 10px;
  display: none;
}
</style>