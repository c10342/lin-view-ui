<template>
  <div
    :class="['lin-multi-player', { 'lin-multi-player-fix': isWebFullscreen }]"
    ref="container"
    @mouseleave="onMouseLeave"
    @mouseenter="onMouseEnter"
  >
    <div v-show="isSingleFullscreen ? singleFullscreenId === 1 : true">
      <div
        :class="[
          'lin-multi-player-frame',
          { 'lin-multi-player-move': screen === 1 }
        ]"
        :style="formatStyle(frameStyle1)"
        @mousedown="onMainMousedown('frameStyle1', $event)"
      >
        <span
          @mousedown.stop
          @click.stop="onSingleFullscreenClick(1)"
          class="lin-multi-player-single-full lin-icon-full-screen"
        ></span>
      </div>
      <div class="lin-multi-player-screen" :style="formatStyle(videoStyle1)">
        <div
          v-show="videoList[0]"
          class="lin-multi-player-container"
          :id="`${randomId}-1`"
        ></div>
        <lin-no-screen v-show="!videoList[0]" />
      </div>
    </div>
    <div v-show="isSingleFullscreen ? singleFullscreenId === 2 : true">
      <div
        :class="[
          'lin-multi-player-frame',
          { 'lin-multi-player-move': screen === 2 }
        ]"
        :style="formatStyle(frameStyle2)"
        @mousedown="onMainMousedown('frameStyle2', $event)"
      >
        <span
          @mousedown.stop
          @click.stop="onSingleFullscreenClick(2)"
          class="lin-multi-player-single-full lin-icon-full-screen"
        ></span>
      </div>
      <div class="lin-multi-player-screen" :style="formatStyle(videoStyle2)">
        <div
          v-show="videoList[1]"
          class="lin-multi-player-container"
          :id="`${randomId}-2`"
        ></div>
        <lin-no-screen v-show="!videoList[1]" />
      </div>
    </div>

    <div v-show="isSingleFullscreen ? singleFullscreenId === 3 : true">
      <div
        :class="[
          'lin-multi-player-frame',
          { 'lin-multi-player-move': screen === 3 }
        ]"
        :style="formatStyle(frameStyle3)"
        @mousedown="onMainMousedown('frameStyle3', $event)"
      >
        <span
          @mousedown.stop
          @click.stop="onSingleFullscreenClick(3)"
          class="lin-multi-player-single-full lin-icon-full-screen"
        ></span>
      </div>
      <div class="lin-multi-player-screen" :style="formatStyle(videoStyle3)">
        <div
          v-show="videoList[2]"
          class="lin-multi-player-container"
          :id="`${randomId}-3`"
        ></div>
        <lin-no-screen v-show="!videoList[2]" />
      </div>
    </div>

    <lin-multi-controls
      :totalTime="totalTime"
      :currentTime="currentTime"
      :isPlaying="isPlaying"
      :volume="volume"
      :isEnter="isEnter"
      :live="live"
      @play="onpPlayClick"
      @pause="onPauseClick"
      @seek="onSeek"
      @setVolume="setVolume"
      @browser-fullscreen="onBrowserFullscreen"
      @web-fullscreen="onWebFullscreen"
    />
  </div>
</template>

