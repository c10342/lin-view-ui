<template>
  <transition name="lin-loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="lin-loading-mask"
      :class="[{'lin-loading-is-fullscreen':fullscreen}]"
      :style="{'backgroundColor':background || ''}"
    >
      <div class="lin-loading-content">
        <span
          class="lin-loading-icon"
          :style="{'border-top-color':iconColor|| '','border-right-color':iconColor || ''}"
        ></span>
        <span :style="{'color':textColor||''}" class="lin-loading-text" v-if="text">{{text}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LinLoading',
  data() {
    return {
      text: null,
      fullscreen: true,
      visible: false,
      background: null,
      iconColor: null,
      textColor: null,
    };
  },
  methods: {
    handleAfterLeave() {
      this.$emit('after-leave');
    },
  },
};
</script>
