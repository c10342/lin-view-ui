<template>
  <div class="hls-player">
    <div id="video"></div>
    <div>
      <button @click="init">init</button>
      <button @click="play">播放</button>
      <button @click="pause">暂停</button>
      <button @click="seek">seek</button>
      <button @click="destory">destory</button>
    </div>
    <!-- <lin-hls-player /> -->
    <!-- <div class="test-demo"></div> -->
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
    this.$nextTick(() => {
      this.player = new this.$HlsPlayer({
        el: "#video",
        type: "hls",
        speedList: this.speedList,
        videoList: this.videoList,
      });
      this.player?.on("timeupdate", () => {
        console.log(this.player.currentTime);
      });
    });
  },
  methods: {
    init() {
      this.player1 = new this.$HlsPlayer({
        el: "#video",
        type: "mp4",
        videoList: [
          {
            label: "哈哈",
            url:
              "http://127.0.0.1:8081/4-1%20%E8%AE%A4%E8%AF%86%20uniCloud%E5%BC%80%E5%8F%91%E3%80%90www.cong0sousuo.top%E3%80%91.mp4",
          },
        ],
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

.test-demo {
  border: 1px solid red;
  height: 600px;
  width: 400px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==)
    repeat-x bottom;
  // background-position: 0 300px;
}
</style>