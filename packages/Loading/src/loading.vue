<template>
  <transition name="l-loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="l-loading-mask"
      :class="[{'l-loading-is-fullscreen':fullscreen}]"
      :style="{'backgroundColor':background || ''}"
    >
      <div class="l-loading-content">
        <span
          class="l-loading-icon"
          :style="{'border-top-color':iconColor|| '','border-right-color':iconColor || ''}"
        ></span>
        <span :style="{'color':textColor||''}" class="l-loading-text" v-if="text">{{text}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "l-loading",
  data() {
    return {
      text: null,
      fullscreen: true,
      visible: false,
      background: null,
      iconColor: null,
      textColor: null
    };
  },
  methods: {
    handleAfterLeave() {
      this.$emit("after-leave");
    }
  }
};
</script>
