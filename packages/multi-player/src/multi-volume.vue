<template>
  <div class="lin-video-player-volume">
    <span class="lin-video-player-icon-item lin-video-player-icon-volume">
      <i
        class="lin-icon-volume"
        v-if="processWidth !== 0"
        @click="onVolumeClick"
      ></i>
      <i class="lin-icon-mute" v-else @click="onMuteClick"></i>
    </span>
    <div class="lin-video-player-volume-mask" @click="onMaskClick">
      <div
        class="lin-video-player-volume-process"
        ref="videoPlayerVolumeProcess"
      >
        <div
          class="lin-video-player-volume-process-line"
          :style="{ width: `${processWidth}px` }"
        >
          <span
            @mousedown="onBallMouseDown"
            @click.stop
            class="lin-video-player-volume-process-ball"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LinMultiVolume',
  props: {
    volume: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      // 音量长度
      processWidth: 0
    };
  },
  mounted() {
    // 旧的音量
    this.oldVolume = 0;
    // 鼠标按下标志位
    this.mousedown = false;
    // 进度条容器
    this.videoPlayerVolumeProcess = this.$refs.videoPlayerVolumeProcess;
    this.initProcessWidth();
  },
  methods: {
    // 设置音量进度条长度
    setProcessWidth(volume) {
      const clientWidth = this.videoPlayerVolumeProcess.clientWidth || 0;
      this.processWidth = clientWidth * volume;
    },
    // 点击音量那个小喇叭
    onVolumeClick() {
      // 记录旧的音量值长度，当再次点击静音那个图标时，回复原有的音量
      this.oldVolume = this.processWidth;
      // 静音的时候长度为0
      // this.processWidth = 0;
      this.setVolume(0);
    },
    // 点击静音那个小喇叭
    onMuteClick() {
      // this.processWidth = this.oldVolume;
      this.setVolume(this.oldVolume);
    },
    // 初始化音量长度
    initProcessWidth() {
      const clientWidth = this.videoPlayerVolumeProcess.clientWidth || 0;
      const processWidth = this.volume * clientWidth;
      this.oldVolume = processWidth;
      this.processWidth = processWidth;
    },
    // 点击进度条
    onMaskClick(event) {
      const clientWidth = this.videoPlayerVolumeProcess.clientWidth || 0;
      // 点击位置
      let offsetX = event.offsetX || 0;
      offsetX = offsetX < 0 ? 0 : offsetX;
      offsetX = offsetX > clientWidth ? clientWidth : offsetX;
      // this.processWidth = offsetX;
      // 设置音量
      this.setVolume(offsetX);
    },
    // 在圆球哪里，鼠标按下
    onBallMouseDown() {
      // 鼠标按下标志位
      this.mousedown = true;
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
    },
    // 鼠标移动
    onMouseMove(e) {
      if (this.mousedown) {
        // 计算移动距离
        const outLineX = this.videoPlayerVolumeProcess.getBoundingClientRect()
          .x;
        const outLineWidth = this.videoPlayerVolumeProcess.getBoundingClientRect()
          .width;
        let offsetX = e.pageX - outLineX;
        // 临界值处理
        if (offsetX <= 0) {
          offsetX = 0;
        } else if (offsetX > outLineWidth) {
          offsetX = outLineWidth;
        }
        this.processWidth = offsetX;
      }
    },
    // 鼠标抬起
    onMouseUp(e) {
      this.onMouseMove(e);
      // 设置音量
      this.setVolume(this.processWidth);
      // 重置标志位
      this.mousedown = false;
      window.removeEventListener('mouseup', this.onMouseUp);
      window.removeEventListener('mousemove', this.onMouseMove);
    },
    // 设置音量
    setVolume(processWidth) {
      const clientWidth = this.videoPlayerVolumeProcess.clientWidth || 0;
      let volume = 0;
      if (clientWidth) {
        // 算出音量百分比
        volume = processWidth / clientWidth;
      }
      // 设置音量
      this.$emit('setVolume', volume);
    }
  },
  watch: {
    volume(newVal) {
      this.setProcessWidth(newVal);
    }
  },
  beforeDestroy() {
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('mousemove', this.onMouseMove);
    this.videoPlayerVolumeProcess = null;
  }
};
</script>
