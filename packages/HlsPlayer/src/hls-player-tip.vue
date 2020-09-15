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
    tipTime:{
      get() {
      if (this.hlsPlayer) {
        return this.hlsPlayer.tipTime;
      }
      return 2000;
    },
    set(value){
      if (this.hlsPlayer) {
        this.hlsPlayer.tipTime = 2000
      }
    }
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
          this.tipTime = 2000
          this.destroyTimeout();
        }, this.tipTime);
      }
    },
  },
  beforeDestroy() {
    this.destroyTimeout();
  },
};
</script>

