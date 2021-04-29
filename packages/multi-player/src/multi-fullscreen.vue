<template>
  <div class="lin-video-player-fullscreen">
    <span class="lin-icon-fullscreen" @click="onBrowserFullscreen"></span>
    <div class="lin-video-player-hover-full">
      <span class="lin-icon-full-screen" @click="onWebFullscreen"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LinMultiFullscreen',
  methods: {
    // 切换浏览器全屏状态
    onBrowserFullscreen() {
      this.$emit('browser-fullscreen');
    },
    // 切换网页全屏状态
    onWebFullscreen() {
      this.$emit('web-fullscreen');
    }
  }
};
</script>
