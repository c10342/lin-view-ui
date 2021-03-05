<template>
  <div class="lin-loading-bar">
    <div
      :style="{'transform': `translateX(-${100-totalProgress}%)`}"
      class="lin-loading-bar-progress"
      :class="{'lin-loading-bar-error':isError}"
    >
      <div class="lin-loading-bar-peg"></div>
    </div>
    <div class="lin-loading-bar-spinner" v-if="showSpinner">
      <div
        :style="{'animation-timing-function': easing}"
        class="lin-loading-bar-icon"
        :class="{'lin-loading-bar-icon-error':isError}"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LinLoadingBar',
  data () {
    return {
      // 加载器（转圈圈的那个东西），运动形式
      easing: 'linear',
      // 是否为错误类型
      isError: false,
      // 显示加载器
      showSpinner: true,
      // 加载的总进度
      totalProgress: 0,
      // 每次前进的百分比
      percentNum: 0,
      // 加载速度
      speed: 5
    };
  }
};
</script>
