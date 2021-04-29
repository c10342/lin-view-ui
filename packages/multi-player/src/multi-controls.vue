<template>
  <transition name="lin-video-player-fade">
    <div
      class="lin-video-player-controls lin-multi-controls"
      v-show="isEnter || !isPlaying"
    >
      <div class="lin-video-player-controls-mask"></div>
      <div class="lin-video-player-controls-group">
        <div class="lin-video-player-process-box">
          <lin-multi-process
            @seek="onSeek"
            :totalTime="totalTime"
            :currentTime="currentTime"
          />
        </div>
        <span class="lin-video-player-icon-item">
          <i v-if="!isPlaying" class="lin-icon-play" @click="onPlayClick"></i>
          <i v-else class="lin-icon-pause" @click="onPauseClick"></i>
        </span>
        <lin-multi-volume :volume="volume" @setVolume="setVolume" />
        <span class="lin-video-player-time"
          >{{ currentTime | secondToTime }}/{{ totalTime | secondToTime }}</span
        >
      </div>
      <div class="lin-video-player-controls-right">
        <lin-multi-fullscreen
          @browser-fullscreen="$emit('browser-fullscreen')"
          @web-fullscreen="$emit('web-fullscreen')"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import MultiVolume from './multi-volume.vue';
import MultiFullscreen from './multi-fullscreen.vue';
import MultiProcess from './multi-process.vue';
import secondToTime from 'src/utils/secondToTime.js';
export default {
  name: 'LinMultiControls',
  components: {
    [MultiVolume.name]: MultiVolume,
    [MultiFullscreen.name]: MultiFullscreen,
    [MultiProcess.name]: MultiProcess
  },
  filters: {
    // 格式化时间
    secondToTime
  },
  props: {
    // 视频播放状态
    isPlaying: {
      type: Boolean,
      default: false
    },
    // 鼠标是否进入容器
    isEnter: {
      type: Boolean,
      default: false
    },
    // 当前时间
    currentTime: {
      type: Number,
      default: 0
    },
    // 视频总时长
    totalTime: {
      type: Number,
      default: 0
    },
    // 音量
    volume: {
      type: Number,
      default: 1
    }
  },
  methods: {
    onPlayClick() {
      this.$emit('play');
    },
    onPauseClick() {
      this.$emit('pause');
    },
    onSeek(data) {
      this.$emit('seek', data);
    },
    setVolume(volume) {
      this.$emit('setVolume', volume);
    }
  }
};
</script>
