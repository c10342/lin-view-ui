<template>
  <transition name="lin-video-player-fade">
    <div class="lin-video-player-controls" v-if="isEnter || !isPlaying">
      <div class="lin-video-player-controls-mask"></div>
      <div class="lin-video-player-controls-group">
        <div class="lin-video-player-process-box" v-if="!live">
          <player-process></player-process>
        </div>
        <span class="lin-video-player-icon-item" @click="onPlayBtnClick">
          <i class="lin-icon-play" v-if="!isPlaying"></i>
          <i class="lin-icon-pause" v-else></i>
        </span>
        <player-volume></player-volume>
        <span
          class="lin-video-player-time"
          v-if="!live"
        >{{currentTime|secondToTime}}/{{totalTime|secondToTime}}</span>
        <span class="lin-video-player-live-tip" v-if="live">
          <i></i>
          {{t('LinViewUI.VideoPlayer.live')}}
        </span>
        <div class="lin-video-player-controls-right">
          <player-definition></player-definition>
          <player-speed v-if="!live"></player-speed>
          <player-fullscreen></player-fullscreen>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import secondToTime from 'src/utils/secondToTime.js';
import LocaleMixin from 'src/mixins/locale.js';
import PlayerProcess from './video-player-process.vue';
import PlayerFullscreen from './video-player-fullscreen.vue';
import PlayerSpeed from './video-player-speed.vue';
import PlayerVolume from './video-player-volume.vue';
import PlayerDefinition from './video-player-definition.vue';

export default {
  name: 'LinVideoPlayerControls',
  mixins: [LocaleMixin],
  filters: {
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
  computed: {
    isPlaying () {
      if (this.videoPlayer) {
        return this.videoPlayer.isPlaying;
      }
      return false;
    },
    video () {
      if (this.videoPlayer) {
        return this.videoPlayer.video;
      }
      return null;
    },
    currentTime () {
      if (this.videoPlayer) {
        return this.videoPlayer.currentTime;
      }
      return 0;
    },
    totalTime () {
      if (this.videoPlayer) {
        return this.videoPlayer.totalTime;
      }
      return 0;
    },
    live () {
      if (this.videoPlayer) {
        return this.videoPlayer.live;
      }
      return 0;
    },
    isEnter () {
      if (this.videoPlayer) {
        return this.videoPlayer.isEnter;
      }
      return false;
    }
  },
  methods: {
    onPlayBtnClick () {
      if (this.videoPlayer) {
        this.videoPlayer.switchPlayingStatus();
      }
    }
  },
  beforeDestroy () {
    this.videoPlayer.$off('playingStatus', this.onPlayingStatus);
  }
};
</script>
