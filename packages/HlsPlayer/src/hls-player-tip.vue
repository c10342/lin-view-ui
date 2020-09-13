<template>
  <transition name="lin-hls-player-fade">
    <div class="lin-hls-player-tip" v-if="tip">{{tip}}</div>
  </transition>
</template>

<script>
export default {
  name: "LinHlsPlayerTip",
  inject: {
    hlsPlayer: {
      default: null,
    },
  },
  computed: {
    tip() {
      if (this.hlsPlayer) {
        return this.hlsPlayer.tip;
      }
      return "";
    },
  },
  mounted() {
    this.timer = null;
  },
  methods: {
    destroyTimeout() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    },
  },
  watch: {
    tip(value) {
      if (value) {
        this.destroyTimeout();
        this.timer = setTimeout(() => {
          if (this.hlsPlayer) {
            this.hlsPlayer.tip = "";
          }
          this.destroyTimeout();
        }, 2000);
      }
    },
  },
  beforeDestroy() {
    this.destroyTimeout();
  },
};
</script>

<style lang="scss">
.lin-hls-player-tip {
  position: absolute;
  left: 20px;
  bottom: 50px;
  border-radius: 4px;
  //   background-color: rgba(28, 28, 28, 0.9);
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  font-size: 14px;
  padding: 7px 20px;
}
</style>