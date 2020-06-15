<template>
  <div class="l-loading-bar">
    <div
      :style="{'transform': `translateX(-${100-totalProgress}%)`}"
      class="l-loading-bar-progress"
      :class="{'l-loading-bar-error':isError}"
    >
      <div class="l-loading-bar-peg"></div>
    </div>
    <div class="l-loading-bar-spinner" v-if="showSpinner">
      <div
        :style="{'animation': `l-spinner 400ms ${easing} infinite`}"
        class="l-loading-bar-icon"
        :class="{'l-loading-bar-icon-error':isError}"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "l-loading-bar",
  data() {
    return {
      easing: "linear",
      isError: false,
      showSpinner: true,
      totalProgress: 0,
      percentNum: 0,
      speed: 5
    };
  }
};
</script>
