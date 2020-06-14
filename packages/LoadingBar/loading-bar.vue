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

<style lang="scss">
@import "packages/assets/styles/variables/loading-bar.scss";
.l-loading-bar-progress {
  position: fixed;
  top: $loading-bar-top;
  left: $loading-bar-left;
  width: $loading-bar-width;
  height: $loading-bar-height;
  transition: $loading-bar-transition;
  //   transition: all 5s ease;
  background: $loading-bar-background;
  transform: $loading-bar-transform;
}
.l-loading-bar-peg {
  position: absolute;
  right: $loading-bar-peg-right;
  width: $loading-bar-peg-width;
  height: $loading-bar-peg-height;
  background-image: $loading-bar-peg-background-image;
}

.l-loading-bar-spinner {
  position: fixed;
  z-index: $loading-bar-spinner-z-index;
  top: $loading-bar-spinner-top;
  right: $loading-bar-spinner-right;
}

.l-loading-bar-icon {
  width: $loading-bar-icon-width;
  height: $loading-bar-icon-height;
  box-sizing: border-box;
  border: $loading-bar-icon-border;
  border-top-color: $loading-bar-icon-border-top-color;
  border-left-color: $loading-bar-icon-border-left-color;
  border-radius: $loading-bar-icon-border-radius;
  // animation: l-spinner 400ms linear infinite;
}

.l-loading-bar-error {
  background: $loading-bar-error-background;
  .l-loading-bar-peg {
    background-image: none;
  }
}

.l-loading-bar-icon-error {
  border-top-color: $loading-bar-error-border-top-color;
  border-left-color: $loading-bar-error-border-left-color;
}
</style>