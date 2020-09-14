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

<style lang="scss">
.lin-hls-player-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: rgba(0, 0, 0, 0.3);
  > span {
    color: hsla(0, 0%, 100%, 0.7);
    font-size: 30px;
    animation: rotate-animation 2s linear infinite;
  }
}
</style>