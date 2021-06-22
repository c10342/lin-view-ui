# VideoPlayer 播放器

[[toc]]

---

`VideoPlayer` 组件播放器 是基于 `hls.js` 和 `flv.js` 封装的一个播放器，可支持 `MP4` ，`hls` 和 `flv` 格式视频。灵感来自于[DPlayer](http://dplayer.js.org/zh/)

## 播放 Mp4

设置 `type` 为 `mp4`，以及传入 `el` 和 `speedList` 即可

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
          label: '正常',
          value: 1
        },
        {
          label: '1.5倍',
          value: 1.5
        },
        {
          label: '2倍',
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
            label: '标清',
            url:
              'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4'
          },
          {
            label: '高清',
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
      this.mp4Player?.notice('你好', 5000);
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

## 播放 HLS

设置 `type` 为 `hls`，以及传入 `el` 和 `speedList` 即可

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
          label: '正常',
          value: 1
        },
        {
          label: '1.5倍',
          value: 1.5
        },
        {
          label: '2倍',
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
      this.hlsPlayer = new this.$VideoPlayer({
        el: '#hlsvideo',
        type: 'hls',
        speedList: this.speedList,
        videoList: [
          {
            label: '标清',
            url:
              'https://api.dogecloud.com/player/get.m3u8?vcode=5ac682e6f8231991&userId=17&ext=.m3u8'
          },
          {
            label: '高清',
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

## 播放 FLV

设置 `type` 为 `flv`，以及传入 `el` 和 `speedList` 即可

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
          label: '正常',
          value: 1
        },
        {
          label: '1.5倍',
          value: 1.5
        },
        {
          label: '2倍',
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
      this.flvPlayer = new this.$VideoPlayer({
        el: document.getElementById('flvvideo'),
        type: 'flv',
        speedList: this.speedList,
        videoList: [
          {
            label: '标清',
            url:
              'https://api.dogecloud.com/player/get.flv?vcode=5ac682e6f8231991&userId=17&ext=.flv'
          },
          {
            label: '高清',
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

## 开启直播模式

设置 `live` 为 `true`

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
            label: '标清',
            url:
              'https://api.dogecloud.com/player/get.flv?vcode=5ac682e6f8231991&userId=17&ext=.flv'
          },
          {
            label: '高清',
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

## 其他 MSE 库使用

`VideoPlayer` 组件可以通过 `customType` 参数与任何 MSE 库一起使用

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
            label: '标清',
            url:
              'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4'
          },
          {
            label: '高清',
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

## 参数

| 名称       | 说明                                             | 类型                               | 可选值        | 默认值 |
| ---------- | ------------------------------------------------ | ---------------------------------- | ------------- | ------ |
| el         | 播放器容器元素，必填项                           | String , HTMLElement               | —             | —      |
| type       | 播放类型，必填项，当 customType 参数存在时非必填 | String                             | mp4、hls、flv | —      |
| autoplay   | 视频自动播放                                     | Boolean                            | —             | false  |
| speedList  | 视频速度倍数列表                                 | Array<{label:string,value:string}> | —             | —      |
| videoList  | 视频列表，必填项                                 | Array<{label:string,url:string}>   | —             | —      |
| live       | 是否开启直播                                     | Boolean                            | —             | false  |
| customType | 需要自定义支持其他 MSE 可使用此参数              | Function                           | —             | —      |

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

- `player.play()` : 播放视频
- `player.pause()` : 暂停视频
- `player.seek(time: number)` : 跳转到特定时间
- `player.toggle()` : 切换播放和暂停
- `player.on(event: string, handler: function)` : 绑定 video 标签事件
- `player.switchVideo(options)` : 切换到其他视频

```javascript
player.switchVideo({ videoList: [{ label: '', url: '' }], autoplay: true });
```

- `player.notice(text: string, time: number)` : 显示通知，时间的单位为毫秒，默认时间 2000 毫秒
- `player.switchQuality(index: number)` : 切换清晰度
- `player.destroy()` : 销毁播放器
- `player.speed(rate: number)` : 设置视频速度
- `player.volume(percentage: number)` : 设置视频音量
- `player.video` : 原生 video
- `player.hls` : hls 实例对象
- `player.flv` : flv 实例对象
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
