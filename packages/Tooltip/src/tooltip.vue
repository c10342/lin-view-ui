<template>
  <transition name="lin-tooltip-fade" @after-leave="handleAfterLeave">
    <div v-if="show" :style="style" class="lin-tooltip" :class="classes">
      {{ text }}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LinTooltip',
  data() {
    return {
      // 样式
      style: {},
      // 控制是否显示
      show: false,
      // 显示位置
      placement: 'bottom',
      // 文本
      text: '',
    };
  },
  methods: {
    // vue过渡动画结束
    handleAfterLeave() {
      this.$emit('after-leave');
    },
  },
  computed: {
    classes() {
      return {
        'lin-tooltip-bottom': this.placement === 'top',
        'lin-tooltip-top': this.placement === 'bottom',
        'lin-tooltip-left': this.placement === 'right',
        'lin-tooltip-right': this.placement === 'left',
      };
    },
  },
};
</script>
