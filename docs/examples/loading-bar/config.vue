<template>
  <lin-button @click="setSpeed"> 设置speed速度 </lin-button>
  <lin-button class="ml-10" @click="setSpinner">
    设置spinner动画效果
  </lin-button>
  <lin-button class="ml-10" @click="setPercentNum">
    设置percentNum每次加载的比例
  </lin-button>
  <lin-button class="ml-10" @click="setShowSpinner">
    设置是否显示spinner
  </lin-button>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";

export default defineComponent({
  setup() {
    const instance: any = getCurrentInstance();
    const loadingBar = instance.appContext.config.globalProperties.$loadingBar;
    const setSpeed = () => {
      // config全局设置，会作用于所有的
      loadingBar
        .config({
          speed: 10
        })
        .start();
    };
    const setSpinner = () => {
      loadingBar.start({ easing: "ease" });
    };
    const setPercentNum = () => {
      loadingBar.start({ percentNum: 0.1 });
    };
    const setShowSpinner = () => {
      loadingBar.start({ showSpinner: false });
    };
    return {
      setSpeed,
      setSpinner,
      setPercentNum,
      setShowSpinner
    };
  }
});
</script>
