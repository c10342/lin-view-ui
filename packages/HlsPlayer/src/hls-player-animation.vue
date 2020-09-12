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

<style lang="scss">
.lin-hls-player-animation {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  text-align: center;
  line-height: 60px;
  > span {
    font-size: 40px;
    color: #ffffff;
  }
}

@keyframes enterActive {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.4);
  }
  100% {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.5);
    transform: translate(-50%, -50%) scale(1.4);
  }
}

.lin-hls-player-animation-enter-active {
  animation: enterActive 0.3s ease-out;
}

.lin-hls-player-animation-leave-active {
  opacity: 0;
  display: none;
}
</style>