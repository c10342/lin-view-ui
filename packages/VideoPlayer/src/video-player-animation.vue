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
  name: 'LinVideoPlayerAnimation',
  inject: {
    videoPlayer: {
      default: null
    }
  },
  data () {
    return {
      // 是否展示播放，暂停的动画
      showAnimation: false
    };
  },
  computed: {
    isPlaying () {
      if (this.videoPlayer) {
        return this.videoPlayer.isPlaying;
      }
      return false;
    }
  },
  methods: {
    // 动画结束
    animationend () {
      this.showAnimation = false;
    }
  },
  watch: {
    isPlaying () {
      // 监听播放状态
      this.showAnimation = true;
    }
  }
};
</script>
