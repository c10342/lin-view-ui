<template>
  <div class="lin-multi-player" ref="container">
    <div
      :class="[
        'lin-multi-player-frame',
        { 'lin-multi-player-move': screen === 1 }
      ]"
      :style="formatStyle(frameStyle1)"
      @mousedown="onMainMousedown('frameStyle1', $event)"
    ></div>
    <div class="lin-multi-player-screen" :style="formatStyle(videoStyle1)">
      <div
        v-show="videos[0]"
        class="lin-multi-player-container"
        id="screen1"
      ></div>
      <lin-no-screen v-show="!videos[0]" />
    </div>
    <div
      :class="[
        'lin-multi-player-frame',
        { 'lin-multi-player-move': screen === 2 }
      ]"
      :style="formatStyle(frameStyle2)"
      @mousedown="onMainMousedown('frameStyle2', $event)"
    ></div>
    <div class="lin-multi-player-screen" :style="formatStyle(videoStyle2)">
      <div
        v-show="videos[1]"
        class="lin-multi-player-container"
        id="screen2"
      ></div>
      <lin-no-screen v-show="!videos[1]" />
    </div>
    <div
      :class="[
        'lin-multi-player-frame',
        { 'lin-multi-player-move': screen === 3 }
      ]"
      :style="formatStyle(frameStyle3)"
      @mousedown="onMainMousedown('frameStyle3', $event)"
    ></div>
    <div class="lin-multi-player-screen" :style="formatStyle(videoStyle3)">
      <div
        v-show="videos[2]"
        class="lin-multi-player-container"
        id="screen3"
      ></div>
      <lin-no-screen v-show="!videos[2]" />
    </div>
    <lin-multi-controls
      :totalTime="totalTime"
      :currentTime="currentTime"
      :isPlaying="isPlaying"
      :volume="volume"
      @play="onpPlayClick"
      @pause="onPauseClick"
      @seek="onSeek"
      @setVolume="setVolume"
    />
  </div>
</template>

