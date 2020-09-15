<template>
  <transition name="lin-hls-player-fade">
    <div class="lin-hls-player-controls" v-if="isEnter || !isPlaying">
      <div class="lin-hls-player-controls-mask"></div>
      <div class="lin-hls-player-controls-group">
        <div class="lin-hls-player-process-box" v-if="!live">
          <player-process></player-process>
        </div>
        <span class="lin-hls-player-icon-item" @click="onPlayBtnClick">
          <i class="lin-icon-play" v-if="!isPlaying"></i>
          <i class="lin-icon-pause" v-else></i>
        </span>
        <player-volume></player-volume>
        <span
          class="lin-hls-player-time"
          v-if="!live"
        >{{currentTime|secondToTime}}/{{totalTime|secondToTime}}</span>
        <span class="lin-hls-player-live-tip" v-if="live">
          <i></i>
          直播
        </span>
        <div class="lin-hls-player-controls-right">
          <player-definition></player-definition>
          <player-speed v-if="!live"></player-speed>
          <player-fullscreen></player-fullscreen>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import PlayerProcess from "./hls-player-process";
import PlayerFullscreen from "./hls-player-fullscreen";
import PlayerSpeed from "./hls-player-speed";
import PlayerVolume from "./hls-player-volume";
import PlayerDefinition from "./hls-player-definition";
import secondToTime from "src/utils/secondToTime.js";
export default {
  name: "LinHlsPlayerControls",
  filters: {
    secondToTime,
  },
  components: {
    PlayerProcess,
    PlayerFullscreen,
    PlayerSpeed,
    PlayerVolume,
    PlayerDefinition,
  },
  inject: {
    hlsPlayer: {
      default: null,
    },
  },
  computed: {
    isPlaying() {
      if (this.hlsPlayer) {
        return this.hlsPlayer.isPlaying;
      }
      return false;
    },
    video() {
      if (this.hlsPlayer) {
        return this.hlsPlayer.video;
      }
      return null;
    },
    currentTime() {
      if (this.hlsPlayer) {
        return this.hlsPlayer.currentTime;
      }
      return 0;
    },
    totalTime() {
      if (this.hlsPlayer) {
        return this.hlsPlayer.totalTime;
      }
      return 0;
    },
    live() {
      if (this.hlsPlayer) {
        return this.hlsPlayer.live;
      }
      return 0;
    },
    isEnter() {
      if (this.hlsPlayer) {
        return this.hlsPlayer.isEnter;
      }
      return false;
    },
  },
  methods: {
    onPlayBtnClick() {
      if (this.hlsPlayer) {
        this.hlsPlayer.switchPlayingStatus();
      }
    },
  },
  beforeDestroy() {
    this.hlsPlayer.$off("playingStatus", this.onPlayingStatus);
  },
};
</script>

