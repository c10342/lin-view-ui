<template>
  <transition name="lin-hls-player-animation">
    <div class="lin-hls-player-animation" v-if="showAnimation" @animationend="animationend ">
      <span class="lin-icon-play" v-if="isPlaying"></span>
      <span class="lin-icon-pause" v-else></span>
    </div>
  </transition>
</template>

<script>
export default {
  name: "LinHlsPlayerAnimation",
  inject: {
    hlsPlayer: {
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
      if (this.hlsPlayer) {
        return this.hlsPlayer.isPlaying;
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
