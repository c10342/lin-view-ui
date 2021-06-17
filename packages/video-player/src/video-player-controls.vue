<template>
  <transition name="lin-video-player-fade">
    <div class="lin-video-player-controls" v-show="isEnter || !isPlaying">
      <div class="lin-video-player-controls-mask"></div>
      <div class="lin-video-player-controls-group">
        <div class="lin-video-player-process-box" v-if="!live">
          <player-process
            @seek="onSeek"
            @offsetTime="onOffsetTime"
            :totalTime="totalTime"
            :currentTime="currentTime"
            :preloadTime="preloadTime"
          ></player-process>
        </div>
        <span class="lin-video-player-icon-item">
          <i class="lin-icon-play" @click="onPlayClick" v-if="!isPlaying"></i>
          <i class="lin-icon-pause" @click="onPauseClick" v-else></i>
        </span>
        <player-volume :volume="volume" @setVolume="setVolume"></player-volume>
        <span class="lin-video-player-time" v-if="!live"
          >{{ currentTime | secondToTime }}/{{ totalTime | secondToTime }}</span
        >
        <span class="lin-video-player-live-tip" v-if="live">
          <i></i>
          {{ t('LinViewUI.VideoPlayer.live') }}
        </span>
        <div class="lin-video-player-controls-right">
          <player-definition></player-definition>
          <player-speed v-if="!live"></player-speed>
          <player-fullscreen
            @browser-fullscreen="onBrowserFullscreen"
            @web-fullscreen="onWebFullscreen"
          ></player-fullscreen>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {secondToTime} from '@lin-view-ui/utils'
import {LocaleMixin} from '@lin-view-ui/mixins'
import PlayerSpeed from './video-player-speed.vue';
import PlayerDefinition from './video-player-definition.vue';

import PlayerProcess from '@lin-view-ui/player-process'
import PlayerVolume from '@lin-view-ui/player-volume'
import PlayerFullscreen from '@lin-view-ui/player-fullscreen'

export default {
  name: 'LinVideoPlayerControls',
  mixins: [LocaleMixin],
  filters: {
    // 格式化时间
    secondToTime
  },
  components: {
    PlayerProcess,
    PlayerFullscreen,
    PlayerSpeed,
    PlayerVolume,
    PlayerDefinition
  },
  inject: {
    videoPlayer: {
      default: null
    }
  },
  props: {
    // 是否正在播放
    isPlaying: {
      type: Boolean,
      default: false
    },
    // 当前时间
    currentTime: {
      type: Number,
      default: 0
    },
    // 总时间
    totalTime: {
      type: Number,
      default: 0
    },
    // 是否为直播
    live: {
      type: Boolean,
      default: false
    },
    // 鼠标是否进入容器
    isEnter: {
      type: Boolean,
      default: true
    },
    // 已经缓冲的时长
    preloadTime: {
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
    // 点击播放或者暂停按钮
    onPlayClick() {
      this.$emit('play');
    },
    onPauseClick() {
      this.$emit('pause');
    },
    onSeek(time) {
      this.$emit('seek', time);
    },
    setVolume(volume) {
      this.$emit('setVolume', volume);
    },
    onOffsetTime(offsetTime) {
      this.$emit('offsetTime', offsetTime);
    },
    onBrowserFullscreen() {
      this.$emit('browser-fullscreen');
    },
    onWebFullscreen() {
      this.$emit('web-fullscreen');
    }
  }
};
</script>
