<template>
  <transition name="lin-video-player-animation">
    <div class="lin-video-player-animation" v-if="showAnimation" @animationend="animationend ">
      <span class="lin-icon-play" v-if="isPlaying"></span>
      <span class="lin-icon-pause" v-else></span>
    </div>
  </transition>
</template>

<script>
export default {
  name: "LinVideoPlayerAnimation",
  inject: {
    videoPlayer: {
      default: null,
    },
  },
  data() {
    return {
      showAnimation: false,
    };
  },
  computed: {
    isPlaying() {
      if (this.videoPlayer) {
        return this.videoPlayer.isPlaying;
      }
      return false;
    },
  },
  methods: {
    animationend() {
      this.showAnimation = false;
    },
  },
  watch: {
    isPlaying() {
      this.showAnimation = true;
    },
  },
};
</script>
