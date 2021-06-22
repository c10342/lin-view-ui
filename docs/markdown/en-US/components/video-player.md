# VideoPlayer

[[toc]]

---

`VideoPlayer` component player is based on `hls.js` And `flv.js` A packaged player can support `MP4`,`hls` and `flv` video formats. Inspired by [DPlayer](http://dplayer.js.org/zh/)

## Play mp4

Set `type` to `mp4`, and pass in `el` and `speedList`

:::demo

```vue
<template>
  <div id="mp4video" class="video-player-video"></div>
  <div class="video-player-group">
    <lin-button @click="initMp4">initMp4</lin-button>
    <lin-button @click="play">play</lin-button>
    <lin-button @click="pause">pause</lin-button>
    <lin-button @click="seek">seek</lin-button>
    <lin-button @click="toggle">toggle</lin-button>
    <lin-button @click="notice">notice</lin-button>
    <lin-button @click="speed">speed</lin-button>
    <lin-button @click="volume">volume</lin-button>
    <lin-button @click="fullScreenRequest('web')"
      >web fullScreenRequest</lin-button
    >
    <lin-button @click="fullScreenCancel('web')"
      >web fullScreenCancel</lin-button
    >
    <lin-button @click="fullScreenRequest('browser')"
      >browser fullScreenRequest</lin-button
    >
    <lin-button @click="fullScreenCancel('browser')"
      >browser fullScreenCancel</lin-button
    >
    <lin-button @click="getCurrentTime">getCurrentTime</lin-button>
    <lin-button @click="getTotalTime">getTotalTime</lin-button>
    <lin-button @click="destory">destory</lin-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      speedList: [
        {
          label: 'normal',
          value: 1
        },
        {
          label: '1.5 times',
          value: 1.5
        },
        {
          label: '2 times',
          value: 2
        }
      ]
    };
  },
  mounted() {
    this.initMp4();
  },
  methods: {
    initMp4() {
      if (this.mp4Player) {
        return;
      }
      this.mp4Player = new this.$VideoPlayer({
        el: document.getElementById('mp4video'),
        type: 'mp4',
        speedList: this.speedList,
        videoList: [
          {
            label: 'Standard definition',
            url:
              'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4'
          },
          {
            label: 'high definition',
            url:
              'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4'
          }
        ]
      });
    },
    play() {
      this.mp4Player?.play();
    },
    pause() {
      this.mp4Player?.pause();
    },
    seek() {
      this.mp4Player?.seek(30);
    },
    toggle() {
      this.mp4Player?.toggle();
    },
    notice() {
      this.mp4Player?.notice('hello', 5000);
    },
    speed() {
      this.mp4Player?.speed(2);
    },
    volume() {
      this.mp4Player?.volume(0.5);
    },
    getCurrentTime() {
      alert(this.mp4Player.currentTime);
    },
    getTotalTime() {
      alert(this.mp4Player.totalTime);
    },

    fullScreenRequest(type) {
      this.mp4Player.fullScreen.request(type);
      setTimeout(() => {
        this.fullScreenCancel(type);
      }, 3000);
    },
    fullScreenCancel(type) {
      this.mp4Player.fullScreen.cancel(type);
    },
    destory() {
      this.mp4Player?.destory();
      this.mp4Player = null;
    }
  },
  beforeDestroy() {
    this.mp4Player?.destory();
    this.mp4Player = null;
  }
};
</script>
```

:::

## Play HLS

Set `type` to `hls`, and pass in `el` and `speedList`

:::demo

```vue
<template>
  <div id="hlsvideo" class="video-player-video"></div>
</template>

<script>
export default {
  data() {
    return {
      speedList: [
        {
          label: 'normal',
          value: 1
        },
        {
          label: '1.5 times',
          value: 1.5
        },
        {
          label: '2 times',
          value: 2
        }
      ]
    };
  },
  mounted() {
    this.initHls();
  },
  methods: {
    initHls() {
      new this.$VideoPlayer({
        el: '#hlsvideo',
        type: 'hls',
        speedList: this.speedList,
        videoList: [
          {
            label: 'Standard definition',
            url:
              'https://api.dogecloud.com/player/get.m3u8?vcode=5ac682e6f8231991&userId=17&ext=.m3u8'
          },
          {
            label: 'high definition',
            url:
              'https://api.dogecloud.com/player/get.m3u8?vcode=5ac682e6f8231991&userId=17&ext=.m3u8'
          }
        ]
      });
    }
  },
  beforeDestroy() {
    this.hlsPlayer?.destory();
    this.hlsPlayer = null;
  }
};
</script>
```

:::

## Play flv

Set `type` to `flv`, and pass in `el` and `speedList`

:::demo

```vue
<template>
  <div id="flvvideo" class="video-player-video"></div>
</template>

<script>
export default {
  data() {
    return {
      speedList: [
        {
          label: 'normal',
          value: 1
        },
        {
          label: '1.5 times',
          value: 1.5
        },
        {
          label: '2 times',
          value: 2
        }
      ]
    };
  },
  mounted() {
    this.initFlv();
  },
  methods: {
    initFlv() {
      new this.$VideoPlayer({
        el: document.getElementById('flvvideo'),
        type: 'flv',
        speedList: this.speedList,
        videoList: [
          {
            label: 'Standard definition',
            url:
              'https://api.dogecloud.com/player/get.flv?vcode=5ac682e6f8231991&userId=17&ext=.flv'
          },
          {
            label: 'high definition',
            url:
              'https://api.dogecloud.com/player/get.flv?vcode=5ac682e6f8231991&userId=17&ext=.flv'
          }
        ]
      });
    }
  },
  beforeDestroy() {
    this.flvPlayer?.destory();
    this.flvPlayer = null;
  }
};
</script>
```

:::

## Open live mode

Set `live` to `true`

:::demo

```vue
<template>
  <div id="livevideo" class="video-player-video"></div>
</template>

<script>
export default {
  mounted() {
    this.initLive();
  },
  methods: {
    initLive() {
      this.flvPlayer = new this.$VideoPlayer({
        el: document.getElementById('livevideo'),
        type: 'flv',
        speedList: this.speedList,
        live: true,
        videoList: [
          {
            label: 'Standard definition',
            url:
              'https://api.dogecloud.com/player/get.flv?vcode=5ac682e6f8231991&userId=17&ext=.flv'
          },
          {
            label: 'high definition',
            url:
              'https://api.dogecloud.com/player/get.flv?vcode=5ac682e6f8231991&userId=17&ext=.flv'
          }
        ]
      });
    }
  },
  beforeDestroy() {
    this.flvPlayer?.destory();
    this.flvPlayer = null;
  }
};
</script>
```

:::

## Use of other MSE Libraries

The `VideoPlayer` component can be used with any MSE library through the `customType` parameter

:::demo

```vue
<template>
  <div id="othervideo" class="video-player-video"></div>
</template>

<script>
export default {
  mounted() {
    this.initOther();
  },
  methods: {
    initOther() {
      this.mp4Player = new this.$VideoPlayer({
        el: document.getElementById('othervideo'),
        videoList: [
          {
            label: 'Standard definition',
            url:
              'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4'
          },
          {
            label: 'high definition',
            url:
              'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4'
          }
        ],
        customType(video, data) {
          video.src = data.currenVideo.url;
        }
      });
    }
  },
  beforeDestroy() {
    this.mp4Player?.destory();
    this.mp4Player = null;
  }
};
</script>
```

:::

## Parameter

| Name       | Description                                                            | Type                               | Accepted Values | Default |
| ---------- | ---------------------------------------------------------------------- | ---------------------------------- | --------------- | ------- |
| el         | Player container element, required                                     | String,HTMLElement                 | —               | —       |
| type       | Play type, required. Not required when the customtype parameter exists | String                             | mp4、hls、flv   | —       |
| autoplay   | Automatic video playback                                               | Boolean                            | —               | false   |
| speedList  | Video speed multiples list                                             | Array<{label:string,value:string}> | —               | —       |
| videoList  | Video list, required                                                   | Array<{label:string,url:string}>   | —               | —       |
| live       | Open live broadcast                                                    | Boolean                            | —               | false   |
| customType | Custom support is required. Other MSEs can use this parameter          | Function                           | —               | —       |

## API

```javascript
import { VideoPlayer } from 'lin-view-ui';
const player = new VideoPlayer({
  el: document.getElementById('flvvideo'),
  type: 'flv',
  speedList: [],
  videoList: []
});
```

- `player.play()` : Play video
- `player.pause()` : Pause video
- `player.seek(time: number)` : Jump to a specific time
- `player.toggle()` : Switch playback and pause
- `player.on(event: string, handler: function)` : Bind video tag event
- `player.switchVideo(options)` : Switch to another video

```javascript
player.switchVideo({ videoList: [{ label: '', url: '' }], autoplay: true });
```

- `player.notice(text: string, time: number)` : Display the notification. The unit of time is MS, and the default time is 2000 Ms
- `player.switchQuality(index: number)` : Switching sharpness
- `player.destroy()` : Destroy player
- `player.speed(rate: number)` : Set video speed
- `player.volume(percentage: number)` : Set video volume
- `player.video` : Native video
- `player.hls` : HLS instance object
- `player.flv` : Flv instance object
- `player.currentTime` : Returns the current playing time of the video
- `player.totalTime` : Total time to return video
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
