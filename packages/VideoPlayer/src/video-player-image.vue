<template>
  <img v-if="imgSrc" :src="imgSrc" class="lin-video-player-image" />
</template>


<script>
export default {
  name: "LinVideoPlayerImage",
  inject: {
    videoPlayer: {
      default: null,
    },
  },
  computed: {
    imgSrc() {
      if (this.videoPlayer) {
        return this.videoPlayer.imgSrc;
      }
      return "";
    },
  },
};
</script>
