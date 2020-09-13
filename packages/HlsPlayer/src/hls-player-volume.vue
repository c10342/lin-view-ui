<template>
  <div class="lin-hls-player-volume">
    <span class="lin-hls-player-icon-item lin-hls-player-icon-volume">
      <i class="lin-icon-volume" v-if="processWidth!==0" @click="onVolumeClick"></i>
      <i class="lin-icon-mute" v-else @click="onMuteClick"></i>
    </span>
    <div class="lin-hls-player-volume-mask" @click="onMaskClick">
      <div class="lin-hls-player-volume-process" ref="hlsPlayerVolumeProcess">
        <div class="lin-hls-player-volume-process-line" :style="{'width':`${processWidth}px`}">
          <span @mousedown="onBallMouseDown" @click.stop class="lin-hls-player-volume-process-ball"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LinHlsPlayerVolume",
  data() {
    return {
      processWidth: 0,
    };
  },
  inject: {
    hlsPlayer: {
      default: null,
    },
  },
  computed: {
    video() {
      if (this.hlsPlayer) {
        return this.hlsPlayer.video;
      }
      return null;
    },
  },
  mounted() {
    this.oldVolume = 0;
    this.mousedown = false;
    this.hlsPlayerVolumeProcess = this.$refs.hlsPlayerVolumeProcess;
    this.initProcessWidth();
  },
  methods: {
    onVolumeClick() {
      this.oldVolume = this.processWidth;
      this.processWidth = 0;
      this.setVolume();
    },
    onMuteClick() {
      this.processWidth = this.oldVolume;
      this.setVolume();
    },
    initProcessWidth() {
      this.$nextTick(() => {
        if (!this.video) {
          this.processWidth = 0;
          this.oldVolume = 0;
        } else {
          const clientWidth = this.hlsPlayerVolumeProcess.clientWidth || 0;
          const processWidth = this.video.volume * clientWidth;
          this.processWidth = processWidth;
          this.oldVolume = processWidth;
        }
      });
    },
    onMaskClick(event) {
      const clientWidth = this.hlsPlayerVolumeProcess.clientWidth || 0;
      let offsetX = event.offsetX || 0;
      offsetX = offsetX < 0 ? 0 : offsetX;
      offsetX = offsetX > clientWidth ? clientWidth : offsetX;
      this.processWidth = offsetX;
      this.setVolume();
    },
    onBallMouseDown() {
      this.mousedown = true;
      window.addEventListener("mousemove", this.onMouseMove);
      window.addEventListener("mouseup", this.onMouseUp);
    },
    onMouseMove(e) {
      if (this.mousedown) {
        let outLineX = this.hlsPlayerVolumeProcess.getBoundingClientRect().x;
        let outLineWidth = this.hlsPlayerVolumeProcess.getBoundingClientRect()
          .width;
        let offsetX = e.pageX - outLineX;
        if (offsetX <= 0) {
          offsetX = 0;
        } else if (offsetX > outLineWidth) {
          offsetX = outLineWidth;
        }
        this.processWidth = offsetX;
      }
    },
    onMouseUp(e) {
      this.onMouseMove(e);
      this.setVolume();
      this.mousedown = false;
      window.removeEventListener("mouseup", this.onMouseUp);
      window.removeEventListener("mousemove", this.onMouseMove);
    },
    setVolume() {
      if (this.video) {
        const clientWidth = this.hlsPlayerVolumeProcess.clientWidth || 0;
        let volume = 0;
        if (clientWidth) {
          volume = this.processWidth / clientWidth;
        }
        volume = volume < 0 ? 0 : volume;
        volume = volume > 1 ? 1 : volume;
        this.video.volume = volume;
        this.hlsPlayer?.setTip(`音量${Math.round(volume * 100)}%`);
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("mouseup", this.onMouseUp);
    window.removeEventListener("mousemove", this.onMouseMove);
  },
};
</script>

<style lang="scss">
.lin-hls-player-volume {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    .lin-hls-player-volume-mask {
      width: 60px;
    }
  }
}

.lin-hls-player-volume-mask {
  padding: 5px 5px;
  margin-left: 5px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  //   width: 0;
  transition: all 400ms;
}
.lin-hls-player-volume-process {
  width: 60px;
  height: 3px;
  background-color: hsla(0, 0%, 100%, 0.2);
  position: relative;
  margin: 3px 0px;
}
.lin-hls-player-volume-process-line {
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  width: 0;
  background-color: rgb(183, 218, 255);
}
.lin-hls-player-volume-process-ball {
  position: absolute;
  right: -4px;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgb(183, 218, 255);
}
</style>