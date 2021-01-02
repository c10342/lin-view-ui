<template>
  <div class="lin-video-player-fullscreen">
    <span class="lin-icon-fullscreen" @click="onBrowserFullscreen"></span>
    <div class="lin-video-player-hover-full">
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
} from './utils.js';

export default {
  name: 'LinVideoPlayerFullscreen',
  inject: {
    videoPlayer: {
      default: null,
    },
  },
  computed: {
    video() {
      if (this.videoPlayer) {
        return this.videoPlayer.video;
      }
      return null;
    },
  },
  methods: {
    onBrowserFullscreen() {
      if (this.videoPlayer) {
        this.videoPlayer.isWebFullscreen = false;
      }
      if (isBrowserFullscreenEnabled()) {
        if (!isBrowserFullscreen()) {
          enterBrowserFullScreen(this.videoPlayer?.$refs?.videoPlayerContainer);
        } else {
          exitBrowserFullscreen();
        }
      }
    },
    onWebFullscreen() {
      exitBrowserFullscreen();
      this.videoPlayer?.switchWebfullscreen();
    },
  },
};
</script>
