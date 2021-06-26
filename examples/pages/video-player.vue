<template>
  <div class="video-player">
    <div id="mp4video"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.initMp4();
  },
  methods: {
    initMp4() {
      if (this.mp4Player) {
        return;
      }
      this.mp4Player = new this.$VideoPlayer({
        el: document.getElementById("mp4video"),
        type: "mp4",
        speedList: this.speedList,
        videoList: [
          {
            label: "标清",
            url:
              "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4"
          },
          {
            label: "高清",
            url:
              "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4"
          }
        ]
      });
    }
  },
  beforeDestroy() {
    this.mp4Player?.destory();
    this.mp4Player = null;
  }
};
</script>

<style lang="scss" scoped>
.video-player {
  width: 830px;
  height: 500px;
  margin: 100px auto;
}
</style>
