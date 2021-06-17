<template>
  <div
    class="lin-player-process-mask"
    @click="onMaskClick"
    @mousemove="onMaskMouseMove"
    @mouseleave="onMaskMouseLeave"
  >
    <transition name="lin-player-process-fade">
      <span
        ref="processTime"
        v-show="isEnterMask"
        class="lin-player-process-time"
        :style="{ left: maskLeft }"
        >{{ maskCurrentTime | secondToTime }}</span
      >
    </transition>
    <div class="lin-player-process" ref="playerProcess">
      <div
        class="lin-player-process-loaded"
        :style="{
          width: loadedWidth,
          'transition-duration': mousedown ? '0ms' : '300ms'
        }"
      ></div>
      <div
        class="lin-player-process-played"
        :style="{
          width: currentPlayedWidth,
          'transition-duration': mousedown ? '0ms' : '300ms'
        }"
      >
        <transition name="lin-player-process-ball">
          <span
            v-show="isEnterMask"
            class="lin-player-process-ball"
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
import {secondToTime} from '@lin-view-ui/utils'
import {LocaleMixin} from '@lin-view-ui/mixins'

export default {
  name: 'LinPlayerProcess',
  mixins: [LocaleMixin],
  filters: {
    secondToTime
  },
  props: {
    // 总时长
    totalTime: {
      type: Number,
      default: 0
    },
    // 当前时间
    currentTime: {
      type: Number,
      default: 0
    },
    // 已经缓冲的时长
    preloadTime: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 鼠标是否按下
      mousedown: false,
      // 鼠标按下对应左边的距离，也就是距离左边的长度
      mousedownWidth: 0,
      // 鼠标悬浮在进度条上面那个点对应的视频时间点
      maskCurrentTime: 0,
      // 鼠标悬浮在进度条上面的提示距离左边的距离
      maskLeft: 0,
      // 鼠标是否进入进度条容器
      isEnterMask: false
    };
  },
  mounted() {
    // 进度条上面的小球
    this.processBall = this.$refs.processBall;
    // 进度条的内容容器
    this.playerProcess = this.$refs.playerProcess;
    // 进度条提示的容器
    this.processTime = this.$refs.processTime;
  },
  computed: {
    // 当前已经播放的进度，就是播放的进度对应多长
    currentPlayedWidth() {
      if (this.mousedown) {
        // 鼠标在拖拽的情况
        return `${this.mousedownWidth}px`;
      }
      return this.playedWidth;
    },
    // 已经播放了的长度
    playedWidth() {
      if (this.totalTime === 0) {
        return 0;
      }
      let percent = this.currentTime / this.totalTime;
      percent = percent > 1 ? 1 : percent;
      return `${percent * 100}%`;
    },
    // 已经缓冲的进度（长度）
    loadedWidth() {
      if (this.totalTime === 0) {
        return 0;
      }
      let percent = this.preloadTime / this.totalTime;
      percent = percent > 1 ? 1 : percent;
      return `${percent * 100}%`;
    }
  },
  methods: {
    onMaskMouseLeave() {
      // 鼠标离开组件
      this.isEnterMask = false;
    },
    onMaskMouseMove(e) {
      // 鼠标在组件内移动
      this.isEnterMask = true;
      // 进度条距离屏幕左边距离
      const outLineX = this.playerProcess.getBoundingClientRect().x;
      // 进度条长度
      const outLineWidth = this.playerProcess.getBoundingClientRect().width;
      const processTimeWidth = this.processTime.clientWidth;
      // 计算在进度条中移动了多少
      let offsetX = e.pageX - outLineX;
      // 处理临界值
      if (offsetX <= 0) {
        offsetX = 0;
      } else if (offsetX > outLineWidth) {
        offsetX = outLineWidth;
      }
      // 计算那个鼠标悬浮在进度条上面显示的时间提示，距离左边的距离
      this.maskLeft = `${offsetX - processTimeWidth / 2}px`;
      if (outLineWidth) {
        // 计算鼠标所在的时间点
        this.maskCurrentTime = this.totalTime * (offsetX / outLineWidth);
      }
    },
    // 鼠标按下那个圆球
    onBallMouseDown() {
      // 记录圆球所在的位置的初始值
      this.mousedownWidth = this.playedWidth;
      // 鼠标按下标志位
      this.mousedown = true;
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
    },
    // 鼠标移动
    onMouseMove(e) {
      // 实现拖拽移动事件
      if (this.mousedown) {
        const outLineX = this.playerProcess.getBoundingClientRect().x;
        const outLineWidth = this.playerProcess.getBoundingClientRect().width;
        // 计算移动了多少
        let offsetX = e.pageX - outLineX;
        if (offsetX <= 0) {
          offsetX = 0;
        } else if (offsetX > outLineWidth) {
          offsetX = outLineWidth;
        }
        this.mousedownWidth = offsetX;
      }
    },
    // 鼠标抬起
    onMouseUp(e) {
      this.onMouseMove(e);
      // 进度条总长度
      const clientWidth = this.playerProcess.clientWidth || 0;
      let percent = 0;
      if (clientWidth) {
        // 计算出拖拽到哪里
        percent = this.mousedownWidth / clientWidth;
      }
      // 跳转到对应时间点
      this.seekByPercent(percent);
      // 重置标志位
      this.mousedown = false;
      window.removeEventListener('mouseup', this.onMouseUp);
      window.removeEventListener('mousemove', this.onMouseMove);
    },
    // 点击进度条
    onMaskClick(event) {
      // 点击的位置距离进度条左边位置的距离
      const offsetX = event.offsetX || 0;
      const clientWidth = event.currentTarget.clientWidth || 0;
      let percent = 0;
      if (clientWidth) {
        // 计算百分比
        percent = offsetX / clientWidth;
      }
      // 跳转时间
      this.seekByPercent(percent);
    },
    // 根据百分比跳转时间点
    seekByPercent(percent) {
      percent = percent > 1 ? 1 : percent;
      const time = this.totalTime * percent;
      // 计算前进或者后退了多少秒
      const offsetTime = time - this.currentTime;
      this.$emit('seek', time);
      // 左下角显示提示
      this.setTip(offsetTime);
    },
    // 前进或者后退了多少秒
    setTip(offsetTime) {
      this.$emit('offsetTime', offsetTime);
    },
    destroyProcess() {
      this.processBall = null;
      this.playerProcess = null;
      this.processTime = null;
    }
  },
  beforeDestroy() {
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('mousemove', this.onMouseMove);
    this.destroyProcess();
  }
};
</script>
