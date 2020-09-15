<template>
  <div class="lin-hls-player-loading" v-if="isLoading">
    <span class="lin-icon-loading"></span>
  </div>
</template>

<script>
export default {
  name: "LinHlsPlayerLoading",
  inject: {
    hlsPlayer: {
      default: null,
    },
  },
  computed: {
    isLoading() {
      if (this.hlsPlayer) {
        return this.hlsPlayer.isLoading;
      }
      return false;
    },
  },
};
</script>

