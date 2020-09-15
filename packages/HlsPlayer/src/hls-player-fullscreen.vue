<template>
  <div class="lin-hls-player-fullscreen">
    <span class="lin-icon-fullscreen" @click="onBrowserFullscreen"></span>
    <div class="lin-hls-player-hover-full">
      <span class="lin-icon-full-screen" @click="onWebFullscreen"></span>
    </div>
  </div>
</template>

<script>
import {
  isBrowserFullscreen,
  isBrowserFullscreenEnabled,
  enterBrowserFullScreen,
  exitBrowserFullscreen,
} from "./utils";
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
    onBrowserFullscreen() {
      if (this.hlsPlayer) {
        this.hlsPlayer.isWebFullscreen = false;
      }
      if (isBrowserFullscreenEnabled()) {
        if (!isBrowserFullscreen()) {
          enterBrowserFullScreen(this.hlsPlayer?.$refs?.hlsPlayerContainer);
        } else {
          exitBrowserFullscreen();
        }
      }
    },
    onWebFullscreen() {
      exitBrowserFullscreen();
      this.hlsPlayer?.switchWebfullscreen();
    },
  },
};
</script>

