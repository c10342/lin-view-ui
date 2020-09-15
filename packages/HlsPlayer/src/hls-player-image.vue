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
