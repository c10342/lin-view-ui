<template>
  <div class="lin-hls-player-controls">
    <div class="lin-hls-player-controls-mask"></div>
    <div class="lin-hls-player-controls-group">
      <div class="lin-hls-player-process-box">
        <player-process></player-process>
      </div>
      <span class="lin-hls-player-icon-item" @click="onPlayBtnClick">
        <i class="lin-icon-play" v-if="!isPlaying"></i>
        <i class="lin-icon-pause" v-else></i>
      </span>
      <span class="lin-hls-player-icon-item lin-hls-player-icon-volume">
        <i class="lin-icon-volume"></i>
      </span>
      <span class="lin-hls-player-time">{{currentTime|secondToTime}}/{{totalTime|secondToTime}}</span>
      <div class="lin-hls-player-controls-right">
        <player-speed></player-speed>
        <player-fullscreen></player-fullscreen>
      </div>
    </div>
  </div>
</template>

<script>
import PlayerProcess from "./hls-player-process";
import PlayerFullscreen from "./hls-player-fullscreen";
import PlayerSpeed from "./hls-player-speed";
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

<style lang="scss">
$controls-height: 40px;
.lin-hls-player-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.lin-hls-player-controls-group {
  position: relative;
  width: 100%;
  height: $controls-height;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
}
.lin-hls-player-controls-mask {
  position: absolute;
  bottom: 0;
  left: 0;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==)
    repeat-x bottom;
  height: 98px;
  width: 100%;
}

.lin-hls-player-icon-item {
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  vertical-align: top;
  > i {
    color: #ffffff;
    font-size: 30px;
  }
}

.lin-hls-player-icon-volume {
  margin-left: 15px;
  > i {
    font-size: 20px;
  }
}

.lin-hls-player-time {
  margin-left: 15px;
  font-size: 12px;
  color: #ffffff;
  user-select: none;
}

.lin-hls-player-process-box {
  position: absolute;
  top: -8px;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
}

.lin-hls-player-controls-right {
  position: absolute;
  right: 20px;
  top: 0;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>