# MultiPlayer

[[toc]]

## Basic usage

Just set `type`, `el` and `videolist` The optional values of type are `mp4`，`hls`，`flv`; `el` is a DOM element, which can be passed into a character selector or DOM object; `videoList` is an array, and each item is the playback address. At present, it only supports three pictures.

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
    <lin-button @click="onWebFullscreen">web-fullscreen</lin-button>
    <lin-button @click="onBrowserFullscreen">browser-fullscreen</lin-button>
    <lin-button @click="onSingleFullscreen">single-fullscreen</lin-button>
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

## live broadcast

Set `live` to `true`

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

## Parameter

| Name      | Description                        | Type                 | Accepted Values | Default |
| --------- | ---------------------------------- | -------------------- | --------------- | ------- |
| el        | Player container element, required | String , HTMLElement | —               | —       |
| type      | Play type, required                | String               | mp4、hls、flv   | mp4     |
| autoplay  | Automatic video playback           | Boolean              | —               | false   |
| videoList | Video list, required               | Array                | —               | —       |
| live      | Open live broadcast                | Boolean              | —               | false   |

## API

```javascript
import { MultiPlayer } from 'lin-view-ui';
const player = new MultiPlayer({
  el: document.getElementById('xxx'),
  type: 'hls',
  videoList: []
});
```

- `player.play()` : Play video
- `player.pause()` : Pause video
- `player.seek(time: number)` : Jump to a specific time
- `player.toggle()` : Switch playback and pause
- `player.on(event: string, handler: function)` : Bind video tag event
- `player.destroy()` : Destroy player
- `player.setVolume(percentage: number)` : Set video volume
- `player.videos` : VideoPlayer instance
- `player.currentTime` : Returns the current playing time of the video
- `player.totalTime` :  Total time to return video
- `player.paused` : Returns whether the video is suspended
- `player.fullScreen.request(type: string)` : Enter full screen

```javascript
player.fullScreen.request('web');
player.fullScreen.request('browser');
```

- `player.fullScreen.cancel(type: string)` : Exit full screen

```javascript
player.fullScreen.cancel('web');
player.fullScreen.cancel('browser');
```

- `player.fullScreen.singleFullscreen(index: number)` : Enter single full screen

```javascript
player.fullScreen.singleFullscreen(1);
```
