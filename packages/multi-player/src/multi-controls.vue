<template>
  <transition name="lin-video-player-fade">
    <div
      class="lin-video-player-controls lin-multi-controls"
      v-show="isEnter || !isPlaying"
    >
      <div class="lin-video-player-controls-mask"></div>
      <div class="lin-video-player-controls-group">
        <div class="lin-video-player-process-box" v-if="!live">
          <lin-player-process
            @seek="onSeek"
            :totalTime="totalTime"
            :currentTime="currentTime"
          />
        </div>
        <span class="lin-video-player-icon-item">
          <i v-if="!isPlaying" class="lin-icon-play" @click="onPlayClick"></i>
          <i v-else class="lin-icon-pause" @click="onPauseClick"></i>
        </span>
        <lin-player-volume :volume="volume" @setVolume="setVolume" />
        <span class="lin-video-player-time" v-if="!live"
          >{{ currentTime | secondToTime }}/{{ totalTime | secondToTime }}</span
        >
        <span class="lin-video-player-live-tip" v-if="live">
          <i></i>
          {{ t("LinViewUI.VideoPlayer.live") }}
        </span>
      </div>
      <div class="lin-video-player-controls-right">
        <lin-player-fullscreen
          @browser-fullscreen="$emit('browser-fullscreen')"
          @web-fullscreen="$emit('web-fullscreen')"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import { secondToTime } from "@src/utils";
import { LocaleMixin } from "@src/mixins";
import PlayerProcess from "@packages/player-process";
import PlayerFullscreen from "@packages/player-fullscreen";
import PlayerVolume from "@packages/player-volume";
export default {
  name: "LinMultiControls",
  mixins: [LocaleMixin],
  components: {
    [PlayerVolume.name]: PlayerVolume,
    [PlayerFullscreen.name]: PlayerFullscreen,
    [PlayerProcess.name]: PlayerProcess
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
    },
    live: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    onPlayClick() {
      this.$emit("play");
    },
    onPauseClick() {
      this.$emit("pause");
    },
    onSeek(data) {
      this.$emit("seek", data);
    },
    setVolume(volume) {
      this.$emit("setVolume", volume);
    }
  }
};
</script>