<script>
import ResizeObserver from 'resize-observer-polyfill';
import VideoPlayer from 'packages/video-player/index.js';
import NoScreen from './no-screen.vue';
import MultiControls from './multi-controls.vue';
import {
  isBrowserFullscreen,
  isBrowserFullscreenEnabled,
  enterBrowserFullScreen,
  exitBrowserFullscreen
} from 'src/utils/fullscreen.js';
export default {
  name: 'linMultiPlayer',
  components: {
    [NoScreen.name]: NoScreen,
    [MultiControls.name]: MultiControls
  },
  data() {
    return {
      // 画面容器样式
      frameStyle1: {
        height: 0,
        width: 0,
        top: 0,
        left: 0
      },
      frameStyle2: {
        height: 0,
        width: 0,
        top: 0,
        left: 0
      },
      frameStyle3: {
        height: 0,
        width: 0,
        top: 0,
        left: 0
      },
      frameStyle4: {
        height: 0,
        width: 0,
        top: 0,
        left: 0
      },
      // 点击的是那个屏幕
      index: -1,
      // 画面
      screen: -1,
      // 画面样式
      videoStyle1: {
        width: 0,
        top: 0,
        left: 0,
        height: 0
      },
      videoStyle2: {
        width: 0,
        top: 0,
        left: 0,
        height: 0
      },
      videoStyle3: {
        width: 0,
        top: 0,
        left: 0,
        height: 0
      },
      // 是否正在播放
      isPlaying: false,
      // 当前播放时间
      currentTime: 0,
      // 总时长
      totalTime: 0,
      // 音量
      volume: 1,
      // 网页全屏
      isWebFullscreen: false,
      // 鼠标是否进入容器
      isEnter: true,
      // 是否单个画面全屏
      isSingleFullscreen: false,
      // 那个画面全屏
      singleFullscreenId: -1,
      // 自动播放
      autoplay: false,
      // 播放列表
      videoList: [],
      // 视频类型
      type: 'mp4',
      // 是否为直播
      live: false
    };
  },
  computed: {
    randomId() {
      return `multi-screen-${Math.random().toString(16).slice(-9)}`;
    }
  },
  mounted() {
    // 是否移动了
    this.isMove = false;
    // 实际的画面位置，屏幕！==画面,下标索引是屏幕，值是画面，屏幕是不变的，变得是画面
    this.sortArr = [1, 2, 3];
    // 记录movedown点击时间
    this.movedownTime = 0;
    // 每个屏幕的数据信息
    this.originalStyle1 = {
      top: 0,
      left: 0,
      height: 0,
      width: 0
    };
    this.originalStyle2 = {
      top: 0,
      left: 0,
      height: 0,
      width: 0
    };
    this.originalStyle3 = {
      top: 0,
      left: 0,
      height: 0,
      width: 0
    };
    // 容器信息
    this.container = {
      height: 0,
      width: 0,
      left: 0,
      top: 0
    };
    // 鼠标点击的开始位置
    this.startPosition = {
      x: 0,
      y: 0
    };
    // 存储player实例
    this.playerList = [];
    this.observer = null;
    // 是否第一次渲染标志位，防止ResizeObserver第一次执行的时候会执行initData
    this.isFirst = true;
    // 初始化每个屏幕，画面的信息
    this.initData();
    // 初始化播放器
    // this.initPlayer();
    this.initObserver();
  },
  methods: {
    // 监听dom大小变化
    initObserver() {
      // DOM元素大小（宽高）发生变化的时候
      this.observer = new ResizeObserver(() => {
        if (this.isFirst) {
          // 第一次进来渲染
          return;
        }
        // 是否浏览器全屏
        const result = isBrowserFullscreen();
        // 单个画面全屏的时候不走initData，因为initData是针对三个画面的
        // !this.isSingleFullscreen || !result  单个画面全屏
        if (!this.isSingleFullscreen || !result) {
          this.initData();
        }
        if (!result) {
          // 全屏情况下，重置单画面全屏的标志位
          this.isSingleFullscreen = false;
          this.singleFullscreenId = -1;
        }
      });
      // 监听
      this.observer.observe(this.$refs.container);
    },
    // 初始化数据
    async initData() {
      await this.$nextTick();
      // 修改是否第一次进来的标志位
      this.isFirst = false;
      // 获取容器相关信息
      const clientRect = this.$refs.container.getBoundingClientRect();
      // 存储容器信息
      this.container.height = clientRect.height;
      this.container.width = clientRect.width;
      this.container.left = clientRect.left;
      this.container.top = clientRect.top;
      const width = clientRect.width / 3;
      const height = clientRect.height / 2;
      const leftWidth = width * 2;
      const rightWidth = width * 1;
      const topHeight = height;
      // 初始化每个屏幕和画面的大小位置信息
      const frameStyle1 = {
        width: leftWidth,
        height: clientRect.height,
        left: 0,
        top: 0
      };
      const frameStyle2 = {
        width: rightWidth,
        height: topHeight,
        left: leftWidth,
        top: 0
      };
      const frameStyle3 = {
        width: rightWidth,
        height: topHeight,
        left: leftWidth,
        top: topHeight
      };
      const obj1 = {
        frameStyle1,
        frameStyle2,
        frameStyle3
      };
      this.initStyle('originalStyle1', frameStyle1);
      this.initStyle('originalStyle2', frameStyle2);
      this.initStyle('originalStyle3', frameStyle3);
      // 根据屏幕获取画面，因为进入/退出全屏的时候，画面位置已经交换过了，需要根据屏幕获取对应的画面
      const or1 = this.getScreenByFrame(1);
      const or2 = this.getScreenByFrame(2);
      const or3 = this.getScreenByFrame(3);
      this.initStyle('frameStyle1', obj1[`frameStyle${or1}`]);
      this.initStyle('frameStyle2', obj1[`frameStyle${or2}`]);
      this.initStyle('frameStyle3', obj1[`frameStyle${or3}`]);
      this.initStyle('videoStyle1', obj1[`frameStyle${or1}`]);
      this.initStyle('videoStyle2', obj1[`frameStyle${or2}`]);
      this.initStyle('videoStyle3', obj1[`frameStyle${or3}`]);
    },
    initStyle(key, style) {
      this[key] = style;
    },
    // 鼠标在屏幕按下
    onMainMousedown(key, event) {
      // 记录鼠标点击下去的时间
      this.movedownTime = Date.now();
      // 重置鼠标是否在移动的标志位
      this.isMove = false;
      // 根据屏幕位置，获取点击的是那个屏幕
      this.index = this.getDirection(this[key].left + 20, this[key].top + 20);
      if (this.index === -1) {
        return;
      }
      // 点击的初始位置
      this.startPosition = {
        x: event.x,
        y: event.y
      };
      // 监听相关事件,准备拖拽行为
      document.addEventListener('mousemove', this.onMousemove);
      document.addEventListener('mouseup', this.onMouseup);
    },
    // 鼠标在屏幕抬起
    onMouseup(event) {
      const endTime = Date.now();
      // 计算鼠标点击下去到鼠标抬起的时间差，时间差小于500毫秒的可以认为是点击事件
      const offsetTime = endTime - this.movedownTime;
      if (this.isMove && !this.isSingleFullscreen && offsetTime > 500) {
        // 如果是拖拽的情况下抬起,并且当前不是但画面全屏。（但画面全屏没有拖拽）
        const { x, y } = event;
        const left = x - this.container.left;
        const top = y - this.container.top;
        // 鼠标最终移动到那个屏幕
        const result = this.getDirection(left, top);
        // 获取该屏幕的对应的画面
        const screen = this.getFrameByScreen(result);
        if (screen === -1 || this.screen === -1 || result === -1) {
          // 重置移动的画面信息
          const or = this[`originalStyle${this.index}`];
          const index = this.getFrameByScreen(this.index);
          this.initStyle(`frameStyle${index}`, {
            width: or.width,
            height: or.height,
            left: or.left,
            top: or.top
          });
        } else {
          // 获取屏幕的信息
          const or1 = this[`originalStyle${result}`];
          const or2 = this[`originalStyle${this.index}`];
          // 交换2个画面的大小和位置信息
          this.initStyle(`frameStyle${this.screen}`, {
            width: or1.width,
            height: or1.height,
            left: or1.left,
            top: or1.top
          });
          this.initStyle(`frameStyle${screen}`, {
            width: or2.width,
            height: or2.height,
            left: or2.left,
            top: or2.top
          });
          this.initStyle(`videoStyle${this.screen}`, {
            width: or1.width,
            height: or1.height,
            left: or1.left,
            top: or1.top
          });
          this.initStyle(`videoStyle${screen}`, {
            width: or2.width,
            height: or2.height,
            left: or2.left,
            top: or2.top
          });
          // 交换屏幕画面
          this.exchangeScreen(this.index, result);
        }
      } else {
        // 其余情况，当做点击事件
        this.toggle();
      }
      // 重置
      this.screen = -1;
      this.index = -1;
      // 重置鼠标是否移动的标志位
      this.isMove = false;

      this.removeEventListener();
    },
    // 鼠标移动
    onMousemove(event) {
      if (this.isSingleFullscreen) {
        // 单画面全屏的情况下，没有拖拽行为
        return;
      }
      this.isMove = true;
      const { x, y } = event;
      // 根据屏幕获取移动的是哪个画面
      const index = this.getFrameByScreen(this.index);
      // 画面
      this.screen = index;
      const { width, height, top, left } = this[`frameStyle${index}`];
      // 计算位移差
      const offsetX = x - this.startPosition.x;
      const offsetY = y - this.startPosition.y;
      const pLeft = left + offsetX;
      const pTop = top + offsetY;
      // 修改画面相关样式信息
      this.initStyle(`frameStyle${index}`, {
        width,
        height,
        left: pLeft,
        top: pTop
      });
      this.startPosition.x = x;
      this.startPosition.y = y;
    },
    // 根据位置信息获取是那个屏幕
    getDirection(left, top) {
      if (
        left > this.originalStyle2.left &&
        left < this.container.width &&
        top > 0 &&
        top < this.originalStyle3.top
      ) {
        // 右上方
        return 2;
      } else if (
        left > this.originalStyle2.left &&
        left < this.container.width &&
        top > this.originalStyle3.top &&
        top < this.container.height
      ) {
        // 右下方
        return 3;
      } else if (
        left > 0 &&
        left < this.originalStyle2.left &&
        top > 0 &&
        top < this.container.height
      ) {
        // 左边
        return 1;
      }
      return -1;
    },
    // 给样式加个px
    formatStyle(styleObj) {
      const obj = {};
      Object.keys(styleObj).forEach((key) => {
        if (typeof styleObj[key] === 'number') {
          obj[key] = `${styleObj[key]}px`;
        } else {
          obj[key] = styleObj[key];
        }
      });
      return obj;
    },
    // 获取屏幕对应的是哪个画面
    getFrameByScreen(index) {
      index = index - 1;
      return this.sortArr[index];
    },
    // 根据画面获取对应屏幕，也就是获取画面所在的屏幕
    getScreenByFrame(index) {
      const result = this.sortArr.findIndex((i) => i === index);
      return result + 1;
    },
    // 交换2个屏幕的画面
    exchangeScreen(idx1, idx2) {
      idx1 = idx1 - 1;
      idx2 = idx2 - 1;
      const i1 = this.sortArr[idx1];
      const i2 = this.sortArr[idx2];
      this.sortArr[idx1] = i2;
      this.sortArr[idx2] = i1;
    },
    // 初始化播放器
    initPlayer() {
      let len = this.videoList.length;
      len = len > 3 ? 3 : len;
      for (let i = 0; i < len; i++) {
        const videoUrl = this.videoList[i];
        const player = new VideoPlayer({
          el: document.getElementById(`${this.randomId}-${i + 1}`),
          type: this.type,
          autoplay: this.autoplay,
          live: this.live,
          videoList: [
            {
              label: '',
              url: videoUrl
            }
          ]
        });
        this.playerList.push(player);
      }
      this.initListener();
    },
    // 点击播放按钮
    onpPlayClick() {
      this.play();
      this.isPlaying = true;
    },
    // 点击暂停按钮
    onPauseClick() {
      this.pause();
      this.isPlaying = false;
    },
    // 跳转时间
    onSeek(data) {
      this.seek(data);
    },
    // 浏览器全屏
    onBrowserFullscreen() {
      if (this.isWebFullscreen) {
        this.isWebFullscreen = false;
      }
      if (isBrowserFullscreenEnabled()) {
        if (!isBrowserFullscreen()) {
          enterBrowserFullScreen(this.$refs.container);
        } else {
          exitBrowserFullscreen();
        }
      }
    },
    // 网页全屏
    onWebFullscreen() {
      // 需要先退出浏览器全屏
      exitBrowserFullscreen();
      this.isWebFullscreen = !this.isWebFullscreen;
    },
    // 初始化事件监听
    initListener() {
      const player = this.playerList[0];
      if (player) {
        if (!this.live) {
          // 直播不需要监听时间变化
          player.on('timeupdate', this.onTimeupdate);
        }
        player.on('loadedmetadata', this.onLoadedmetadata);
        player.on('volumechange', this.onVolumechange);
        player.on('play', this.onPlay);
        player.on('pause', this.onPause);
      }
    },
    // 时间变化
    onTimeupdate(event) {
      this.currentTime = event.target.currentTime || 0;
    },
    // 加载数据元
    onLoadedmetadata(event) {
      const duration = event.target.duration || 0;
      this.totalTime = duration;
      this.volume = event.target.volume;
    },
    // 音量变化
    onVolumechange(event) {
      this.volume = event.target.volume;
    },
    // 视频播放
    onPlay() {
      this.isPlaying = true;
    },
    // 视频暂停
    onPause() {
      this.isPlaying = false;
    },
    // 切换视频状态
    toggle() {
      this.handelVideo((player) => {
        player.toggle();
      });
    },
    // 播放
    play() {
      this.handelVideo((player) => {
        player.play();
      });
    },
    // 暂停
    pause() {
      this.handelVideo((player) => {
        player.pause();
      });
    },
    // 跳转时间
    seek(time) {
      this.handelVideo((player) => {
        player.seek(time);
      });
    },
    // 设置音量
    setVolume(volume) {
      this.handelVideo((player) => {
        player.volume(volume);
      });
    },
    // 处理video标签
    handelVideo(callback) {
      for (let i = 0; i < this.playerList.length; i++) {
        const player = this.playerList[i];
        if (player && typeof callback === 'function') {
          callback(player);
        }
      }
    },
    // 鼠标离开容器
    onMouseLeave() {
      this.isEnter = false;
    },
    // 鼠标进入容器
    onMouseEnter() {
      this.isEnter = true;
    },
    // 单画面全屏
    onSingleFullscreenClick(index) {
      // 多流最多只有3个画面，需要放置越界
      if (index > 0 && index <= 3) {
        // 修改但画面标志位
        this.isSingleFullscreen = true;
        // 那个画面全屏
        this.singleFullscreenId = index;
        // 申请浏览器全屏
        this.onBrowserFullscreen();
        const style = {
          width: '100%',
          height: '100%',
          left: 0,
          top: 0
        };
        // 修改单个画面样式信息，单画面宽高需要百分百
        this.initStyle(`frameStyle${index}`, style);
        this.initStyle(`videoStyle${index}`, style);
      }
    },
    destoryPlayer() {
      // 销毁相关副作用
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
      // 销毁播放器
      this.handelVideo((player) => {
        player.destory();
      });
    },
    removeEventListener() {
      document.removeEventListener('mousemove', this.onMousemove);
      document.removeEventListener('mouseup', this.onMouseup);
    }
  },
  beforeDestroy() {
    this.destoryPlayer();
    this.removeEventListener();
  }
};
</script>
