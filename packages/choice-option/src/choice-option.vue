<template>
  <div class="lin-choice-option">
    <slot name="label">
      <div class="lin-choice-option-label">
        {{ label }}
      </div>
    </slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LinChoiceOption',
  props: {
    // 分组的组名
    label: {
      type: String,
      default: ''
    },
    // 是否禁用该分组
    disabled: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return {
      option: this
    };
  }
};
</script>
