<template>
  <transition name="lin-video-player-fade">
    <div class="lin-video-player-tip" v-if="tip">{{ tip }}</div>
  </transition>
</template>

<script>
export default {
  name: "LinVideoPlayerTip",
  inject: {
    videoPlayer: {
      default: null
    }
  },
  computed: {
    // 左下角提示
    tip() {
      if (this.videoPlayer) {
        return this.videoPlayer.tip;
      }
      return "";
    },
    // 显示时长
    tipTime: {
      get() {
        if (this.videoPlayer) {
          return this.videoPlayer.tipTime;
        }
        return 2000;
      },
      set(value) {
        if (this.videoPlayer) {
          this.videoPlayer.tipTime = value;
        }
      }
    }
  },
  mounted() {
    this.timer = null;
  },
  methods: {
    destroyTimeout() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    }
  },
  watch: {
    tip(value) {
      if (value) {
        this.destroyTimeout();
        this.timer = setTimeout(() => {
          if (this.videoPlayer) {
            this.videoPlayer.tip = "";
          }
          // 当外部传入显示时长的时候，隐藏后需要重置显示时长
          this.tipTime = 2000;
          this.destroyTimeout();
        }, this.tipTime);
      }
    }
  },
  beforeDestroy() {
    this.destroyTimeout();
  }
};
</script>
