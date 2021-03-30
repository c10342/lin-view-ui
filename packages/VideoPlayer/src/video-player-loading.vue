<template>
  <div class="lin-video-player-loading" v-if="isLoading">
    <span class="lin-icon-loading"></span>
  </div>
</template>

<script>
export default {
  name: 'LinVideoPlayerLoading',
  inject: {
    videoPlayer: {
      default: null,
    },
  },
  computed: {
    // 控制loading是否显示
    isLoading() {
      if (this.videoPlayer) {
        return this.videoPlayer.isLoading;
      }
      return false;
    },
  },
};
</script>
