<template>
  <div class="lin-video-player-volume">
    <span class="lin-video-player-icon-item lin-video-player-icon-volume">
      <i class="lin-icon-volume" v-if="processWidth!==0" @click="onVolumeClick"></i>
      <i class="lin-icon-mute" v-else @click="onMuteClick"></i>
    </span>
    <div class="lin-video-player-volume-mask" @click="onMaskClick">
      <div class="lin-video-player-volume-process" ref="videoPlayerVolumeProcess">
        <div class="lin-video-player-volume-process-line" :style="{'width':`${processWidth}px`}">
          <span @mousedown="onBallMouseDown" @click.stop class="lin-video-player-volume-process-ball"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LinVideoPlayerVolume",
  data() {
    return {
      processWidth: 0,
    };
  },
  inject: {
    videoPlayer: {
      default: null,
    },
  },
  computed: {
    video() {
      if (this.videoPlayer) {
        return this.videoPlayer.video;
      }
      return null;
    },
  },
  mounted() {
    this.oldVolume = 0;
    this.mousedown = false;
    this.videoPlayerVolumeProcess = this.$refs.videoPlayerVolumeProcess;
    this.initProcessWidth();
    this.$on('onvolumechange',this.setProcessWidth)
  },
  methods: {
    setProcessWidth(volume){
      const clientWidth = this.videoPlayerVolumeProcess.clientWidth || 0;
      this.processWidth = clientWidth*volume
    },
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
          const clientWidth = this.videoPlayerVolumeProcess.clientWidth || 0;
          const processWidth = this.video.volume * clientWidth;
          this.processWidth = processWidth;
          this.oldVolume = processWidth;
        }
      });
    },
    onMaskClick(event) {
      const clientWidth = this.videoPlayerVolumeProcess.clientWidth || 0;
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
        let outLineX = this.videoPlayerVolumeProcess.getBoundingClientRect().x;
        let outLineWidth = this.videoPlayerVolumeProcess.getBoundingClientRect()
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
      const clientWidth = this.videoPlayerVolumeProcess.clientWidth || 0;
      let volume = 0;
      if (clientWidth) {
        volume = this.processWidth / clientWidth;
      }
      this.videoPlayer?.setVolume(volume);
    },
  },
  beforeDestroy() {
    window.removeEventListener("mouseup", this.onMouseUp);
    window.removeEventListener("mousemove", this.onMouseMove);
    this.videoPlayerVolumeProcess = null;
    this.$off('onvolumechange',this.setProcessWidth)
  },
};
</script>

