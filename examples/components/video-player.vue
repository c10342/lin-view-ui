<template>
  <div class="video-player">
    <div id="hlsvideo" class="video-player-video"></div>

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
      <lin-button @click="fullScreenRequest('web')">web fullScreenRequest</lin-button>
      <lin-button @click="fullScreenCancel('web')">web fullScreenCancel</lin-button>

      <lin-button @click="fullScreenRequest('browser')">browser fullScreenRequest</lin-button>
      <lin-button @click="fullScreenCancel('browser')">browser fullScreenCancel</lin-button>
      <lin-button @click="getCurrentTime">getCurrentTime</lin-button>
      <lin-button @click="getTotalTime">getTotalTime</lin-button>
      <lin-button @click="destory">destory</lin-button>
    </div>
    <div id="flvvideo" class="video-player-video"></div>
  </div>
</template>

<script>
export default {
  name: "test-video-player",
  data() {
    return {
      speedList: [
        {
          label: "正常",
          value: 1,
        },
        {
          label: "1.5倍",
          value: 1.5,
        },
        {
          label: "2倍",
          value: 2,
        },
      ],
    };
  },
  mounted() {
    this.initMp4();
    this.initHls();
    this.initFlv();
  },
  methods: {
    initHls() {
      this.hlsPlayer = new this.$VideoPlayer({
        el: "#hlsvideo",
        type: "hls",
        speedList: this.speedList,
        videoList: [
          {
            label: "标清",
            url:
              "https://api.dogecloud.com/player/get.m3u8?vcode=5ac682e6f8231991&userId=17&ext=.m3u8",
          },
        ],
      });
    },
    initMp4() {
      if(this.mp4Player){
        return
      }
      this.mp4Player = new this.$VideoPlayer({
        el: document.getElementById("mp4video"),
        type: "mp4",
        speedList: this.speedList,
        videoList: [
          {
            label: "标清",
            url:
              "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
          },
        ],
      });
    },
    initFlv() {
      this.flvPlayer =new this.$VideoPlayer({
        el: document.getElementById("flvvideo"),
        type: "flv",
        speedList: this.speedList,
        videoList: [
          {
            label: "标清",
            url:
              "https://api.dogecloud.com/player/get.flv?vcode=5ac682e6f8231991&userId=17&ext=.flv",
          },
        ],
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
      this.mp4Player?.notice("你好", 5000);
    },
    speed() {
      this.mp4Player?.speed(2);
    },
    volume() {
      this.mp4Player?.volume(0.5);
    },
    switchQuality() {
      this.mp4Player?.switchQuality(1);
    },
    getCurrentTime(){
      alert(this.mp4Player.currentTime)
    },
    getTotalTime(){
      alert(this.mp4Player.totalTime)
    },
    other() {
      console.log(this.mp4Player.currentTime);
      console.log(this.mp4Player.totalTime);
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
    },
  },
  beforeDestroy(){
    this.mp4Player?.destory();
    this.hlsPlayer?.destory()
    this.flvPlayer?.destory()

    this.mp4Player = null
    this.hlsPlayer = null
    this.flvPlayer = null
  }
};
</script>

<style lang="scss" scoped>
.video-player-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  ::v-deep .lin-button {
    margin-top: 10px;
    margin-right: 10px;
  }
}

.video-player-video {
  width: 600px;
  height: 300px;
}
</style>