<template>
  <div>
    <lin-button @click="start">开始</lin-button>
    <lin-button @click="end">结束</lin-button>
    <lin-button @click="error">错误</lin-button>

    <lin-button @click="setSpeed">设置speed速度</lin-button>
    <lin-button @click="setSpinner">设置spinner动画效果</lin-button>
    <lin-button @click="setPercentNum">设置percentNum每次加载的比例</lin-button>
    <lin-button @click="setShowSpinner">设置是否显示spinner</lin-button>
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
        speed: 10,
      });
      this.$loadingBar.start();
    },
    setSpinner() {
      this.$loadingBar.config({
        easing: "ease",
      });
      this.$loadingBar.start();
    },
    setPercentNum() {
      this.$loadingBar.config({
        percentNum: 0.1,
      });
      this.$loadingBar.start();
    },
    setShowSpinner() {
      this.$loadingBar.config({
        showSpinner: false,
      });
      this.$loadingBar.start();
    },
  },
};
</script>

