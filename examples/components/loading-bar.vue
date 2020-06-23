<template>
  <div>
    <l-button @click="start">开始</l-button>
    <l-button @click="end">结束</l-button>
    <l-button @click="error">错误</l-button>

    <l-button @click="setSpeed">设置speed速度</l-button>
    <l-button @click="setSpinner">设置spinner动画效果</l-button>
    <l-button @click="setPercentNum">设置percentNum每次加载的比例</l-button>
    <l-button @click="setShowSpinner">设置是否显示spinner</l-button>
  </div>
</template>

<script>
export default {
  name: "test-loading-bar",
  methods: {
    start() {
      this.$loadingBar.start();
    },
    end() {
      this.$loadingBar.end();
    },
    error() {
      this.$loadingBar.error();
    },
    setSpeed() {
      this.$loadingBar.config({
        speed: 10
      });
      this.$loadingBar.start();
    },
    setSpinner() {
      this.$loadingBar.config({
        easing: "ease"
      });
      this.$loadingBar.start();
    },
    setPercentNum() {
      this.$loadingBar.config({
        percentNum: 0.1
      });
      this.$loadingBar.start();
    },
    setShowSpinner() {
      this.$loadingBar.config({
        showSpinner: false
      });
      this.$loadingBar.start();
    }
  }
};
</script>

