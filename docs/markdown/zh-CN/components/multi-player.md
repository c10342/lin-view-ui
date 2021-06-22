# MultiPlayer 多流播放器

[[toc]]

## 基础用法

只需要设置 `type`，`el`和`videoList`，即可。`type`可选值有`mp4`，`hls`，`flv`；`el`为 dom 元素，可传入字符选择器或者 dom 对象；`videoList`为数组，每一项是播放地址，目前只支持 3 个画面。

:::demo

```vue
<template>
  <div>
    <div id="multi-container-1" class="player-container"></div>
    <lin-button @click="onSeek">seek</lin-button>
    <lin-button @click="onPlay">play</lin-button>
    <lin-button @click="onPause">pause</lin-button>
    <lin-button @click="onToggle">toggle</lin-button>
    <lin-button @click="setVolume">setVolume</lin-button>
    <lin-button @click="onWebFullscreen">网页全屏</lin-button>
    <lin-button @click="onBrowserFullscreen">浏览器全屏</lin-button>
    <lin-button @click="onSingleFullscreen">单个全屏</lin-button>
  </div>
</template>

<script>
export default {
  mounted() {
    this.initPlayer();
  },
  methods: {
    initPlayer() {
      this.player = new this.$MultiPlayer({
        el: '#multi-container-1',
        type: 'mp4',
        videoList: [
          'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
          'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
          'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4'
        ]
      });
    },
    onSeek() {
      this.player?.seek(10);
    },
    onPlay() {
      this.player?.play();
    },
    onPause() {
      this.player?.pause();
    },
    onToggle() {
      this.player?.toggle();
    },
    setVolume() {
      this.player?.setVolume(0);
    },
    onWebFullscreen() {
      this.player?.fullScreen.request('web');
    },
    onBrowserFullscreen() {
      this.player?.fullScreen.request('browser');
    },
    onSingleFullscreen() {
      this.player?.fullScreen.singleFullscreen(1);
    }
  },
  beforeDestroy() {
    this.player?.destory();
  }
};
</script>
```

:::

## 直播

设置`live`为`true`即可

:::demo

```vue
<template>
  <div id="multi-container-2" class="player-container"></div>
</template>

<script>
export default {
  mounted() {
    this.initPlayer();
  },
  methods: {
    initPlayer() {
      this.player = new this.$MultiPlayer({
        el: '#multi-container-2',
        type: 'flv',
        videoList: [
          'https://api.dogecloud.com/player/get.flv?vcode=5ac682e6f8231991&userId=17&ext=.flv',
          'https://api.dogecloud.com/player/get.flv?vcode=5ac682e6f8231991&userId=17&ext=.flv',
          'https://api.dogecloud.com/player/get.flv?vcode=5ac682e6f8231991&userId=17&ext=.flv'
        ],
        live: true
      });
    }
  },
  beforeDestroy() {
    this.player?.destory();
  }
};
</script>
```

:::

## 参数

| 名称      | 说明                   | 类型                 | 可选值        | 默认值 |
| --------- | ---------------------- | -------------------- | ------------- | ------ |
| el        | 播放器容器元素，必填项 | String , HTMLElement | —             | —      |
| type      | 播放类型，必填项       | String               | mp4、hls、flv | mp4    |
| autoplay  | 视频自动播放           | Boolean              | —             | false  |
| videoList | 视频列表，必填项       | Array                | —             | —      |
| live      | 是否开启直播           | Boolean              | —             | false  |


## API

```javascript
import { MultiPlayer } from 'lin-view-ui';
const player = new MultiPlayer({
  el: document.getElementById('xxx'),
  type: 'hls',
  videoList: []
});
```

- `player.play()` : 播放视频
- `player.pause()` : 暂停视频
- `player.seek(time: number)` : 跳转到特定时间
- `player.toggle()` : 切换播放和暂停
- `player.on(event: string, handler: function)` : 绑定 video 标签事件
- `player.destroy()` : 销毁播放器
- `player.setVolume(percentage: number)` : 设置视频音量
- `player.videos` : VideoPlayer 实例
- `player.currentTime` : 返回视频当前播放时间
- `player.totalTime` : 返回视频总时间
- `player.paused` : 返回视频是否暂停
- `player.fullScreen.request(type: string)` : 进入全屏

```javascript
player.fullScreen.request('web');
player.fullScreen.request('browser');
```

- `player.fullScreen.cancel(type: string)` : 退出全屏

```javascript
player.fullScreen.cancel('web');
player.fullScreen.cancel('browser');
```

- `player.fullScreen.singleFullscreen(index: number)` : 单个画面全屏

```javascript
player.fullScreen.singleFullscreen(1);
```

