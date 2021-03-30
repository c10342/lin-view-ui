<template>
  <transition name="lin-loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="lin-loading-mask"
      :class="[{ 'lin-loading-is-fullscreen': fullscreen }]"
      :style="{ backgroundColor: background || '' }"
    >
      <div class="lin-loading-content">
        <span
          class="lin-loading-icon"
          :style="{
            'border-top-color': iconColor || '',
            'border-right-color': iconColor || '',
          }"
        ></span>
        <span
          :style="{ color: textColor || '' }"
          class="lin-loading-text"
          v-if="text"
          >{{ text }}</span
        >
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LinLoading',
  data() {
    return {
      // 加载文案
      text: null,
      // 是否全屏
      fullscreen: true,
      // 控制是否显示
      visible: false,
      // 背景
      background: null,
      // loading颜色
      iconColor: null,
      // 文本颜色
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
