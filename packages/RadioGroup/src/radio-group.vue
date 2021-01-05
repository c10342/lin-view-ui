<template>
  <div class="lin-radio-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LinRadioGroup',
  provide () {
    return {
      RadioGroup: this
    };
  },
  props: {
    // lin-radio-group接收到了 value值
    // 将来还需要触发 当前组件的input事件
    // provide 与  inject  provider/consumer
    value: null,
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>
