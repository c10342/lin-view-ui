<template>
  <div class="lin-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LinCheckboxGroup',
  props: {
    // 绑定值
    value: {
      type: Array,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  provide() {
    return {
      CheckboxGroup: this,
    };
  },
};
</script>
