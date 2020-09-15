<template>
  <div
    class="lin-hls-player-process-mask"
    @click="onMaskClick"
    @mousemove="onMaskMouseMove"
    @mouseleave="onMaskMouseLeave"
  >
    <transition name="lin-hls-player-fade">
      <span
        ref="processTime"
        v-show="isEnterMask"
        class="lin-hls-player-process-time"
        :style="{'left':maskLeft}"
      >{{maskCurrentTime|secondToTime}}</span>
    </transition>
    <div class="lin-hls-player-process" ref="hlsPlayerProcess">
      <div
        class="lin-hls-player-process-loaded"
        :style="{'width':loadedWidth,'transition-duration':(mousedown?'0ms':'300ms')}"
      ></div>
      <div
        class="lin-hls-player-process-played"
        :style="{'width':currentPlayedWidth,'transition-duration':(mousedown?'0ms':'300ms')}"
      >
        <transition name="lin-hls-player-ball">
          <span
            v-show="isEnterMask"
            class="lin-hls-player-process-ball"
            ref="processBall"
            @mousedown="onBallMouseDown"
            @click.stop
          ></span>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import secondToTime from "src/utils/secondToTime.js";
export default {
  name: "LinHlsPlayerProcess",
  filters: {
    secondToTime,
  },
  inject: {
    hlsPlayer: {
      default: null,
    },
  },
  data() {
    return {
      mousedown: false,
      mousedownWidth: 0,
      maskCurrentTime: 0,
      maskLeft: 0,
      isEnterMask: false,
    };
  },
  mounted() {
    this.processBall = this.$refs.processBall;
    this.hlsPlayerProcess = this.$refs.hlsPlayerProcess;
    this.processTime = this.$refs.processTime;
  },
  computed: {
    currentPlayedWidth() {
      if (this.mousedown) {
        return `${this.mousedownWidth}px`;
      } else {
        return this.playedWidth;
      }
    },
    playedWidth() {
      if (this.totalTime === 0) {
        return 0;
      }
      let percent = this.currentTime / this.totalTime;
      percent = percent > 1 ? 1 : percent;
      return `${percent * 100}%`;
    },
    loadedWidth() {
      if (this.totalTime === 0) {
        return 0;
      }
      let percent = this.preloadTime / this.totalTime;
      percent = percent > 1 ? 1 : percent;
      return `${percent * 100}%`;
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
    preloadTime() {
      if (this.hlsPlayer) {
        return this.hlsPlayer.preloadTime;
      }
      return 0;
    },
  },
  methods: {
    onMaskMouseLeave() {
      this.isEnterMask = false;
    },
    onMaskMouseMove(e) {
      this.isEnterMask = true;
      const outLineX = this.hlsPlayerProcess.getBoundingClientRect().x;
      const outLineWidth = this.hlsPlayerProcess.getBoundingClientRect().width;
      const processTimeWidth = this.processTime.clientWidth;
      let offsetX = e.pageX - outLineX;
      if (offsetX <= 0) {
        offsetX = 0;
      } else if (offsetX > outLineWidth) {
        offsetX = outLineWidth;
      }
      this.maskLeft = `${offsetX - processTimeWidth / 2}px`;
      if (outLineWidth) {
        this.maskCurrentTime = this.totalTime * (offsetX / outLineWidth);
      }
      // console.log(this.totalTime,);
    },
    onBallMouseDown(event) {
      this.mousedownWidth = this.playedWidth;
      this.mousedown = true;
      window.addEventListener("mousemove", this.onMouseMove);
      window.addEventListener("mouseup", this.onMouseUp);
    },
    // 鼠标移动
    onMouseMove(e) {
      // 实现拖拽移动事件
      if (this.mousedown) {
        let outLineX = this.hlsPlayerProcess.getBoundingClientRect().x;
        let outLineWidth = this.hlsPlayerProcess.getBoundingClientRect().width;
        let offsetX = e.pageX - outLineX;
        if (offsetX <= 0) {
          offsetX = 0;
        } else if (offsetX > outLineWidth) {
          offsetX = outLineWidth;
        }
        this.mousedownWidth = offsetX;
      }
    },
    onMouseUp(e) {
      this.onMouseMove(e);
      const clientWidth = this.hlsPlayerProcess.clientWidth || 0;
      let percent = 0;
      if (clientWidth) {
        percent = this.mousedownWidth / clientWidth;
      }
      this.seekByPercent(percent);
      this.mousedown = false;
      window.removeEventListener("mouseup", this.onMouseUp);
      window.removeEventListener("mousemove", this.onMouseMove);
    },
    onMaskClick(event) {
      const offsetX = event.offsetX || 0;
      const clientWidth = event.currentTarget.clientWidth || 0;
      let percent = 0;
      if (clientWidth) {
        percent = offsetX / clientWidth;
      }
      this.seekByPercent(percent);
    },
    seekByPercent(percent) {
      percent = percent > 1 ? 1 : percent;
      const time = this.totalTime * percent;
      const offsetTime = time - this.currentTime;
      this.hlsPlayer?.seek(time);
      this.setTip(offsetTime);
    },
    setTip(offsetTime) {
      if (offsetTime < 0) {
        this.hlsPlayer?.setTip(`快退 ${Math.round(-offsetTime)} 秒`);
      } else {
        this.hlsPlayer?.setTip(`快进 ${Math.round(offsetTime)} 秒`);
      }
    },
    destroyProcess() {
      this.processBall = null;
      this.hlsPlayerProcess = null;
      this.processTime = null;
    },
  },
  beforeDestroy() {
    window.removeEventListener("mouseup", this.onMouseUp);
    window.removeEventListener("mousemove", this.onMouseMove);
    this.destroyProcess();
  },
};
</script>

