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
      easing: 'linear',
      isError: false,
      showSpinner: true,
      totalProgress: 0,
      percentNum: 0,
      speed: 5
    };
  }
};
</script>
