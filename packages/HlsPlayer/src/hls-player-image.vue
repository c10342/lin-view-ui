<template>
  <img v-if="imgSrc" :src="imgSrc" class="lin-hls-player-image" />
</template>


<script>
export default {
  name: "LinHlsPlayerImage",
  inject: {
    hlsPlayer: {
      default: null,
    },
  },
  computed: {
    imgSrc() {
      if (this.hlsPlayer) {
        return this.hlsPlayer.imgSrc;
      }
      return "";
    },
  },
};
</script>

<style lang="scss">
.lin-hls-player-image {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>