<script>
import VideoPlayer from 'packages/video-player/index.js';
import NoScreen from './no-screen.vue';
import MultiControls from './multi-controls.vue';
export default {
  name: 'linMultiPlayer',
  components: {
    [NoScreen.name]: NoScreen,
    [MultiControls.name]: MultiControls
  },
  props: {
    videos: {
      type: Array,
      default: () => [
        'http://192.168.4.150/upload/video//570/1/master.m3u8',
        'http://192.168.4.150/upload/video//570/2/master.m3u8',
        'http://192.168.4.150/upload/video//570/3/master.m3u8'
      ]
    },
    type: {
      type: String,
      default: 'hls'
    }
  },
  data() {
    return {
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
      volume: 1
    };
  },
  mounted() {
    // 是否移动了
    this.isMove = false;
    // 实际的画面位置，屏幕！==画面,下标索引是屏幕，值是画面，屏幕是不变的，变得是画面
    this.sortArr = [1, 2, 3];
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
    this.initData();
    // 存储player实例
    this.playerList = [];
  },
  methods: {
    async initData() {
      await this.$nextTick();
      // 获取容器相关信息
      const { scrollHeight, scrollWidth } = this.$refs.container;
      const clientRect = this.$refs.container.getBoundingClientRect();
      this.container.height = scrollHeight;
      this.container.width = scrollWidth;
      this.container.left = clientRect.left;
      this.container.top = clientRect.top;
      const width = scrollWidth / 3;
      const height = scrollHeight / 2;
      const leftWidth = width * 2;
      const rightWidth = width * 1;
      const topHeight = height;
      // 初始化每个屏幕和画面的大小位置信息
      this.initStyle('frameStyle1', leftWidth, scrollHeight, 0, 0);
      this.initStyle('frameStyle2', rightWidth, topHeight, leftWidth, 0);
      this.initStyle(
        'frameStyle3',
        rightWidth,
        topHeight,
        leftWidth,
        topHeight
      );
      this.initStyle('originalStyle1', leftWidth, scrollHeight, 0, 0);
      this.initStyle('originalStyle2', rightWidth, topHeight, leftWidth, 0);
      this.initStyle(
        'originalStyle3',
        rightWidth,
        topHeight,
        leftWidth,
        topHeight
      );
      this.initStyle('videoStyle1', leftWidth, scrollHeight, 0, 0);
      this.initStyle('videoStyle2', rightWidth, topHeight, leftWidth, 0);
      this.initStyle(
        'videoStyle3',
        rightWidth,
        topHeight,
        leftWidth,
        topHeight
      );
      this.initPlayer();
    },
    initStyle(key, width, height, left, top) {
      this[key] = { width, height, left, top };
    },
    onMainMousedown(key, event) {
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
      document.addEventListener('mousemove', this.onMousemove);
      document.addEventListener('mouseup', this.onMouseup);
    },
    onMouseup(event) {
      if (this.isMove) {
        const { x, y } = event;
        const left = x - this.container.left;
        const top = y - this.container.top;
        // 鼠标最终移动到那个屏幕
        const result = this.getDirection(left, top);
        // 获取该屏幕的对应的画面
        const screen = this.getScreen(result);
        if (screen === -1 || this.screen === -1) {
          return;
        }
        // 获取屏幕的信息
        const or1 = this[`originalStyle${result}`];
        const or2 = this[`originalStyle${this.index}`];
        // 交换2个画面的大小和位置信息
        this.initStyle(
          `frameStyle${this.screen}`,
          or1.width,
          or1.height,
          or1.left,
          or1.top
        );
        this.initStyle(
          `frameStyle${screen}`,
          or2.width,
          or2.height,
          or2.left,
          or2.top
        );
        this.initStyle(
          `videoStyle${this.screen}`,
          or1.width,
          or1.height,
          or1.left,
          or1.top
        );
        this.initStyle(
          `videoStyle${screen}`,
          or2.width,
          or2.height,
          or2.left,
          or2.top
        );
        // 交换屏幕画面
        this.exchangeScreen(this.index, result);
        this.screen = -1;
      } else {
        this.toggle();
      }
      this.isMove = false;

      document.removeEventListener('mousemove', this.onMousemove);
      document.removeEventListener('mouseup', this.onMouseup);
    },
    onMousemove(event) {
      this.isMove = true;
      const { x, y } = event;
      // 根据屏幕获取移动的是哪个画面
      const index = this.getScreen(this.index);
      this.screen = index;
      const { width, height, top, left } = this[`frameStyle${index}`];
      const offsetX = x - this.startPosition.x;
      const offsetY = y - this.startPosition.y;
      const pLeft = left + offsetX;
      const pTop = top + offsetY;
      this.initStyle(`frameStyle${index}`, width, height, pLeft, pTop);
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
    formatStyle(styleObj) {
      const obj = {};
      Object.keys(styleObj).forEach((key) => {
        obj[key] = `${styleObj[key]}px`;
      });
      return obj;
    },
    // 获取屏幕对应的是哪个画面
    getScreen(index) {
      index = index - 1;
      return this.sortArr[index];
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
    initPlayer() {
      for (let i = 0; i < this.videos.length; i++) {
        const videoUrl = this.videos[i];
        const player = new VideoPlayer({
          el: document.getElementById(`screen${i + 1}`),
          type: this.type,
          videoList: [
            {
              label: '标清',
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
    // 初始化事件监听
    initListener() {
      const player = this.playerList[0];
      if (player) {
        player.on('timeupdate', this.onTimeupdate);
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
    onPause() {
      this.isPlaying = false;
    },
    toggle() {
      this.handelVideo((player) => {
        player.toggle();
      });
    },
    play() {
      this.handelVideo((player) => {
        player.play();
      });
    },
    pause() {
      this.handelVideo((player) => {
        player.pause();
      });
    },
    seek(time) {
      this.handelVideo((player) => {
        player.seek(time);
      });
    },
    setVolume(volume) {
      this.handelVideo((player) => {
        player.volume(volume);
      });
    },
    handelVideo(callback) {
      for (let i = 0; i < this.playerList.length; i++) {
        const player = this.playerList[i];
        if (player && typeof callback === 'function') {
          callback(player);
        }
      }
    }
  }
};
</script>
