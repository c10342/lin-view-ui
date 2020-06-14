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
      this.$loading.start();
    },
    end() {
      this.$loading.end();
    },
    error() {
      this.$loading.error();
    },
    setSpeed() {
      this.$loading.config({
        speed: 10
      });
      this.$loading.start();
    },
    setSpinner() {
      this.$loading.config({
        easing: "ease"
      });
      this.$loading.start();
    },
    setPercentNum() {
      this.$loading.config({
        percentNum: 0.1
      });
      this.$loading.start();
    },
    setShowSpinner() {
      this.$loading.config({
        showSpinner: false
      });
      this.$loading.start();
    }
  }
};
</script>

