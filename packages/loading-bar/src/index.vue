<template>
  <div class="lin-loading-bar">
    <div
      :style="{ transform: `translateX(-${100 - totalProgress}%)` }"
      class="lin-loading-bar-progress"
      :class="{ 'is-error': isError }"
    >
      <div class="lin-loading-bar-peg"></div>
    </div>
    <div class="lin-loading-bar-spinner" v-if="showSpinner">
      <div
        :style="{ 'animation-timing-function': easing }"
        class="lin-loading-bar-icon"
        :class="{ 'is-icon-error': isError }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LinLoadingBar",
  setup() {
    // 加载器（转圈圈的那个东西），运动形式
    const easing = ref("linear");
    // 是否为错误类型
    const isError = ref(false);
    // 显示加载器
    const showSpinner = ref(true);
    // 加载的总进度
    const totalProgress = ref(0);
    // 每次前进的百分比
    const percentNum = ref(0);
    // 加载速度
    const speed = ref(5);
    return {
      easing,
      isError,
      showSpinner,
      totalProgress,
      percentNum,
      speed
    };
  }
});
</script>
