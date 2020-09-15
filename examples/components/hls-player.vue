<template>
  <div class="hls-player">
    <div id="video" class="hls-player-video"></div>
    <div>
      <div>
        <button @click="init">init</button>
        <button @click="play">play</button>
        <button @click="pause">pause</button>
        <button @click="seek">seek</button>
        <button @click="toggle">toggle</button>
        <button @click="notice">notice</button>
        <button @click="switchQuality">switchQuality</button>
        <button @click="speed">speed</button>
        <button @click="volume">volume</button>
        <button @click="switchVideo">switchVideo</button>
      </div>
      <div>
        <button @click="fullScreenRequest('web')">web fullScreenRequest</button>
        <button @click="fullScreenCancel('web')">web fullScreenCancel</button>

        <button @click="fullScreenRequest('browser')">browser fullScreenRequest</button>
        <button @click="fullScreenCancel('browser')">browser fullScreenCancel</button>
        <button @click="other">other</button>
        <button @click="destory">destory</button>
      </div>
    </div>

    <div id="livevideo" class="hls-player-video"></div>
  </div>
</template>

<script>
export default {
  name: "test-hls-player",
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
      videoList: [
        {
          label: "标清",
          url:
            "https://th.alink.ava.com.cn/hls/ff808081722a7f9c0172309925d900d6/NR/master.m3u8",
        },
        {
          label: "超清",
          url:
            "https://th.alink.ava.com.cn/hls/ff808081722a7f9c0172309925d900d6/HD/master.m3u8",
        },
      ],
    };
  },
  mounted() {
    // this.$nextTick(() => {
    this.player = new this.$HlsPlayer({
      el: "#video",
      type: "hls",
      speedList: this.speedList,
      videoList: this.videoList,
    });
    // });
    this.init();
  },
  methods: {
    init() {
      new this.$HlsPlayer({
        el: document.getElementById("livevideo"),
        type: "hls",
        speedList: this.speedList,
        videoList: this.videoList,
        live: true,
      });
    },
    play() {
      this.player?.play();
    },
    pause() {
      this.player?.pause();
    },
    seek() {
      this.player?.seek(30);
    },
    toggle() {
      this.player?.toggle();
    },
    notice() {
      this.player?.notice("你好", 5000);
    },
    speed() {
      this.player?.speed(2);
    },
    volume() {
      this.player?.volume(0.5);
    },
    switchQuality() {
      this.player?.switchQuality(1);
    },
    switchVideo() {
      this.player?.switchVideo({
        type: "hls",
        autoplay: true,
        videoList: [
          {
            label: "高清",
            url:
              "https://th.alink-test.ava.com.cn/vod/ff80808173b749c90173b8029e2b0012/HD/master.m3u8?ver=null",
          },
          {
            label: "标清",
            url:
              "https://th.alink-test.ava.com.cn/vod/ff80808173b749c90173b8029e2b0012/NR/master.m3u8?ver=null",
          },
        ],
      });
    },
    other() {
      console.log(this.player.currentTime);
      console.log(this.player.totalTime);
    },
    fullScreenRequest(type) {
      this.player.fullScreen.request(type);
      setTimeout(() => {
        this.fullScreenCancel(type);
      }, 3000);
    },
    fullScreenCancel(type) {
      this.player.fullScreen.cancel(type);
    },
    destory() {
      this.player?.destory();
    },
  },
};
</script>

<style lang="scss" scoped>
.hls-player {
  padding-left: 100px;
}

.hls-player-video {
  width: 600px;
  height: 300px;
}
</style>